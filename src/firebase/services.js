import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  serverTimestamp 
} from "firebase/firestore";
import { db } from "./config";

// --- Connection Check ---
export const checkDBConnection = async () => {
  try {
    const snapshot = await getDocs(query(collection(db, "events"), limit(1)));
    console.log("✅ Firestore connected. Docs found:", snapshot.size);
    return true;
  } catch (error) {
    console.error("❌ Firestore connection failed:", error);
    return false;
  }
};

// --- Registrations ---

export const createRegistration = async (registrationData) => {
  try {
    const docRef = await addDoc(collection(db, "registrations"), {
      ...registrationData,
      status: 'paid', // Assuming payment is handled before this
      isCheckedIn: false,
      createdAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    console.error("Error adding registration: ", error);
    throw error;
  }
};

export const getRegistrations = async () => {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const subscribeToRegistrations = (callback) => {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const registrations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(registrations);
  });
};

export const subscribeToRecentRegistrations = (count, callback) => {
  const q = query(collection(db, "registrations"), orderBy("createdAt", "desc"), limit(count));
  return onSnapshot(q, (snapshot) => {
    const registrations = snapshot.docs.map(doc => ({ 
      id: doc.id, 
      ...doc.data(),
      time: doc.data().createdAt?.toDate() ? doc.data().createdAt.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Just now'
    }));
    callback(registrations);
  });
};

export const getRegistrationById = async (id) => {
  try {
    const docRef = doc(db, "registrations", id);
    const docSnap = await getDocs(query(collection(db, "registrations"), where("__name__", "==", id)));
    // Actually, simple doc snap is better
    // const docSnap = await getDoc(docRef); // Wait, need to import getDoc
    if (docSnap.empty) return null;
    return { id: docSnap.docs[0].id, ...docSnap.docs[0].data() };
  } catch (error) {
    console.error("Error fetching registration: ", error);
    return null;
  }
};

// --- Volunteer / Scanning ---

export const checkInParticipant = async (participantId) => {
  try {
    const participantRef = doc(db, "registrations", participantId);
    await updateDoc(participantRef, {
      isCheckedIn: true,
      checkInTime: serverTimestamp()
    });
    return true;
  } catch (error) {
    console.error("Error checking in: ", error);
    throw error;
  }
};

// --- Analytics (Real-time Aggregated) ---

export const getEventStats = async (eventId) => {
  try {
    const eventRef = doc(db, 'events', eventId);
    const snapshot = await onSnapshot(eventRef, (doc) => {
      if (doc.exists()) {
        return doc.data();
      }
      return null;
    });
    return snapshot;
  } catch (error) {
    console.error("Error fetching event stats:", error);
    throw error;
  }
};

export const subscribeToEventStats = (eventId, callback) => {
  const eventRef = doc(db, 'events', eventId);
  return onSnapshot(eventRef, (snapshot) => {
    if (snapshot.exists()) {
      callback(snapshot.data());
    }
  }, (error) => {
    console.error("Stats subscription error:", error);
  });
};

export const getGlobalStats = async () => {
  try {
    const snapshot = await getDocs(collection(db, "events"));
    let totalEvents = snapshot.size;
    let totalRevenue = 0;
    let totalRegistrations = 0;

    snapshot.forEach(doc => {
      const data = doc.data();
      totalRevenue += data.totalRevenue || 0;
      totalRegistrations += data.totalRegistrations || 0;
    });

    return {
      totalEvents,
      totalRevenue,
      totalRegistrations
    };
  } catch (error) {
    console.error("Global stats error:", error);
    throw error;
  }
};

import { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { 
  collection, 
  query, 
  where, 
  onSnapshot, 
  orderBy,
  limit
} from 'firebase/firestore';

export const useRegistrations = (eventId) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!eventId) return;

    const q = query(
      collection(db, 'registrations'),
      where('eventId', '==', eventId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const results = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(results);
      setLoading(false);
    }, (error) => {
      console.error("Registrations listener error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [eventId]);

  return { data, loading };
};

export const useOrganizerEvents = (organizerId) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!organizerId) return;

    const q = query(
      collection(db, 'events'),
      where('organizerId', '==', organizerId),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      setEvents(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });

    return () => unsubscribe();
  }, [organizerId]);

  return { events, loading };
};

export const useGlobalStats = () => {
  const [stats, setStats] = useState({ users: 0, events: 0, regs: 0 });

  useEffect(() => {
    // In a real production app, we'd use a 'stats' document updated via Cloud Functions
    // For this implementation, we'll listen to the main collections
    const unsubUsers = onSnapshot(collection(db, 'users'), snap => setStats(s => ({ ...s, users: snap.size })));
    const unsubEvents = onSnapshot(collection(db, 'events'), snap => setStats(s => ({ ...s, events: snap.size })));
    const unsubRegs = onSnapshot(collection(db, 'registrations'), snap => setStats(s => ({ ...s, regs: snap.size })));

    return () => {
      unsubUsers();
      unsubEvents();
      unsubRegs();
    };
  }, []);

  return stats;
};

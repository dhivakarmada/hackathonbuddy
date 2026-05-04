const { db, admin } = require("../utils/db");

const validateQR = async (qrId, eventId, scannedBy) => {
  // Find the registration by qrId
  const snapshot = await db
    .collection("registrations")
    .where("qrId", "==", qrId)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return { status: "invalid" };
  }

  const doc = snapshot.docs[0];
  const data = doc.data();

  // Basic event validation
  if (data.eventId !== eventId) {
    return { status: "invalid", message: "Event mismatch" };
  }

  const ref = doc.ref;

  // 🔥 TRANSACTION (ANTI-DUPLICATE)
  return await db.runTransaction(async (t) => {
    const freshDoc = await t.get(ref);

    if (freshDoc.data().isCheckedIn) {
      return { status: "used", data };
    }

    // Mark as checked in
    t.update(ref, { 
      isCheckedIn: true,
      scannedAt: admin.firestore.FieldValue.serverTimestamp(),
      scannedBy
    });

    // Update event counter
    const eventRef = db.collection("events").doc(data.eventId);
    t.update(eventRef, {
      totalCheckins: admin.firestore.FieldValue.increment(1)
    });

    // Create checkin record
    const checkinRef = db.collection("checkins").doc();
    t.set(checkinRef, {
      registrationId: ref.id,
      scannedBy,
      scannedAt: admin.firestore.FieldValue.serverTimestamp(),
      eventId: data.eventId,
      name: data.name
    });

    return { status: "success", data };
  });
};

module.exports = { validateQR };

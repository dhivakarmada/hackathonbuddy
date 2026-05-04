const { db } = require("../utils/db");

/**
 * Retrieves analytics for a specific event.
 */
const getEventAnalytics = async (eventId) => {
  const eventDoc = await db.collection("events").doc(eventId).get();

  if (!eventDoc.exists) {
    throw new Error("Event not found");
  }

  const data = eventDoc.data();

  const conversionRate =
    data.totalRegistrations > 0
      ? (data.totalCheckins / data.totalRegistrations) * 100
      : 0;

  return {
    totalRegistrations: data.totalRegistrations || 0,
    totalCheckins: data.totalCheckins || 0,
    revenue: data.totalRevenue || 0,
    conversionRate: conversionRate.toFixed(2),
  };
};

/**
 * Generates daily registration trends for a specific event.
 */
const getDailyRegistrations = async (eventId) => {
  const snapshot = await db
    .collection("registrations")
    .where("eventId", "==", eventId)
    .get();

  const dailyMap = {};

  snapshot.forEach((doc) => {
    const data = doc.data();
    if (data.createdAt) {
      // Use Firestore timestamp or JS Date
      const date = data.createdAt.toDate ? data.createdAt.toDate() : new Date(data.createdAt);
      const dateString = date.toLocaleDateString();
      dailyMap[dateString] = (dailyMap[dateString] || 0) + 1;
    }
  });

  return dailyMap;
};

/**
 * Aggregates global analytics across all events.
 */
const getGlobalAnalytics = async () => {
  const eventsSnapshot = await db.collection("events").get();

  let totalEvents = 0;
  let totalRegistrations = 0;
  let totalCheckins = 0;
  let totalRevenue = 0;

  eventsSnapshot.forEach((doc) => {
    const data = doc.data();
    totalEvents++;
    totalRegistrations += data.totalRegistrations || 0;
    totalCheckins += data.totalCheckins || 0;
    totalRevenue += data.totalRevenue || 0;
  });

  return {
    totalEvents,
    totalRegistrations,
    totalCheckins,
    totalRevenue,
  };
};

module.exports = {
  getEventAnalytics,
  getDailyRegistrations,
  getGlobalAnalytics
};

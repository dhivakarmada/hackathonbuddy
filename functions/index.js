const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const crypto = require("crypto");
const admin = require("firebase-admin");
const { db } = require("./utils/db");
const { generateQR } = require("./services/qrService");
const { validateQR } = require("./services/scanService");
const { sendQRMail } = require("./services/emailService");
const { createOrder } = require("./services/paymentService");
const { getEventAnalytics, getDailyRegistrations, getGlobalAnalytics } = require("./services/eventService");

/**
 * Endpoint: POST /createRegistration
 * Handles participant registration, QR generation, and counter increments.
 */
exports.createRegistration = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { name, email, phone, eventId, paymentId } = req.body;

      if (!name || !email || !eventId) {
        return res.status(400).json({ error: "Missing fields" });
      }

      const registrationRef = db.collection("registrations").doc();

      // Generate QR
      const { qrId, secureToken, qrImage } = await generateQR(
        registrationRef.id,
        eventId
      );

      // Create Registration
      await registrationRef.set({
        name,
        email,
        phone: phone || "",
        eventId,
        qrId,
        secureToken,
        isCheckedIn: false,
        paymentStatus: paymentId ? "paid" : "pending",
        paymentId: paymentId || null,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // 🔥 Real-time Counter: Increment Total Registrations
      await db.collection("events").doc(eventId).update({
        totalRegistrations: admin.firestore.FieldValue.increment(1)
      });

      // Send Email
      await sendQRMail(email, name, qrImage);

      return res.json({
        success: true,
        qrImage,
        registrationId: registrationRef.id,
        qrId
      });
    } catch (err) {
      console.error("Create Registration Error:", err);
      res.status(500).json({ error: "Server error" });
    }
  });
});

/**
 * Endpoint: POST /scanQR
 */
exports.scanQR = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { qrId, eventId, scannedBy } = req.body;
      const result = await validateQR(qrId, eventId, scannedBy || "volunteer");
      return res.json(result);
    } catch (err) {
      console.error("Scan QR Error:", err);
      res.status(500).json({ error: "Scan failed" });
    }
  });
});

/**
 * Endpoint: POST /createPaymentOrder
 */
exports.createPaymentOrder = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { amount } = req.body;
      const order = await createOrder(amount);
      return res.json(order);
    } catch (err) {
      res.status(500).json({ error: "Order creation failed" });
    }
  });
});

/**
 * Endpoint: POST /verifyPayment
 * Verifies signature and increments Revenue counter.
 */
exports.verifyPayment = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const {
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
        registrationId,
        eventId,
        amount
      } = req.body;

      const secret = process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET"; 
      const body = razorpay_order_id + "|" + razorpay_payment_id;
      const expectedSignature = crypto.createHmac("sha256", secret).update(body.toString()).digest("hex");

      if (expectedSignature === razorpay_signature) {
        // Update Registration
        await db.collection("registrations").doc(registrationId).update({
          paymentStatus: "paid"
        });

        // 🔥 Real-time Counter: Increment Revenue
        if (eventId && amount) {
          await db.collection("events").doc(eventId).update({
            totalRevenue: admin.firestore.FieldValue.increment(amount)
          });
        }

        return res.json({ success: true });
      } else {
        return res.status(400).json({ error: "Invalid signature" });
      }
    } catch (err) {
      res.status(500).json({ error: "Verification failed" });
    }
  });
});

/**
 * Analytics Endpoints
 */
exports.getEventAnalytics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { eventId } = req.query;
      const result = await getEventAnalytics(eventId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

exports.getDailyRegistrations = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { eventId } = req.query;
      const result = await getDailyRegistrations(eventId);
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

exports.getGlobalAnalytics = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const result = await getGlobalAnalytics();
      res.json(result);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
});

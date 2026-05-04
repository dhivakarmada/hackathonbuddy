const Razorpay = require("razorpay");

// In production, use environment variables
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || "YOUR_KEY_ID",
  key_secret: process.env.RAZORPAY_KEY_SECRET || "YOUR_KEY_SECRET",
});

/**
 * Creates a Razorpay order.
 * @param {number} amount - Amount in INR.
 * @returns {Promise} - Razorpay order object.
 */
const createOrder = async (amount) => {
  return await razorpay.orders.create({
    amount: amount * 100, // INR to paise
    currency: "INR",
  });
};

module.exports = { createOrder };

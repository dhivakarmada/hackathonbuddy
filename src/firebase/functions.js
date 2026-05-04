const BASE_URL = 'https://us-central1-hackathon-buddy-a7413.cloudfunctions.net';

export const callFunction = async (name, body = {}) => {
  try {
    const response = await fetch(`${BASE_URL}/${name}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Request failed');
    }

    return await response.json();
  } catch (error) {
    console.error(`Cloud Function Error (${name}):`, error);
    throw error;
  }
};

// --- Specific Function Wrappers ---

export const scanQR = (qrId, eventId, scannedBy) => 
  callFunction('scanQR', { qrId, eventId, scannedBy });

export const createPaymentOrder = (amount) => 
  callFunction('createPaymentOrder', { amount });

export const verifyPayment = (paymentData) => 
  callFunction('verifyPayment', paymentData);

export const createRegistration = (regData) => 
  callFunction('createRegistration', regData);

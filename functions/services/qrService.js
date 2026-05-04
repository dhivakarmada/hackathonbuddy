const { v4: uuidv4 } = require("uuid");
const QRCode = require("qrcode");

const generateQR = async (registrationId, eventId) => {
  const qrId = uuidv4();
  const secureToken = uuidv4();

  const payload = {
    qrId,
    registrationId,
    eventId,
    token: secureToken,
  };

  const qrString = JSON.stringify(payload);

  // Generates a base64 Data URL for the QR image
  const qrImage = await QRCode.toDataURL(qrString);

  return {
    qrId,
    secureToken,
    qrImage,
  };
};

module.exports = { generateQR };

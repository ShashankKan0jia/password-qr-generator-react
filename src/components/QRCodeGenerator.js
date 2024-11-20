import React, { useState } from "react";

function QRCodeGenerator() {
  const [qrCode, setQRCode] = useState("");

  const handleGenerateQR = () => {
    const inputText =
      document.getElementById("result").innerText.trim() ||
      document.getElementById("customInput").value.trim();
    if (!inputText) {
      alert("Please generate a password or enter custom data!");
      return;
    }

    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
      inputText
    )}`;
    setQRCode(qrUrl);
  };

  return (
    <div>
      <input type="text" id="customInput" placeholder="Enter Custom Data" />
      <button className="btn btn-large" onClick={handleGenerateQR}>
        Generate QR Code
      </button>
      <div className="qr-display">
        {qrCode && <img src={qrCode} alt="QR Code" />}
      </div>
    </div>
  );
}

export default QRCodeGenerator;

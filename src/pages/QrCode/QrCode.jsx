import React from 'react';
import './QrCode.css';

const QrCode = () => {
  return (
    <>
    <div className="qr-container">
      <h1>QR Code</h1>
      <p>Escaneie o QR Code abaixo para acessar.</p>
      <div className="qr-box">
        <img src="URL_DO_QR_CODE_AQUI" alt="QR Code" />
      </div>
    </div>
  </>
  );
};
export default QrCode;

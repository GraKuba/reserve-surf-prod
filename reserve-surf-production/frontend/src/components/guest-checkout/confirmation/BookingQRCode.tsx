import React from 'react';

interface BookingQRCodeProps {
  bookingCode: string;
}

const BookingQRCode: React.FC<BookingQRCodeProps> = ({ bookingCode }) => {
  // This is a placeholder QR code implementation
  // In production, use a library like qrcode.js or react-qr-code
  const qrDataUrl = `data:image/svg+xml;base64,${btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
      <rect width="200" height="200" fill="white"/>
      <g fill="black">
        ${Array.from({ length: 10 }, (_, i) => 
          Array.from({ length: 10 }, (_, j) => 
            Math.random() > 0.5 
              ? `<rect x="${j * 20}" y="${i * 20}" width="20" height="20"/>`
              : ''
          ).join('')
        ).join('')}
      </g>
      <text x="100" y="190" text-anchor="middle" font-size="12" font-family="monospace">
        ${bookingCode}
      </text>
    </svg>
  `)}`;

  return (
    <div className="flex justify-center">
      <div className="bg-white p-4 rounded-lg shadow-inner">
        <img 
          src={qrDataUrl} 
          alt={`QR Code for booking ${bookingCode}`}
          className="w-48 h-48"
        />
      </div>
    </div>
  );
};

export default BookingQRCode;
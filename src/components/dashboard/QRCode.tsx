import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { MapPin } from 'lucide-react';
import { Button } from '../ui/Button';
import { Location } from '../../types';

interface QRCodeProps {
  location: Location;
  businessName: string;
}

export const QRCode: React.FC<QRCodeProps> = ({ location, businessName }) => {
  const downloadQRCode = () => {
    const svg = document.getElementById(`qr-${location.id}`);
    if (svg) {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      const svgData = new XMLSerializer().serializeToString(svg);
      const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      const url = URL.createObjectURL(svgBlob);
      
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height + 60;
        
        if (ctx) {
          ctx.fillStyle = 'white';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          ctx.fillStyle = '#1e3a8a';
          ctx.font = 'bold 16px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(location.name, canvas.width / 2, canvas.height - 30);
          
          const pngUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = pngUrl;
          downloadLink.download = `${businessName}-${location.name}-qr-code.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      };
      
      img.src = url;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-center mb-4">
        <MapPin className="h-5 w-5 text-blue-600 mr-2" />
        <h4 className="text-lg font-medium text-gray-900">{location.name}</h4>
      </div>
      
      <div className="flex flex-col items-center space-y-4">
        <div className="p-4 bg-white rounded-lg shadow-sm border border-gray-100">
          <QRCodeSVG
            id={`qr-${location.id}`}
            value={location.reviewLink}
            size={200}
            level="H"
            includeMargin
          />
        </div>
        
        <div className="text-center w-full">
          <p className="text-sm text-gray-600 mb-4">{location.address}</p>
          <Button 
            onClick={downloadQRCode}
            className="w-full"
          >
            Download QR Code
          </Button>
        </div>
      </div>
    </div>
  );
};
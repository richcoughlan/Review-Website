import React from 'react';
import { useBusinessStore } from '../../store/businessStore';
import { QRCode } from './QRCode';

export const QRCodeSection = () => {
  const { businesses } = useBusinessStore();
  const business = businesses[0];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-6">Review QR Codes</h3>
      <p className="text-sm text-gray-600 mb-6">
        Print and display these QR codes at each location to encourage customer reviews
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        {business.locations.map((location) => (
          <QRCode
            key={location.id}
            location={location}
            businessName={business.name}
          />
        ))}
      </div>
    </div>
  );
};
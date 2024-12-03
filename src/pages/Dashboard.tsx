import React from 'react';
import { DashboardLayout } from '../components/dashboard/DashboardLayout';
import { BusinessStats } from '../components/dashboard/BusinessStats';
import { ReviewsList } from '../components/dashboard/ReviewsList';
import { QRCodeSection } from '../components/dashboard/QRCodeSection';
import { BusinessSettings } from '../components/dashboard/BusinessSettings';

export const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <BusinessStats />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <div className="space-y-6">
              <BusinessSettings />
              <ReviewsList />
            </div>
          </div>
          <div>
            <QRCodeSection />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
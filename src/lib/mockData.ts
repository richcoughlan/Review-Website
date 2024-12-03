import { User, Business, Review } from '../types';

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'demo@example.com',
    name: 'Pain Medicine Consultants',
    role: 'business'
  }
];

// Mock Businesses
export const mockBusinesses: Business[] = [
  {
    id: '1',
    ownerId: '1',
    name: 'Pain Medicine Consultants',
    subscription: 'professional',
    locations: [
      {
        id: '1',
        businessId: '1',
        name: 'Pleasant Hill',
        address: '123 Medical Plaza Dr, Pleasant Hill, CA',
        googlePlaceId: 'CfHqk_iebfcjEAE',
        reviewLink: 'https://g.page/r/CfHqk_iebfcjEAE/review',
        qrCode: 'data:image/png;base64,demo-qr-code'
      },
      {
        id: '2',
        businessId: '1',
        name: 'Walnut Creek',
        address: '456 Oak Grove Rd, Walnut Creek, CA',
        googlePlaceId: 'sample_id_2',
        reviewLink: 'https://g.page/r/sample_id_2/review',
        qrCode: 'data:image/png;base64,demo-qr-code'
      },
      {
        id: '3',
        businessId: '1',
        name: 'Concord',
        address: '789 Willow Pass Rd, Concord, CA',
        googlePlaceId: 'sample_id_3',
        reviewLink: 'https://g.page/r/sample_id_3/review',
        qrCode: 'data:image/png;base64,demo-qr-code'
      }
    ]
  }
];

// Mock Reviews
export const mockReviews: Review[] = [
  {
    id: '1',
    businessId: '1',
    locationId: '1',
    type: 'positive',
    customerEmail: 'customer@example.com',
    createdAt: new Date('2024-03-10'),
    mailingListOptIn: true,
    discountCodeSent: false
  },
  {
    id: '2',
    businessId: '1',
    locationId: '1',
    type: 'negative',
    feedback: 'Wait time was longer than expected',
    customerEmail: 'feedback@example.com',
    createdAt: new Date('2024-03-09'),
    mailingListOptIn: false
  },
  {
    id: '3',
    businessId: '1',
    locationId: '2',
    type: 'positive',
    customerEmail: 'john@example.com',
    createdAt: new Date('2024-03-08'),
    mailingListOptIn: true,
    discountCodeSent: true
  }
];
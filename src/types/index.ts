export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'business';
}

export interface Location {
  id: string;
  businessId: string;
  name: string;
  address: string;
  googlePlaceId: string;
  reviewLink: string;
  qrCode: string;
}

export interface Business {
  id: string;
  ownerId: string;
  name: string;
  subscription: 'basic' | 'professional' | 'enterprise';
  locations: Location[];
}

export interface Review {
  id: string;
  businessId: string;
  locationId: string;
  type: 'positive' | 'negative';
  feedback?: string;
  customerEmail?: string;
  createdAt: Date;
  mailingListOptIn?: boolean;
  discountCodeSent?: boolean;
}
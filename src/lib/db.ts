import { collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Business, Location, Review } from '../types';

export const createBusiness = async (userId: string, business: Omit<Business, 'id'>) => {
  const businessRef = doc(collection(db, 'businesses'));
  const businessData = {
    ...business,
    id: businessRef.id,
    createdAt: new Date().toISOString()
  };
  
  await setDoc(businessRef, businessData);
  return businessData;
};

export const getBusinessesByUser = async (userId: string) => {
  const q = query(collection(db, 'businesses'), where('ownerId', '==', userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Business[];
};

export const updateLocation = async (businessId: string, location: Location) => {
  const businessRef = doc(db, 'businesses', businessId);
  const businessDoc = await getDoc(businessRef);
  
  if (!businessDoc.exists()) {
    throw new Error('Business not found');
  }
  
  const business = businessDoc.data() as Business;
  const updatedLocations = business.locations.map(loc => 
    loc.id === location.id ? location : loc
  );
  
  await updateDoc(businessRef, { locations: updatedLocations });
};

export const addLocation = async (businessId: string, location: Omit<Location, 'id'>) => {
  const businessRef = doc(db, 'businesses', businessId);
  const businessDoc = await getDoc(businessRef);
  
  if (!businessDoc.exists()) {
    throw new Error('Business not found');
  }
  
  const business = businessDoc.data() as Business;
  const newLocation = {
    ...location,
    id: Date.now().toString(),
  };
  
  await updateDoc(businessRef, {
    locations: [...business.locations, newLocation]
  });
  
  return newLocation;
};

export const createReview = async (review: Omit<Review, 'id'>) => {
  const reviewRef = doc(collection(db, 'reviews'));
  const reviewData = {
    ...review,
    id: reviewRef.id,
    createdAt: new Date().toISOString()
  };
  
  await setDoc(reviewRef, reviewData);
  return reviewData;
};

export const getReviewsByBusiness = async (businessId: string) => {
  const q = query(collection(db, 'reviews'), where('businessId', '==', businessId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ 
    ...doc.data(),
    createdAt: new Date(doc.data().createdAt)
  })) as Review[];
};

export const updateReview = async (reviewId: string, data: Partial<Review>) => {
  const reviewRef = doc(db, 'reviews', reviewId);
  await updateDoc(reviewRef, data);
};
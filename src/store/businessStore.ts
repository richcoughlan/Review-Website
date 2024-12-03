import { create } from 'zustand';
import { Business, Review } from '../types';
import { getBusinessesByUser, getReviewsByBusiness } from '../lib/db';

interface BusinessState {
  businesses: Business[];
  reviews: Review[];
  loading: boolean;
  setBusinesses: (businesses: Business[]) => void;
  setReviews: (reviews: Review[]) => void;
  loadBusinessData: (userId: string) => Promise<void>;
  addBusiness: (business: Business) => void;
  addReview: (review: Review) => void;
  updateReview: (reviewId: string, updates: Partial<Review>) => void;
}

export const useBusinessStore = create<BusinessState>((set, get) => ({
  businesses: [],
  reviews: [],
  loading: false,
  setBusinesses: (businesses) => set({ businesses }),
  setReviews: (reviews) => set({ reviews }),
  loadBusinessData: async (userId: string) => {
    set({ loading: true });
    try {
      const businesses = await getBusinessesByUser(userId);
      set({ businesses });
      
      if (businesses.length > 0) {
        const reviews = await getReviewsByBusiness(businesses[0].id);
        set({ reviews });
      }
    } catch (error) {
      console.error('Error loading business data:', error);
    } finally {
      set({ loading: false });
    }
  },
  addBusiness: (business) => set((state) => ({ 
    businesses: [...state.businesses, business] 
  })),
  addReview: (review) => set((state) => ({ 
    reviews: [...state.reviews, review] 
  })),
  updateReview: (reviewId, updates) => set((state) => ({
    reviews: state.reviews.map(review =>
      review.id === reviewId ? { ...review, ...updates } : review
    )
  }))
}));
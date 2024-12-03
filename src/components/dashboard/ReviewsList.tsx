import React from 'react';
import { useBusinessStore } from '../../store/businessStore';
import { ThumbsUp, ThumbsDown, Mail } from 'lucide-react';
import { Button } from '../ui/Button';
import { toast } from 'sonner';

export const ReviewsList = () => {
  const { reviews, setReviews } = useBusinessStore();

  const handleSendDiscount = async (reviewId: string, customerEmail?: string) => {
    if (!customerEmail) {
      toast.error('No email address available');
      return;
    }

    try {
      // In a real app, this would call an API to send the email
      // For now, we'll just mark it as sent
      const updatedReviews = reviews.map(review =>
        review.id === reviewId
          ? { ...review, discountCodeSent: true }
          : review
      );
      setReviews(updatedReviews);
      toast.success('Discount code sent successfully!');
    } catch (error) {
      toast.error('Failed to send discount code');
    }
  };

  return (
    <div className="bg-white shadow rounded-lg">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Reviews</h3>
      </div>
      <div className="border-t border-gray-200">
        <ul role="list" className="divide-y divide-gray-200">
          {reviews.map((review) => (
            <li key={review.id} className="px-4 py-4 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {review.type === 'positive' ? (
                    <ThumbsUp className="h-5 w-5 text-green-600" />
                  ) : (
                    <ThumbsDown className="h-5 w-5 text-orange-600" />
                  )}
                  <p className="ml-2 text-sm text-gray-500">
                    {review.customerEmail || 'Anonymous'}
                  </p>
                  {review.mailingListOptIn && (
                    <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      Mailing List
                    </span>
                  )}
                </div>
                <time className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </time>
              </div>
              {review.feedback && (
                <p className="mt-2 text-sm text-gray-700">{review.feedback}</p>
              )}
              {review.mailingListOptIn && !review.discountCodeSent && (
                <div className="mt-2 flex justify-end">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleSendDiscount(review.id, review.customerEmail)}
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Send Discount Code
                  </Button>
                </div>
              )}
              {review.discountCodeSent && (
                <p className="mt-2 text-sm text-green-600">
                  Discount code sent ✓
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
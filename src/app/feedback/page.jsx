'use client';

import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import ReviewForm from '@/components/reviews/Form.jsx';
import { ReviewFormSkeleton } from '@/components/reviews/Card.jsx';
import { useReviews, useReviewSubmission } from '@/hooks/useReviews.js';

export default function FeedbackSubmittedPage() {
  const router = useRouter();
  const { isSignedIn, isLoaded, userId } = useAuth();
  const { addNewReview, updateReview } = useReviews();
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { hasSubmitted, isCheckingStatus } = useReviewSubmission();

  const handleClose = () => {
    setIsFormOpen(false);
    hasSubmitted ? router.back() : router.push('/');
  };

  useEffect(() => {
    if (!isLoaded || isCheckingStatus) return;

    if (!isSignedIn) {
      toast.error('Please sign in to submit a review');
      router.back();
    } else {
      setIsFormOpen(true);
    }
  }, [isLoaded, isCheckingStatus, isSignedIn, router]);

  if (!isLoaded || isCheckingStatus) {
    return <ReviewFormSkeleton isOpen={true} onClose={handleClose} />;
  }

  const handleSuccess = (reviewData, isNew) => {
    if (isNew) {
      addNewReview(reviewData);
      toast.success('Thank you for sharing your experience!');
    } else {
      updateReview(reviewData);
      toast.success('Your review has been updated successfully!');
    }
  };

  return <ReviewForm isOpen={isFormOpen} onClose={handleClose} onSuccess={handleSuccess} />;
}

import { toast } from 'sonner';
import { useAuth } from '@clerk/nextjs';
import ReviewsInfo from '@/data/reviews.json';
import { useState, useEffect, useCallback } from 'react';

/* ──────────────────────────────────────────────── Fetch and Manage Reviews */
// Load reviews from MongoDB and show default reviews as fallback
export function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showingDefaults, setShowingDefaults] = useState(false);

  // ─── Load default reviews first, then fetch from MongoDB
  useEffect(() => {
    const styleTimer = setTimeout(() => {
      setReviews(ReviewsInfo.defaultReviews);
      setShowingDefaults(true);
      setLoading(false);

      fetchReviews();
    }, 100);

    return () => clearTimeout(styleTimer);
  }, []);

  // ─── Fetch reviews from MongoDB API
  const fetchReviews = async () => {
    try {
      const response = await fetch('/api/reviews');
      const result = await response.json();

      if (result.success && result.data.length > 0) {
        // ─── Combine MongoDB reviews with default reviews
        const combinedReviews = [...result.data, ...ReviewsInfo.defaultReviews];
        setReviews(combinedReviews);
        setShowingDefaults(false);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  // ─── Get a limited number of recent reviews
  const getLatestReviews = (count = 9) => {
    return reviews.slice(0, count);
  };

  // ─── Add a new review to the beginning of the list
  const addNewReview = (newReview) => {
    setReviews((prevReviews) => [newReview, ...prevReviews]);
  };

  // ─── Update an existing review by ID or userId
  const updateReview = (updatedReview) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review._id === updatedReview._id || review.userId === updatedReview.userId ? updatedReview : review
      )
    );
  };

  return {
    reviews,
    loading,
    showingDefaults,
    getLatestReviews,
    refetch: fetchReviews,
    addNewReview,
    updateReview,
  };
}

/* ──────────────────────────────────────────────── Submit and Manage User Reviews */
// Handle user review submission, editing, and status checking
export function useReviewSubmission() {
  const [isCheckingStatus, setIsCheckingStatus] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userReview, setUserReview] = useState(null);
  const { isSignedIn, userId } = useAuth();

  // ─── Check if the current user has already submitted a review
  const checkUserReviewStatus = useCallback(async () => {
    if (!userId) return;

    setIsCheckingStatus(true);

    try {
      const response = await fetch(`/api/reviews/${userId}`);
      const result = await response.json();

      if (result.success) {
        setHasSubmitted(true);
        setUserReview(result.data);
      } else {
        setHasSubmitted(false);
        setUserReview(null);
      }
    } catch (error) {
      console.error('Error checking review status:', error);
    } finally {
      setIsCheckingStatus(false);
    }
  }, [userId]);

  // ─── Check if user has submitted a review when they sign in
  useEffect(() => {
    if (isSignedIn && userId) {
      checkUserReviewStatus();
    }
  }, [isSignedIn, userId, checkUserReviewStatus]);

  // ─── Submit a new review or update an existing one
  const submitReview = async (reviewData) => {
    if (!isSignedIn || !userId) {
      toast.error('Please sign in to submit a review');
      return { success: false, error: 'Authentication required' };
    }

    setIsSubmitting(true);

    try {
      // ─── Use PUT for updates, POST for new reviews
      const method = hasSubmitted ? 'PUT' : 'POST';
      const url = hasSubmitted ? `/api/reviews/${userId}` : '/api/reviews';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      });

      const result = await response.json();

      if (result.success) {
        setUserReview(result.data);
        if (!hasSubmitted) {
          setHasSubmitted(true);
        }
        return { success: true, data: result.data, isNew: !hasSubmitted };
      } else {
        toast.error(result.error || 'Failed to submit review');
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error('Failed to submit review');
      return { success: false, error: 'Failed to submit review' };
    } finally {
      setIsSubmitting(false);
    }
  };

  // ─── Fetch the current user's review from the API
  const getUserReview = async () => {
    if (!userId) return null;

    setIsCheckingStatus(true);

    try {
      const response = await fetch(`/api/reviews/${userId}`);
      const result = await response.json();

      if (result.success) {
        return result.data;
      }
    } catch (error) {
      console.error('Error fetching user review:', error);
    } finally {
      setIsCheckingStatus(false);
    }
    return null;
  };

  return {
    isSubmitting,
    hasSubmitted,
    userReview,
    isCheckingStatus,
    submitReview,
    getUserReview,
    checkUserReviewStatus,
  };
}

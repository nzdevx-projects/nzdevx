'use client';

import { useAuth } from '@clerk/nextjs';
import { X, Loader } from 'lucide-react';
import { useState, useEffect } from 'react';
import ReviewsInfo from '@/data/reviews.json';
import { useReviewSubmission } from '@/hooks/useReviews.js';
import { StarRating, FeedbackSelect, ProfileImageInput } from './SmallUI.jsx';
import { REVIEW_VALIDATION_RULES, validateReviewField, validateReviewData } from '@/lib/validations.js';

// ──────────────────────────────────────────────── Review Form Modal Component */
// Modal form for users to submit or edit their reviews with validation.
export default function ReviewForm({ isOpen, onClose, onSuccess }) {
  const { isSubmitting, hasSubmitted, submitReview, getUserReview } = useReviewSubmission();
  const { isSignedIn, user } = useAuth();

  // ─── Form data state: stores all form field values
  const [formData, setFormData] = useState({ image: '', name: '', profession: '', feedback: '', rating: 0 });

  // ─── Validation state: stores error messages for each field
  const [errors, setErrors] = useState({ name: '', feedback: '', rating: '' });

  // ─── Character count state: tracks current length of text fields
  const [charCounts, setCharCounts] = useState({ name: 0, profession: 0, feedback: 0 });

  // ─── Field interaction tracking: marks which fields user has interacted with
  const [touched, setTouched] = useState({ name: false, feedback: false, rating: false });

  // ─── Editing state: determines if user is editing existing review or creating new one
  const [isEditing, setIsEditing] = useState(false);

  // ──────────────────────────────────────────────── Handle text input changes
  // Updates form data, character count, and validates field on every keystroke
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setCharCounts((prev) => ({ ...prev, [name]: value.length }));
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateReviewField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  // ──────────────────────────────────────────────── Handle rating selection
  // Updates rating value and validates it
  const handleRatingChange = (newRating) => {
    setFormData((prev) => ({ ...prev, rating: newRating }));
    setTouched((prev) => ({ ...prev, rating: true }));
    const error = validateReviewField('rating', newRating);
    setErrors((prev) => ({ ...prev, rating: error }));
  };

  // ──────────────────────────────────────────────── Validate if a URL is valid or not
  // Allows data URLs (like images encoded as base64) and ui-avatars.com links
  const isValidUrl = (urlString) => {
    if (!urlString) return false;
    try {
      if (urlString.startsWith('data:')) return true;
      if (urlString.includes('ui-avatars.com')) return true;
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // ──────────────────────────────────────────────── Reset form to initial state
  // Clears all form fields, errors, character counts, and editing state
  const resetForm = () => {
    setFormData({ image: '', name: '', profession: '', feedback: '', rating: 0 });
    setErrors({ name: '', feedback: '', rating: '' });
    setCharCounts({ name: 0, profession: 0, feedback: 0 });
    setTouched({ name: false, feedback: false, rating: false });
    setIsEditing(false);
  };

  // ──────────────────────────────────────────────── Load existing review data
  // Fetches and populates form with user's existing review for editing
  const loadExistingReview = async () => {
    try {
      const existingReview = await getUserReview();

      if (existingReview) {
        setFormData({
          image: existingReview.image || '',
          name: existingReview.name || '',
          profession: existingReview.profession || '',
          feedback: existingReview.feedback || '',
          rating: existingReview.rating || 5,
        });

        setCharCounts({
          name: existingReview.name?.length || 0,
          profession: existingReview.profession?.length || 0,
          feedback: existingReview.feedback?.length || 0,
        });

        setIsEditing(true);
      }
    } catch (error) {
      console.error('Error loading existing review:', error);
    }
  };

  // ──────────────────────────────────────────────── Handle modal open/close logic
  // Loads existing review data or resets form when modal opens
  useEffect(() => {
    if (!isOpen) return;

    if (!isSignedIn) {
      onClose();
      return;
    }

    if (user && !hasSubmitted) {
      setFormData((prev) => ({ ...prev, name: prev.name }));
      setCharCounts((prev) => ({ ...prev, name: prev.name.length }));
    }

    if (hasSubmitted) {
      loadExistingReview();
    } else {
      resetForm();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, hasSubmitted, isSignedIn, user]);

  // ──────────────────────────────────────────────── Submit review form
  // Validates all fields and submits review data to the server
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mark all fields as touched to show validation errors
    setTouched({ name: true, feedback: true, rating: true });

    // Prepare submission data with proper image handling
    const submissionData = { ...formData };

    // If image is empty or invalid, use default avatar
    if (!submissionData.image || !isValidUrl(submissionData.image)) {
      const defaultAvatar = `https://ui-avatars.com/api/?name=${encodeURIComponent(
        formData.name || 'User'
      )}&background=random`;
      submissionData.image = defaultAvatar;
    }

    // Validate all form fields
    const validationErrors = validateReviewData(submissionData);

    // Update error states
    setErrors(validationErrors);

    // Stop if there are validation errors
    if (Object.keys(validationErrors).length > 0) return;

    // Send review to server
    const result = await submitReview(submissionData);
    if (result.success) {
      onSuccess(result.data, result.isNew);
      onClose();
      resetForm();
    }
  };

  // ──────────────────────────────────────────────── Handle feedback template selection
  // Populates feedback field with pre-written template
  const handleFeedbackSelect = (feedback) => {
    setFormData((prev) => ({ ...prev, feedback }));
    setCharCounts((prev) => ({ ...prev, feedback: feedback.length }));
    setTouched((prev) => ({ ...prev, feedback: true }));
    const error = validateReviewField('feedback', feedback);
    setErrors((prev) => ({ ...prev, feedback: error }));
  };

  // ─── Don't render modal if it's closed
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-primary flex-center z-50 p-4">
      <div className="bg-secondary rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-primary">
        {/* ─── Modal Header */}
        <div className="mb-7 flex items-start justify-between">
          <h2 className="text-xl sm:text-2xl text-gradient-1">
            {isEditing ? 'Update Your Experience' : 'Share Your Experience'}
          </h2>

          <button onClick={onClose} className="flex-center size-7 rounded-full bg-secondary-card shadow group">
            <X strokeWidth={3} size={16} className="group-hover:rotate-90 transition-transform duration-200" />
          </button>
        </div>

        {/* ─── Review Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* ─── Profile Image Upload */}
            <div>
              <ProfileImageInput
                value={formData.image}
                onChange={(image) => setFormData((prev) => ({ ...prev, image }))}
                name={formData.name}
              />
            </div>

            {/* ─── Name Field (Required) */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  placeholder="Your Name (Required)"
                  onChange={handleInputChange}
                  className="input-field p-3 pr-16"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  {charCounts.name}/{REVIEW_VALIDATION_RULES.name.maxLength}
                </div>
              </div>
              {(touched.name || errors.name) && errors.name && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors.name}</p>
              )}
            </div>

            {/* ─── Profession Field (Optional) */}
            <div>
              <div className="relative">
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  placeholder="Your Profession (Optional)"
                  onChange={handleInputChange}
                  className="input-field p-3 pr-16"
                />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-500">
                  {charCounts.profession}/{REVIEW_VALIDATION_RULES.profession.maxLength}
                </div>
              </div>
            </div>

            {/* ─── Rating Field (Required) */}
            <div>
              <div className="w-full gap-y-3 gap-x-6 p-3 shadow bg-primary flex flex-wrap items-center rounded-md font-semibold">
                <label className="flex gap-1">
                  {formData.rating > 0 ? (
                    <span className="text-base font-semibold flex gap-1">
                      Rating <em className="text-yellow-500">{formData.rating}</em> star
                      {formData.rating > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="font-semibold text-gray-400 dark:text-gray-500">Rating (Required)</span>
                  )}
                </label>
                <StarRating rating={formData.rating} onRatingChange={handleRatingChange} readonly={false} />
              </div>

              {(touched.rating || errors.rating) && errors.rating && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors.rating}</p>
              )}
            </div>

            {/* ─── Feedback Field (Required) */}
            <div>
              <div className="relative">
                <textarea
                  name="feedback"
                  value={formData.feedback}
                  placeholder="Your Feedback (Required)"
                  onChange={handleInputChange}
                  className="min-h-32 input-field p-3 pr-16"
                />
                <div className="absolute right-3 bottom-3 text-xs text-gray-500">
                  {charCounts.feedback}/{REVIEW_VALIDATION_RULES.feedback.maxLength}
                </div>
              </div>

              {/* ─── Quick Feedback Template Options */}
              <div className="mt-3">
                <FeedbackSelect
                  value={formData.feedback}
                  onChange={handleFeedbackSelect}
                  placeholder="Select a feedback template"
                  options={ReviewsInfo.defaultFeedbacks}
                />
              </div>

              {/* ─── Error Message Display */}
              {(touched.feedback || errors.feedback) && errors.feedback && (
                <p className="text-red-500 text-sm mt-2 ml-1">{errors.feedback}</p>
              )}
            </div>
          </div>

          {/* ─── Action Buttons */}
          <div className="flex flex-wrap gap-4 pt-4">
            <button onClick={onClose} className="btn-secondary px-4.5 py-3.5 text-sm 3xl:!text-[15px]">
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary px-4.5 py-3.5 text-sm 3xl:!text-[15px] flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin size-4 mr-2" />
                  {isEditing ? 'Updating...' : 'Submitting...'}
                </>
              ) : isEditing ? (
                'Update Review'
              ) : (
                'Submit Review'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

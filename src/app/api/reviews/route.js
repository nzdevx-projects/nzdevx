import { connectDB } from '@/lib/db.js';
import Review from '@/models/Review.js';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { validateReviewData } from '@/lib/validations.js';

/* ──────────────────────────────────────────────── Check User Review Status */
// Check if a user has already submitted a review using their user ID
async function hasUserSubmittedReview(userId) {
  try {
    await connectDB();
    const existingReview = await Review.findOne({ userId });
    return existingReview !== null;
  } catch (error) {
    console.error('Error checking review submission status:', error);
    return false;
  }
}

/* ──────────────────────────────────────────────── GET - Fetch All Reviews */
// Get all reviews from the database, sorted by newest first (public access)
export async function GET() {
  try {
    await connectDB();
    const reviews = await Review.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: reviews });
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch reviews' }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────── POST - Create New Review */
// Create a new review (requires user to be logged in)
export async function POST(request) {
  try {
    // ─── Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    // ─── Get review data from request
    const { image, name, profession, feedback, rating } = await request.json();

    // ─── Validate the review data
    const reviewData = { image, name, profession, feedback, rating };
    const validationErrors = validateReviewData(reviewData);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({ success: false, error: 'Validation failed', validationErrors }, { status: 400 });
    }

    await connectDB();

    // ─── Check if user already submitted a review (prevent duplicates)
    const hasSubmitted = await hasUserSubmittedReview(userId);
    if (hasSubmitted) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted a review. Thank You!' },
        { status: 400 }
      );
    }

    // ─── Create and save the new review to database
    const newReview = new Review({
      userId,
      image,
      name,
      profession: profession || 'Professional User',
      feedback,
      rating,
    });
    await newReview.save();

    return NextResponse.json({ success: true, data: newReview }, { status: 201 });
  } catch (error) {
    console.error('Error creating review:', error);

    // ─── Handle validation errors from database
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) validationErrors[field] = error.errors[field].message;
      return NextResponse.json({ success: false, error: 'Validation failed', validationErrors }, { status: 400 });
    }

    // ─── Handle duplicate review error (MongoDB prevents same user from submitting twice)
    if (error.code === 11000 && error.keyValue?.userId) {
      return NextResponse.json(
        { success: false, error: 'You have already submitted a review. Thank You!' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: false, error: 'Failed to create review' }, { status: 500 });
  }
}

import { connectDB } from '@/lib/db.js';
import Review from '@/models/Review.js';
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { validateReviewData } from '@/lib/validations.js';

/* ──────────────────────────────────────────────── GET - Fetch User's Review */
// Get the logged-in user's own review (requires authentication)
export async function GET(request, { params }) {
  try {
    // ─── Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    await connectDB();

    // ─── Find and return the user's review
    const review = await Review.findOne({ userId });
    if (!review) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: review });
  } catch (error) {
    console.error('Error fetching review:', error);
    return NextResponse.json({ success: false, error: 'Failed to fetch review' }, { status: 500 });
  }
}

/* ──────────────────────────────────────────────── PUT - Update Existing Review */
// Update the logged-in user's existing review (requires authentication)
export async function PUT(request, { params }) {
  try {
    // ─── Check if user is authenticated
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ success: false, error: 'Authentication required' }, { status: 401 });
    }

    // ─── Get updated review data from request
    const { image, name, profession, feedback, rating } = await request.json();

    // ─── Validate the review data
    const reviewData = { image, name, profession, feedback, rating };
    const validationErrors = validateReviewData(reviewData);
    if (Object.keys(validationErrors).length > 0) {
      return NextResponse.json({ success: false, error: 'Validation failed', validationErrors }, { status: 400 });
    }

    await connectDB();

    // ─── Find and update the user's review in database
    const updatedReview = await Review.findOneAndUpdate(
      { userId },
      {
        name,
        profession: profession || 'Professional User',
        image,
        feedback,
        rating,
        updatedAt: new Date(),
      },
      { new: true }
    );

    if (!updatedReview) {
      return NextResponse.json({ success: false, error: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedReview });
  } catch (error) {
    console.error('Error updating review:', error);

    // ─── Handle validation errors from database
    if (error.name === 'ValidationError') {
      const validationErrors = {};
      for (const field in error.errors) validationErrors[field] = error.errors[field].message;
      return NextResponse.json({ success: false, error: 'Validation failed', validationErrors }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: 'Failed to update review' }, { status: 500 });
  }
}

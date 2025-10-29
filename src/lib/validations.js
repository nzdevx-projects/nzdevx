/* ──────────────────────────────────────────────── Review Validation Rules */
// Define all validation rules for review form fields (name, profession, feedback, rating, image)
export const REVIEW_VALIDATION_RULES = {
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
    message: {
      required: 'Name is required',
      minLength: 'Name must be at least 2 characters',
      maxLength: 'Name must be less than 50 characters',
    },
  },
  profession: {
    required: false,
    maxLength: 50,
    message: {
      maxLength: 'Profession must be less than 50 characters',
    },
  },
  feedback: {
    required: true,
    minLength: 10,
    maxLength: 500,
    message: {
      required: 'Feedback is required',
      minLength: 'Feedback must be at least 10 characters',
      maxLength: 'Feedback must be less than 500 characters',
    },
  },
  rating: {
    required: true,
    min: 1,
    max: 5,
    message: {
      required: 'Rating is required',
      min: 'Rating must be at least 1',
      max: 'Rating must be at most 5',
    },
  },
  image: {
    required: false,
    maxSize: 2 * 1024 * 1024, // 2MB
    allowedFormats: ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'],
    message: {
      maxSize: 'Image size must be less than 2MB',
      invalidFormat: 'Only JPEG, PNG, and WebP formats are allowed',
      invalidUrl: 'Please provide a valid image URL',
    },
  },
};

/* ──────────────────────────────────────────────── Validate Single Field */
// Check if one field follows its validation rules and return error message if invalid
export const validateReviewField = (fieldName, value) => {
  const rules = REVIEW_VALIDATION_RULES[fieldName];
  if (!rules) return '';

  // ─── Check if required field is empty
  if (rules.required && (!value || (typeof value === 'string' && !value.trim()))) {
    return rules.message.required;
  }

  // ─── Check minimum length for text fields
  if (typeof value === 'string' && rules.minLength && value.length < rules.minLength) {
    return rules.message.minLength;
  }

  // ─── Check maximum length for text fields
  if (typeof value === 'string' && rules.maxLength && value.length > rules.maxLength) {
    return rules.message.maxLength;
  }

  // ─── Check minimum value for number fields (e.g., rating)
  if (typeof value === 'number' && rules.min && value < rules.min) {
    return rules.message.min;
  }

  // ─── Check maximum value for number fields (e.g., rating)
  if (typeof value === 'number' && rules.max && value > rules.max) {
    return rules.message.max;
  }

  // ─── Validate image URL format
  if (fieldName === 'image' && value) {
    try {
      if (!value.startsWith('data:') && !value.includes('ui-avatars.com')) {
        new URL(value);
      }
    } catch (error) {
      return rules.message.invalidUrl;
    }
  }

  return '';
};

/* ──────────────────────────────────────────────── Validate All Review Data */
// Check all fields in the review form and return any error messages found
export const validateReviewData = (data) => {
  const errors = {};

  // ─── Validate each field and collect errors
  Object.keys(REVIEW_VALIDATION_RULES).forEach((field) => {
    const error = validateReviewField(field, data[field]);
    if (error) errors[field] = error;
  });

  return errors;
};

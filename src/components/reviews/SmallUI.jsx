'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';
import { useAuth, SignUpButton } from '@clerk/nextjs';
import { FaChevronDown, FaStar } from 'react-icons/fa';
import { useReviewSubmission } from '@/hooks/useReviews.js';
import { REVIEW_VALIDATION_RULES } from '@/lib/validations.js';

// ──────────────────────────────────────────────── Share Experience Button Component */
export default function ShareExperienceButton({ onReviewSubmitted, className = '' }) {
  const router = useRouter();
  const { isSignedIn, isLoaded } = useAuth();
  const { hasSubmitted, isCheckingStatus } = useReviewSubmission();

  // Base button classes
  const buttonClasses = `btn-primary ${className}`;

  // ─── Show single loading state for any loading condition
  if (!isLoaded || isCheckingStatus) {
    return (
      <button disabled className={`${buttonClasses} opacity-75 cursor-not-allowed`}>
        <span className="flex-center gap-2">
          <span className="animate-spin">↻</span>
          Loading Experience...
        </span>
      </button>
    );
  }

  // ─── If user is not signed in, show sign up button
  if (!isSignedIn) {
    return (
      <SignUpButton mode="modal" forceRedirectUrl="/feedback">
        <button className={buttonClasses}>Share Your Experience</button>
      </SignUpButton>
    );
  }

  // ─── If user is signed in, navigate to feedback page
  const handleClick = () => {
    router.push('/feedback');
  };

  return (
    <button onClick={handleClick} className={buttonClasses}>
      {hasSubmitted ? 'Update Your Experience' : 'Share Your Experience'}
    </button>
  );
}

// ──────────────────────────────────────────────── Star Rating Component */
export function StarRating({ rating, onRatingChange, readonly = false, size = 20 }) {
  const [hoveredRating, setHoveredRating] = useState(0);

  // ─── Update rating when star is clicked
  const handleStarClick = (starRating) => {
    if (!readonly && onRatingChange) onRatingChange(starRating);
  };

  // ─── Show preview when hovering over stars
  const handleStarHover = (starRating) => {
    if (!readonly) setHoveredRating(starRating);
  };

  // ─── Reset hover preview when mouse leaves
  const handleMouseLeave = () => {
    if (!readonly) setHoveredRating(0);
  };

  return (
    <div className="flex items-center gap-1" onMouseLeave={handleMouseLeave}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => handleStarHover(star)}
          className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
        >
          <FaStar
            size={size}
            className={`${
              star <= (hoveredRating || rating) ? 'text-yellow-500' : 'text-gray-300 dark:text-gray-600'
            } transition-colors`}
          />
        </button>
      ))}
    </div>
  );
}

// ──────────────────────────────────────────────── Feedback Select Component */
export function FeedbackSelect({ options, value, onChange, placeholder, label }) {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  // ─── Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // ─── Calculate content height for smooth animation
  useEffect(() => {
    if (dropdownRef.current) {
      setContentHeight(isOpen ? dropdownRef.current.scrollHeight : 0);
    }
  }, [isOpen]);

  // ─── Select an option and close dropdown
  const handleSelect = (feedback, event) => {
    // Prevent event bubbling that could close the parent form
    event.preventDefault();
    event.stopPropagation();

    onChange(feedback);
    setIsOpen(false);
  };

  // ─── Handle toggle button click
  const handleToggle = (event) => {
    // Prevent event bubbling
    event.preventDefault();
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  return (
    <div ref={containerRef} className="space-y-2">
      {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
      <div className="relative">
        {/* ─── Dropdown Toggle Button */}
        <button
          type="button"
          onClick={handleToggle}
          className={`input-field p-3 transition-300 flex items-center text-left justify-between
            ${isOpen ? 'ring-2 ring-cyan-600 dark:ring-cyan-400' : ''}`}
          aria-expanded={isOpen}
        >
          <span
            className={`w-[88%] sm:w-[93%] font-semibold line-clamp-1 ${
              value ? 'text-secondary' : 'text-gray-400 dark:text-gray-500'
            }`}
          >
            {value || placeholder}
          </span>
          <FaChevronDown
            className={`transition-transform duration-300 ease-in-out text-gray-400 dark:text-gray-500 
              ${isOpen ? 'rotate-180' : 'rotate-0'}`}
          />
        </button>

        {/* ─── Dropdown Options List */}
        <div
          className={`w-full absolute bottom-full mb-3 z-10 overflow-hidden bg-primary rounded-md ring-2 ring-cyan-600 dark:ring-cyan-400 transition-500
            ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          style={{ height: isOpen ? `${Math.min(contentHeight, 240)}px` : '0px' }}
        >
          <div
            ref={dropdownRef}
            className={`max-h-60 space-y-3 p-2 shadow-xl overflow-y-auto transition-300
              ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}
            style={{
              transitionDelay: isOpen ? '150ms' : '0ms',
            }}
          >
            {options.map((option, index) => (
              <button
                key={index}
                type="button"
                onClick={(event) => handleSelect(option, event)}
                className="w-full p-2 text-left text-sm bg-primary-card rounded-md shadow border-secondary transition-300"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ──────────────────────────────────────────────── Profile Image Input Component */
export function ProfileImageInput({ value = '', onChange, name }) {
  const [urlInput, setUrlInput] = useState('');
  const [previewUrl, setPreviewUrl] = useState('');
  const [fileKey, setFileKey] = useState(Date.now());
  const [inputMethod, setInputMethod] = useState('upload');
  const [validationError, setValidationError] = useState('');

  // ─── Check if URL is valid
  const isValidUrl = (urlString) => {
    if (!urlString) return false;
    try {
      if (urlString.startsWith('data:')) return true;
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  // ─── Generate default avatar using ui-avatars service
  const getDefaultAvatar = (name) => {
    if (!name) return 'https://ui-avatars.com/api/?name=User&background=random';
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=random`;
  };

  // ─── Set up initial preview and input when component loads
  useEffect(() => {
    setUrlInput(value || '');

    if (value && isValidUrl(value)) {
      setPreviewUrl(value);
      setValidationError('');
    } else {
      setPreviewUrl(getDefaultAvatar(name));
      if (value && !isValidUrl(value)) {
        setValidationError('Invalid image URL');
      }
    }
  }, [value, name]);

  // ─── Handle file upload with size and format validation
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // ─── Check file size (max 2MB)
      if (file.size > REVIEW_VALIDATION_RULES.image.maxSize) {
        setValidationError(REVIEW_VALIDATION_RULES.image.message.maxSize);
        return;
      }

      // ─── Check file format (must be image)
      if (!REVIEW_VALIDATION_RULES.image.allowedFormats.includes(file.type)) {
        setValidationError(REVIEW_VALIDATION_RULES.image.message.invalidFormat);
        return;
      }

      // ─── Convert file to base64 and show preview
      setValidationError('');
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setPreviewUrl(result);
        setUrlInput('');
        onChange(result);
      };
      reader.readAsDataURL(file);
    }
  };

  // ─── Handle URL input and validate it
  const handleUrlChange = (e) => {
    const url = e.target.value || '';
    setUrlInput(url);
    setValidationError('');

    if (url === '') {
      setPreviewUrl(getDefaultAvatar(name));
      onChange('');
    } else if (isValidUrl(url)) {
      setPreviewUrl(url);
      onChange(url);
    } else {
      setValidationError('Invalid image URL (Using a default avatar)');
    }
  };

  // ─── Handle image loading errors and fallback to default avatar
  const handleImageError = () => {
    const defaultAvatar = getDefaultAvatar(name);
    setPreviewUrl(defaultAvatar);
    onChange(defaultAvatar);

    if (urlInput && !urlInput.includes('ui-avatars.com')) {
      setValidationError('Invalid image URL (Using a default avatar)');
    }
  };

  // ─── Clear image and reset to default avatar
  const handleClearImage = () => {
    const defaultAvatar = getDefaultAvatar(name);
    setUrlInput('');
    setPreviewUrl(defaultAvatar);
    onChange('');
    setFileKey(Date.now());
    setValidationError('');
  };

  // ─── Switch between upload and URL input methods
  const handleMethodChange = (method) => {
    setInputMethod(method);
    setValidationError('');
    if (method === 'upload') {
      setFileKey(Date.now());
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex items-end space-x-5">
        {/* ─── Image Preview */}
        <div className="flex-shrink-0">
          {previewUrl && isValidUrl(previewUrl) ? (
            <div className="relative w-20 h-20 rounded-xl overflow-hidden border-4 border-primary">
              <Image
                fill
                src={previewUrl}
                alt="Profile preview"
                className="object-cover"
                unoptimized={previewUrl.startsWith('data:') || previewUrl.includes('ui-avatars.com')}
                onError={handleImageError}
              />
            </div>
          ) : (
            <div className="w-20 h-18 rounded-xl flex-center border-4 border-primary">
              <span className="text-xs">No Image</span>
            </div>
          )}
        </div>

        {/* ─── Input Method Toggle Buttons */}
        <div className="flex space-x-5 mb-1">
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded-md ${
              inputMethod === 'upload' ? 'btn-primary translate-y-0 scale-100 cursor-not-allowed' : 'btn-secondary'
            }`}
            onClick={() => handleMethodChange('upload')}
          >
            Upload
          </button>
          <button
            type="button"
            className={`px-3 py-1 text-sm rounded-md ${
              inputMethod === 'url' ? 'btn-primary translate-y-0 scale-100 cursor-not-allowed' : 'btn-secondary'
            }`}
            onClick={() => handleMethodChange('url')}
          >
            URL
          </button>
        </div>
      </div>

      {/* ─── Input Fields (Upload or URL based on selected method) */}
      <div>
        {inputMethod === 'upload' ? (
          <div>
            <input
              key={fileKey}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="input-field p-3 cursor-pointer"
            />
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type="url"
              value={urlInput}
              placeholder="Profile Image URL"
              onChange={handleUrlChange}
              className="flex-1 input-field p-3"
            />
            {urlInput && (
              <button
                type="button"
                onClick={handleClearImage}
                className="px-3 py-1 font-semibold btn-primary translate-y-0 rounded-md text-sm"
              >
                Clear
              </button>
            )}
          </div>
        )}

        {/* ─── Show validation error message if there is one */}
        {validationError && <p className="text-red-500 text-sm mt-2 ml-1">{validationError}</p>}
      </div>
    </div>
  );
}

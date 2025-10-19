'use client';

import { toast } from 'sonner';
import { useState } from 'react';
import { Clock, Mail, MapPin } from 'lucide-react';

export default function MainPageUI() {
  /* ──────────────────────────────────────────────── Form State */
  // Store form input values (name, email, phone, message)
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });

  // Track form submission status and validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  /* ──────────────────────────────────────────────── Validate Single Field */
  // Check if a single field meets its validation rules
  const validateField = (name, value) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length > 100) return 'Name cannot exceed 100 characters';
        return '';

      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Please enter a valid email address';
        return '';

      case 'phone':
        if (value && value.length > 20) return 'Phone number cannot exceed 20 characters';
        return '';

      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length > 1000) return 'Message cannot exceed 1000 characters';
        return '';

      default:
        return '';
    }
  };

  /* ──────────────────────────────────────────────── Handle Input Changes */
  // Update form data when user types and validate if field was already touched
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    // Run validation only if user already interacted with this field
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  /* ──────────────────────────────────────────────── Handle Field Blur */
  // Mark field as touched and validate when user leaves the input
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  /* ──────────────────────────────────────────────── Validate Entire Form */
  // Check all fields before form submission
  const validateForm = () => {
    const newErrors = {};

    Object.keys(formData).forEach((key) => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, phone: true, message: true });
    return Object.keys(newErrors).length === 0;
  };

  /* ──────────────────────────────────────────────── Handle Form Submission */
  // Send form data to the server when user clicks submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ─── Validate all fields before sending
    if (!validateForm()) {
      toast.error('Please fix the errors below');
      return;
    }

    setIsSubmitting(true);

    try {
      // ─── Send form data to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        // Show success message
        toast.success(data.message);

        // Show warning if email delivery had issues
        if (data.warning) toast.warning(data.warning);

        // ─── Reset form to initial state
        setFormData({ name: '', email: '', phone: '', message: '' });
        setErrors({});
        setTouched({});
      } else {
        // ─── Handle validation errors from server
        if (data.errors) {
          setErrors(data.errors);
          toast.error('Please fix the errors below');
        } else {
          toast.error(data.message || 'Something went wrong');
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main>
      <div className="container pb-16 lg:pb-20">
        {/* Contact Information */}
        <div className="space-y-6 xl:space-y-0 mb-12 md:flex md:flex-wrap md:justify-around xl:justify-between md:items-center">
          <div className="flex items-center gap-4 bg-secondary p-4 shadow rounded-lg md:min-w-[315px] xl:min-w-auto 2xl:min-w-[315px]">
            <div className="size-13 rounded-lg shadow-xs bg-primary flex-center text-primary">
              <Mail />
            </div>
            <div>
              <h3 className="font-nunito font-bold text-secondary">Email</h3>
              <p className="text-tertiary">contact@nzdevx.com</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-secondary p-4 shadow rounded-lg md:min-w-[315px] xl:min-w-auto 2xl:min-w-[315px]">
            <div className="size-13 rounded-lg shadow-xs bg-primary flex-center text-primary">
              <Clock />
            </div>
            <div>
              <h3 className="font-nunito font-bold text-secondary">Response Time</h3>
              <p className="text-tertiary">Usually within 2-4 hours</p>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-secondary p-4 shadow rounded-lg md:min-w-[315px] xl:min-w-auto 2xl:min-w-[315px]">
            <div className="size-13 rounded-lg shadow-xs bg-primary flex-center text-primary">
              <MapPin />
            </div>
            <div>
              <h3 className="font-nunito font-bold text-secondary">Location</h3>
              <p className="text-tertiary">Available worldwide</p>
            </div>
          </div>
        </div>

        <div className="3xl:grid 3xl:grid-cols-2 3xl:gap-10 6xl:gap-16">
          {/* Contact Form */}
          <div className="bg-secondary p-4 lg:p-10 rounded-lg shadow-primary 3xl:order-2">
            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-0 md:grid md:grid-cols-2 md:gap-8">
              {/* Name Field */}
              <div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field p-3"
                  placeholder="Enter Name..."
                  disabled={isSubmitting}
                />
                {errors.name && touched.name && <p className="text-red-500 text-sm mt-2 ml-1">{errors.name}</p>}
              </div>

              {/* Email Field */}
              <div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field p-3"
                  placeholder="Email Address..."
                  disabled={isSubmitting}
                />
                {errors.email && touched.email && <p className="text-red-500 text-sm mt-2 ml-1">{errors.email}</p>}
              </div>

              {/* Phone Field */}
              <div className="col-span-2">
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field p-3"
                  placeholder="Phone Number (Optional)"
                  disabled={isSubmitting}
                />
                {errors.phone && touched.phone && <p className="text-red-500 text-sm mt-2 ml-1">{errors.phone}</p>}
              </div>

              {/* Message Field */}
              <div className="col-span-2">
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className="input-field p-3 min-h-[150px]"
                  placeholder="Your Message..."
                  disabled={isSubmitting}
                />

                <div className="flex justify-between items-center mt-2">
                  {errors.message && touched.message ? (
                    <p className="text-red-500 text-sm mt-2 ml-1">{errors.message}</p>
                  ) : (
                    <span></span>
                  )}

                  <span className="text-xs">{formData.message.length}/1000</span>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full btn-primary md:col-span-2 ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-2">Sending Message...</span>
                ) : (
                  <span className="flex items-center justify-center gap-2">Send Message</span>
                )}
              </button>
            </form>
          </div>

          <div className="hidden 3xl:block relative w-full rounded-lg overflow-hidden shadow-lg 3xl:order-1">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d102277707.9!2d0!3d0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2s!4v1234567890!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="rounded-lg"
              title="Worldwide Service Coverage"
            />
          </div>
        </div>
      </div>
    </main>
  );
}

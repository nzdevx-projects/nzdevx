import { Resend } from 'resend';
import { headers } from 'next/headers';
import { connectDB } from '@/lib/db.js';
import Contact from '@/models/Contact.js';
import { NextResponse } from 'next/server';

/* ──────────────────────────────────────────────── Initialize Email Service */
// Set up Resend email service using API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

/* ──────────────────────────────────────────────── Rate Limiting Setup */
// Store request counts in memory to prevent spam (use Redis for production)
const rateLimit = new Map();

// Check if an IP address has exceeded the request limit
function isRateLimited(ip) {
  const now = Date.now();
  const windowMs = 15 * 60 * 1000; // 15 minutes
  const maxRequests = 5; // 5 requests per 15 minutes

  if (!rateLimit.has(ip)) {
    rateLimit.set(ip, [now]);
    return false;
  }

  const requests = rateLimit.get(ip).filter((time) => now - time < windowMs);
  requests.push(now);
  rateLimit.set(ip, requests);

  return requests.length > maxRequests;
}

/* ──────────────────────────────────────────────── Validate Contact Form Data */
// Check if all contact form fields meet the required rules
function validateContactData(data) {
  const errors = {};

  // ─── Validate name field
  if (!data.name || data.name.trim().length === 0) {
    errors.name = 'Name is required';
  } else if (data.name.trim().length > 100) {
    errors.name = 'Name cannot exceed 100 characters';
  }

  // ─── Validate email field
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || data.email.trim().length === 0) {
    errors.email = 'Email is required';
  } else if (!emailRegex.test(data.email.trim())) {
    errors.email = 'Please enter a valid email address';
  }

  // ─── Validate phone field (optional)
  if (data.phone && data.phone.trim().length > 20) {
    errors.phone = 'Phone number cannot exceed 20 characters';
  }

  // ─── Validate message field
  if (!data.message || data.message.trim().length === 0) {
    errors.message = 'Message is required';
  } else if (data.message.trim().length > 1000) {
    errors.message = 'Message cannot exceed 1000 characters';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/* ──────────────────────────────────────────────── Get Client IP Address */
// Extract the user's IP address from request headers (handles proxies and CDNs)
function getClientIP(request) {
  const forwarded = request.headers.get('x-forwarded-for');
  const realIP = request.headers.get('x-real-ip');
  const cfIP = request.headers.get('cf-connecting-ip');

  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  if (realIP) {
    return realIP;
  }
  if (cfIP) {
    return cfIP;
  }
  return 'unknown';
}

/* ──────────────────────────────────────────────── POST - Handle Contact Form */
// Process contact form submission: validate, send email, and save to database
export async function POST(request) {
  try {
    // ─── Get client information for tracking
    const clientIP = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // ─── Check rate limiting to prevent spam
    if (isRateLimited(clientIP)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Too many requests. Please try again later.',
        },
        { status: 429 }
      );
    }

    // ─── Get form data from request
    const body = await request.json();
    const { name, email, phone, message } = body;

    // ─── Validate all form fields
    const validation = validateContactData({ name, email, phone, message });
    if (!validation.isValid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation failed',
          errors: validation.errors,
        },
        { status: 400 }
      );
    }

    await connectDB();

    // ─── Prepare contact data for saving
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || '',
      message: message.trim(),
      ipAddress: clientIP,
      userAgent: userAgent,
    };

    // ─── Try to send email notification
    let emailSent = false;
    let emailError = null;

    try {
      await resend.emails.send({
        from: process.env.RESEND_FROM_EMAIL,
        to: process.env.CONTACT_EMAIL,
        subject: `Portfolio Contact: ${contactData.name}`,
        html: `
          <div
            style="
              margin: 0 auto;
              max-width: 600px;
              border-radius: 10px;
              font-family: Arial, sans-serif;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
            "
          >
            <div
              style="
                padding: 30px;
                text-align: center;
                border-radius: 10px 10px 0 0;
                background: linear-gradient(135deg, #0891b2 0%, #14b8a6 100%);
              "
            >
              <h1 style="color: #ffffff; margin: 0; font-size: 24px">NzDevx Message</h1>
            </div>

            <div style="background: #f3f4f6; padding: 20px; border-radius: 0 0 8px 8px">
              <h2 style="color: #374151; margin-top: 0; font-size: 20px">Message Details</h2>

              <div style="margin: 20px 0; padding: 15px; background: #ffffff; border-radius: 8px">
                <strong style="color: #0891b2">Name:</strong>
                <div style="margin-top: 10px; color: #374151">${contactData.name}</div>
              </div>

              <div style="margin: 20px 0; padding: 15px; background: #ffffff; border-radius: 8px">
                <strong style="color: #0891b2">Email:</strong>
                <a
                  href="mailto:${contactData.email}"
                  style="display: block; margin-top: 10px; color: #374151; text-decoration: none"
                >
                  ${contactData.email}
                </a>
              </div>

              ${
                contactData.phone
                  ? `
              <div style="margin: 20px 0; padding: 15px; background: #ffffff; border-radius: 8px">
                <strong style="color: #0891b2">Phone:</strong>
                <a
                  href="tel:${contactData.phone}"
                  style="display: block; margin-top: 10px; color: #374151; text-decoration: none"
                >
                  ${contactData.phone}
                </a>
              </div>
              `
                  : ''
              }

              <div style="margin: 20px 0; padding: 15px; background: #ffffff; border-radius: 8px">
                <strong style="color: #0891b2">Message:</strong>
                <div style="margin-top: 10px; color: #374151; line-height: 1.6">
                  ${contactData.message.replace(/\n/g, '<br />')}
                </div>
              </div>

              <div
                style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280"
              >
                <p><strong>IP Address:</strong> ${clientIP}</p>
                <p style="display: flex; flex-wrap: wrap; gap: 6px">
                  <strong>Submission Time:</strong> ${new Date().toLocaleString('en-PK', {
                    timeZone: 'Asia/Karachi',
                    hour12: true,
                  })}
                </p>
              </div>
            </div>
          </div>
        `,
        // Plain text version for email clients that don't support HTML
        text: `
New Contact Form Submission

Name: ${contactData.name}
Email: ${contactData.email}
${contactData.phone ? `Phone: ${contactData.phone}` : ''}

Message:
${contactData.message}

---
Submitted: ${new Date().toLocaleString()}
IP Address: ${clientIP}
        `.trim(),
      });

      emailSent = true;
      console.log('✅ Email sent successfully via Resend');
    } catch (error) {
      emailError = error.message;
      console.error('❌ Email sending failed:', error);
      // Continue to save in database even if email fails
    }

    // ─── Save contact message to database
    const contact = new Contact({
      ...contactData,
      emailSent,
      emailError,
    });

    await contact.save();
    console.log('✅ Contact saved to MongoDB');

    // ─── Return success response
    if (emailSent) {
      return NextResponse.json({
        success: true,
        message: "Thank you for your message! I'll get back to you soon.",
      });
    } else {
      return NextResponse.json({
        success: true,
        message: "Your message has been received. I'll get back to you soon.",
        warning: 'Email delivery encountered an issue, but your message was saved.',
      });
    }
  } catch (error) {
    console.error('❌ Contact form error:', error);

    return NextResponse.json(
      {
        success: false,
        message: 'Sorry, something went wrong. Please try again later.',
      },
      { status: 500 }
    );
  }
}

/* ──────────────────────────────────────────────── GET - Method Not Allowed */
// Return error for GET requests (this endpoint only accepts POST)
export async function GET() {
  return NextResponse.json({ message: 'Method not allowed' }, { status: 405 });
}

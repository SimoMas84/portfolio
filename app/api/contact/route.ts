import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// ============================================
// TypeScript Interfaces
// ============================================

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  message?: string;
  error?: string;
}

// ============================================
// Configuration
// ============================================

const resend = new Resend(process.env.RESEND_API_KEY);

const CONFIG = {
  from: 'Portfolio Contact <onboarding@resend.dev>',
  to: 'simone.massaccesi@hotmail.it',
} as const;

// ============================================
// Email Template
// ============================================

const generateEmailHTML = (name: string, email: string, message: string): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin: 0; padding: 0; background-color: #f3f4f6; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;">
  
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f3f4f6; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); padding: 32px 40px; text-align: center;">
              <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 600;">
                New Contact Message
              </h1>
            </td>
          </tr>
          
          <!-- Content -->
          <tr>
            <td style="padding: 40px;">
              
              <!-- Sender Info -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 24px;">
                <tr>
                  <td style="background-color: #f8fafc; border-radius: 12px; padding: 20px;">
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding-bottom: 12px;">
                          <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">From</span>
                          <p style="margin: 4px 0 0 0; color: #1e293b; font-size: 16px; font-weight: 600;">${name}</p>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Email</span>
                          <p style="margin: 4px 0 0 0;">
                            <a href="mailto:${email}" style="color: #3b82f6; font-size: 16px; text-decoration: none;">${email}</a>
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
              
              <!-- Message -->
              <div style="margin-bottom: 24px;">
                <span style="color: #64748b; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px;">Message</span>
                <div style="margin-top: 8px; padding: 20px; background-color: #f8fafc; border-radius: 12px; border-left: 4px solid #3b82f6;">
                  <p style="margin: 0; color: #334155; font-size: 15px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                </div>
              </div>
              
              <!-- Reply Button -->
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td align="center">
                    <a href="mailto:${email}" style="display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #3b82f6 0%, #9333ea 100%); color: #ffffff; font-size: 14px; font-weight: 600; text-decoration: none; border-radius: 8px;">
                      Reply to ${name}
                    </a>
                  </td>
                </tr>
              </table>
              
            </td>
          </tr>
          
          <!-- Footer -->
          <tr>
            <td style="background-color: #f8fafc; padding: 24px 40px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="margin: 0; color: #94a3b8; font-size: 13px;">
                This message was sent from your portfolio contact form
              </p>
              <p style="margin: 8px 0 0 0; color: #94a3b8; font-size: 12px;">
                ${new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </p>
            </td>
          </tr>
          
        </table>
      </td>
    </tr>
  </table>
  
</body>
</html>
`;

// ============================================
// Validation
// ============================================

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateFormData = (data: ContactFormData): string | null => {
  if (!data.name || !data.email || !data.message) {
    return 'All fields are required';
  }
  if (!validateEmail(data.email)) {
    return 'Invalid email address';
  }
  return null;
};

// ============================================
// API Handler
// ============================================

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const { name, email, message }: ContactFormData = await request.json();

    // Server-side validation
    const validationError = validateFormData({ name, email, message });
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // Send email with Resend
    const { data, error } = await resend.emails.send({
      from: CONFIG.from,
      to: CONFIG.to,
      subject: `📬 New message from ${name}`,
      html: generateEmailHTML(name, email, message),
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    console.log('Email sent successfully:', data);
    
    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '../../../lib/mongodb';
import Subscriber from '../../../models/Subscriber';

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { name, email } = await request.json();

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Check if email is already subscribed
    const existingSubscriber = await Subscriber.findOne({ email: email.toLowerCase() });
    if (existingSubscriber) {
      return NextResponse.json(
        { error: 'This email is already subscribed to the newsletter' },
        { status: 409 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const confirmationEmailHtml = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to David Ejere's Newsletter</title>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            line-height: 1.6;
            color: #333;
            background-color: #f8fafc;
            margin: 0;
            padding: 0;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            background: linear-gradient(135deg, #2563eb, #1d4ed8);
            color: white;
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
          }
          .content {
            padding: 40px 30px;
          }
          .content h2 {
            color: #1e293b;
            font-size: 24px;
            margin-bottom: 20px;
          }
          .content p {
            color: #64748b;
            font-size: 16px;
            margin-bottom: 20px;
          }
          .webinar-box {
            background: linear-gradient(135deg, #eff6ff, #dbeafe);
            border: 2px solid #3b82f6;
            border-radius: 12px;
            padding: 25px;
            margin: 25px 0;
            text-align: center;
          }
          .webinar-box h3 {
            color: #1e40af;
            font-size: 20px;
            margin: 0 0 10px 0;
          }
          .webinar-box p {
            color: #1e40af;
            margin: 0;
            font-weight: 600;
          }
          .footer {
            background-color: #f1f5f9;
            padding: 25px 30px;
            text-align: center;
            color: #64748b;
            font-size: 14px;
          }
          .social-links {
            margin: 20px 0;
          }
          .social-links a {
            display: inline-block;
            margin: 0 15px;
            color: #3b82f6;
            text-decoration: none;
            padding: 8px;
            border-radius: 8px;
            transition: background-color 0.2s;
          }
          .social-links a:hover {
            background-color: #e0f2fe;
          }
          .social-icon {
            width: 24px;
            height: 24px;
            vertical-align: middle;
            margin-right: 8px;
            display: inline-block;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to the Newsletter!</h1>
          </div>
          <div class="content">
            <h2>Hi ${name}! 👋</h2>
            <p>Thank you for subscribing to my newsletter! I'm excited to have you join our community of professionals who are committed to developing their leadership skills and advancing their careers.</p>
            
            <div class="webinar-box">
              <h3>🎁 Your FREE Webinar Access</h3>
              <p>"Unlock Your Leadership Potential"</p>
              <p>Access link will be sent separately within 24 hours!</p>
            </div>
            
            <p>Here's what you can expect from my weekly newsletter:</p>
            <ul>
              <li><strong>The Professional Leadership Blueprint</strong> - Actionable strategies for career growth</li>
              <li><strong>Real transformation stories</strong> - Learn from others' success journeys</li>
              <li><strong>Exclusive workshop invitations</strong> - First access to my speaking events</li>
              <li><strong>Leadership insights</strong> - From my experience building software and teaching leadership</li>
            </ul>
            
            <p>I'm looking forward to being part of your success journey!</p>
            
            <p>Best regards,<br><strong>David Ejere</strong></p>
          </div>
          <div class="footer">
            <div class="social-links">
              <a href="https://www.linkedin.com/in/david-ejere-5056161a1/">
                <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727180738/Uptions_Vector_mr3yf7.png" alt="LinkedIn" class="social-icon">
                LinkedIn
              </a>
              <a href="https://www.instagram.com/dumtochukwu_/">
                <img src="https://res.cloudinary.com/dwjnkuvqv/image/upload/v1727180738/Uptions_Vector_1_faowco.png" alt="Instagram" class="social-icon">
                Instagram
              </a>
            </div>
            <p>You're receiving this because you signed up for David Ejere's newsletter.
          </div>
        </div>
      </body>
      </html>
    `;

    await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'Welcome! Your FREE Leadership Webinar Access Inside ',
      html: confirmationEmailHtml,
    });

    // Save subscriber to MongoDB
    const newSubscriber = new Subscriber({
      name,
      email: email.toLowerCase(),
    });
    
    await newSubscriber.save();

    return NextResponse.json(
      { message: 'Successfully subscribed to newsletter!' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Newsletter subscription error:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      env: {
        hasGmailUser: !!process.env.GMAIL_USER,
        hasGmailPassword: !!process.env.GMAIL_APP_PASSWORD,
        hasFromEmail: !!process.env.FROM_EMAIL,
        hasFromName: !!process.env.FROM_NAME,
        hasMongodbUri: !!process.env.MONGODB_URI,
      }
    });
    return NextResponse.json(
      { error: 'Failed to subscribe to newsletter' },
      { status: 500 }
    );
  }
}
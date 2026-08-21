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
      </head>
      <body style="margin:0; padding:0; background-color:#F2F1E8;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2F1E8;">
          <tr>
            <td align="center" style="padding:36px 16px;">
              <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px; width:100%;">

                <!-- main card, hard blue shadow -->
                <tr>
                  <td style="background-color:#2563EB; padding:0 8px 8px 0; border-radius:20px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F6F5EE; border:2px solid #0D0D0F; border-radius:18px;">
                      <tr>
                        <td style="padding:36px 32px;">

                          <h1 style="margin:0 0 18px 0; font-family:Arial, Helvetica, sans-serif; font-size:32px; font-weight:800; letter-spacing:-1px; color:#0D0D0F;">
                            You're in, ${name}.
                          </h1>

                          <p style="margin:0 0 16px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; line-height:1.6; color:#2E2E31;">
                            Thank you for signing up to my newsletter. You've just joined a group of professionals who are serious about growing, in their careers, in their leadership, and in what they build. I don't send noise, I send things you can use.
                          </p>

                          <!-- webinar box -->
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;">
                            <tr>
                              <td style="background-color:#0D0D0F; padding:0 6px 6px 0; border-radius:16px;">
                                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2F1E8; border:2px solid #0D0D0F; border-radius:14px;">
                                  <tr>
                                    <td style="padding:22px 24px;">
                                      <p style="margin:0 0 8px 0; font-family:'Courier New', Courier, monospace; font-size:11px; font-weight:bold; letter-spacing:2px; color:#2563EB;">
                                        &#9670; YOUR FREE WEBINAR PASS
                                      </p>
                                      <p style="margin:0 0 6px 0; font-family:Arial, Helvetica, sans-serif; font-size:19px; font-weight:800; color:#0D0D0F;">
                                        Unlock Your Leadership Potential
                                      </p>
                                      <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:14px; line-height:1.5; color:#2E2E31;">
                                        Your access link is on its way, it lands in your inbox within 24 hours.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>

                          <p style="margin:0 0 12px 0; font-family:Arial, Helvetica, sans-serif; font-size:16px; font-weight:700; color:#0D0D0F;">
                            Every week, straight to this inbox:
                          </p>
                          <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 8px 0;">
                            <tr>
                              <td style="font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.9; color:#2E2E31;">
                                <span style="color:#2563EB;">&#9670;</span>&nbsp; The Professional Leadership Blueprint, strategies you can act on<br>
                                <span style="color:#2563EB;">&#9670;</span>&nbsp; Real career transformation stories from real people<br>
                                <span style="color:#2563EB;">&#9670;</span>&nbsp; First access to my workshops and speaking events<br>
                                <span style="color:#2563EB;">&#9670;</span>&nbsp; Lessons from building software and building leaders
                              </td>
                            </tr>
                          </table>

                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- whatsapp community card, dark with green shadow -->
                <tr>
                  <td style="padding-top:22px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="background-color:#25D366; padding:0 8px 8px 0; border-radius:20px;">
                          <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0D0D0F; border:2px solid #0D0D0F; border-radius:18px;">
                            <tr>
                              <td style="padding:30px 32px;">
                                <p style="margin:0 0 10px 0; font-family:'Courier New', Courier, monospace; font-size:11px; font-weight:bold; letter-spacing:2px; color:#25D366;">
                                  &#9670; ONE MORE THING
                                </p>
                                <p style="margin:0 0 12px 0; font-family:Arial, Helvetica, sans-serif; font-size:22px; font-weight:800; letter-spacing:-0.5px; color:#F4F3EF;">
                                  The conversation continues on WhatsApp.
                                </p>
                                <p style="margin:0 0 20px 0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#D9D8D4;">
                                  The newsletter is weekly, the community is daily. Inside, I share quick insights on leadership, tech and AI, announce events before anywhere else, and host value packed webinars, including how to leverage AI to build new income streams. One tap and you're in.
                                </p>
                                <table role="presentation" cellpadding="0" cellspacing="0">
                                  <tr>
                                    <td style="background-color:#25D366; border:2px solid #25D366; border-radius:12px;">
                                      <a href="https://whatsapp.com/channel/0029VbBW58oKmCPXDsGrX10Q" style="display:inline-block; padding:13px 24px; font-family:Arial, Helvetica, sans-serif; font-size:15px; font-weight:700; color:#0D0D0F; text-decoration:none;">
                                        Join the WhatsApp community &rarr;
                                      </a>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- sign-off -->
                <tr>
                  <td style="padding:26px 4px 0 4px;">
                    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:15px; line-height:1.6; color:#2E2E31;">
                      I'm glad you're here.<br><br>
                      <strong style="color:#0D0D0F;">David Ejere</strong>
                    </p>
                  </td>
                </tr>

                <!-- footer -->
                <tr>
                  <td style="padding:26px 4px 0 4px;">
                    <p style="margin:0 0 8px 0; font-family:'Courier New', Courier, monospace; font-size:11px; letter-spacing:1px; color:#6B6B6E;">
                      <a href="https://www.linkedin.com/in/david-ejere-5056161a1" style="color:#2563EB; text-decoration:none; font-weight:bold;">LINKEDIN</a>
                      &nbsp;<span style="color:#2563EB;">&#9670;</span>&nbsp;
                      <a href="https://www.instagram.com/dumtochukwu_/" style="color:#2563EB; text-decoration:none; font-weight:bold;">INSTAGRAM</a>
                      &nbsp;<span style="color:#2563EB;">&#9670;</span>&nbsp;
                      <a href="https://www.ejere.site" style="color:#2563EB; text-decoration:none; font-weight:bold;">EJERE.SITE</a>
                    </p>
                    <p style="margin:0; font-family:'Courier New', Courier, monospace; font-size:11px; letter-spacing:1px; color:#6B6B6E;">
                      You're receiving this because you signed up at ejere.site.
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

    await transporter.sendMail({
      from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
      to: email,
      subject: 'Welcome! Your free leadership webinar pass is inside',
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
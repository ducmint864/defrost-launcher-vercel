import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import crypto from 'crypto';

export async function POST(req: Request) {
    const { fullName, email, projectID } = await req.json();

    // Generate a unique OTP
    const otp = crypto.randomBytes(6).toString('hex');
    // hard code for now
    // const otp = '08060';

    // Store the token in your database along with the email and projectID
    // This is where you'd typically save to your database
    // For this example, we'll just log it
    console.log(`OTP for ${email} @ project ${projectID}: ${otp}`)

    // Set up nodemailer transporter
    const transporter = nodemailer.createTransport({
        // Configure your email service here
        // For example, using Gmail:
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // const projectName = await  // TODO: get project name from projectID
    const projectName = `[name of project with ID ${projectID}]`;


    // Email options
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: `Verify your email for Whitelist for the project [name of project with ID ${projectID}]`,
        html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
        <h2 style="color: #333; font-size: 24px; text-align: center;">Welcome, ${fullName}!</h2>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          We're excited to inform you that you're eligible to be whitelisted for the project <strong>${projectName}</strong>.
        </p>
        <p style="color: #555; font-size: 16px; line-height: 1.5;">
          To complete your registration, please verify your email address by entering the following One-Time Password (OTP) on the whitelist page:
        </p>
        <div style="background-color: #f0f0f0; padding: 15px; text-align: center; margin: 20px 0;">
          <h3 style="color: #333; font-size: 28px; margin: 0;">${otp}</h3>
        </div>
        <p style="color: #555; font-size: 14px; text-align: center;">
          This OTP will expire in 10 minutes. If you didn't request this verification, please ignore this email.
        </p>
      </div>
    `,
    };

    try {
        // Send email
        await transporter.sendMail(mailOptions);
        return NextResponse.json({ message: 'Verification email sent' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'Failed to send verification email' }, { status: 500 });
    }
}
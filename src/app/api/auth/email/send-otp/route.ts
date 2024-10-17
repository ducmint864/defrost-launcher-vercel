import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import otpGenerator from 'otp-generator';
import { prismaClient } from '@/*';

export async function POST(req: Request) {
    const { fullName, email, projectID } = await req.json();

    const latestOTPRecord = await prismaClient.oTP.findFirst({
        where: { email: email },
        orderBy: { createdAt: 'desc' }
    });
    if (latestOTPRecord && latestOTPRecord.expiresAt > new Date()) {
        return NextResponse.json({ message: 'last-sent OTP is still valid' }, { status: 400 });
    }

    // Generate a unique OTP
    const otp = otpGenerator.generate(6, {
        lowerCaseAlphabets: true,
        upperCaseAlphabets: false,
        specialChars: false,
    });

    // Store the token in your database along with the email and projectID
    console.debug(`OTP for ${email} @ project ${projectID}: ${otp}`)

    // Calc. OTP expiration time
    let TTLMilisecs = 5 * 60 * 1000; // convert 5 minutes to milisecs
    if (process.env.OTP_TTL_MINUTES) {
        const ttlNum = Number(process.env.OTP_TTL_MINUTES);
        if (!Number.isNaN(ttlNum)) {
            TTLMilisecs = ttlNum * 60 * 1000;
        }
    }

    // save OTP record
    const createdOTP = await prismaClient.oTP.create({
        data: {
            email: email,
            code: otp,
            expiresAt: new Date(Date.now() + TTLMilisecs),
        }
    });

    if (!createdOTP) {
        return NextResponse.json({ error: "cannot save OTP" }, { status: 500 });
    }
    console.debug("saved OTP to db: ", createdOTP);

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
        return NextResponse.json({ message: 'verification email sent' }, { status: 200 });
    } catch (error) {
        console.error('Error sending email:', error);
        return NextResponse.json({ error: 'failed to send verification email' }, { status: 500 });
    }
}
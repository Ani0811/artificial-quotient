import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { generateContactEmailText, generateContactEmailHtml } from "@/emails/contact-template";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const { name, email, inquiryType, subject, message } = await request.json();

    // Basic Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: "Name, email, and message are required." },
        { status: 400 }
      );
    }

    const recipient = process.env.CONTACT_RECEIVER_EMAIL || "artificialquotient01@gmail.com";
    const emailSubject = `[AQ Contact Form] ${inquiryType} - ${subject || "New Inquiry"}`;

    const textBody = generateContactEmailText({ name, email, inquiryType, subject, message });
    const htmlBody = generateContactEmailHtml({ name, email, inquiryType, subject, message });

    // Check if SMTP transporter credentials are configured
    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = process.env.SMTP_PORT;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      // Developer fallback logging mode
      console.log("\n==================================================");
      console.log("📨 [SMTP Config Missing] Logged Email Output:");
      console.log(`To: ${recipient}`);
      console.log(`Subject: ${emailSubject}`);
      console.log(`Reply-To: ${email}`);
      console.log("------------------ TEXT BODY ---------------------");
      console.log(textBody.trim());
      console.log("==================================================\n");

      return NextResponse.json({
        success: true,
        message: "Email logged to console successfully (Developer Mode fallback).",
      });
    }

    // SMTP Configured: Send the actual email
    const cleanSmtpPass = smtpPass.replace(/\s+/g, "");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(smtpPort) || 587,
      secure: Number(smtpPort) === 465,
      auth: {
        user: smtpUser,
        pass: cleanSmtpPass,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    await transporter.sendMail({
      from: `"${name} (via AQ)" <${smtpUser}>`,
      to: recipient,
      replyTo: email,
      subject: emailSubject,
      text: textBody,
      html: htmlBody,
    });

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully.",
    });
  } catch (error: any) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { 
        success: false, 
        message: error?.message ? `Failed to send email: ${error.message}` : "An internal server error occurred while sending your message." 
      },
      { status: 500 }
    );
  }
}

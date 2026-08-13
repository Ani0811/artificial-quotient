import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export async function send2FACodeEmail(toEmail: string, code: string): Promise<boolean> {
  const senderEmail = process.env.SMTP_USER || "anirudha.basuthakur@gmail.com";
  const senderName = "Artificial Quotient Security";
  const subjectText = `Your Artificial Quotient Verification Code`;

  const logoPath = path.join(process.cwd(), "public", "logo", "logo.jpeg");
  let logoBase64 = "";
  try {
    if (fs.existsSync(logoPath)) {
      logoBase64 = fs.readFileSync(logoPath).toString("base64");
    }
  } catch {
    // Ignore image read error
  }

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>2-Step Verification Code</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #0b0f19; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
      <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0b0f19; padding: 40px 10px;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #111827; border: 1px solid #1f2937; border-radius: 16px; overflow: hidden; box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5);">
              <tr>
                <td style="height: 4px; background: linear-gradient(90deg, #3b82f6 0%, #8b5cf6 50%, #10b981 100%);"></td>
              </tr>
              <tr>
                <td style="padding: 32px 32px 24px 32px; text-align: center;">
                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td align="center">
                        <img src="https://artificial-quotient.com/logo.jpeg" width="56" height="56" alt="Artificial Quotient Logo" style="width: 56px; height: 56px; border-radius: 14px; margin-bottom: 14px; border: 1px solid #374151; display: block;" />
                        <div style="display: inline-block; padding: 6px 14px; background-color: rgba(59, 130, 246, 0.1); border: 1px solid rgba(59, 130, 246, 0.25); border-radius: 20px; margin-bottom: 16px;">
                          <span style="color: #60a5fa; font-size: 11px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase;">
                            Security Gateway
                          </span>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td align="center">
                        <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.5px;">
                          Artificial<span style="color: #3b82f6;">Quotient</span>
                        </h1>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="padding: 0 32px 32px 32px; text-align: center;">
                  <h2 style="margin: 0 0 12px 0; color: #f3f4f6; font-size: 18px; font-weight: 600;">
                    Two-Step Verification Code
                  </h2>
                  <p style="margin: 0 0 28px 0; color: #9ca3af; font-size: 14px; line-height: 1.6;">
                    You requested to sign in to the Artificial Quotient Admin Portal. Enter the 6-digit verification code below to authorize your session:
                  </p>

                  <div style="background: linear-gradient(180deg, #1f2937 0%, #111827 100%); border: 1px solid #374151; border-radius: 12px; padding: 24px; margin-bottom: 24px; text-align: center;">
                    <div style="font-family: 'Courier New', Courier, monospace; font-size: 38px; font-weight: 800; color: #38bdf8; letter-spacing: 8px; text-indent: 8px; margin: 0;">
                      ${code}
                    </div>
                    <div style="margin-top: 12px; font-size: 12px; color: #f59e0b; font-weight: 600;">
                      Code expires in 5 minutes
                    </div>
                  </div>

                  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: rgba(239, 68, 68, 0.08); border: 1px solid rgba(239, 68, 68, 0.2); border-radius: 10px; padding: 14px 16px;">
                    <tr>
                      <td style="color: #f87171; font-size: 12px; line-height: 1.5; text-align: left;">
                        <strong>Security Notice:</strong> If you did not request this login attempt, please ignore this email or contact a System Administrator immediately.
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>

              <tr>
                <td style="background-color: #0b0f19; padding: 20px 32px; text-align: center; border-top: 1px solid #1f2937;">
                  <p style="margin: 0; color: #6b7280; font-size: 12px; line-height: 1.5;">
                    Artificial Quotient Automation Systems • Automated Security Gateway
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

  // 1. Try Brevo Transactional Email API if key is present
  const brevoApiKey = process.env.BREVO_API_KEY;
  if (brevoApiKey) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": brevoApiKey,
          "accept": "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          sender: { name: senderName, email: senderEmail },
          to: [{ email: toEmail }],
          subject: subjectText,
          htmlContent: htmlContent,
        }),
      });

      if (res.ok) {
        console.log("2FA email sent successfully via Brevo API to:", toEmail);
        return true;
      }
      const errData = await res.json().catch(() => ({}));
      console.warn("Brevo API warning (falling back to SMTP):", errData);
    } catch (err) {
      console.warn("Brevo API fetch error (falling back to SMTP):", err);
    }
  }

  // 2. Fallback to Nodemailer SMTP
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: Number(process.env.SMTP_PORT) || 587,
      secure: false,
      auth: {
        user: senderEmail,
        pass: process.env.SMTP_PASS || "",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      from: `"${senderName}" <${senderEmail}>`,
      to: toEmail,
      subject: subjectText,
      attachments: [
        {
          filename: "logo.jpeg",
          path: logoPath,
          cid: "aqlogo@artificialquotient",
        },
      ],
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("2FA email sent via Nodemailer SMTP: %s", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending 2FA email via Nodemailer SMTP:", error);
    return false;
  }
}


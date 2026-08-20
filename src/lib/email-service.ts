import nodemailer from "nodemailer";
import path from "path";
import fs from "fs";

export interface BrevoConfig {
  apiKey: string;
  senderEmail: string;
  senderName: string;
}

export function getBrevoConfigs(): BrevoConfig[] {
  const configs: BrevoConfig[] = [];
  const defaultSenderName = "Artificial Quotient Security";
  const defaultSenderEmail =
    process.env.BREVO_SENDER_EMAIL ||
    process.env.BREVO_SENDER ||
    process.env.SMTP_USER ||
    process.env.CONTACT_RECEIVER_EMAIL ||
    "anirudha.basuthakur@gmail.com";

  // 1. Check for BREVO_API_KEYS (comma-separated list: key1,key2,key3)
  if (process.env.BREVO_API_KEYS) {
    const keys = process.env.BREVO_API_KEYS.split(",")
      .map((k) => k.trim())
      .filter(Boolean);
    const senders = process.env.BREVO_SENDER_EMAILS
      ? process.env.BREVO_SENDER_EMAILS.split(",")
          .map((s) => s.trim())
          .filter(Boolean)
      : [];
    keys.forEach((key, index) => {
      configs.push({
        apiKey: key,
        senderEmail: senders[index] || defaultSenderEmail,
        senderName: defaultSenderName,
      });
    });
  }

  // 2. Check for indexed environment variables (BREVO_API_KEY_1, BREVO_API_KEY_2, etc.)
  for (let i = 1; i <= 10; i++) {
    const key = process.env[`BREVO_API_KEY_${i}`];
    if (key && key.trim()) {
      const sender = process.env[`BREVO_SENDER_EMAIL_${i}`] || defaultSenderEmail;
      if (!configs.some((c) => c.apiKey === key.trim())) {
        configs.push({
          apiKey: key.trim(),
          senderEmail: sender.trim(),
          senderName: defaultSenderName,
        });
      }
    }
  }

  // 3. Fallback to standard key names and aliases
  const aliasKeys = [
    process.env.BREVO_API_KEY,
    process.env.BREVO_KEY,
    process.env.BREVO_APIKEY,
    process.env.BREVO_TOKEN,
    process.env.SENDINBLUE_API_KEY,
    process.env.NEXT_PUBLIC_BREVO_API_KEY,
    process.env.NEXT_PUBLIC_BREVO_KEY,
  ];

  for (const rawKey of aliasKeys) {
    if (rawKey && rawKey.trim()) {
      const cleanKey = rawKey.trim();
      if (!configs.some((c) => c.apiKey === cleanKey)) {
        configs.push({
          apiKey: cleanKey,
          senderEmail: defaultSenderEmail,
          senderName: defaultSenderName,
        });
      }
    }
  }

  // 4. Dynamic discovery for any env var containing BREVO
  for (const [envName, envVal] of Object.entries(process.env)) {
    if (
      envVal &&
      typeof envVal === "string" &&
      envName.toUpperCase().includes("BREVO") &&
      (envName.toUpperCase().includes("KEY") || envName.toUpperCase().includes("SECRET") || envName.toUpperCase().includes("TOKEN"))
    ) {
      const cleanKey = envVal.trim();
      if (!configs.some((c) => c.apiKey === cleanKey)) {
        configs.push({
          apiKey: cleanKey,
          senderEmail: defaultSenderEmail,
          senderName: defaultSenderName,
        });
      }
    }
  }

  return configs;
}

export async function sendEmailViaBrevo({
  toEmail,
  subject,
  htmlContent,
  textContent,
  replyTo,
  senderNameOverride,
}: {
  toEmail: string;
  subject: string;
  htmlContent: string;
  textContent?: string;
  replyTo?: { email: string; name?: string };
  senderNameOverride?: string;
}): Promise<boolean> {
  const configs = getBrevoConfigs();

  if (configs.length === 0) {
    return false;
  }

  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    const maskedKey = config.apiKey.length > 12 
      ? `${config.apiKey.substring(0, 8)}...${config.apiKey.slice(-4)}` 
      : config.apiKey;
    const keyLabel = `Brevo Key #${i + 1} (${maskedKey}, Sender: ${config.senderEmail})`;

    try {
      const bodyPayload: any = {
        sender: {
          name: senderNameOverride || config.senderName,
          email: config.senderEmail,
        },
        to: [{ email: toEmail }],
        subject: subject,
        htmlContent: htmlContent,
      };

      if (textContent) {
        bodyPayload.textContent = textContent;
      }
      if (replyTo) {
        bodyPayload.replyTo = replyTo;
      }

      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "api-key": config.apiKey,
          "accept": "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify(bodyPayload),
      });

      if (res.ok) {
        console.log(`Email sent successfully via ${keyLabel} to: ${toEmail}`);
        return true;
      }

      const errData = await res.json().catch(() => ({}));
      console.warn(`Brevo API error on ${keyLabel} (HTTP ${res.status}):`, errData, "-> Failover to next key...");
    } catch (err) {
      console.warn(`Brevo fetch exception on ${keyLabel}:`, err, "-> Failover to next key...");
    }
  }

  console.warn("All configured Brevo API keys failed. Falling back to SMTP...");
  return false;
}

export async function send2FACodeEmail(toEmail: string, code: string): Promise<boolean> {
  const senderEmail = process.env.SMTP_USER || "anirudha.basuthakur@gmail.com";
  const senderName = "Artificial Quotient Security";
  const subjectText = `Your Artificial Quotient Verification Code`;

  const logoPath = path.join(process.cwd(), "public", "logo", "logo-removebg-preview.png");
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

  // 1. Try Brevo API (multi-key failover)
  const brevoSuccess = await sendEmailViaBrevo({
    toEmail,
    subject: subjectText,
    htmlContent,
    senderNameOverride: senderName,
  });

  if (brevoSuccess) {
    return true;
  }

  // 2. Fallback to Nodemailer SMTP
  if (process.env.SMTP_PASS) {
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
    }
  }

  // 3. In development or localhost, log OTP to terminal so admin is never locked out
  if (process.env.NODE_ENV === "development" || !process.env.NODE_ENV) {
    console.log(`\n========================================\n[DEV 2FA CODE]: ${code}\nRecipient: ${toEmail}\n========================================\n`);
    return true;
  }

  return false;
}

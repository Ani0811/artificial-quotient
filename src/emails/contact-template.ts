import path from "path";
import fs from "fs";

export interface ContactEmailParams {
  name: string;
  email: string;
  inquiryType: string;
  subject?: string;
  message: string;
}

/**
 * Generates the plain text version of the contact form email.
 */
export function generateContactEmailText(params: ContactEmailParams): string {
  const { name, email, inquiryType, subject, message } = params;
  return `
NEW INQUIRY — ARTIFICIAL QUOTIENT™
==================================================

From: ${name} (${email})
Category: ${inquiryType}
Subject: ${subject || "No Subject"}

--------------------------------------------------
MESSAGE:
--------------------------------------------------
${message}

==================================================
Reply directly to ${name}: mailto:${email}
© ${new Date().getFullYear()} Artificial Quotient™. All rights reserved.
  `.trim();
}

/**
 * Generates an ultra-premium, modern responsive HTML email template featuring the official brand logo and trademark styling.
 */
export function generateContactEmailHtml(params: ContactEmailParams): string {
  const { name, email, inquiryType, subject, message } = params;
  const initial = name ? name.trim().charAt(0).toUpperCase() : "A";
  const replySubject = encodeURIComponent(`Re: ${subject || inquiryType || "Artificial Quotient Inquiry"}`);
  
  const logoUrl = "https://artificial-quotient.com/logo.jpeg";

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Sponsorship Inquiry — Artificial Quotient™</title>
</head>
<body style="margin: 0; padding: 0; background-color: #061612; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #ecfdf5;">
  
  <!-- Outer Container -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #061612; padding: 40px 16px;">
    <tr>
      <td align="center">
        
        <!-- Main Card -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0c201a; border: 1px solid #16382e; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7);">
          
          <!-- Top Emerald Gradient Accent Bar -->
          <tr>
            <td style="height: 4px; background: linear-gradient(90deg, #10b981 0%, #14b8a6 50%, #06b6d4 100%);"></td>
          </tr>

          <!-- Brand Header with Official Logo & Trademark -->
          <tr>
            <td style="padding: 24px 32px; border-bottom: 1px solid #16382e;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left" valign="middle">
                    <table border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td valign="middle" style="padding-right: 12px;">
                          <img src="${logoUrl}" alt="Artificial Quotient Logo" width="40" height="40" style="width: 40px; height: 40px; border-radius: 10px; border: 1px solid rgba(16, 185, 129, 0.4); display: block; object-fit: cover;" />
                        </td>
                        <td valign="middle">
                          <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.02em; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.2;">
                            Artificial<span style="color: #10b981;">Quotient</span><sup style="font-size: 10px; color: #10b981; font-weight: 800; margin-left: 2px;">™</sup>
                          </div>
                          <div style="font-size: 11px; color: #6ee7b7; font-weight: 600; letter-spacing: 0.02em;">
                            Official Sponsorship Portal
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                  <td align="right" valign="middle">
                    <span style="display: inline-block; padding: 6px 14px; background-color: rgba(16, 185, 129, 0.12); border: 1px solid rgba(16, 185, 129, 0.3); color: #6ee7b7; font-size: 11px; font-weight: 700; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.06em;">
                      ⚡ Incoming Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Profile Section -->
          <tr>
            <td style="padding: 28px 32px 12px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #102922; border: 1px solid #16382e; border-radius: 14px; padding: 20px;">
                <tr>
                  <td width="52" valign="middle" style="padding-right: 16px;">
                    <div style="width: 48px; height: 48px; background: linear-gradient(135deg, #10b981, #059669); color: #ffffff; font-weight: 800; font-size: 20px; border-radius: 14px; text-align: center; line-height: 48px; box-shadow: 0 4px 14px rgba(16, 185, 129, 0.35);">
                      ${initial}
                    </div>
                  </td>
                  <td valign="middle">
                    <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 3px;">
                      ${name}
                    </div>
                    <div style="font-size: 14px;">
                      <a href="mailto:${email}" style="color: #34d399; text-decoration: none; font-weight: 600;">
                        ${email}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Category & Subject Details -->
          <tr>
            <td style="padding: 12px 32px 20px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #102922; border: 1px solid #16382e; border-radius: 14px; padding: 18px 20px;">
                <tr>
                  <td style="padding-bottom: 14px; border-bottom: 1px solid #16382e;">
                    <span style="font-size: 11px; font-weight: 700; color: #6ee7b7; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">Inquiry Category</span>
                    <span style="display: inline-block; padding: 4px 12px; background-color: rgba(16, 185, 129, 0.15); border: 1px solid rgba(16, 185, 129, 0.35); color: #a7f3d0; font-size: 12px; font-weight: 700; border-radius: 8px;">
                      ${inquiryType}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 14px;">
                    <span style="font-size: 11px; font-weight: 700; color: #6ee7b7; text-transform: uppercase; letter-spacing: 0.08em; display: block; margin-bottom: 6px;">Subject</span>
                    <span style="font-size: 15px; font-weight: 700; color: #ffffff;">
                      ${subject || "No Subject Provided"}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <div style="background-color: #102922; border: 1px solid #16382e; border-left: 4px solid #10b981; border-radius: 14px; padding: 22px 24px;">
                <div style="font-size: 11px; font-weight: 800; color: #34d399; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 12px;">
                  Message Content
                </div>
                <div style="font-size: 15px; line-height: 1.7; color: #e2e8f0; white-space: pre-wrap; font-weight: 400;">
                  ${message}
                </div>
              </div>
            </td>
          </tr>

          <!-- Direct Reply Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;" align="center">
              <a href="mailto:${email}?subject=${replySubject}" style="display: block; width: 100%; box-sizing: border-box; padding: 15px 24px; background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: #ffffff; font-weight: 800; font-size: 15px; text-align: center; text-decoration: none; border-radius: 12px; box-shadow: 0 6px 20px rgba(16, 185, 129, 0.35);">
                ✉️ Reply directly to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer with Trademark & Legal Notice -->
          <tr>
            <td style="padding: 24px 32px; background-color: #061612; border-top: 1px solid #16382e; text-align: center;">
              <div style="font-size: 12px; color: #6ee7b7; font-weight: 600; margin-bottom: 6px;">
                © ${new Date().getFullYear()} <strong style="color: #ffffff;">Artificial Quotient™</strong>. All rights reserved.
              </div>
              <div style="font-size: 11px; color: #34d399; opacity: 0.75; line-height: 1.5;">
                Artificial Quotient™ is a trademark of Artificial Quotient Media Hub.<br />
                🔒 Transmitted via SSL Encrypted Automated Gateway
              </div>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
  `.trim();
}

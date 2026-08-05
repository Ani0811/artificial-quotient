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
NEW INQUIRY - ARTIFICIAL QUOTIENT
==================================================

From: ${name} (${email})
Inquiry Category: ${inquiryType}
Subject: ${subject || "No Subject"}

--------------------------------------------------
MESSAGE:
--------------------------------------------------
${message}

==================================================
Reply directly to ${name}: mailto:${email}
Sent via Artificial Quotient Website Contact Form.
  `.trim();
}

/**
 * Generates an ultra-premium, responsive HTML email template matching the website's dark mode aesthetic.
 */
export function generateContactEmailHtml(params: ContactEmailParams): string {
  const { name, email, inquiryType, subject, message } = params;
  const initial = name ? name.trim().charAt(0).toUpperCase() : "A";
  const replySubject = encodeURIComponent(`Re: ${subject || inquiryType || "Artificial Quotient Inquiry"}`);

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Inquiry</title>
</head>
<body style="margin: 0; padding: 0; background-color: #050507; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">
  
  <!-- Outer Wrapper -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #050507; padding: 32px 16px;">
    <tr>
      <td align="center">
        
        <!-- Main Email Container -->
        <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 580px; background-color: #09090b; border: 1px solid #27272a; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6);">
          
          <!-- Top Gradient Accent Bar -->
          <tr>
            <td style="height: 5px; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 50%, #db2777 100%);"></td>
          </tr>

          <!-- Header Section -->
          <tr>
            <td style="padding: 28px 32px 20px 32px; border-bottom: 1px solid #18181b;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td align="left">
                    <div style="font-size: 20px; font-weight: 800; color: #ffffff; letter-spacing: -0.03em;">
                      <span style="margin-right: 6px;">🐼</span>Artificial<span style="color: #3b82f6;">Quotient</span>
                    </div>
                  </td>
                  <td align="right">
                    <span style="display: inline-block; padding: 5px 12px; background-color: #1e1b4b; border: 1px solid #312e81; color: #a5b4fc; font-size: 11px; font-weight: 700; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.05em;">
                      ⚡ Incoming Inquiry
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Sender Overview Card -->
          <tr>
            <td style="padding: 28px 32px 10px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #121215; border: 1px solid #1f1f23; border-radius: 14px; padding: 20px;">
                <tr>
                  <td width="48" valign="top" style="padding-right: 16px;">
                    <div style="width: 44px; height: 44px; background: linear-gradient(135deg, #2563eb, #4f46e5); color: #ffffff; font-weight: 800; font-size: 18px; border-radius: 12px; text-align: center; line-height: 44px; box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                      ${initial}
                    </div>
                  </td>
                  <td valign="middle">
                    <div style="font-size: 18px; font-weight: 700; color: #ffffff; margin-bottom: 4px;">
                      ${name}
                    </div>
                    <div style="font-size: 14px;">
                      <a href="mailto:${email}" style="color: #60a5fa; text-decoration: none; font-weight: 500;">
                        ${email}
                      </a>
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Inquiry Metadata Grid -->
          <tr>
            <td style="padding: 10px 32px 20px 32px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #121215; border: 1px solid #1f1f23; border-radius: 14px; padding: 16px 20px;">
                <tr>
                  <td style="padding-bottom: 12px; border-bottom: 1px solid #1c1c21;">
                    <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Inquiry Type</span>
                    <span style="display: inline-block; padding: 3px 10px; background-color: #182642; border: 1px solid #1e3a8a; color: #93c5fd; font-size: 12px; font-weight: 700; border-radius: 6px;">
                      ${inquiryType}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding-top: 12px;">
                    <span style="font-size: 12px; font-weight: 600; color: #71717a; text-transform: uppercase; letter-spacing: 0.05em; display: block; margin-bottom: 4px;">Subject</span>
                    <span style="font-size: 15px; font-weight: 600; color: #f4f4f5;">
                      ${subject || "No Subject Provided"}
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Message Body Container -->
          <tr>
            <td style="padding: 0 32px 28px 32px;">
              <div style="background-color: #121215; border: 1px solid #1f1f23; border-left: 4px solid #3b82f6; border-radius: 14px; padding: 24px;">
                <div style="font-size: 11px; font-weight: 700; color: #71717a; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 12px;">
                  Message Content
                </div>
                <div style="font-size: 15px; line-height: 1.65; color: #e4e4e7; white-space: pre-wrap; font-weight: 400;">
                  ${message}
                </div>
              </div>
            </td>
          </tr>

          <!-- Primary Action CTA Button -->
          <tr>
            <td style="padding: 0 32px 32px 32px;" align="center">
              <a href="mailto:${email}?subject=${replySubject}" style="display: inline-block; width: 100%; box-sizing: border-box; padding: 14px 24px; background-color: #2563eb; color: #ffffff; font-weight: 700; font-size: 15px; text-align: center; text-decoration: none; border-radius: 12px; shadow: 0 4px 14px rgba(37, 99, 235, 0.4); transition: all 0.2s ease;">
                ✉️ Reply directly to ${name}
              </a>
            </td>
          </tr>

          <!-- Footer Section -->
          <tr>
            <td style="padding: 20px 32px; background-color: #050507; border-top: 1px solid #18181b; text-align: center;">
              <div style="font-size: 12px; color: #52525b; margin-bottom: 6px;">
                Sent via <strong style="color: #71717a;">Artificial Quotient Contact System</strong>
              </div>
              <div style="font-size: 11px; color: #3f3f46;">
                🔒 SSL Encrypted & Transmitted via Nodemailer
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

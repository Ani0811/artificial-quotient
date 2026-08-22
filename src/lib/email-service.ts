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
    "contact@artificialquotient.com";

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

#!/usr/bin/env node

/**
 * YouTube Analytics OAuth 2.0 Token Helper
 * 
 * Usage:
 *   node scripts/get-youtube-token.mjs
 * 
 * Or pass as args:
 *   node scripts/get-youtube-token.mjs <CLIENT_ID> <CLIENT_SECRET>
 */

import http from "http";
import readline from "readline/promises";
import fs from "fs/promises";
import path from "path";

const REDIRECT_PORT = 8085;
const REDIRECT_URI = `http://localhost:${REDIRECT_PORT}/callback`;
const SCOPE = "https://www.googleapis.com/auth/yt-analytics.readonly";

async function loadEnvFile(filePath) {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const env = {};
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const idx = trimmed.indexOf("=");
      if (idx !== -1) {
        const key = trimmed.slice(0, idx).trim();
        const val = trimmed.slice(idx + 1).trim().replace(/^["']|["']$/g, "");
        env[key] = val;
      }
    }
    return env;
  } catch {
    return {};
  }
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("\n=========================================================");
  console.log("  YouTube Studio Analytics OAuth 2.0 Authorization Helper");
  console.log("=========================================================\n");

  const envLocalPath = path.join(process.cwd(), ".env.local");
  const envPath = path.join(process.cwd(), ".env");

  const localEnv = {
    ...(await loadEnvFile(envPath)),
    ...(await loadEnvFile(envLocalPath)),
    ...process.env,
  };

  let clientId = process.argv[2] || localEnv.YOUTUBE_CLIENT_ID;
  let clientSecret = process.argv[3] || localEnv.YOUTUBE_CLIENT_SECRET;

  if (!clientId) {
    console.log("Step 1: Enter your Google Cloud OAuth 2.0 Client ID.");
    console.log("(Created in Google Cloud Console -> APIs & Services -> Credentials -> OAuth 2.0 Client ID)");
    clientId = (await rl.question("Client ID: ")).trim();
  }

  if (!clientSecret) {
    clientSecret = (await rl.question("Client Secret: ")).trim();
  }

  if (!clientId || !clientSecret) {
    console.error("\n[Error] Both Client ID and Client Secret are required.");
    rl.close();
    process.exit(1);
  }

  console.log("\n---------------------------------------------------------");
  console.log("IMPORTANT: In your Google Cloud Console OAuth Client Settings:");
  console.log("Add this exact URI to 'Authorized redirect URIs':");
  console.log(`  👉  ${REDIRECT_URI}`);
  console.log("---------------------------------------------------------\n");

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", REDIRECT_URI);
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", SCOPE);
  authUrl.searchParams.set("access_type", "offline");
  authUrl.searchParams.set("prompt", "consent");

  console.log("Open this URL in your browser to authorize access to your YouTube channel:");
  console.log(`\n${authUrl.toString()}\n`);

  let authCode = "";
  let serverResolve;
  const serverPromise = new Promise((resolve) => {
    serverResolve = resolve;
  });

  const server = http.createServer((req, res) => {
    try {
      const reqUrl = new URL(req.url, `http://localhost:${REDIRECT_PORT}`);
      if (reqUrl.pathname === "/callback") {
        const code = reqUrl.searchParams.get("code");
        const error = reqUrl.searchParams.get("error");

        if (code) {
          res.writeHead(200, { "Content-Type": "text/html" });
          res.end(`
            <html>
              <body style="font-family:sans-serif; text-align:center; padding:50px; background:#0b1e17; color:#10b981;">
                <h2>Authorization Successful!</h2>
                <p style="color:#d1fae5;">You can close this tab and return to your terminal.</p>
              </body>
            </html>
          `);
          authCode = code;
          serverResolve(code);
        } else {
          res.writeHead(400, { "Content-Type": "text/plain" });
          res.end(`Authorization failed: ${error || "No code provided"}`);
        }
      } else {
        res.writeHead(404);
        res.end();
      }
    } catch {
      res.writeHead(500);
      res.end();
    }
  });

  server.listen(REDIRECT_PORT, () => {
    console.log(`Waiting for browser authorization callback on http://localhost:${REDIRECT_PORT}/callback ...`);
    console.log("(Or you can copy the 'code=' parameter from the URL bar after logging in)\n");
  });

  // Also support manual input if browser auto-redirect is blocked or remote
  const terminalInputPromise = (async () => {
    const input = await rl.question("Paste authorization code manually (or press Enter if using browser): ");
    return input.trim();
  })();

  const selectedCode = await Promise.race([
    serverPromise,
    terminalInputPromise.then((c) => (c ? c : serverPromise)),
  ]);

  server.close();

  if (!selectedCode) {
    console.error("[Error] No authorization code received.");
    rl.close();
    process.exit(1);
  }

  console.log("\nExchanging code for long-lived refresh token with Google OAuth...");

  try {
    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code: selectedCode,
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok || !tokenData.refresh_token) {
      console.error("\n[Error] Failed to obtain refresh token from Google:");
      console.error(tokenData);
      console.log("\nTip: Make sure you chose 'prompt=consent' and gave permission to YouTube Analytics.");
      rl.close();
      process.exit(1);
    }

    const refreshToken = tokenData.refresh_token;

    console.log("\n🎉 SUCCESS! Received your long-lived Refresh Token.\n");
    console.log(`YOUTUBE_CLIENT_ID=${clientId}`);
    console.log(`YOUTUBE_CLIENT_SECRET=${clientSecret}`);
    console.log(`YOUTUBE_REFRESH_TOKEN=${refreshToken}\n`);

    const saveAnswer = await rl.question("Would you like to automatically save these to .env.local? (y/N): ");
    if (saveAnswer.trim().toLowerCase() === "y") {
      let existing = "";
      try {
        existing = await fs.readFile(envLocalPath, "utf8");
      } catch {}

      // Update or append
      const updates = {
        YOUTUBE_CLIENT_ID: clientId,
        YOUTUBE_CLIENT_SECRET: clientSecret,
        YOUTUBE_REFRESH_TOKEN: refreshToken,
      };

      let newLines = existing ? existing.split("\n") : [];
      for (const [k, v] of Object.entries(updates)) {
        const foundIdx = newLines.findIndex((l) => l.trim().startsWith(`${k}=`));
        if (foundIdx !== -1) {
          newLines[foundIdx] = `${k}=${v}`;
        } else {
          newLines.push(`${k}=${v}`);
        }
      }

      await fs.writeFile(envLocalPath, newLines.join("\n").trim() + "\n", "utf8");
      console.log("✅ Successfully written to .env.local!");
    } else {
      console.log("Copy and paste the 3 lines above into your .env.local file.");
    }

    console.log("\nYour website will now automatically query authentic 30-day metrics from YouTube Studio!");
  } catch (err) {
    console.error("[Error] Exception during token exchange:", err);
  } finally {
    rl.close();
  }
}

main();

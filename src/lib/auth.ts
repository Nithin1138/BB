import crypto from "crypto";

// Read configuration from environment
export function getAuthConfig() {
  const clientId = process.env.GOOGLE_CLIENT_ID || "";
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
  const sessionSecret = process.env.SESSION_SECRET || "bbpulse-telugu-secure-jwt-key-2026";
  
  // Resolve base URL: custom env var, or Vercel URL, or localhost fallback
  let baseUrl = process.env.NEXT_PUBLIC_APP_URL || "";
  if (!baseUrl && process.env.VERCEL_URL) {
    baseUrl = `https://${process.env.VERCEL_URL}`;
  }
  if (!baseUrl) {
    baseUrl = "http://localhost:3000";
  }

  const redirectUri = `${baseUrl}/api/auth/callback/google`;

  return {
    clientId,
    clientSecret,
    sessionSecret,
    baseUrl,
    redirectUri,
    isGoogleConfigured: Boolean(clientId && clientSecret && !clientId.includes("YOUR_") && !clientSecret.includes("YOUR_"))
  };
}

// Generate Google OAuth Authorization URL
export function getGoogleOAuthUrl(state?: string): string {
  const { clientId, redirectUri } = getAuthConfig();
  
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state: state || "bbpulse_auth"
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

// Exchange authorization code for access & id tokens
export async function exchangeCodeForTokens(code: string): Promise<{
  access_token: string;
  id_token: string;
} | null> {
  const { clientId, clientSecret, redirectUri } = getAuthConfig();

  try {
    const res = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: new URLSearchParams({
        code,
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        grant_type: "authorization_code"
      })
    });

    if (!res.ok) {
      const errBody = await res.text();
      console.error("[OAuth] Token exchange error response:", errBody);
      return null;
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("[OAuth] Token exchange network error:", err);
    return null;
  }
}

// Fetch user profile from Google UserInfo endpoint
export async function getGoogleUserProfile(accessToken: string): Promise<{
  sub: string;
  email: string;
  name: string;
  picture: string;
} | null> {
  try {
    const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!res.ok) {
      console.error("[OAuth] Failed to fetch Google profile");
      return null;
    }

    const profile = await res.json();
    return profile;
  } catch (err) {
    console.error("[OAuth] Google profile fetch error:", err);
    return null;
  }
}

// Simple signed session token (HMAC-SHA256)
export interface SessionPayload {
  userId: string;
  email: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  role: 'user' | 'moderator' | 'admin';
  exp: number;
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">): string {
  const { sessionSecret } = getAuthConfig();
  const exp = Math.floor(Date.now() / 1000) + (30 * 24 * 60 * 60); // 30 days
  const fullPayload: SessionPayload = { ...payload, exp };
  
  const encodedPayload = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const { sessionSecret } = getAuthConfig();
  if (!token || !token.includes(".")) return null;

  const [encodedPayload, signature] = token.split(".");
  const expectedSig = crypto
    .createHmac("sha256", sessionSecret)
    .update(encodedPayload)
    .digest("base64url");

  if (signature !== expectedSig) {
    return null;
  }

  try {
    const payload: SessionPayload = JSON.parse(Buffer.from(encodedPayload, "base64url").toString("utf8"));
    if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

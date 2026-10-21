/**
 * Thandar token Worker
 *
 * Issues short-lived, single-use Gemini Live tokens so the browser never
 * sees the real API key. Self-contained (no packages), so it can be pasted
 * straight into the Cloudflare dashboard editor.
 *
 * Needs one secret: GEMINI_API_KEY
 */

// Sites allowed to request tokens (can be overridden with an ALLOWED_ORIGINS variable)
const DEFAULT_ALLOWED_ORIGINS = 'https://pwintsan4238.github.io,http://localhost:3000,http://localhost:4173';

const TOKEN_ENDPOINT = 'https://generativelanguage.googleapis.com/v1alpha/auth_tokens';

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS).split(',').map(s => s.trim()).filter(Boolean);
    const isAllowed = allowed.includes(origin);

    const cors = {
      'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Vary': 'Origin',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: isAllowed ? 204 : 403, headers: cors });
    }
    if (request.method !== 'POST' || new URL(request.url).pathname !== '/token') {
      return json({ error: 'Not found' }, 404, cors);
    }
    if (!isAllowed) {
      return json({ error: 'Origin not allowed' }, 403, cors);
    }
    if (!env.GEMINI_API_KEY) {
      return json({ error: 'Server is missing GEMINI_API_KEY' }, 500, cors);
    }

    const now = Date.now();
    const res = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY },
      body: JSON.stringify({
        uses: 1,
        // Must start a session within 1 minute; a session can last up to 30 minutes
        newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
        expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
      }),
    });

    const data = await res.json().catch(() => ({}));
    if (!res.ok || !data.name) {
      console.error('Token creation failed', res.status, JSON.stringify(data));
      return json({ error: 'Could not create token', status: res.status }, 502, cors);
    }
    return json({ token: data.name }, 200, cors);
  },
};

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

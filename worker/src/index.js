import { GoogleGenAI } from '@google/genai';

/**
 * Issues short-lived, single-use Gemini Live tokens so the browser never
 * sees the real API key.
 */
export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || '').split(',').map(s => s.trim()).filter(Boolean);
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

    try {
      const ai = new GoogleGenAI({ apiKey: env.GEMINI_API_KEY, httpOptions: { apiVersion: 'v1alpha' } });
      const now = Date.now();
      const token = await ai.authTokens.create({
        config: {
          uses: 1,
          // Must start a session within 1 minute; a session can last up to 30 minutes
          newSessionExpireTime: new Date(now + 60 * 1000).toISOString(),
          expireTime: new Date(now + 30 * 60 * 1000).toISOString(),
          httpOptions: { apiVersion: 'v1alpha' },
        },
      });
      return json({ token: token.name }, 200, cors);
    } catch (err) {
      console.error('Token creation failed', err);
      return json({ error: 'Could not create token' }, 502, cors);
    }
  },
};

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

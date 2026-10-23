/**
 * Thandar token Worker
 *
 * Issues short-lived, single-use Gemini Live tokens so the browser never
 * sees the real API key, and enforces daily free-usage limits:
 *   - signed-in users (Firebase ID token): USER_DAILY_LIMIT sessions/day
 *   - guests (counted by IP address):      GUEST_DAILY_LIMIT sessions/day
 *   - whole site:                          SITE_DAILY_LIMIT sessions/day
 * Days reset at midnight Myanmar time (UTC+6:30).
 *
 * Needs one secret: GEMINI_API_KEY
 * Limits can be changed with Worker variables of the same names.
 */

import { DurableObject } from 'cloudflare:workers';

// Sites allowed to request tokens (can be overridden with an ALLOWED_ORIGINS variable)
const DEFAULT_ALLOWED_ORIGINS = 'https://pwintsan4238.github.io,http://localhost:3000,http://localhost:4173';
const DEFAULT_FIREBASE_PROJECT_ID = 'ai-project-8916b';
const DEFAULTS = { USER_DAILY_LIMIT: 3, GUEST_DAILY_LIMIT: 1, SITE_DAILY_LIMIT: 200 };

const TOKEN_ENDPOINT = 'https://generativelanguage.googleapis.com/v1alpha/auth_tokens';
const FIREBASE_JWKS = 'https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com';
const MYANMAR_OFFSET_MS = 6.5 * 60 * 60 * 1000;

const MESSAGES = {
  limit_user: 'ယနေ့အတွက် အခမဲ့ အင်တာဗျူး အကြိမ်ရေ ပြည့်သွားပါပြီ။ မနက်ဖြန် ပြန်လာခဲ့ပါ။ (You have used today\'s free interviews. Please come back tomorrow.)',
  limit_guest: 'ဧည့်သည်အဖြစ် အခမဲ့ အင်တာဗျူး ပြည့်သွားပါပြီ။ ထပ်မံ လေ့ကျင့်ရန် အကောင့်ဝင်ပါ။ (Guest interview used. Please sign in to practise more.)',
  limit_site: 'ယနေ့ ဝန်ဆောင်မှု အသုံးပြုသူ များပြားနေပါသည်။ မနက်ဖြန် ပြန်ကြိုးစားပါ။ (Thandar is very busy today. Please try again tomorrow.)',
  bad_login: 'အကောင့် အတည်ပြုချက် သက်တမ်းကုန်သွားပါပြီ။ ပြန်လည် ဝင်ရောက်ပါ။ (Your login has expired. Please sign in again.)',
};

export default {
  async fetch(request, env) {
    const origin = request.headers.get('Origin') || '';
    const allowed = (env.ALLOWED_ORIGINS || DEFAULT_ALLOWED_ORIGINS).split(',').map(s => s.trim()).filter(Boolean);
    const isAllowed = allowed.includes(origin);

    const cors = {
      'Access-Control-Allow-Origin': isAllowed ? origin : 'null',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
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

    // Signed-in users send their Firebase ID token; everyone else is a guest counted by IP
    let who;
    const auth = request.headers.get('Authorization') || '';
    if (auth.startsWith('Bearer ')) {
      const uid = await verifyFirebaseToken(auth.slice(7), env.FIREBASE_PROJECT_ID || DEFAULT_FIREBASE_PROJECT_ID);
      if (!uid) return json({ error: MESSAGES.bad_login, code: 'bad_login' }, 401, cors);
      who = { key: 'user:' + uid, limit: limitOf(env, 'USER_DAILY_LIMIT'), code: 'limit_user' };
    } else {
      const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
      who = { key: 'ip:' + guestNetwork(ip), limit: limitOf(env, 'GUEST_DAILY_LIMIT'), code: 'limit_guest' };
    }

    const quota = env.QUOTA.get(env.QUOTA.idFromName('global'));
    const day = myanmarDay();
    const taken = await quota.take(day, who.key, who.limit, limitOf(env, 'SITE_DAILY_LIMIT'));
    if (!taken.ok) {
      const code = taken.reason === 'site' ? 'limit_site' : who.code;
      return json({ error: MESSAGES[code], code, remaining: 0 }, 429, cors);
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
      await quota.refund(day, who.key);
      return json({ error: 'Could not create token', status: res.status }, 502, cors);
    }
    return json({ token: data.name, remaining: taken.remaining }, 200, cors);
  },
};

/** Counts sessions per day. A single instance keeps the counts consistent. */
export class QuotaCounter extends DurableObject {
  async take(day, key, limit, siteLimit) {
    await this.startDay(day);
    const used = (await this.ctx.storage.get(key)) || 0;
    const total = (await this.ctx.storage.get('total')) || 0;
    if (used >= limit) return { ok: false, reason: 'self' };
    if (total >= siteLimit) return { ok: false, reason: 'site' };
    await this.ctx.storage.put({ [key]: used + 1, total: total + 1 });
    return { ok: true, remaining: limit - used - 1 };
  }

  async refund(day, key) {
    if ((await this.ctx.storage.get('day')) !== day) return;
    const used = (await this.ctx.storage.get(key)) || 0;
    const total = (await this.ctx.storage.get('total')) || 0;
    await this.ctx.storage.put({ [key]: Math.max(0, used - 1), total: Math.max(0, total - 1) });
  }

  // Yesterday's counts are thrown away when the first request of a new day arrives
  async startDay(day) {
    if ((await this.ctx.storage.get('day')) === day) return;
    await this.ctx.storage.deleteAll();
    await this.ctx.storage.put('day', day);
  }
}

let jwksCache = { keys: null, expires: 0 };

/** Returns the user's uid if the Firebase ID token is valid, otherwise null. */
async function verifyFirebaseToken(token, projectId) {
  try {
    const [h, p, s] = token.split('.');
    const header = JSON.parse(b64urlText(h));
    const payload = JSON.parse(b64urlText(p));
    const now = Math.floor(Date.now() / 1000);
    if (header.alg !== 'RS256') return null;
    if (payload.aud !== projectId || payload.iss !== 'https://securetoken.google.com/' + projectId) return null;
    if (!payload.sub || payload.exp <= now || payload.iat > now + 300) return null;

    const jwk = (await firebaseKeys()).find(k => k.kid === header.kid);
    if (!jwk) return null;
    const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
    const valid = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlBytes(s), new TextEncoder().encode(h + '.' + p));
    return valid ? payload.sub : null;
  } catch {
    return null;
  }
}

async function firebaseKeys() {
  if (jwksCache.keys && Date.now() < jwksCache.expires) return jwksCache.keys;
  const res = await fetch(FIREBASE_JWKS);
  const { keys } = await res.json();
  jwksCache = { keys, expires: Date.now() + 60 * 60 * 1000 };
  return keys;
}

function b64urlBytes(s) {
  const bin = atob(s.replace(/-/g, '+').replace(/_/g, '/') + '='.repeat((4 - (s.length % 4)) % 4));
  return Uint8Array.from(bin, c => c.charCodeAt(0));
}

function b64urlText(s) {
  return new TextDecoder().decode(b64urlBytes(s));
}

/**
 * An IPv6 household gets a whole /64 block and can switch addresses freely,
 * so guests on IPv6 are counted by their /64 network. IPv4 is used as is.
 */
function guestNetwork(ip) {
  if (!ip.includes(':') || ip.includes('.')) return ip;
  const [head, tail = ''] = ip.toLowerCase().split('::');
  const left = head ? head.split(':') : [];
  const right = tail ? tail.split(':') : [];
  const full = ip.includes('::') ? [...left, ...Array(8 - left.length - right.length).fill('0'), ...right] : left;
  return full.slice(0, 4).map(h => h.replace(/^0+(?=.)/, '')).join(':') + '::/64';
}

function myanmarDay() {
  return new Date(Date.now() + MYANMAR_OFFSET_MS).toISOString().slice(0, 10);
}

function limitOf(env, name) {
  const n = parseInt(env[name], 10);
  return Number.isFinite(n) && n >= 0 ? n : DEFAULTS[name];
}

function json(body, status, headers) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, 'Content-Type': 'application/json', 'Cache-Control': 'no-store' },
  });
}

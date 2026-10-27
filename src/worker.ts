/**
 * Same-origin API for the Moavia SEO Pro Cloudflare Worker.
 * Static files are still served by env.ASSETS; GEMINI_API_KEY is a secret,
 * never bundled with the public website.
 */
interface WorkerEnv {
  ASSETS: { fetch(request: Request): Promise<Response> };
  GEMINI_API_KEY?: string;
  AI_LIMITER?: { limit(input: { key: string }): Promise<{ success: boolean }> };
}
const noCacheHeaders = {
  'Content-Type': 'application/json; charset=utf-8',
  'Cache-Control': 'no-store',
  'X-Content-Type-Options': 'nosniff',
};
function json(payload: unknown, status = 200): Response {
  return new Response(JSON.stringify(payload), { status, headers: noCacheHeaders });
}
function field(data: Record<string, unknown>, name: string, length = 1000): string {
  const value = data[name];
  return typeof value === 'string' ? value.trim().slice(0, length) : '';
}
function escapeXML(text: string): string {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}
function decodeEntities(text: string): string {
  return text.replace(/&(?:amp|quot|apos|lt|gt|nbsp);/gi, match =>
    ({'&amp;':'&','&quot;':'"','&apos;':"'",'&lt;':'<','&gt;':'>','&nbsp;':' '} as Record<string,string>)[match.toLowerCase()] || match);
}
function getTag(html: string, pattern: RegExp): string {
  return decodeEntities(html.match(pattern)?.[1]?.replace(/<[^>]*>/g, '')?.trim() || '');
}
function validatePublicUrl(candidate: string): URL {
  const url = new URL(candidate);
  const host = url.hostname.toLowerCase().replace(/\.$/, '');
  if (url.protocol !== 'https:' || url.username || url.password || url.port ||
    host === 'localhost' || host.endsWith('.localhost') || host.endsWith('.local') ||
    host.endsWith('.internal') || host.endsWith('.test') || host.endsWith('.invalid') ||
    host.endsWith('.onion') || !host.includes('.') || /^[\d.]+$/.test(host) ||
    host.includes(':') || host.includes('%')) {
    throw new Error('Enter a public HTTPS website URL, without custom ports or IP addresses.');
  }
  return url;
}
async function inspectPage(rawUrl: string): Promise<string> {
  const url = validatePublicUrl(rawUrl);
  const abort = new AbortController();
  const timer = setTimeout(() => abort.abort(), 9000);
  try {
    const response = await fetch(url.href, {
      redirect: 'manual',
      signal: abort.signal,
      headers: { Accept: 'text/html', 'User-Agent': 'MoaviaSEOPro-Audit/1.0' },
    });
    if (response.status >= 300 && response.status < 400) {
      throw new Error('This URL redirects. Please paste the final HTTPS page URL.');
    }
    if (!response.ok || !response.headers.get('content-type')?.includes('text/html')) {
      throw new Error('The target page did not return readable HTML.');
    }
    if (Number(response.headers.get('content-length') || 0) > 500000) {
      throw new Error('The target page is too large for a free lightweight audit.');
    }
    let html = '';
    const reader = response.body?.getReader();
    if (!reader) throw new Error('The target page could not be read.');
    const decoder = new TextDecoder();
    let size = 0;
    try {
      while (size < 160000) {
        const { done, value } = await reader.read();
        if (done) break;
        size += value.byteLength;
        html += decoder.decode(value, { stream: true });
      }
    } finally {
      await reader.cancel().catch(() => {});
    }
    const title = getTag(html, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const description = getTag(html, /<meta\b(?=[^>]*\bname=["']description["'])(?=[^>]*\bcontent=["']([^"']*)["'])[^>]*>/i) ||
      getTag(html, /<meta\b(?=[^>]*\bcontent=["']([^"']*)["'])(?=[^>]*\bname=["']description["'])[^>]*>/i);
    const canonical = getTag(html, /<link\b(?=[^>]*\brel=["']canonical["'])(?=[^>]*\bhref=["']([^"']*)["'])[^>]*>/i);
    const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi)].map(m => decodeEntities(m[1].replace(/<[^>]*>/g, '').trim())).slice(0, 5);
    const schemaCount = (html.match(/<script\b[^>]*type=["']application\/ld\+json["']/gi) || []).length;
    const hasRobotsNoIndex = /<meta\b[^>]*name=["']robots["'][^>]*content=["'][^"']*noindex/i.test(html);
    const imgs = [...html.matchAll(/<img\b[^>]*>/gi)].slice(0, 150).map(m => m[0]);
    const missingAlt = imgs.filter(m => !/\balt\s*=\s*["'][^"']+["']/i.test(m)).length;
    const findings = [
      'Page: ' + url.href,
      'HTTP: ' + response.status + ' OK (HTML was fetched live)',
      'Title (' + title.length + ' characters): ' + (title || 'MISSING'),
      'Meta description (' + description.length + ' characters): ' + (description || 'MISSING'),
      'Canonical: ' + (canonical || 'Not found in fetched HTML'),
      'H1 count: ' + headings.length + ' | headings: ' + (headings.join(' / ') || 'none found'),
      'JSON-LD scripts: ' + schemaCount,
      'Image tags examined: ' + imgs.length + ' | without descriptive alt: ' + missingAlt,
      'Robots noindex found in HTML: ' + (hasRobotsNoIndex ? 'YES' : 'No'),
      'Recommendations: ' + [
        !title ? 'Add a unique descriptive <title>.' : (title.length > 65 ? 'Shorten the title where appropriate.' : 'Review title relevance and search intent.'),
        !description ? 'Add a useful meta description.' : 'Check description relevance and readability.',
        !canonical ? 'Specify a canonical URL if needed.' : 'Confirm the canonical points to the intended URL.',
        headings.length !== 1 ? 'Aim for one clear H1 per page.' : 'Keep headings organized.',
        missingAlt ? 'Add meaningful alt text to informative images.' : 'Image-alt coverage looks reasonable for inspected markup.',
      ].join(' '),
      'Scope: lightweight public HTML inspection only; does NOT measure Core Web Vitals, backlinks, rankings, or live traffic.',
    ];
    return findings.join('\n');
  } finally {
    clearTimeout(timer);
  }
}
async function gemini(
  env: WorkerEnv, prompt: string,
  options: { model?: string; tools?: unknown[]; system?: string } = {},
): Promise<{ text: string; sources: string[]; modelUsed: string }> {
  if (!env.GEMINI_API_KEY) {
    throw new ApiError(503, 'AI features need a Gemini free-tier API key. Add GEMINI_API_KEY as a Cloudflare Worker secret.');
  }
  const model = options.model || 'gemini-3.5-flash-lite';
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 25000);
  try {
    const body: Record<string, unknown> = {
      contents: [{ role: 'user', parts: [{ text: prompt.slice(0, 10000) }] }],
      generationConfig: { maxOutputTokens: 1300, temperature: 0.5 },
    };
    if (options.tools) body.tools = options.tools;
    if (options.system) body.systemInstruction = { parts: [{ text: options.system }] };
    // Only retry transient 503/504 for the higher-cost text chatbot model.
    // 429 is a quota condition: don't amplify it by automatic retries.
    const requestModel = async (modelName: string) => {
      const response = await fetch(
        'https://generativelanguage.googleapis.com/v1beta/models/' + encodeURIComponent(modelName) + ':generateContent',
        {
          method: 'POST',
          signal: controller.signal,
          headers: { 'Content-Type': 'application/json', 'x-goog-api-key': env.GEMINI_API_KEY! },
          body: JSON.stringify(body),
        },
      );
      const data = await response.json() as Record<string, any>;
      return { response, data };
    };
    let modelUsed = model;
    let { response, data } = await requestModel(modelUsed);
    if (!response.ok && [503, 504].includes(response.status) &&
        modelUsed === 'gemini-3.8-flash' && !options.tools) {
      modelUsed = 'gemini-3.5-flash-lite';
      ({ response, data } = await requestModel(modelUsed));
    }
    if (!response.ok) {
      const message = response.status === 429
        ? 'Google Gemini free-tier rate limit reached. Please try again later.'
        : response.status === 400 || response.status === 404
          ? 'Gemini rejected this request (HTTP ' + response.status + ', model: ' + model + '). Check this model and any grounding tools in Google AI Studio.'
          : response.status === 403
            ? 'Gemini API key is not authorized. Check AI Studio project and API restrictions.'
            : 'Gemini service could not complete the request (' + response.status + ').';
      throw new ApiError(response.status === 429 ? 429 : 502, message);
    }
    const candidate = data.candidates?.[0];
    const text = (candidate?.content?.parts || [])
      .filter((part: any) => typeof part.text === 'string')
      .map((part: any) => part.text).join('\n').trim();
    if (!text) throw new ApiError(502, 'Gemini returned no usable text for this request.');
    const sources: string[] = (candidate?.groundingMetadata?.groundingChunks || [])
      .map((c: any) => c.web?.uri || c.maps?.uri || '')
      .filter((v: string) => /^https:\/\//.test(v)).slice(0, 8);
    return { text, sources, modelUsed };
  } catch (error) {
    if (error instanceof ApiError) throw error;
    throw new ApiError(502, 'Gemini request timed out or could not be reached.');
  } finally {
    clearTimeout(timer);
  }
}
class ApiError extends Error {
  constructor(public status: number, message: string) { super(message); }
}
function quickMeta(data: Record<string, unknown>) {
  const title = field(data, 'pageTitle', 150);
  const desc = field(data, 'pageDescription', 300);
  const keyword = field(data, 'targetKeyword', 95);
  if (!keyword) throw new ApiError(400, 'Enter a target keyword.');
  const trim = (s: string, max: number) => s.replace(/\s+/g, ' ').slice(0, max).trim().replace(/[,;|:-]+$/, '');
  const label = trim(title.replace(/^[^|]+\|\s*/, '') || 'Professional Services', 40);
  const titles = [
    trim(keyword + ' | ' + label, 60),
    trim(keyword + ' — Services & Solutions', 60),
    trim('Discover ' + keyword + ' | ' + label, 60),
  ];
  const descriptions = [
    trim('Explore ' + keyword + '. ' + (desc || 'Get expert guidance, useful insights and practical solutions.') + ' Contact our team to learn more.', 155),
    trim('Looking for ' + keyword + '? ' + (desc || 'Discover services and proven approaches.') + ' Start with a free consultation today.', 155),
  ];
  return {
    optimizedTitles: [...new Set(titles)],
    optimizedDescriptions: [...new Set(descriptions)],
    rawText: 'Free rule-based suggestions (not AI). Review the wording and character counts before publishing.',
  };
}
function makeStudioSvg(data: Record<string, unknown>): string {
  const prompt = field(data, 'prompt', 160);
  if (!prompt) throw new ApiError(400, 'Please describe the graphic.');
  const resolution = field(data, 'resolution', 2);
  const pixels = resolution === '4K' ? 3840 : resolution === '2K' ? 2048 : 1024;
  const variation = field(data, 'mode', 10) === 'edit';
  const title = escapeXML(prompt.slice(0, 55));
  const parts = [title.slice(0, 28), title.slice(28, 55)].filter(Boolean);
  const a = variation ? '#0f766e' : '#4f46e5';
  const b = variation ? '#052e2b' : '#172554';
  const rows = parts.map((p,i) => '<text x="90" y="' + (470+i*106) + '" font-size="72" font-weight="bold" fill="white">' + p + '</text>').join('');
  const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="' + pixels + '" height="' + Math.round(pixels*0.5625) + '" viewBox="0 0 1024 576">'
    + '<defs><linearGradient id="g"><stop stop-color="' + b + '"/><stop offset="1" stop-color="' + a + '"/></linearGradient></defs>'
    + '<rect width="1024" height="576" fill="url(#g)"/><circle cx="900" cy="80" r="300" fill="#fff" opacity=".06"/>'
    + '<circle cx="820" cy="590" r="350" fill="#fff" opacity=".07"/>'
    + '<text x="90" y="115" font-family="Arial,sans-serif" font-size="32" font-weight="bold" fill="#99f6e4">MOAVIA SEO PRO</text>'
    + '<text x="90" y="175" font-family="Arial,sans-serif" font-size="23" fill="#cbd5e1">Original scalable promotional graphic</text>'
    + '<rect x="88" y="245" width="130" height="7" rx="3" fill="#99f6e4"/>'
    + '<g font-family="Arial,sans-serif">' + rows + '</g>'
    + '</svg>';
  return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(svg);
}
async function handleApi(request: Request, env: WorkerEnv, path: string): Promise<Response> {
  if (path === '/api/health' && request.method === 'GET') {
    return json({ ok: true, backend: 'Cloudflare Worker', geminiConfigured: Boolean(env.GEMINI_API_KEY) });
  }
  if (request.method !== 'POST') return json({ error: 'Method not allowed.' }, 405);
  const origin = request.headers.get('Origin');
  if (origin && origin !== new URL(request.url).origin) return json({error: 'Cross-origin requests are not permitted.'}, 403);
  if (Number(request.headers.get('content-length') || 0) > 16000) return json({ error: 'Request too large.' }, 413);
  const ip = request.headers.get('cf-connecting-ip') || 'unknown';
  if (env.AI_LIMITER) {
    const result = await env.AI_LIMITER.limit({ key: ip });
    if (!result.success) return json({ error: 'Too many tool requests. Please try again later.' }, 429);
  }
  const input = await request.text();
  if (input.length > 16000) return json({ error: 'Request too large.' }, 413);
  let data: Record<string, unknown>;
  try {
    const parsed = JSON.parse(input);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw Error();
    data = parsed as Record<string, unknown>;
  } catch { return json({ error: 'Invalid JSON request.' }, 400); }
  try {
    if (path === '/api/quick-optimize') return json(quickMeta(data));
    if (path === '/api/image-studio') {
      return json({
        image: makeStudioSvg(data),
        result: 'Free original SVG poster layout. This is a vector template, NOT AI image generation or photo editing.',
        kind: 'svg-template',
      });
    }
    if (path === '/api/animate-video') return json({ error: 'Free AI video generation is not available. Use the browser-based Motion Reel creator instead.' }, 501);
    if (path === '/api/audit') {
      const url = field(data, 'url', 1500);
      if (!url) throw new ApiError(400, 'Enter a website URL.');
      const findings = await inspectPage(url);
      let report = findings;
      // The on-page audit is a standalone free tool: do not fail a valid audit
      // just because the connected Gemini project has exhausted its quota.
      if (data.includeAI === true && env.GEMINI_API_KEY) {
        try {
          const ai = await gemini(env,
            'Using ONLY these observed HTML checks (never invent Core Web Vitals, ranks or backlinks), write a concise prioritized SEO plan. Industry: '
            + field(data, 'websiteType', 100) + '. Keywords: ' + field(data, 'targetKeywords', 200)
            + '. Reported issue: ' + field(data, 'mainIssue', 250) + '.\n\n' + findings);
          report += '\n\nOPTIONAL AI RECOMMENDATIONS (' + ai.modelUsed + ')\n' + ai.text;
        } catch (error) {
          const note = error instanceof ApiError ? error.message : 'AI unavailable.';
          report += '\n\nOPTIONAL AI UNAVAILABLE\n' + note
            + '\nThe real HTML audit above completed without needing Gemini.';
        }
      }
      return json({ auditReport: report });
    }
    if (path === '/api/search-grounding') {
      const question = field(data, 'query', 200);
      const location = field(data, 'location', 100);
      if (!question) throw new ApiError(400, 'Enter a search query.');
      // A standard Gemini free-tier text key is not a licensed SERP data feed.
      // Offer a genuinely useful planning checklist and a direct real-results link.
      const googleSearchUrl = 'https://www.google.com/search?q='
        + encodeURIComponent([question, location].filter(Boolean).join(' '));
      const analysis = [
        'FREE SERP RESEARCH PLANNER — no paid grounding and no invented ranking data',
        'Search query: ' + question,
        'Region/context: ' + (location || 'Not specified'),
        '',
        '1. Open Google Search using the link below to review real current search results.',
        '2. Note the first relevant organic competitors, their page types and the intent they address.',
        '3. Compare title tags, headings, FAQs, offers and internal navigation against your page.',
        '4. Identify gaps where you can add original examples, pricing clarity or useful service details.',
        '5. Track rankings over time with Google Search Console for websites you own.',
        '',
        'Limit: this mode does NOT scrape live SERP results, calculate ranking positions or claim competitor metrics. Search grounding requires a separately eligible model/tier and quota.',
      ].join('\n');
      return json({ analysis, googleSearchUrl, mode: 'free-research' });
    }
    if (path === '/api/maps-grounding') {
      const business = field(data, 'businessName', 150);
      const category = field(data, 'category', 150);
      const city = field(data, 'city', 100);
      if (!city || !business) throw new ApiError(400, 'Enter a business name and city.');
      const googleMapsUrl = 'https://www.google.com/maps/search/?api=1&query='
        + encodeURIComponent([business, city].filter(Boolean).join(' '));
      const localAudit = [
        'FREE LOCAL SEO CHECKLIST — no paid Google Maps grounding and no invented results',
        'Business: ' + business,
        'Category: ' + (category || 'Not supplied'),
        'Location: ' + city,
        '',
        '1. Open the Google Maps link below and verify your actual business listing.',
        '2. Confirm official business name, primary category, service areas, hours and phone.',
        '3. Add accurate photos, services and your website URL to your Google Business Profile.',
        '4. Keep the same business details on your website and reputable local directories.',
        '5. Encourage genuine customer reviews and reply professionally to each review.',
        '6. Improve location-relevant landing pages and ensure the site works on mobile.',
        '',
        'Limit: this checklist does NOT inspect real reviews, calculate map-pack positions, fetch competitors or measure proximity. Real Maps grounding requires an eligible paid/quota-enabled API tier.',
      ].join('\n');
      return json({ localAudit, googleMapsUrl, mode: 'free-checklist' });
    }
    if (path === '/api/video-analysis') {
      const title = field(data, 'videoTitle', 250);
      const desc = field(data, 'videoDescription', 4000);
      if (!title) throw new ApiError(400, 'Enter a video title.');
      const ai = await gemini(env, 'Review the supplied video TITLE and SCRIPT/DESCRIPTION for YouTube and TikTok SEO. '
        + 'You have NOT watched the video; do not claim to measure retention. Suggest improved hooks, titles, chapters, keywords and sample VideoObject JSON-LD. '
        + '\nTitle: ' + title + '\nScript: ' + desc);
      return json({ analysis: ai.text });
    }
    if (path === '/api/chat') {
      const role = field(data, 'role', 12);
      const messages = Array.isArray(data.messages) ? data.messages.slice(-8) : [];
      const conversation = messages.map((m: any) =>
        (m?.role === 'user' ? 'Visitor' : 'Assistant') + ': ' + String(m?.content || '').slice(0, 1100)).join('\n');
      if (!conversation) throw new ApiError(400, 'Please enter a message.');
      const specialization = ({seo:'SEO',webdev:'Web development',ads:'Advertising'} as Record<string,string>)[role] || 'Digital services';
      const chosenModel = field(data,'model',40) === 'gemini-3.8-flash' ? 'gemini-3.8-flash' : 'gemini-3.5-flash-lite';
      const ai = await gemini(env,
        'You are a Moavia SEO Pro consultant in Islamabad. Specialty: ' + specialization
        + '.\nKeep advice practical. Never guarantee rankings.\n' + conversation,
        {model: chosenModel});
      return json({ reply: ai.text, modelUsed: ai.modelUsed });
    }
    return json({ error: 'Unknown API endpoint.' }, 404);
  } catch (error) {
    if (error instanceof ApiError) return json({ error: error.message }, error.status);
    if (error instanceof TypeError || error instanceof Error) return json({ error: error.message.slice(0, 220) }, 400);
    return json({ error: 'Unable to complete the request.' }, 500);
  }
}
export default {
  async fetch(request: Request, env: WorkerEnv): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/api/')) return handleApi(request, env, url.pathname);
    return env.ASSETS.fetch(request);
  },
};

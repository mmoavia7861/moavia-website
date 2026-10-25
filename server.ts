import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

const apiKey = process.env.GEMINI_API_KEY || '';
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

// Multi-turn Gemini Chatbot with custom role-based instructions
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, role = 'general', model = 'gemini-3.8-flash' } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const systemInstructions: Record<string, string> = {
      seo: 'You are the Chief SEO Strategist at Moavia SEO Pro, founded by Moavia Hassan in Islamabad, Pakistan. You specialize in technical SEO, Core Web Vitals, algorithmic penalties, semantic keyword clustering, high-authority backlink outreach, and local map pack optimization. Offer precise, actionable advice with no fluff.',
      webdev: 'You are the Lead AI & WordPress Web Architect at Moavia SEO Pro. You guide clients through high-converting landing pages, full-stack React/Tailwind architectures, Elementor performance optimization, and AI-accelerated web prototyping.',
      ads: 'You are the Senior Performance Media Buyer at Moavia SEO Pro. You provide tactical expertise on Meta Ads (Facebook/Instagram, CAPI, Custom Audiences) and Google Ads (Search, Performance Max, Display, Negative Keywords, High-Intent Bidding).',
      general: 'You are the AI Strategy Consultant for Moavia SEO Pro, an elite digital marketing and web agency led by Moavia Hassan in Islamabad, Pakistan. You assist clients with SEO, AI websites, WordPress, Meta Ads, and Google Ads inquiries with high professionalism and clarity.',
    };

    const sysInstruction = systemInstructions[role] || systemInstructions.general;

    // Convert messages to Gemini format
    const contents = (messages || []).map((m: { role: string; content: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }],
    }));

    if (contents.length === 0) {
      return res.status(400).json({ error: 'Messages cannot be empty.' });
    }

    // Determine target model
    const targetModel = model === 'gemini-4-argon' ? 'gemini-4-argon' : model === 'gemini-3.1-flash-lite' ? 'gemini-3.1-flash-lite' : 'gemini-3.8-flash';

    const response = await ai.models.generateContent({
      model: targetModel,
      contents,
      config: {
        systemInstruction: sysInstruction,
      },
    });

    res.json({ reply: response.text });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    res.status(500).json({ error: error.message || 'Failed to generate response.' });
  }
});

// Deep Technical SEO Audit with High Thinking Mode (gemini-4-argon, thinkingLevel: 'HIGH')
app.post('/api/audit', async (req, res) => {
  try {
    const { url, websiteType, targetKeywords, mainIssue } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Conduct a comprehensive, deep technical SEO architectural audit and algorithmic growth blueprint for the following property:
Website URL: ${url}
Website Type: ${websiteType || 'General Business'}
Target Focus Keywords: ${targetKeywords || 'Not specified'}
Primary Reported Challenge: ${mainIssue || 'General Growth & Core Web Vitals Optimization'}

Analyze with deep reasoning:
1. Core Web Vitals (LCP, INP, CLS) & Rendering bottlenecks.
2. Indexation & Crawlability Architecture (Robots, Canonicalization, XML Sitemaps, Hreflang).
3. On-Page & Semantic Entity Relevance (H1-H6, Schema.org JSON-LD, Search Intent Matching).
4. Off-Page & Authority Gap Analysis.
5. 90-Day Step-by-Step Priority Roadmap (Quick Wins vs Structural Milestones).

Provide clear, senior-grade technical recommendations.`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
      config: {
        thinkingConfig: {
          thinkingLevel: 'HIGH' as any,
        },
      },
    });

    res.json({ auditReport: response.text });
  } catch (error: any) {
    console.error('Error in /api/audit:', error);
    res.status(500).json({ error: error.message || 'Failed to complete high-thinking SEO audit.' });
  }
});

// Low-latency quick meta and title optimizer (gemini-3.1-flash-lite)
app.post('/api/quick-optimize', async (req, res) => {
  try {
    const { pageTitle, pageDescription, targetKeyword } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `You are a high-speed SEO copywriter. Optimize these meta tags for maximum Click-Through Rate (CTR) and search ranking.
Current Title: "${pageTitle}"
Current Meta Description: "${pageDescription}"
Target Keyword: "${targetKeyword}"

Return 3 optimized, high-impact Title tags (strict 50-60 characters) and 3 compelling Meta Descriptions (strict 135-155 characters) that include call-to-actions, emotional hooks, and primary keyword placement. Formatted as clean structured JSON with keys: optimizedTitles and optimizedDescriptions.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-lite',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let data;
    try {
      data = JSON.parse(response.text || '{}');
    } catch {
      data = { rawText: response.text };
    }

    res.json(data);
  } catch (error: any) {
    console.error('Error in /api/quick-optimize:', error);
    res.status(500).json({ error: error.message || 'Low-latency optimization failed.' });
  }
});

// Search Grounded SERP & Competitor Intelligence (gemini-3.8-flash with googleSearch)
app.post('/api/search-grounding', async (req, res) => {
  try {
    const { query, location = 'Global' } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Use real-time Google Search data to analyze the live search landscape for query: "${query}" in region: "${location}".
Provide:
1. Live top ranking competitors and search intent trends.
2. Featured snippet and 'People Also Ask' opportunities.
3. Content gaps where Moavia SEO Pro can rank a client #1.
4. Recent Google algorithm updates impacting this search vertical.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    res.json({
      analysis: response.text,
      groundingMetadata: (response.candidates?.[0] as any)?.groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Error in /api/search-grounding:', error);
    res.status(500).json({ error: error.message || 'Search grounding request failed.' });
  }
});

// Google Maps Grounded Local SEO Ranker (gemini-3.8-flash with googleMaps)
app.post('/api/maps-grounding', async (req, res) => {
  try {
    const { businessName, category, city = 'Islamabad' } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Analyze local map pack positioning and local discovery for "${businessName}", operating as "${category}" in "${city}".
Evaluate Google Maps listing density, local competitor citations, NAP consistency benchmarks, Google Business Profile review velocity, and geo-targeted landing page strategies.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: prompt,
      config: {
        tools: [{ googleMaps: {} }],
      },
    });

    res.json({
      localAudit: response.text,
      groundingMetadata: (response.candidates?.[0] as any)?.groundingMetadata || null,
    });
  } catch (error: any) {
    console.error('Error in /api/maps-grounding:', error);
    res.status(500).json({ error: error.message || 'Maps grounding request failed.' });
  }
});

// Video SEO Content Understanding (gemini-4-argon)
app.post('/api/video-analysis', async (req, res) => {
  try {
    const { videoDescription, videoTitle, targetAudience } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    const prompt = `Perform comprehensive Video Content and YouTube/TikTok SEO understanding on this media asset:
Title: "${videoTitle}"
Description / Transcript summary: "${videoDescription}"
Target Audience: "${targetAudience || 'Modern Consumers & B2B buyers'}"

Provide:
1. Video hook strength and retention drop-off risk analysis.
2. High-CTR Thumbnail concept recommendations (color psychology, emotion, text placement).
3. Optimized Video Title variants (A/B testing for YouTube algorithm).
4. High-velocity tags, chapter markers, and SEO-optimized video description.
5. Video schema markup recommendations (VideoObject JSON-LD).`;

    const response = await ai.models.generateContent({
      model: 'gemini-4-argon',
      contents: prompt,
    });

    res.json({ analysis: response.text });
  } catch (error: any) {
    console.error('Error in /api/video-analysis:', error);
    res.status(500).json({ error: error.message || 'Video analysis failed.' });
  }
});

// Pro Image Studio (gemini-3-pro-image-preview & gemini-nano-banana-2.1)
app.post('/api/image-studio', async (req, res) => {
  try {
    const { prompt, resolution = '1K', mode = 'create', sourceImage } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    if (mode === 'edit' && sourceImage) {
      // Edit using gemini-nano-banana-2.1
      const response = await ai.models.generateContent({
        model: 'gemini-nano-banana-2.1',
        contents: [
          {
            text: `Edit the provided marketing asset according to this instruction: ${prompt}. Maintain ultra high quality, clean typography, and sharp brand aesthetic.`,
          },
          {
            inlineData: {
              mimeType: 'image/png',
              data: sourceImage.replace(/^data:image\/[a-z]+;base64,/, ''),
            },
          },
        ],
      });
      res.json({ message: 'Edit instructions processed', result: response.text });
    } else {
      // Generate using gemini-3-pro-image-preview with resolution affordance
      const response = await ai.models.generateImages({
        model: 'gemini-3-pro-image-preview',
        prompt: `${prompt}, ultra high quality, resolution ${resolution}, professional studio lighting, award-winning digital marketing aesthetic`,
        config: {
          numberOfImages: 1,
          outputMimeType: 'image/jpeg',
          aspectRatio: '1:1',
        },
      });

      const base64Image = response.generatedImages?.[0]?.image?.imageBytes;
      if (!base64Image) {
        return res.status(500).json({ error: 'Failed to generate image bytes.' });
      }
      res.json({ image: `data:image/jpeg;base64,${base64Image}`, resolution });
    }
  } catch (error: any) {
    console.error('Error in /api/image-studio:', error);
    res.status(500).json({ error: error.message || 'Image generation failed.' });
  }
});

// Animate Image into Video (gemini-omni-1.1-flash via Interactions API)
app.post('/api/animate-video', async (req, res) => {
  try {
    const { imageBase64, mimeType = 'image/png', prompt, aspectRatio = '16:9' } = req.body;
    if (!ai) {
      return res.status(503).json({ error: 'Gemini API key is not configured.' });
    }

    if (!imageBase64) {
      return res.status(400).json({ error: 'Image data is required to animate into video.' });
    }

    const cleanBase64 = imageBase64.replace(/^data:image\/[a-z]+;base64,/, '');

    const interaction = await ai.interactions.create({
      model: 'gemini-omni-1.1-flash',
      input: [
        {
          type: 'image',
          mime_type: mimeType,
          data: cleanBase64,
        },
        {
          type: 'text',
          text: prompt || 'Smooth cinematic camera push-in with gentle dynamic motion, advertising promo quality.',
        },
      ],
      response_format: {
        type: 'video',
        aspect_ratio: aspectRatio === '9:16' ? '9:16' : '16:9',
      },
    } as any);

    res.json({
      status: 'success',
      interactionId: interaction.id,
      video: (interaction as any).output_video || null,
    });
  } catch (error: any) {
    console.error('Error in /api/animate-video:', error);
    res.status(500).json({ error: error.message || 'Video animation failed.' });
  }
});

// Server-side Lead submission verification
app.post('/api/leads', (req, res) => {
  const { fullName, email, whatsapp, service, budget, description } = req.body;
  if (!fullName || !email || !service) {
    return res.status(400).json({ error: 'Full name, email, and service are required.' });
  }

  // Validated lead payload
  res.json({
    status: 'received',
    message: 'Lead received and ready for secure Firestore persistence.',
    lead: {
      fullName: String(fullName).slice(0, 100),
      email: String(email).trim().toLowerCase(),
      whatsapp: String(whatsapp || '').slice(0, 30),
      service: String(service),
      budget: String(budget || 'Flexible'),
      description: String(description || '').slice(0, 2000),
      status: 'New',
      createdAt: new Date().toISOString(),
    },
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  const PORT = 3000;
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Moavia SEO Pro full-stack server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();

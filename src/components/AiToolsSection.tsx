import React, { useState } from 'react';
import {
  Brain,
  Zap,
  Globe,
  MapPin,
  Image as ImageIcon,
  Video,
  Film,
  MessageSquare,
  Mic,
  Send,
  Loader2,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Copy,
  Download,
  MicOff,
  Volume2,
} from 'lucide-react';
import { AiProgressIndicator } from './AiProgressIndicator';

export const AiToolsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<
    'audit' | 'quick' | 'search' | 'maps' | 'image' | 'video' | 'animate' | 'chat' | 'voice'
  >('audit');

  // --- 1. Deep Thinking Audit State (gemini-2.5-flash) ---
  const [auditUrl, setAuditUrl] = useState('https://example.com');
  const [auditType, setAuditType] = useState('B2B Tech & SaaS');
  const [auditKeywords, setAuditKeywords] = useState('technical SEO, enterprise cloud solutions');
  const [auditIssue, setAuditIssue] = useState('High bounce rate on mobile, organic traffic stagnating');
  const [auditLoading, setAuditLoading] = useState(false);
  const [auditIncludeAI, setAuditIncludeAI] = useState(false);
  const [auditReport, setAuditReport] = useState<string | null>(null);

  // --- 2. Low-Latency Quick Meta State (gemini-2.5-flash-lite) ---
  const [quickTitle, setQuickTitle] = useState('SEO Agency Islamabad | Grow Traffic');
  const [quickDesc, setQuickDesc] = useState('We provide SEO services for businesses to rank on Google.');
  const [quickKw, setQuickKw] = useState('SEO Agency Islamabad');
  const [quickLoading, setQuickLoading] = useState(false);
  const [quickResult, setQuickResult] = useState<any>(null);

  // --- 3. Search Grounding State (gemini-2.5-flash + googleSearch) ---
  const [searchQuery, setSearchQuery] = useState('best SEO agency in Islamabad 2026');
  const [searchRegion, setSearchRegion] = useState('Pakistan');
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchData, setSearchData] = useState<any>(null);

  // --- 4. Maps Grounding State (gemini-2.5-flash + googleMaps) ---
  const [mapsBusiness, setMapsBusiness] = useState('Moavia SEO Pro');
  const [mapsCategory, setMapsCategory] = useState('Internet Marketing & SEO Agency');
  const [mapsCity, setMapsCity] = useState('Islamabad');
  const [mapsLoading, setMapsLoading] = useState(false);
  const [mapsData, setMapsData] = useState<any>(null);

  // --- 5. Image Studio State (free SVG poster template & SVG color variation) ---
  const [imagePrompt, setImagePrompt] = useState('Futuristic digital agency dashboard hologram with glowing SEO graph');
  const [imageResolution, setImageResolution] = useState<'1K' | '2K' | '4K'>('2K');
  const [imageMode, setImageMode] = useState<'create' | 'edit'>('create');
  const [imageLoading, setImageLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [imageEditText, setImageEditText] = useState<string | null>(null);

  // --- 6. Video SEO Analyzer State (gemini-2.5-flash) ---
  const [videoTitle, setVideoTitle] = useState('How We Scaled Organic Traffic by 400% in 90 Days');
  const [videoDesc, setVideoDesc] = useState('Complete case study breakdown showing on-page audits, schema markup, and backlink strategies.');
  const [videoLoading, setVideoLoading] = useState(false);
  const [videoAnalysis, setVideoAnalysis] = useState<string | null>(null);

  // --- 7. Animate Image into Video State (paid AI video model Interactions API) ---
  const [animateAspect, setAnimateAspect] = useState<'16:9' | '9:16'>('16:9');
  const [animatePrompt, setAnimatePrompt] = useState('Smooth cinematic drone reveal with vibrant dynamic lighting');
  const [animateLoading, setAnimateLoading] = useState(false);
  const [animatedVideoStatus, setAnimatedVideoStatus] = useState<string | null>(null);

  // --- 8. Multi-Turn Chatbot State ---
  const [chatMessages, setChatMessages] = useState<Array<{ role: string; content: string }>>([
    {
      role: 'model',
      content:
        'Greetings! I am the Moavia SEO Pro Strategic Consultant. Ask me about technical audits, Core Web Vitals, Google Ads campaigns, or AI website architecture.',
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [chatRole, setChatRole] = useState<'general' | 'seo' | 'webdev' | 'ads'>('general');
  const [chatModel, setChatModel] = useState<'gemini-3.8-flash' | 'gemini-3.5-flash-lite'>('gemini-3.5-flash-lite');
  const [chatLoading, setChatLoading] = useState(false);

  // --- 9. Live Voice Consultation State (browser microphone assistant) ---
  const [voiceActive, setVoiceActive] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState<string[]>([]);
  const [voiceStatus, setVoiceStatus] = useState<'idle' | 'listening' | 'speaking'>('idle');

  // Handlers for Tools
  const handleRunAudit = async () => {
    setAuditLoading(true);
    setAuditReport(null);
    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: auditUrl,
          websiteType: auditType,
          targetKeywords: auditKeywords,
          mainIssue: auditIssue,
          includeAI: auditIncludeAI,
        }),
      });
      const data = await res.json();
      setAuditReport(data.auditReport || data.error || 'Audit analysis complete.');
    } catch (e: any) {
      setAuditReport('Could not inspect public HTML. Check the final HTTPS URL and whether the site blocks automated requests. Gemini is not required.');
    } finally {
      setAuditLoading(false);
    }
  };

  const handleRunQuick = async () => {
    setQuickLoading(true);
    setQuickResult(null);
    try {
      const res = await fetch('/api/quick-optimize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pageTitle: quickTitle,
          pageDescription: quickDesc,
          targetKeyword: quickKw,
        }),
      });
      const data = await res.json();
      setQuickResult(data);
    } catch (e: any) {
      setQuickResult({ error: 'Quick optimization failed.' });
    } finally {
      setQuickLoading(false);
    }
  };

  const handleRunSearch = async () => {
    setSearchLoading(true);
    setSearchData(null);
    try {
      const res = await fetch('/api/search-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchQuery, location: searchRegion }),
      });
      const data = await res.json();
      setSearchData(data);
    } catch {
      setSearchData({ analysis: 'Error retrieving live Google Search grounding.' });
    } finally {
      setSearchLoading(false);
    }
  };

  const handleRunMaps = async () => {
    setMapsLoading(true);
    setMapsData(null);
    try {
      const res = await fetch('/api/maps-grounding', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          businessName: mapsBusiness,
          category: mapsCategory,
          city: mapsCity,
        }),
      });
      const data = await res.json();
      setMapsData(data);
    } catch {
      setMapsData({ localAudit: 'Error retrieving Google Maps grounding.' });
    } finally {
      setMapsLoading(false);
    }
  };

  const handleRunImage = async () => {
    setImageLoading(true);
    setGeneratedImage(null);
    setImageEditText(null);
    try {
      const res = await fetch('/api/image-studio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: imagePrompt,
          resolution: imageResolution,
          mode: imageMode,
        }),
      });
      const data = await res.json();
      if (data.image) setGeneratedImage(data.image);
      if (data.result) setImageEditText(data.result);
      if (data.error) setImageEditText(data.error);
    } catch {
      setImageEditText('Image studio encountered an issue.');
    } finally {
      setImageLoading(false);
    }
  };

  const handleRunVideo = async () => {
    setVideoLoading(true);
    setVideoAnalysis(null);
    try {
      const res = await fetch('/api/video-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          videoTitle,
          videoDescription: videoDesc,
          targetAudience: 'B2B Customers & Local Decision Makers',
        }),
      });
      const data = await res.json();
      setVideoAnalysis(data.analysis || data.error);
    } catch {
      setVideoAnalysis('Video analysis failed.');
    } finally {
      setVideoLoading(false);
    }
  };

  const handleRunAnimate = async () => {
    setAnimateLoading(true);
    setAnimatedVideoStatus('Real AI-generated video requires a paid provider API. Free Gemini text API keys do not support this feature. No video or job was created.');
    setAnimateLoading(false);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim() || chatLoading) return;
    const userMsg = { role: 'user', content: chatInput.trim() };
    const updatedMessages = [...chatMessages, userMsg];
    setChatMessages(updatedMessages);
    setChatInput('');
    setChatLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          role: chatRole,
          model: chatModel,
        }),
      });
      const data = await res.json();
      if (data.reply) {
        setChatMessages([...updatedMessages, { role: 'model', content: data.reply }]);
      } else {
        setChatMessages([
          ...updatedMessages,
          { role: 'model', content: data.error || 'Unable to generate response.' },
        ]);
      }
    } catch {
      setChatMessages([
        ...updatedMessages,
        { role: 'model', content: 'Network error communicating with AI Consultant.' },
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  const toggleVoiceSession = () => {
    if (voiceActive) {
      setVoiceActive(false);
      setVoiceStatus('idle');
      return;
    }
    const Recognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!Recognition) {
      setVoiceTranscript(['Speech recognition needs Chrome/Edge or a browser supporting the Web Speech API.']);
      return;
    }
    const recognition = new Recognition();
    recognition.lang = 'en-US';
    recognition.onresult = async (event: any) => {
      const utterance = event.results?.[0]?.[0]?.transcript || '';
      setVoiceTranscript(['You: ' + utterance]);
      setVoiceStatus('speaking');
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({role:'seo',messages:[{role:'user',content:utterance}]}),
        });
        const json = await res.json();
        const answer = json.reply || json.error || 'No response available.';
        setVoiceTranscript(['You: ' + utterance, 'Consultant: ' + answer]);
        if (res.ok && window.speechSynthesis) {
          const speech = new SpeechSynthesisUtterance(answer.slice(0, 900));
          speech.onend = () => setVoiceStatus('idle');
          speech.onerror = () => setVoiceStatus('idle');
          window.speechSynthesis.speak(speech);
        } else setVoiceStatus('idle');
      } catch {
        setVoiceTranscript(['Unable to reach the AI API.']);
        setVoiceStatus('idle');
      }
      setVoiceActive(false);
    };
    recognition.onerror = (e: any) => {
      setVoiceTranscript(['Microphone error: ' + (e.error || 'unknown')]);
      setVoiceActive(false);
      setVoiceStatus('idle');
    };
    recognition.onend = () => setVoiceActive(false);
    try {
      window.speechSynthesis?.cancel();
      recognition.start();
      setVoiceActive(true);
      setVoiceStatus('listening');
      setVoiceTranscript(['Browser microphone listening. Requires Gemini API key for AI responses.']);
    } catch {
      setVoiceTranscript(['Could not access microphone. Please check browser permissions.']);
      setVoiceActive(false);
    }
  };

  return (
    <section id="ai-tools" className="py-24 bg-[#F8F9FD] border-y border-[#E7EAF2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#8B63D8]/10 text-[#8B63D8] text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            Gemini Intelligence Suite
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#18243A] tracking-tight">
            Interactive AI Agency <span className="aurora-gradient-text">Power Tools</span>
          </h2>
          <p className="text-base sm:text-lg text-[#65738B]">
            Experience the real-time AI capabilities powering Moavia SEO Pro — from high-thinking algorithmic
            diagnostics to low-latency optimizations and live search grounding.
          </p>
        </div>

        <p className="mt-5 text-xs text-center text-[#65738B]">
          Free keyless tools: on-page HTML audit, metadata optimization and SVG designs. 
          Other text AI tools require your own GEMINI_API_KEY configured as a Cloudflare Worker Secret.
        </p>

        {/* Tab Selection Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 p-2 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm max-w-5xl mx-auto">
          <button
            onClick={() => setActiveTab('audit')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'audit'
                ? 'bg-[#5265D8] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            On-Page SEO Audit (Free)
          </button>

          <button
            onClick={() => setActiveTab('quick')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'quick'
                ? 'bg-[#17A99A] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            Quick Meta (Free)
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'search'
                ? 'bg-[#5265D8] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Globe className="w-3.5 h-3.5" />
            SERP Research (Free)
          </button>

          <button
            onClick={() => setActiveTab('maps')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'maps'
                ? 'bg-[#E8B451] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            Local SEO (Free)
          </button>

          <button
            onClick={() => setActiveTab('image')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'image'
                ? 'bg-[#8B63D8] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <ImageIcon className="w-3.5 h-3.5" />
            Free SVG Graphics (1K–4K)
          </button>

          <button
            onClick={() => setActiveTab('video')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'video'
                ? 'bg-[#F17F72] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            Video SEO (Text Analysis)
          </button>

          <button
            onClick={() => setActiveTab('animate')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'animate'
                ? 'bg-[#8B63D8] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            AI Video (Paid Only)
          </button>

          <button
            onClick={() => setActiveTab('chat')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'chat'
                ? 'bg-[#18243A] text-white shadow-md'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Multi-Turn Chatbot
          </button>

          <button
            onClick={() => setActiveTab('voice')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all ${
              activeTab === 'voice'
                ? 'bg-rose-600 text-white shadow-md animate-pulse'
                : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
            }`}
          >
            <Mic className="w-3.5 h-3.5" />
            Browser Voice
          </button>
        </div>

        {/* Dynamic Tool Content Panels */}
        <div className="mt-8 max-w-5xl mx-auto">
          
          {/* 1. Deep Thinking Audit */}
          {activeTab === 'audit' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <Brain className="w-5 h-5 text-[#5265D8]" />
                    On-Page SEO Audit — Actual HTML Checks
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Live HTML audit (optional Gemini suggestions only if key configured)
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#5265D8]/10 text-[#5265D8] px-3 py-1 rounded-full">
                  Live Page HTML
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Target Website URL</label>
                  <input
                    type="text"
                    value={auditUrl}
                    onChange={(e) => setAuditUrl(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Website Category</label>
                  <input
                    type="text"
                    value={auditType}
                    onChange={(e) => setAuditType(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Core Keywords</label>
                  <input
                    type="text"
                    value={auditKeywords}
                    onChange={(e) => setAuditKeywords(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Primary Reported Defect / Drop</label>
                  <input
                    type="text"
                    value={auditIssue}
                    onChange={(e) => setAuditIssue(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 text-xs text-[#465571]">
                <input type="checkbox" checked={auditIncludeAI}
                  onChange={(event) => setAuditIncludeAI(event.target.checked)} />
                Optional Gemini advice (uses AI quota). The HTML audit works without it.
              </label>
              <button
                onClick={handleRunAudit}
                disabled={auditLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#5265D8] to-[#8B63D8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5265D8]/20 disabled:opacity-50"
              >
                {auditLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Inspecting public website HTML...</span>
                  </>
                ) : (
                  <>
                    <Brain className="w-4 h-4" />
                    <span>Run Free On-Page HTML Audit</span>
                  </>
                )}
              </button>

              <AiProgressIndicator
                isLoading={auditLoading}
                steps={[
                  'Fetching public website HTML...',
                  'Inspecting title, canonical, H1 and metadata...',
                  'Checking JSON-LD and image markup...',
                  'Preparing fact-based SEO findings...',
                ]}
                accentColor="#5265D8"
              />

              {auditReport && (
                <div className="mt-4 p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-[#17A99A] uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" />
                      On-Page HTML Audit
                    </span>
                  </div>
                  <pre className="text-xs text-[#18243A] font-sans whitespace-pre-wrap leading-relaxed">
                    {auditReport}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* 2. Low-Latency Quick Meta */}
          {activeTab === 'quick' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <Zap className="w-5 h-5 text-[#17A99A]" />
                    Low-Latency Instant Title & Meta Optimizer
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Powered by ultra-fast model <span className="font-mono text-[#17A99A] font-bold">gemini-3.5-flash-lite</span>
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#17A99A]/10 text-[#17A99A] px-3 py-1 rounded-full">
                  No API key required
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Target Keyword</label>
                  <input
                    type="text"
                    value={quickKw}
                    onChange={(e) => setQuickKw(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Current Page Title</label>
                  <input
                    type="text"
                    value={quickTitle}
                    onChange={(e) => setQuickTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Current Meta Description</label>
                  <textarea
                    rows={2}
                    value={quickDesc}
                    onChange={(e) => setQuickDesc(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
              </div>

              <button
                onClick={handleRunQuick}
                disabled={quickLoading}
                className="w-full py-3.5 rounded-xl bg-[#17A99A] hover:bg-[#149284] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {quickLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
                <span>Generate High-CTR Meta Tags with Flash-Lite</span>
              </button>

              <AiProgressIndicator
                isLoading={quickLoading}
                steps={[
                  'Analyzing page title & meta description...',
                  'Optimizing for high Click-Through Rate with Flash-Lite...',
                  'Enforcing strict 50-60 character limits...',
                  'Finalizing tag recommendations...',
                ]}
                accentColor="#17A99A"
              />

              {quickResult && (
                <div className="p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-4">
                  <h4 className="text-xs font-bold text-[#17A99A] uppercase tracking-wider">
                    Optimized Tag Proposals
                  </h4>
                  {quickResult.optimizedTitles && (
                    <div>
                      <p className="text-xs font-bold text-[#18243A] mb-1.5">Recommended Title Tags (50-60 chars):</p>
                      <ul className="space-y-1.5 text-xs text-[#18243A]">
                        {quickResult.optimizedTitles.map((t: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#E7EAF2]">
                            <span className="font-bold text-[#5265D8]">#{i + 1}</span>
                            <span>{t}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {quickResult.optimizedDescriptions && (
                    <div>
                      <p className="text-xs font-bold text-[#18243A] mb-1.5">Recommended Meta Descriptions (135-155 chars):</p>
                      <ul className="space-y-1.5 text-xs text-[#18243A]">
                        {quickResult.optimizedDescriptions.map((d: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 p-2 bg-white rounded-lg border border-[#E7EAF2]">
                            <span className="font-bold text-[#17A99A]">#{i + 1}</span>
                            <span>{d}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {quickResult.error && <p className="text-xs text-red-700">{quickResult.error}</p>}
                  {quickResult.rawText && (
                    <p className="text-xs text-[#18243A] whitespace-pre-wrap">{quickResult.rawText}</p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* 3. Search Grounding SERP Scout */}
          {activeTab === 'search' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <Globe className="w-5 h-5 text-[#5265D8]" />
                    Free SERP Research Planner
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Create a free keyword checklist and open real Google results. No scraped rankings or fabricated metrics.
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#5265D8]/10 text-[#5265D8] px-3 py-1 rounded-full">
                  Free research
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Target Commercial Search Query</label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Search Region</label>
                  <input
                    type="text"
                    value={searchRegion}
                    onChange={(e) => setSearchRegion(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
              </div>

              <button
                onClick={handleRunSearch}
                disabled={searchLoading}
                className="w-full py-3.5 rounded-xl bg-[#5265D8] hover:bg-[#4353bc] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {searchLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Globe className="w-4 h-4" />}
                <span>Create Free Keyword Research Checklist</span>
              </button>

              <AiProgressIndicator
                isLoading={searchLoading}
                steps={[
                  'Preparing free keyword research guide...',
                  'Reviewing keyword and region inputs...',
                  'Preparing a real Google Search link...',
                  'Finishing the research checklist...',
                ]}
                accentColor="#5265D8"
              />

              {searchData && (
                <div className="p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-3">
                  <span className="text-xs font-bold text-[#5265D8] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#17A99A]" />
                    Free Research Checklist (Not Live Rankings)
                  </span>
                  <div className="text-xs text-[#18243A] whitespace-pre-wrap leading-relaxed">
                    {searchData.analysis || searchData.error}
                    {searchData.googleSearchUrl && (
                      <a href={searchData.googleSearchUrl} target="_blank" rel="noopener noreferrer"
                        className="mt-3 block underline font-bold text-[#5265D8]">Open real Google Search results</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 4. Google Maps Grounding */}
          {activeTab === 'maps' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#E8B451]" />
                    Free Local SEO Checklist
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Create a local SEO checklist and open real Google Maps results. No measured reviews or map-pack rankings.
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#E8B451]/15 text-[#E8B451] px-3 py-1 rounded-full">
                  Free checklist
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Business Name</label>
                  <input
                    type="text"
                    value={mapsBusiness}
                    onChange={(e) => setMapsBusiness(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Business Category</label>
                  <input
                    type="text"
                    value={mapsCategory}
                    onChange={(e) => setMapsCategory(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Target City / Zone</label>
                  <input
                    type="text"
                    value={mapsCity}
                    onChange={(e) => setMapsCity(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
              </div>

              <button
                onClick={handleRunMaps}
                disabled={mapsLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#E8B451] to-[#F17F72] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {mapsLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MapPin className="w-4 h-4" />}
                <span>Create Local SEO Checklist</span>
              </button>

              <AiProgressIndicator
                isLoading={mapsLoading}
                steps={[
                  'Reading business and city...',
                  'Preparing a real Google Maps link...',
                  'Reviewing accurate Business Profile tips...',
                  'Creating practical local SEO steps...',
                ]}
                accentColor="#E8B451"
              />

              {mapsData && (
                <div className="p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-3">
                  <span className="text-xs font-bold text-[#E8B451] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#17A99A]" />
                    Local SEO Checklist (Not Live Map Pack Data)
                  </span>
                  <div className="text-xs text-[#18243A] whitespace-pre-wrap leading-relaxed">
                    {mapsData.localAudit || mapsData.error}
                    {mapsData.googleMapsUrl && (
                      <a href={mapsData.googleMapsUrl} target="_blank" rel="noopener noreferrer"
                        className="mt-3 block underline font-bold text-[#5265D8]">Open real Google Maps listings</a>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 5. Pro Image Studio */}
          {activeTab === 'image' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#8B63D8]" />
                    High-Resolution Visual Asset Studio
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Original SVG templates with selectable size and colors, not AI-generated photography.
                  </p>
                </div>

                {/* Resolution Affordance Picker */}
                <div className="flex items-center gap-1 bg-[#F8F9FD] p-1 rounded-xl border border-[#E7EAF2]">
                  {(['1K', '2K', '4K'] as const).map((res) => (
                    <button
                      key={res}
                      onClick={() => setImageResolution(res)}
                      className={`text-xs font-extrabold px-3 py-1 rounded-lg transition-all ${
                        imageResolution === res
                          ? 'bg-[#8B63D8] text-white shadow-sm'
                          : 'text-[#65738B] hover:text-[#18243A]'
                      }`}
                    >
                      {res}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">
                  Creative Prompt or Asset Description
                </label>
                <textarea
                  rows={2}
                  value={imagePrompt}
                  onChange={(e) => setImagePrompt(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <div className="flex items-center gap-4">
                <label className="text-xs font-bold text-[#18243A] flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="imageMode"
                    checked={imageMode === 'create'}
                    onChange={() => setImageMode('create')}
                    className="accent-[#8B63D8]"
                  />
                  <span>Design a downloadable SVG marketing graphic</span>
                </label>
                <label className="text-xs font-bold text-[#18243A] flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="imageMode"
                    checked={imageMode === 'edit'}
                    onChange={() => setImageMode('edit')}
                    className="accent-[#8B63D8]"
                  />
                  <span>Alternate SVG color theme</span>
                </label>
              </div>

              <button
                onClick={handleRunImage}
                disabled={imageLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B63D8] to-[#5265D8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {imageLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <ImageIcon className="w-4 h-4" />
                )}
                <span>Generate {imageResolution} Studio Graphic</span>
              </button>

              <AiProgressIndicator
                isLoading={imageLoading}
                steps={[
                  `Configuring studio canvas for ${imageResolution} resolution...`,
                  'Creating your SVG poster design...',
                  'Applying studio lighting and sharp brand aesthetics...',
                  'Finalizing graphic render stream...',
                ]}
                accentColor="#8B63D8"
              />

              {generatedImage && (
                <div className="mt-4 p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] text-center space-y-3">
                  <img
                    src={generatedImage}
                    alt="Generated Studio Asset"
                    className="max-h-80 mx-auto rounded-xl shadow-lg border border-[#E7EAF2]"
                  />
                  <div className="flex items-center justify-center gap-3">
                    <span className="text-xs font-bold text-[#17A99A]">
                      Scalable {imageResolution} SVG template
                    </span>
                    <a
                      href={generatedImage}
                      download={`moavia-seopro-${imageResolution.toLowerCase()}.svg`}
                      className="text-xs font-bold bg-[#18243A] text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Download
                    </a>
                  </div>
                </div>
              )}

              {imageEditText && (
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] text-xs text-[#18243A]">
                  {imageEditText}
                </div>
              )}
            </div>
          )}

          {/* 6. Video SEO Analyzer */}
          {activeTab === 'video' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <Video className="w-5 h-5 text-[#F17F72]" />
                    Video Content Understanding & YouTube/TikTok SEO
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Powered by model <span className="font-mono text-[#F17F72] font-bold">gemini-3.5-flash-lite</span>
                  </p>
                </div>
                <span className="text-xs font-bold bg-[#F17F72]/15 text-[#F17F72] px-3 py-1 rounded-full">
                  Video Intelligence
                </span>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Video Title / Hook</label>
                  <input
                    type="text"
                    value={videoTitle}
                    onChange={(e) => setVideoTitle(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">
                    Transcript Summary / Video Script / Description
                  </label>
                  <textarea
                    rows={3}
                    value={videoDesc}
                    onChange={(e) => setVideoDesc(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>
              </div>

              <button
                onClick={handleRunVideo}
                disabled={videoLoading}
                className="w-full py-3.5 rounded-xl bg-[#F17F72] hover:bg-[#de6e61] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {videoLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Video className="w-4 h-4" />}
                <span>Analyze Video Retention Hooks & Schema with Gemini 4 Argon</span>
              </button>

              <AiProgressIndicator
                isLoading={videoLoading}
                steps={[
                  'Analyzing video hook strength and drop-off risks...',
                  'Evaluating YouTube & TikTok algorithmic search signals...',
                  'Drafting high-CTR title variations and tags...',
                  'Generating structured VideoObject schema markup...',
                ]}
                accentColor="#F17F72"
              />

              {videoAnalysis && (
                <div className="p-5 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-3">
                  <span className="text-xs font-bold text-[#F17F72] uppercase tracking-wider flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#17A99A]" />
                    Video SEO Breakdown
                  </span>
                  <div className="text-xs text-[#18243A] whitespace-pre-wrap leading-relaxed">
                    {videoAnalysis}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 7. Animate Image into Video */}
          {activeTab === 'animate' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <Film className="w-5 h-5 text-[#8B63D8]" />
                    Animate Image into Video (Photo-to-Video Reel)
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Paid-tier AI video generation is not included in this free setup.
                  </p>
                </div>

                {/* Aspect Ratio Picker (16:9 or 9:16) */}
                <div className="flex items-center gap-1 bg-[#F8F9FD] p-1 rounded-xl border border-[#E7EAF2]">
                  <button
                    onClick={() => setAnimateAspect('16:9')}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                      animateAspect === '16:9' ? 'bg-[#8B63D8] text-white shadow-sm' : 'text-[#65738B]'
                    }`}
                  >
                    16:9 (Landscape)
                  </button>
                  <button
                    onClick={() => setAnimateAspect('9:16')}
                    className={`text-xs font-bold px-3 py-1 rounded-lg transition-all ${
                      animateAspect === '9:16' ? 'bg-[#8B63D8] text-white shadow-sm' : 'text-[#65738B]'
                    }`}
                  >
                    9:16 (Portrait / Reel)
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2]">
                <img
                  src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
                  alt="Selected Asset"
                  className="w-20 h-20 rounded-xl object-contain border border-[#E7EAF2] bg-white p-1"
                />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#18243A]">Source Asset: Moavia SEO Pro Official Logo / Graphic</h4>
                  <p className="text-xs text-[#65738B]">
                    Aspect Ratio: <span className="font-bold text-[#8B63D8]">{animateAspect}</span>. Ready for dynamic reel animation.
                  </p>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">
                  Animation & Camera Motion Prompt
                </label>
                <input
                  type="text"
                  value={animatePrompt}
                  onChange={(e) => setAnimatePrompt(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <button
                onClick={handleRunAnimate}
                disabled={animateLoading}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#8B63D8] to-[#17A99A] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md disabled:opacity-50"
              >
                {animateLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Film className="w-4 h-4" />}
                <span>Check Paid Video Requirement ({animateAspect})</span>
              </button>

              <AiProgressIndicator
                isLoading={animateLoading}
                steps={[
                  'Encoding input image frame buffer...',
                  `Dispatching to Gemini Omni 1.1 Flash via Interactions API...`,
                  `Synthesizing cinematic ${animateAspect} motion camera paths...`,
                  'Encoding promotional video reel output...',
                ]}
                accentColor="#8B63D8"
              />

              {animatedVideoStatus && (
                <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] text-xs font-medium text-[#18243A]">
                  <p className="font-bold text-[#17A99A] mb-1">Omni Interactions Pipeline Result:</p>
                  <p>{animatedVideoStatus}</p>
                </div>
              )}
            </div>
          )}

          {/* 8. Multi-Turn Chatbot */}
          {activeTab === 'chat' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-5">
              <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#E7EAF2]">
                <div>
                  <h3 className="text-xl font-bold text-[#18243A] flex items-center gap-2">
                    <MessageSquare className="w-5 h-5 text-[#5265D8]" />
                    Multi-Turn AI Agency Consultant
                  </h3>
                  <p className="text-xs text-[#65738B]">
                    Maintains full conversational thread with specialized agency persona roles.
                  </p>
                </div>

                {/* Role & Model Pickers */}
                <div className="flex flex-wrap items-center gap-2">
                  <select
                    value={chatRole}
                    onChange={(e) => setChatRole(e.target.value as any)}
                    className="text-xs font-bold p-2 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] text-[#18243A]"
                  >
                    <option value="general">Role: General Agency Consultant</option>
                    <option value="seo">Role: Chief SEO Strategist</option>
                    <option value="webdev">Role: AI & WordPress Web Architect</option>
                    <option value="ads">Role: Media Buyer (Meta & Google Ads)</option>
                  </select>

                  <select
                    value={chatModel}
                    onChange={(e) => setChatModel(e.target.value as any)}
                    className="text-xs font-bold p-2 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] text-[#5265D8]"
                  >
                    <option value="gemini-3.8-flash">Gemini 3.8 Flash</option>
                    
                    <option value="gemini-3.5-flash-lite">Gemini 3.5 Flash-Lite (Free)</option>
                  </select>
                </div>
              </div>

              {/* Scrollable Conversation Thread */}
              <div className="h-80 overflow-y-auto p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] space-y-3">
                {chatMessages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                        msg.role === 'user'
                          ? 'bg-[#5265D8] text-white rounded-tr-none'
                          : 'bg-white text-[#18243A] border border-[#E7EAF2] shadow-sm rounded-tl-none'
                      }`}
                    >
                      <span className="block text-[10px] font-bold opacity-75 mb-1">
                        {msg.role === 'user' ? 'You' : `Moavia SEO Pro (${chatRole.toUpperCase()})`}
                      </span>
                      <p className="whitespace-pre-wrap">{msg.content}</p>
                    </div>
                  </div>
                ))}
                {chatLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white p-3 rounded-2xl border border-[#E7EAF2] text-xs flex items-center gap-2 text-[#65738B]">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-[#5265D8]" />
                      <span>Responding with {chatModel}...</span>
                    </div>
                  </div>
                )}
              </div>

              <AiProgressIndicator
                isLoading={chatLoading}
                steps={[
                  `Connecting to ${chatModel}...`,
                  `Analyzing question with ${chatRole.toUpperCase()} agency role...`,
                  'Formulating actionable response...',
                ]}
                accentColor="#5265D8"
              />

              {/* Chat Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Ask a question about SEO strategy, pricing, or AI web development..."
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                  className="flex-1 text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                />
                <button
                  onClick={handleSendChat}
                  disabled={chatLoading || !chatInput.trim()}
                  className="bg-[#5265D8] hover:bg-[#4353bc] text-white px-5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-50 transition-colors"
                >
                  <Send className="w-4 h-4" />
                  <span>Send</span>
                </button>
              </div>
            </div>
          )}

          {/* 9. Live Voice Consultation */}
          {activeTab === 'voice' && (
            <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 text-center">
              <div className="max-w-md mx-auto space-y-2">
                <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-wider">
                  Browser Speech (browser microphone assistant)
                </span>
                <h3 className="text-2xl font-extrabold text-[#18243A]">
                  Real-Time Voice Consultation
                </h3>
                <p className="text-xs text-[#65738B]">
                  Experience low-latency real-time voice interaction with Moavia SEO Pro's AI consultant.
                </p>
              </div>

              {/* Voice Orb Button */}
              <div className="py-6 flex flex-col items-center justify-center">
                <button
                  onClick={toggleVoiceSession}
                  className={`w-28 h-28 rounded-full flex items-center justify-center transition-all shadow-2xl ${
                    voiceActive
                      ? 'bg-rose-600 text-white animate-pulse ring-8 ring-rose-200'
                      : 'bg-gradient-to-br from-[#5265D8] to-[#8B63D8] text-white hover:scale-105'
                  }`}
                >
                  {voiceActive ? <Mic className="w-10 h-10" /> : <MicOff className="w-10 h-10 opacity-75" />}
                </button>
                <span className="text-xs font-bold text-[#18243A] mt-4">
                  {voiceActive ? 'Voice Consultation Active (Live API Connected)' : 'Click to Start Voice Session'}
                </span>
              </div>

              {/* Transcript Box */}
              <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] text-left max-w-lg mx-auto space-y-2">
                <div className="flex items-center justify-between text-[11px] font-bold text-[#65738B]">
                  <span>Live Stream Status:</span>
                  <span className={voiceActive ? 'text-emerald-600 font-bold' : 'text-slate-400'}>
                    {voiceActive ? '● Streaming Audio' : '○ Standby'}
                  </span>
                </div>
                {voiceTranscript.map((t, idx) => (
                  <p key={idx} className="text-xs text-[#18243A] font-medium leading-relaxed">
                    {t}
                  </p>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};

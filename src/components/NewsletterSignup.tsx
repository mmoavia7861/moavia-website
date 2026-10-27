import React, { useState } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Sparkles,
  AlertCircle,
  Shield,
  BellRing,
  ArrowRight
} from 'lucide-react';
import { subscribeToNewsletter, FirestoreRestError, isDuplicateFirestoreDocumentError } from '../services/newsletter';

export const NewsletterSignup: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [alreadySubscribed, setAlreadySubscribed] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      setStatus('error');
      setFeedbackMessage('Please enter your email address.');
      return;
    }
    setStatus('loading');
    setFeedbackMessage('');
    try {
      await subscribeToNewsletter(email);
      setAlreadySubscribed(false);
      setStatus('success');
      setFeedbackMessage('Your email has been saved in our newsletter list.');
    } catch (error: unknown) {
      if (isDuplicateFirestoreDocumentError(error)) {
        setAlreadySubscribed(true);
        setStatus('success');
        setFeedbackMessage('This email is already subscribed. No duplicate newsletter record was created.');
        return;
      }
      console.warn('Newsletter Firestore submission not confirmed:', error instanceof Error ? error.name : 'Unknown error');
      setAlreadySubscribed(false);
      setStatus('error');
      if (error instanceof FirestoreRestError) {
        setFeedbackMessage(error.message);
      } else {
        setFeedbackMessage(error instanceof Error ? error.message : 'Subscription could not be confirmed.');
      }
    }
  };

  const handleReset = () => {
    setEmail('');
    setStatus('idle');
    setFeedbackMessage('');
    setAlreadySubscribed(false);
  };

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900/90 via-[#18243A]/90 to-slate-900/95 border border-white/10 shadow-2xl p-6 sm:p-10 mb-16 backdrop-blur-md">
      {/* Subtle ambient gradient highlights */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-[#5265D8]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-[#17A99A]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        
        {/* Left Column: Heading, Value Proposition & Benefits */}
        <div className="lg:col-span-7 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[#17A99A] text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-[#17A99A]" />
            <span>SEO Tips & Search Intelligence</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#17A99A] animate-pulse" />
          </div>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            Stay ahead of Google algorithm updates & AI search shifts
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            Get our hand-curated weekly digest on Google Core updates, Core Web Vitals optimizations, technical ranking factors, and high-impact SEO case studies.
          </p>

          <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs text-slate-400 pt-1">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#17A99A]" />
              Weekly actionable SEO tactics
            </span>
            <span className="flex items-center gap-1.5">
              <BellRing className="w-3.5 h-3.5 text-[#5265D8]" />
              Algorithm penalty alerts
            </span>
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-slate-400" />
              No spam. Unsubscribe by email request
            </span>
          </div>
        </div>

        {/* Right Column: Form or Success State */}
        <div className="lg:col-span-5">
          {status === 'success' ? (
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-[#17A99A]/40 text-left space-y-3 animate-fade-in">
              <div className="flex items-center gap-2.5 text-[#17A99A]">
                <CheckCircle2 className="w-6 h-6 text-[#17A99A] shrink-0" />
                <h4 className="font-bold text-sm text-white">
                  {alreadySubscribed ? 'Already on our VIP list' : 'Welcome to the inner circle!'}
                </h4>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {feedbackMessage}
              </p>

              <div className="pt-2 flex items-center justify-between text-[11px] text-slate-400">
                <span>Your newsletter preferences can be changed by contacting us.</span>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[#17A99A] hover:underline font-semibold"
                >
                  Subscribe another email
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="relative">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="email"
                      id="newsletter-email-input"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === 'error') setStatus('idle');
                      }}
                      placeholder="Enter your work email address..."
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#17A99A] focus:border-transparent transition-all"
                      disabled={status === 'loading'}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#5265D8] to-[#17A99A] hover:opacity-95 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5265D8]/20 transition-all shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    {status === 'loading' ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe Free</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Error feedback if any */}
              {status === 'error' && (
                <div className="flex items-center gap-2 text-xs text-rose-400 bg-rose-500/10 border border-rose-500/20 px-3 py-2 rounded-xl">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{feedbackMessage}</span>
                </div>
              )}

              {/* Trust statement & live counter */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 px-1 pt-1">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  SEO tips and industry news
                </span>
                <span className="font-medium text-slate-300">
                  Updates by email
                </span>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};

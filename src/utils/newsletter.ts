/**
 * Pure functions and storage helpers for Newsletter Signup & Lead Capture
 */

export interface NewsletterSubscriber {
  id: string;
  email: string;
  subscribedAt: string;
  source: string;
  status: 'active' | 'unsubscribed';
}

export const NEWSLETTER_STORAGE_KEY = 'moavia_seo_newsletter_subscribers';

export function normalizeSubscriberEmail(email: string): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

export function isValidNewsletterEmail(email: string): boolean {
  const normalized = normalizeSubscriberEmail(email);
  if (!normalized) return false;
  // RFC 5322 compliant simplified regex with TLD check
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(normalized);
}

export interface SubscribeResult {
  success: boolean;
  message: string;
  subscriber?: NewsletterSubscriber;
  alreadySubscribed?: boolean;
}

export function processSubscription(
  email: string,
  existingSubscribers: NewsletterSubscriber[] = []
): SubscribeResult {
  const normalized = normalizeSubscriberEmail(email);

  if (!normalized) {
    return {
      success: false,
      message: 'Please enter your email address.',
    };
  }

  if (!isValidNewsletterEmail(normalized)) {
    return {
      success: false,
      message: 'Please enter a valid email address (e.g., name@company.com).',
    };
  }

  const existing = existingSubscribers.find(
    (s) => normalizeSubscriberEmail(s.email) === normalized
  );

  if (existing) {
    return {
      success: true,
      message: 'You are already subscribed to our SEO tips & industry insights!',
      alreadySubscribed: true,
      subscriber: existing,
    };
  }

  const newSubscriber: NewsletterSubscriber = {
    id: `sub_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    email: normalized,
    subscribedAt: new Date().toISOString(),
    source: 'footer_signup',
    status: 'active',
  };

  return {
    success: true,
    message: 'Welcome aboard! You have successfully subscribed to SEO tips and industry news.',
    subscriber: newSubscriber,
  };
}

export function getStoredSubscribers(): NewsletterSubscriber[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(NEWSLETTER_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveSubscriberToStorage(email: string): SubscribeResult {
  const current = getStoredSubscribers();
  const result = processSubscription(email, current);

  if (result.success && result.subscriber && !result.alreadySubscribed) {
    try {
      const updated = [result.subscriber, ...current];
      localStorage.setItem(NEWSLETTER_STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.warn('Failed to persist newsletter subscriber to localStorage:', e);
    }
  }

  return result;
}

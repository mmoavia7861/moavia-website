import test from 'node:test';
import assert from 'node:assert/strict';
import { analyzeMetaTags, calculateSeoScore, calculateKeywordDensity } from './seoAudit';
import { normalizeEmail, isValidAdminEmail, getRolePermissions, isPrimaryAdministrator } from './adminSecurity';

test('analyzeMetaTags validates title and meta lengths correctly', () => {
  const goodTitle = 'Professional SEO Services in Islamabad | Moavia SEO Pro';
  const goodDesc = 'Supercharge your organic traffic, Google ranking, and conversions with technical SEO, audit solutions, and ROI-driven marketing from Moavia SEO Pro.';

  const analysis = analyzeMetaTags(goodTitle, goodDesc);
  assert.equal(analysis.isTitleOptimal, true);
  assert.equal(analysis.isDescOptimal, true);
  assert.equal(analysis.titleScore, 100);
  assert.equal(analysis.descScore, 100);

  const shortAnalysis = analyzeMetaTags('Short', 'Too short');
  assert.equal(shortAnalysis.isTitleOptimal, false);
  assert.equal(shortAnalysis.isDescOptimal, false);
});

test('calculateSeoScore produces accurate grades and totals', () => {
  const perfect = calculateSeoScore({
    hasTitle: true,
    hasMetaDesc: true,
    hasH1: true,
    hasSsl: true,
    mobileFriendly: true,
    pageSpeedScore: 100,
  });
  assert.equal(perfect.totalScore, 100);
  assert.equal(perfect.grade, 'A+');

  const partial = calculateSeoScore({
    hasTitle: true,
    hasMetaDesc: true,
    hasH1: false,
    hasSsl: false,
    mobileFriendly: true,
    pageSpeedScore: 50,
  });
  assert.equal(partial.totalScore, 63);
  assert.equal(partial.grade, 'C');
});

test('calculateKeywordDensity calculates accurate percentages', () => {
  const content = 'SEO is essential for modern business. Technical SEO drives rankings and high quality SEO brings organic leads.';
  const density = calculateKeywordDensity(content, 'SEO');
  assert.ok(density > 10);
});

test('normalizeEmail correctly cleans whitespace and casing', () => {
  assert.equal(normalizeEmail('  MoAviaHassan124@gmail.COM '), 'moaviahassan124@gmail.com');
  assert.equal(normalizeEmail(''), '');
});

test('isValidAdminEmail validates email formatting', () => {
  assert.equal(isValidAdminEmail('moavia@seopro.com'), true);
  assert.equal(isValidAdminEmail('not-an-email'), false);
});

test('isPrimaryAdministrator identifies primary founders', () => {
  assert.equal(isPrimaryAdministrator('moaviahassan124@gmail.com'), true);
  assert.equal(isPrimaryAdministrator('moavia400@gmail.com'), true);
  assert.equal(isPrimaryAdministrator('other@gmail.com'), false);
});

test('getRolePermissions enforces strict RBAC gates', () => {
  const superAdmin = getRolePermissions('Super Admin');
  assert.equal(superAdmin.canManageAdmins, true);
  assert.equal(superAdmin.canPublishBlog, true);

  const viewer = getRolePermissions('Viewer');
  assert.equal(viewer.canManageAdmins, false);
  assert.equal(viewer.canEditLeads, false);
  assert.equal(viewer.canViewLeads, true);
});

// Newsletter subscription unit tests
import {
  isValidNewsletterEmail,
  normalizeSubscriberEmail,
  processSubscription,
} from './newsletter';

test('normalizeSubscriberEmail trims and lowercases emails correctly', () => {
  assert.equal(normalizeSubscriberEmail('  USER@Domain.COM  '), 'user@domain.com');
  assert.equal(normalizeSubscriberEmail(''), '');
});

test('isValidNewsletterEmail validates legitimate email addresses', () => {
  assert.equal(isValidNewsletterEmail('founder@techcorp.io'), true);
  assert.equal(isValidNewsletterEmail('moavia.seo@agency.pk'), true);
  assert.equal(isValidNewsletterEmail('plainaddress'), false);
  assert.equal(isValidNewsletterEmail('@missingusername.com'), false);
  assert.equal(isValidNewsletterEmail('username@.com'), false);
  assert.equal(isValidNewsletterEmail('username@domain'), false);
});

test('processSubscription rejects empty or invalid email with helpful message', () => {
  const emptyRes = processSubscription('');
  assert.equal(emptyRes.success, false);
  assert.match(emptyRes.message, /enter your email/i);

  const invalidRes = processSubscription('bad-email-format');
  assert.equal(invalidRes.success, false);
  assert.match(invalidRes.message, /valid email/i);
});

test('processSubscription succeeds and generates new subscriber record', () => {
  const res = processSubscription('newclient@seogrowth.com', []);
  assert.equal(res.success, true);
  assert.ok(res.subscriber);
  assert.equal(res.subscriber.email, 'newclient@seogrowth.com');
  assert.equal(res.subscriber.source, 'footer_signup');
  assert.equal(res.subscriber.status, 'active');
  assert.equal(res.alreadySubscribed, undefined);
});

test('processSubscription handles duplicate subscription gracefully', () => {
  const existingSub = {
    id: 'sub_123',
    email: 'client@company.com',
    subscribedAt: '2026-01-01T00:00:00Z',
    source: 'footer_signup',
    status: 'active' as const,
  };

  const res = processSubscription('CLIENT@company.com', [existingSub]);
  assert.equal(res.success, true);
  assert.equal(res.alreadySubscribed, true);
  assert.match(res.message, /already subscribed/i);
});


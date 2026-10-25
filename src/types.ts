export interface Lead {
  id: string;
  fullName: string;
  email: string;
  whatsapp?: string;
  businessName?: string;
  websiteUrl?: string;
  service: string;
  budget?: string;
  description?: string;
  status: 'New' | 'Under Review' | 'Contacted' | 'Proposal Sent' | 'Converted' | 'Closed' | 'Lost';
  internalNotes?: string;
  assignedManager?: string;
  createdAt: string;
}

export interface Client {
  id: string;
  name: string;
  company: string;
  email: string;
  whatsapp: string;
  website: string;
  status: 'Active' | 'Paused' | 'Archived';
  notes: string;
  createdAt: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'SEO' | 'WordPress' | 'AI Website Development' | 'Web Development' | 'Meta Ads' | 'Google Ads';
  clientName: string;
  assignedTo: string;
  deadline: string;
  status: 'Planning' | 'In Progress' | 'In Review' | 'Completed' | 'On Hold';
  progress: number;
  deliverables: string;
  internalNotes: string;
  createdAt: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'SEO' | 'AI Websites' | 'WordPress' | 'Web Development' | 'Meta Ads' | 'Google Ads';
  description: string;
  clientName: string;
  isDemo: boolean;
  technologies: string[];
  metrics: string;
  liveUrl?: string;
  image: string;
  published: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  published: boolean;
  createdAt: string;
  readTime: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  slug: string;
  category: string;
  tagline: string;
  description: string;
  features: string[];
  deliverables: string[];
  tools: string[];
  priceStarting: string;
  customQuoteOnly?: boolean;
  accentColor: string; // 'blue' | 'purple' | 'teal' | 'coral' | 'gold'
}

export interface PricingPackage {
  id: string;
  serviceCategory: string;
  name: 'Starter' | 'Growth' | 'Enterprise';
  price: string;
  period: string;
  features: string[];
  popular?: boolean;
}

export interface AdminUser {
  uid: string;
  name: string;
  email: string;
  role: 'Super Admin' | 'Manager' | 'Content Editor' | 'Viewer';
  status: 'Active' | 'Pending Verification' | 'Disabled' | 'Revoked';
  emailVerified: boolean;
  createdAt: string;
  lastLogin?: string;
}

export interface AdminInvitation {
  id: string;
  email: string;
  role: 'Manager' | 'Content Editor' | 'Viewer';
  token: string;
  invitedBy: string;
  accepted: boolean;
  expiresAt: string;
  createdAt: string;
}

export interface AuditLog {
  id: string;
  action: string;
  performedBy: string;
  details: string;
  timestamp: string;
}

export interface SiteSettings {
  businessName: string;
  founderName: string;
  primaryEmail: string;
  secondaryEmail: string;
  whatsapp: string;
  location: string;
  linkedinUrl: string;
  facebookUrl: string;
  upworkUrl: string;
  githubUrl: string;
  announcement: string;
  updatedAt: string;
}

export interface Testimonial {
  id: string;
  clientName: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  serviceCategory: 'SEO' | 'AI Website Development' | 'WordPress' | 'Meta Ads' | 'Google Ads';
  metricHighlight: string;
  rating: number;
  isVerifiedDemonstration: boolean;
  location?: string;
}


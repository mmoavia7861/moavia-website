export interface PublicSiteSettings {
  heroBadge: string;
  heroTitle: string;
  heroDescription: string;
  announcementEnabled: boolean;
  announcementText: string;
  ctaLabel: string;
  ctaHref: string;
  contactEmail: string;
  whatsapp: string;
  seoTitle: string;
  seoDescription: string;
  socialGithub: string;
  socialLinkedin: string;
  socialFiverr: string;
  socialUpwork: string;
  toolTitles: string[];
  toolDescriptions: string[];
  toolVisible: boolean[];
  updatedAt: string;
}

export const SITE_DEFAULTS: PublicSiteSettings = {
  heroBadge: 'STUDENT DEVELOPER · ISLAMABAD, PAKISTAN',
  heroTitle: 'Web, App, E-commerce & AI Automation Projects',
  heroDescription: 'From responsive websites and e-commerce interfaces to AI integrations and Android prototypes, I turn ideas into useful digital projects. Explore my real public work and what I am learning next.',
  announcementEnabled: false,
  announcementText: '',
  ctaLabel: 'View My Projects',
  ctaHref: '/projects/',
  contactEmail: 'hello@moaviaseo.com',
  whatsapp: '+92 323 4313869',
  seoTitle: 'Moavia Hassan | Web, App, E-commerce & AI Projects',
  seoDescription: 'Moavia Hassan’s personal developer portfolio: websites, e-commerce projects, Android starter projects, AI automation work and free SEO tools.',
  socialGithub: 'https://github.com/mmoavia7861',
  socialLinkedin: 'https://www.linkedin.com/in/moavia-hassan-seo/',
  socialFiverr: 'https://www.fiverr.com/moavia_seopro',
  socialUpwork: 'https://www.upwork.com/freelancers/~01c3735023b2f296fa',
  toolTitles: [
    'Meta Title & Description Checker',
    'JSON-LD Schema Generator',
    'Robots.txt & XML Sitemap Generator',
  ],
  toolDescriptions: [
    'Check metadata and preview an illustrative search snippet.',
    'Create FAQPage, Organization and Article structured data.',
    'Create robots.txt and sitemap.xml from real URLs.',
  ],
  toolVisible: [true, true, true],
  updatedAt: '',
};

export const TOOL_ROUTES = [
  '/tools/meta-title-description-checker/',
  '/tools/json-ld-schema-generator/',
  '/tools/robots-txt-sitemap-generator/',
] as const;

// Allow only local links or HTTPS external destinations, never javascript/data URLs.
export const safeHref = (href: string): boolean =>
  /^\/(?!\/)[a-z0-9\/#._?=&%-]*$/i.test(href) || /^https:\/\/[a-z0-9.-]+(?::443)?(?:[/?#][^\s]*)?$/i.test(href);

export function mergeSiteSettings(incoming: Partial<PublicSiteSettings> | null | undefined): PublicSiteSettings {
  if (!incoming) return SITE_DEFAULTS;
  const settings = { ...SITE_DEFAULTS };
  const strFields: (keyof PublicSiteSettings)[] = [
    'heroBadge','heroTitle','heroDescription','announcementText','ctaLabel','ctaHref',
    'contactEmail','whatsapp','seoTitle','seoDescription','socialGithub',
    'socialLinkedin','socialFiverr','socialUpwork',
  ];
  for (const key of strFields) {
    const v = incoming[key];
    if (typeof v === 'string') (settings as unknown as Record<string, unknown>)[key] = v;
  }
  settings.announcementEnabled = incoming.announcementEnabled === true;
  settings.toolTitles = Array.isArray(incoming.toolTitles) && incoming.toolTitles.length === 3
    ? incoming.toolTitles.map((v,i)=>typeof v === 'string' ? v : SITE_DEFAULTS.toolTitles[i])
    : SITE_DEFAULTS.toolTitles;
  settings.toolDescriptions = Array.isArray(incoming.toolDescriptions) && incoming.toolDescriptions.length === 3
    ? incoming.toolDescriptions.map((v,i)=>typeof v === 'string' ? v : SITE_DEFAULTS.toolDescriptions[i])
    : SITE_DEFAULTS.toolDescriptions;
  settings.toolVisible = Array.isArray(incoming.toolVisible) && incoming.toolVisible.length === 3
    ? incoming.toolVisible.map(v=>v===true)
    : SITE_DEFAULTS.toolVisible;
  settings.updatedAt=typeof incoming.updatedAt==='string'?incoming.updatedAt:'';
  return settings;
}

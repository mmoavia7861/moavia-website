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
  heroBadge: 'PERSONAL PORTFOLIO · ISLAMABAD, PAKISTAN',
  heroTitle: 'Moavia Hassan: SEO Tools, Services & Web/App Projects',
  heroDescription: 'Explore free SEO tools, discuss technical SEO and website services, and browse real web project demos. App ideas can be discussed individually; no unpublished app is presented as a completed project.',
  announcementEnabled: false,
  announcementText: '',
  ctaLabel: 'Explore Tools',
  ctaHref: '/tools/',
  contactEmail: 'hello@moaviaseo.com',
  whatsapp: '+92 323 4313869',
  seoTitle: 'Moavia Hassan: SEO Tools, Services & Web/App Projects',
  seoDescription: 'Explore free SEO tools, technical SEO and website development services, plus real web project demos by Moavia Hassan in Islamabad, Pakistan.',
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

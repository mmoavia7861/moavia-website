import {readFileSync,existsSync} from 'node:fs';
import {join} from 'node:path';

const get = path => readFileSync(join(process.cwd(),path),'utf8');
const check = (condition,description) => { if(!condition)throw Error('CMS build check failed: '+description); };
const dist = join(process.cwd(),'dist');
const routes = JSON.parse(get('wrangler.jsonc')).assets.run_worker_first;
const rules = get('firestore.rules');
const worker = get('src/cmsWorker.ts');
const app = get('src/App.tsx');
const admin = get('src/components/admin/AdminDashboard.tsx');
const cms = get('src/components/admin/CmsManager.tsx');
const site = get('src/components/admin/SiteSettingsManager.tsx');
const html = get('dist/admin/index.html');
check(existsSync(join(dist,'index.html')), 'homepage missing');
check(html.includes('noindex,nofollow,noarchive'),'admin noindex missing');
check(html.includes('/assets/'),'admin app bundle missing');
check(routes.includes('/api/*') && routes.includes('/sitemap.xml') &&
  routes.includes('/blog/*') && routes.includes('/projects/*') &&
  routes.includes('/offerings/*') && routes.includes('/pages/*'),'CMS Worker routing missing');
check(worker.includes('handleCmsRequest') && worker.includes('getDocument') &&
  worker.includes('listDocuments') && worker.includes('published(result.data)') &&
  worker.includes('const esc') && worker.includes('escapeJson') &&
  worker.includes('dynamicSitemap'),'published-only server rendering missing');
for (const name of ['blogPosts','portfolioProjects','cmsServices','cmsPages']) {
  check(rules.includes('match /'+name+'/{id}'), 'security rules missing '+name);
  check(cms.includes("'"+name+"'"), 'editor collection missing '+name);
}
check(rules.includes('request.auth.token.email_verified == true') &&
  rules.includes('request.auth.token.firebase.sign_in_provider') &&
  rules.includes('validCms(id)') && rules.includes('validPublicSiteSettings()'),
  'role or input validation missing');
check(site.includes("setDoc(doc(db,'siteSettings','public')"), 'website settings cannot save');
check(app.includes("fetch('/api/public-site'") && worker.includes('publicSiteJson'), 'public homepage CMS endpoint not connected');
check(admin.includes('<CmsManager') && admin.includes('<SiteSettingsManager'),
  'admin navigation missing CMS managers');
check(!get('dist/sitemap.xml').includes('/admin/'), 'private dashboard in public sitemap');
console.log('CMS source, admin build output, routing and Firestore rule contracts checked.');

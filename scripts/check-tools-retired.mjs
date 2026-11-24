import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const root=process.cwd();
const read=p=>readFileSync(join(root,p),'utf8');
const dist=join(root,'dist');
const worker=read('src/worker.ts');
const app=read('src/App.tsx');
const publicHtml=read('dist/index.html');
const sitemap=read('dist/sitemap.xml');
const config=read('src/siteConfig.ts');
const admin=read('src/components/admin/SiteSettingsManager.tsx');
const cms=read('src/cmsWorker.ts');
const routes=JSON.parse(read('wrangler.jsonc')).assets.run_worker_first;

assert.ok(worker.includes("url.pathname.startsWith('/tools/')") && worker.includes('status:410'),
 'Retired /tools/ routes must respond 410 Gone');
assert.ok(worker.includes("url.pathname.startsWith('/api/')") && !worker.includes('GEMINI_API_KEY'),
 'Old billable AI/tool APIs must not remain in the production Worker');
assert.ok(routes.includes('/tools') && routes.includes('/tools/*'),
 'Worker must intercept legacy URLs before static assets');
assert.ok(!read('server.ts').includes("app.post('/api/chat'"),'Local development server must not run old Gemini tool APIs');
assert.ok(worker.includes('publicSiteJson()') && worker.includes('handleCmsRequest(request,env)'),
 'Removing tool endpoints must preserve public CMS functionality');
assert.ok(!app.includes('AiToolsSection') && !app.includes('TOOL_ROUTES') && !app.includes('id="tools"'),
 'React homepage must not mount or advertise tool apps');
assert.ok(!app.includes('href="/tools/"') && !publicHtml.includes('href="/tools/"'),
 'Homepage navigation must not link to removed tools');
assert.ok(!config.includes('TOOL_ROUTES'),'Configuration must not advertise retired tool routes');
assert.ok(!cms.includes("'toolTitles','toolDescriptions','toolVisible'"),
 'Public CMS API must not expose retired tool controls');
assert.ok(!admin.includes('Featured tools') && !admin.includes('TOOL_ROUTES'),
 'Admin must not offer removed tool-card editing controls');

for(const route of [
 '/tools/','/tools/meta-title-description-checker/',
 '/tools/json-ld-schema-generator/','/tools/robots-txt-sitemap-generator/'
]){
 assert.ok(!sitemap.includes('<loc>https://moaviaseo.com'+route+'</loc>'),
  'Removed tool still in sitemap: '+route);
 assert.ok(!existsSync(join(dist,route.replace(/^\/|\/$/g,''),'index.html')),
  'Removed HTML still generated: '+route);
}
for(const path of ['tools/toolkit.css','tools/toolkit.js']){
 assert.ok(!existsSync(join(dist,path)),'Removed bundle still deployed: '+path);
}
for(const path of ['src/components/AiToolsSection.tsx','src/components/AiProgressIndicator.tsx','src/utils/seoAudit.ts']){
 assert.ok(!existsSync(join(root,path)),'Obsolete tool application code still exists: '+path);
}

for(const page of ['contact','hire-me','about','projects','web-development','android-development','ai-automations']){
 const html=read('dist/'+page+'/index.html');
 assert.ok(!html.includes('href="/tools/"'),'Internal tool navigation remained on '+page);
}
assert.ok(publicHtml.includes('href="/projects/"') && publicHtml.includes('href="/contact/"'),
 'Website must remain a functional services and portfolio website');
assert.ok(read('dist/hire-me/index.html').includes('href="/#contact"'),
 'Hire Me contact conversion path must still work');
assert.ok(read('dist/admin/index.html').includes('noindex,nofollow,noarchive'),
 'Admin must remain private and noindexed');

console.log('PASS: Tool pages, bundles, AI APIs and public controls removed; portfolio/CMS/contact preserved.');

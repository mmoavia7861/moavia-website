/* AI Automation portfolio copy: only verified public source, no fictional
 * paid clients, uptime claims, screenshots or operational Make automations. */
const capture=(id,url,name)=>'<span class="aicase-capture">'
 +'<img data-portfolio-shot src="/project-captures/'+id+'.jpg"'
 +' data-fallback-src="https://s.wordpress.com/mshots/v1/'+encodeURIComponent(url)+'?w=960"'
 +' width="960" height="600" style="display:block;width:100%;max-width:100%;height:auto;aspect-ratio:16/10;object-fit:cover;object-position:top center"'
 +' loading="lazy" decoding="async" referrerpolicy="no-referrer"'
 +' alt="Captured public homepage of '+name+' — not a screenshot proving live AI responses">'
 +'<span class="aicase-capture-fallback" data-portfolio-fallback hidden>Homepage screenshot unavailable. Use the project link to visit its public website.</span>'
 +'</span>';

export function aiHero(){
 return [
 '<section class="aicase-hero" aria-labelledby="aicase-title"><div class="aicase-hero-grid" aria-hidden="true"></div>',
 '<div class="wrap aicase-hero-layout"><div class="aicase-hero-copy">',
 '<span class="aicase-eyebrow"><i aria-hidden="true"></i> AI INTEGRATIONS · WORKFLOW ENGINEERING</span>',
 '<h1 id="aicase-title">Build smarter systems.<span>Keep people in control.</span></h1>',
 '<p class="aicase-lead">Explore source-backed AI assistants, API integrations and workflow experiments—designed to reduce repetitive work without hiding reliability, privacy or human-review requirements.</p>',
 '<p class="aicase-intro">I work on practical AI-enabled experiences across web and Android projects. Below you can inspect real code, public websites and a clearly labeled automation concept.</p>',
 '<div class="aicase-actions"><a href="#ai-projects" class="aicase-btn aicase-btn-primary">Explore AI projects <span aria-hidden="true">↓</span></a>',
 '<a href="/#contact" class="aicase-btn aicase-btn-outline">Discuss an automation <span aria-hidden="true">↗</span></a></div>',
 '<div class="aicase-hero-badges"><span>Source-backed work</span><span>API security</span><span>Human review</span></div></div>',
 '<div class="aicase-stage" aria-label="Original animated three-dimensional AI and automation visualization">',
 '<div class="craft3d-canvas craft3d-canvas--large" data-skill-scene="ai" role="img" aria-label="Original animated three-dimensional AI processor and connected workflow nodes"></div>',
 '<div class="aicase-stage-top" aria-hidden="true">WORKFLOW / INTELLIGENCE</div>',
 '<div class="aicase-stage-bottom" aria-hidden="true"><span>INPUT</span><b>→</b><span>AI + LOGIC</span><b>→</b><span>REVIEW</span><b>→</b><span>OUTPUT</span></div>',
 '</div></div></section>'
 ].join('');
}

const sourceTag=(label)=>'<span class="aicase-source-tag">'+label+'</span>';

export function aiContent(){
 const cards=[
 {
  id:'toolscresta',
  url:'https://toolscresta.com/',
  title:'ToolsCresta — AI-assisted cards & tool guidance',
  kicker:'WEB AI INTEGRATION',
  desc:'The public repository contains an AI card design view, assistant UI, a Cloudflare Worker gateway and browser-side fallback behavior. Live Gemini requests depend on configured provider access and verification.',
  source:'https://github.com/mmoavia7861/tools-website/blob/main/src/views/AICardGeneratorView.tsx',
  sourceLabel:'Inspect card generator code',
  live:'https://toolscresta.com/ai-card-generator/',
  liveLabel:'Open card generator',
  detail:'/projects/toolscresta/',
  stack:['React','AI API integration','Cloudflare Worker'],
  note:'The image is a website homepage capture, not a record of generated AI output.'
 },
 {
  id:'draliwellness',
  url:'https://draliwellness.com/',
  title:'BrainAxis — AI information guide',
  kicker:'RESPONSIBLE ASSISTANT UI',
  desc:'The storefront has source code for a product-information assistant, offline label-based guidance and a separate Cloudflare Worker API. Medical questions must remain within informational boundaries; live AI availability is configuration-dependent.',
  source:'https://github.com/mmoavia7861/draliwellness/blob/main/workers/ai-guide.js',
  sourceLabel:'Inspect guide Worker code',
  live:'https://draliwellness.com/',
  liveLabel:'Open storefront',
  detail:'/projects/draliwellness/',
  stack:['React','AI + offline fallback','Cloudflare Worker'],
  note:'The screenshot shows the public storefront homepage, not a verified live AI conversation.'
 }
 ];
 const cardMarkup=cards.map(item=>
  '<article class="aicase-card">'
  +'<a class="aicase-preview" href="'+item.url+'" target="_blank" rel="noopener noreferrer" aria-label="Visit '+item.title+' public website">'
  +'<span class="aicase-browser-bar" aria-hidden="true"><i></i><i></i><i></i><span>'+new URL(item.url).hostname+'</span></span>'
  +capture(item.id,item.url,item.title)+'</a>'
  +'<div class="aicase-card-body">'+sourceTag(item.kicker)
  +'<h3>'+item.title+'</h3><p>'+item.desc+'</p>'
  +'<div class="aicase-stack">'+item.stack.map(tag=>'<span>'+tag+'</span>').join('')+'</div>'
  +'<div class="aicase-links"><a class="aicase-link-primary" href="'+item.live+'" target="_blank" rel="noopener noreferrer">'+item.liveLabel+' ↗</a>'
  +'<a href="'+item.source+'" target="_blank" rel="noopener noreferrer">'+item.sourceLabel+' →</a>'
  +'<a href="'+item.detail+'">Project details →</a></div>'
  +'<p class="aicase-note">'+item.note+'</p></div></article>'
 ).join('');
 return [
 '<section class="aicase-projects" id="ai-projects" aria-labelledby="aicase-project-title">',
 '<div class="aicase-heading">'+sourceTag('PUBLIC PROJECTS / VERIFIED REPOSITORIES'),
 '<h2 id="aicase-project-title">AI features built into real projects.</h2>',
 '<p>Inspect the source and explore public project websites. Integration code is verifiable; current model quotas, API credentials and availability are not guaranteed.</p></div>',
 '<div class="aicase-card-grid">'+cardMarkup+'</div>',
 '<article class="aicase-mealverse">',
 '<div class="aicase-mealverse-visual" role="img" aria-label="Illustrative chat interface representing code in the MealVerse food assistant, not an emulator screenshot">',
 '<span class="aicase-mealverse-browser" aria-hidden="true"><i></i><i></i><i></i><span>MealVerse / Assistant concept</span></span>',
 '<div class="aicase-chat" aria-hidden="true"><span class="aicase-chat-head">✦ MealVerse Food Assistant</span>',
 '<span class="aicase-chat-bubble aicase-chat-user">Budget-friendly meal ideas?</span>',
 '<span class="aicase-chat-bubble aicase-chat-bot">Uses restaurant and menu context where available.</span>',
 '<span class="aicase-chat-foot">SOURCE-INSPIRED ILLUSTRATION · NOT AN APP CAPTURE</span></div></div>',
 '<div class="aicase-mealverse-text">'+sourceTag('ANDROID / AI MODULE'),
 '<h3>MealVerse — Context-aware food assistant</h3>',
 '<p>The Android repository contains a Kotlin assistant module and Compose chat dialog. Source code prepares restaurant/context input, attempts a Gemini API request when configured, and includes fallback responses. This is not a verified release or production demonstration.</p>',
 '<div class="aicase-stack"><span>Kotlin</span><span>Jetpack Compose</span><span>AI assistant code</span></div>',
 '<div class="aicase-links"><a class="aicase-link-primary" href="https://github.com/mmoavia7861/mobile-application/blob/main/app/src/main/java/com/example/data/ai/GeminiFoodAssistant.kt" target="_blank" rel="noopener noreferrer">View assistant source ↗</a>',
 '<a href="/projects/mealverse/">MealVerse project details →</a></div></div></article>',
 '</section>',
 '<section class="aicase-workflow" aria-labelledby="aicase-workflow-title">',
 '<div class="aicase-workflow-intro">'+sourceTag('WORKFLOW DESIGN EXERCISE'),
 '<h2 id="aicase-workflow-title">Automation should be useful, traceable and permission-aware.</h2>',
 '<p>Example architecture for a business-research and outreach workflow. This is a proposed process, not proof of an activated Make scenario, authorized contacts or delivered messages.</p>',
 '<a href="/#contact" class="aicase-workflow-cta">Discuss a workflow plan ↗</a></div>',
 '<div class="aicase-workflow-diagram" aria-label="Proposed workflow stages">',
 '<div class="aicase-flow-step"><span>01</span><strong>Find & verify</strong><small>Research public businesses and check evidence</small></div>',
 '<div class="aicase-flow-arrow" aria-hidden="true">↓</div>',
 '<div class="aicase-flow-step"><span>02</span><strong>Check consent</strong><small>Apply region rules, contact permissions and suppression</small></div>',
 '<div class="aicase-flow-arrow" aria-hidden="true">↓</div>',
 '<div class="aicase-flow-step"><span>03</span><strong>Review & approve</strong><small>Human approval before any outreach</small></div>',
 '<div class="aicase-flow-arrow" aria-hidden="true">↓</div>',
 '<div class="aicase-flow-step"><span>04</span><strong>Log & monitor</strong><small>Track permitted actions, errors and opt-outs</small></div>',
 '</div></section>',
 '<section class="aicase-principles" aria-labelledby="aicase-principles-title">',
 '<div class="aicase-heading">'+sourceTag('ENGINEERING PRINCIPLES'),
 '<h2 id="aicase-principles-title">The approach behind reliable integrations.</h2></div>',
 '<div class="aicase-principles-grid">',
 '<div><strong>01 / Protected credentials</strong><p>Keep provider keys in server-side secrets; validate requests and restrict unnecessary exposure.</p></div>',
 '<div><strong>02 / Graceful fallback</strong><p>Handle quota limits, unavailable providers and errors without pretending an AI answer succeeded.</p></div>',
 '<div><strong>03 / Human oversight</strong><p>Check generated outputs, access permissions and sensitive information before real-world actions.</p></div>',
 '</div></section>',
 '<section class="aicase-final" aria-labelledby="aicase-final-title">',
 '<div>'+sourceTag('LET’S DESIGN THE RIGHT WORKFLOW'),
 '<h2 id="aicase-final-title">Have an AI integration idea?</h2>',
 '<p>Share the task, existing software, data sources and success criteria. We can discuss an achievable scope, API costs, privacy and security before implementation.</p></div>',
 '<div class="aicase-final-actions"><a href="/#contact" class="aicase-final-main">Start a project enquiry ↗</a>',
 '<a href="/hire-me/">Explore services →</a></div></section>'
 ].join('');
}

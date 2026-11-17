import React, { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';
import { mergeSiteSettings, safeHref, SITE_DEFAULTS, TOOL_ROUTES, type PublicSiteSettings } from '../../siteConfig';

const simpleFields: Array<{name:keyof PublicSiteSettings; label:string; max:number; note?:string}> = [
  {name:'heroBadge',label:'Hero eyebrow / badge',max:120},
  {name:'heroTitle',label:'Homepage H1 title',max:140},
  {name:'heroDescription',label:'Homepage introduction',max:500},
  {name:'ctaLabel',label:'Primary button text',max:80},
  {name:'ctaHref',label:'Primary button destination',max:500,note:'Use /tools/ or a verified HTTPS link'},
  {name:'contactEmail',label:'Public contact email',max:254},
  {name:'whatsapp',label:'Public phone / WhatsApp number',max:40},
  {name:'seoTitle',label:'Homepage SEO title',max:160},
  {name:'seoDescription',label:'Homepage meta description',max:320},
  {name:'socialGithub',label:'GitHub profile URL',max:500},
  {name:'socialLinkedin',label:'LinkedIn profile URL',max:500},
  {name:'socialFiverr',label:'Fiverr profile URL',max:500},
  {name:'socialUpwork',label:'Upwork profile URL',max:500},
];

export function SiteSettingsManager() {
  const [settings,setSettings] = useState<PublicSiteSettings>(SITE_DEFAULTS);
  const [loading,setLoading] = useState(true);
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState('');
  const [readError,setReadError] = useState(false);

  useEffect(() => onSnapshot(doc(db,'siteSettings','public'),snap=>{
    setSettings(mergeSiteSettings(snap.exists()?snap.data() as Partial<PublicSiteSettings>:null));
    setLoading(false);setReadError(false);
  },()=>{
    setLoading(false);setReadError(true);
    setMessage('Could not read site settings from Firebase. Saving is disabled until the connection is restored.');
  }),[]);

  const update = (name:keyof PublicSiteSettings,value:string|boolean)=>{
    setSettings(prev=>({...prev,[name]:value}));setMessage('');
  };
  const updateTool=(name:'toolTitles'|'toolDescriptions'|'toolVisible',index:number,value:string|boolean)=>{
    setSettings(prev=>({...prev,[name]:prev[name].map((v,i)=>i===index?value:v)}));setMessage('');
  };
  const save=async(e:React.FormEvent)=>{
    e.preventDefault();if(saving||readError)return;
    const s={...settings};
    if(!s.heroTitle.trim()||!s.heroDescription.trim()||!s.contactEmail.trim()){
      setMessage('Homepage title, introduction and contact email are required.');return;
    }
    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.contactEmail)){
      setMessage('Enter a valid contact email.');return;
    }
    if(!safeHref(s.ctaHref)||[s.socialGithub,s.socialLinkedin,s.socialFiverr,s.socialUpwork].some(v=>v!==''&&!/^https:\/\/[^\s/]+\S*$/i.test(v))){
      setMessage('CTA must be a safe internal path or HTTPS URL; social links must use HTTPS.');return;
    }
    if(s.announcementText.length>300||
      s.toolTitles.some(v=>!v.trim()||v.length>120)||
      s.toolDescriptions.some(v=>!v.trim()||v.length>300)){
      setMessage('Tool labels/descriptions and announcement must not be empty or too long.');return;
    }
    if(simpleFields.some(f=>String(s[f.name]).length>f.max)){setMessage('One or more fields are too long.');return;}
    setSaving(true);setMessage('');
    try{
      await setDoc(doc(db,'siteSettings','public'),{...s,updatedAt:new Date().toISOString()});
      setMessage('Website settings saved. Homepage updates shortly; search engines may recrawl the SEO metadata later.');
    }catch{
      setMessage('Save failed. Firestore rules or network access may not be configured. No changes confirmed.');
    }finally{setSaving(false);}
  };

  return <section className="space-y-5">
    <div><h2 className="text-2xl font-extrabold">Website settings & homepage</h2>
      <p className="text-sm text-slate-600 mt-1">Control real public homepage text, announcement, contact details, social links and featured tool cards.</p>
    </div>
    {message&&<p role={readError?'alert':'status'} className={'border rounded-xl p-4 text-sm '+(readError?'border-rose-200 bg-rose-50 text-rose-700':'bg-white')}>{message}</p>}
    {loading?<p role="status">Loading saved settings from Firebase…</p>:
    <form onSubmit={save} className="space-y-5">
      <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-lg">Homepage, contact & SEO</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {simpleFields.map(field=><label className={(field.name==='heroDescription'||field.name==='seoDescription'?'md:col-span-2 ':'')+'text-sm font-semibold'} key={field.name}>
            {field.label}
            <input type="text" maxLength={field.max} value={String(settings[field.name])} onChange={e=>update(field.name,e.target.value)}
              className="block w-full mt-1.5 border rounded-xl px-3 py-2.5 text-sm font-normal"/>
            {field.note&&<span className="block mt-1 text-xs text-slate-500">{field.note}</span>}
          </label>)}
        </div>
      </section>
      <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-3">
        <h3 className="font-bold text-lg">Announcement banner</h3>
        <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={settings.announcementEnabled} onChange={e=>update('announcementEnabled',e.target.checked)} /> Show announcement on homepage</label>
        <label className="block text-sm font-semibold">Announcement text
          <textarea rows={2} maxLength={300} className="block mt-1 w-full border rounded-xl p-3 text-sm font-normal" value={settings.announcementText} onChange={e=>update('announcementText',e.target.value)}/>
        </label>
      </section>
      <section className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4">
        <h3 className="font-bold text-lg">Featured tools</h3>
        <p className="text-xs text-slate-600">Edit the homepage cards or hide them from the homepage. This does not disable a tool's actual URL or change its code.</p>
        {TOOL_ROUTES.map((route,i)=><div key={route} className="border rounded-xl p-4 space-y-3">
          <a href={route} target="_blank" rel="noopener noreferrer" className="text-xs text-[#5265D8] underline">{route}</a>
          <label className="flex gap-2 items-center text-sm"><input type="checkbox" checked={settings.toolVisible[i]} onChange={e=>updateTool('toolVisible',i,e.target.checked)}/> Show featured card</label>
          <label className="block text-xs font-semibold">Card title
            <input className="block mt-1 border rounded-lg px-3 py-2 w-full text-sm font-normal" maxLength={120} value={settings.toolTitles[i]} onChange={e=>updateTool('toolTitles',i,e.target.value)} />
          </label>
          <label className="block text-xs font-semibold">Card description
            <textarea className="block mt-1 border rounded-lg px-3 py-2 w-full text-sm font-normal" rows={2} maxLength={300} value={settings.toolDescriptions[i]} onChange={e=>updateTool('toolDescriptions',i,e.target.value)} />
          </label>
        </div>)}
      </section>
      <div className="flex flex-wrap gap-3 items-center">
        <button type="submit" disabled={saving||readError} className="bg-[#5265D8] text-white rounded-xl px-6 py-3 font-bold disabled:opacity-50">{saving?'Saving changes…':'Save website settings'}</button>
        <button type="button" className="border rounded-xl px-5 py-3 text-sm font-semibold" onClick={()=>setSettings(SITE_DEFAULTS)}>Reset form to defaults</button>
      </div>
      <p className="text-xs text-slate-500">Reset only changes this editor until you click Save. Firebase security rules must allow the verified owner to write the public settings document.</p>
    </form>}
  </section>;
}

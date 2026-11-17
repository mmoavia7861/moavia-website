import React, { useEffect, useMemo, useState } from 'react';
import { collection, deleteDoc, doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db } from '../../firebase';

export type CmsKind = 'blog' | 'projects' | 'services' | 'pages';
export interface CmsItem {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  category: string;
  imageUrl: string;
  linkUrl: string;
  repoUrl: string;
  metaTitle: string;
  metaDescription: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}
const collections: Record<CmsKind, string> = {
  blog: 'blogPosts',
  projects: 'portfolioProjects',
  services: 'cmsServices',
  pages: 'cmsPages',
};
const headings: Record<CmsKind, string> = {
  blog: 'Blog articles',
  projects: 'Portfolio projects',
  services: 'Service pages',
  pages: 'Custom pages',
};
const routes: Record<CmsKind, string> = {
  blog: '/blog/',
  projects: '/projects/',
  services: '/offerings/',
  pages: '/pages/',
};
// These are already generated from repository content; do not overwrite them
// using Firestore, as this could mislead the editor about which page is live.
const existingBlog = new Set([
  'technical-seo-playbook-2026', 'ai-generated-websites-human-engineering',
  'mastering-meta-ads-capi-cro', 'local-seo-google-maps-3pack',
  'image-video-resolution-cro', 'google-search-console-discovered-vs-indexed',
  'seo-aeo-geo-small-business-guide',
]);
const existingProjects = new Set([
  'ranknova','dark-agency','agency-multipage','umm-e-aiman','moavia-app',
]);
const blank = (): CmsItem => ({
  slug:'',title:'',excerpt:'',body:'',category:'',imageUrl:'',linkUrl:'',
  repoUrl:'',metaTitle:'',metaDescription:'',published:false,
  createdAt:'',updatedAt:'',
});
const checkLink = (value: string) => !value || /^https:\/\/[^/]+/i.test(value) || /^\/(?!\/)/.test(value);

export function CmsManager({kind}:{kind:CmsKind}) {
  const [items,setItems] = useState<CmsItem[]>([]);
  const [loading,setLoading] = useState(true);
  const [loadError,setLoadError] = useState('');
  const [editing,setEditing] = useState<CmsItem | null>(null);
  const [originalSlug,setOriginalSlug] = useState('');
  const [saving,setSaving] = useState(false);
  const [message,setMessage] = useState('');
  const [search,setSearch] = useState('');
  const [showDrafts,setShowDrafts] = useState(true);

  useEffect(()=>{
    setLoading(true);setLoadError('');setEditing(null);
    const unsubscribe=onSnapshot(collection(db,collections[kind]),snapshot=>{
      const next = snapshot.docs.map(snap=>{
        const d=snap.data();
        const base=blank();
        const keys: Array<keyof CmsItem> = [
          'title','excerpt','body','category','imageUrl','linkUrl','repoUrl',
          'metaTitle','metaDescription','createdAt','updatedAt'
        ];
        for(const key of keys){
          const value=d[key];
          if(typeof value==='string') (base as unknown as Record<string,unknown>)[key]=value;
        }
        base.slug=snap.id;
        base.published=d.published===true;
        return base;
      });
      next.sort((a,b)=>b.updatedAt.localeCompare(a.updatedAt));
      setItems(next);setLoading(false);
    },()=>{setLoadError('Firebase permission or network error. Nothing was loaded.');setLoading(false);setItems([]);});
    return unsubscribe;
  },[kind]);

  const visible=useMemo(()=>items.filter(item=>
    (showDrafts||item.published)&&
    [item.title,item.slug,item.category].some(s=>s.toLowerCase().includes(search.toLowerCase()))
  ),[items,showDrafts,search]);

  const update = (name:keyof CmsItem,value:string|boolean)=>{
    setEditing(prev=>prev?{...prev,[name]:value}:prev);setMessage('');
  };
  const begin=(item?:CmsItem)=>{setEditing(item?{...item}:blank());setOriginalSlug(item?.slug||'');setMessage('');};

  const save = async(e:React.FormEvent)=>{
    e.preventDefault();
    if(!editing||saving)return;
    const x={...editing,slug:editing.slug.trim().toLowerCase(),title:editing.title.trim(),
      excerpt:editing.excerpt.trim(),category:editing.category.trim(),
      body:editing.body.trim(),imageUrl:editing.imageUrl.trim(),linkUrl:editing.linkUrl.trim(),
      repoUrl:editing.repoUrl.trim(),metaTitle:editing.metaTitle.trim(),
      metaDescription:editing.metaDescription.trim()};
    if(!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(x.slug)||x.slug.length>60){
      setMessage('Use a URL slug such as local-seo-guide (maximum 60 characters).');return;
    }
    if((kind==='blog'&&existingBlog.has(x.slug))||(kind==='projects'&&existingProjects.has(x.slug))){
      setMessage('This slug already belongs to a code-generated page. Choose a different slug.');return;
    }
    if(originalSlug && originalSlug!==x.slug){setMessage('Published URLs cannot be renamed. Create a new item, then unpublish the old one.');return;}
    if(!x.title||!x.excerpt||!x.body){setMessage('Title, excerpt and main content are required.');return;}
    if(x.title.length>140||x.excerpt.length>320||x.body.length>16000||
       x.metaTitle.length>160||x.metaDescription.length>320||x.category.length>80){
      setMessage('One or more fields exceed the allowed character limits.');return;
    }
    if([x.imageUrl,x.linkUrl,x.repoUrl].some(v=>!checkLink(v))){
      setMessage('Use valid HTTPS or local /path links.');return;
    }
    if((x.imageUrl||'').startsWith('/')||(x.repoUrl||'').startsWith('/')){
      setMessage('Image and repository URLs must start with https://.');return;
    }
    setSaving(true);setMessage('');
    try{
      await setDoc(doc(db,collections[kind],x.slug),{
        ...x,createdAt:originalSlug?(editing.createdAt||new Date().toISOString()):new Date().toISOString(),
        updatedAt:new Date().toISOString(),
      });
      setEditing(null);setMessage('Saved to Firebase. Published changes are shown on the public website after cache refresh.');
    }catch{
      setMessage('Could not save. Verify Firebase permissions and network connectivity.');
    }finally{setSaving(false);}
  };

  const remove=async(item:CmsItem)=>{
    if(!window.confirm('Permanently delete "'+item.title+'"? This removes its Firestore document.'))return;
    setMessage('');
    try{await deleteDoc(doc(db,collections[kind],item.slug));setMessage('Document deleted from Firebase.');}
    catch{setMessage('Deletion failed. No success has been claimed.');}
  };

  return <section className="space-y-5">
    <div className="flex flex-wrap gap-3 justify-between items-center">
      <div><h2 className="text-2xl font-extrabold">{headings[kind]}</h2>
        <p className="text-sm text-slate-600 mt-1">Create, edit, publish or unpublish real Firestore content. Public URL: <code>{routes[kind]}your-slug/</code></p>
      </div>
      <button type="button" onClick={()=>begin()} className="rounded-xl bg-[#5265D8] text-white px-4 py-3 text-sm font-bold">+ New {kind==='blog'?'article':kind==='pages'?'page':kind.slice(0,-1)}</button>
    </div>
    <p className="text-xs text-slate-500">Existing code-generated pages remain on the website. This manager controls NEW Firestore-powered content, not legacy source files.</p>
    {message && <p role="status" className="rounded-xl border p-3 text-sm bg-white">{message}</p>}
    {loadError && <p role="alert" className="rounded-xl border border-rose-200 bg-rose-50 text-rose-700 p-3 text-sm">{loadError}</p>}
    {editing && <form onSubmit={save} className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-7 space-y-4">
      <div className="flex justify-between items-center"><h3 className="text-lg font-bold">{originalSlug?'Edit content':'Create content'}</h3>
        <button type="button" onClick={()=>{setEditing(null);setMessage('');}} className="text-sm font-semibold text-slate-600 underline">Close editor</button>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="URL slug *" value={editing.slug} maxLength={60} onChange={v=>update('slug',v)} disabled={!!originalSlug}/>
        <Field label="Title *" value={editing.title} maxLength={140} onChange={v=>update('title',v)}/>
        <Field label="Category" value={editing.category} maxLength={80} onChange={v=>update('category',v)}/>
        <Field label="Image URL (HTTPS)" value={editing.imageUrl} maxLength={500} onChange={v=>update('imageUrl',v)}/>
      </div>
      <Field label="Short description / excerpt *" value={editing.excerpt} maxLength={320} onChange={v=>update('excerpt',v)} multiline rows={2}/>
      <Field label="Page content * (plain text; blank lines separate paragraphs; lines beginning ## make headings)" value={editing.body} maxLength={16000} onChange={v=>update('body',v)} multiline rows={10}/>
      {kind==='projects'&&<>
        <Field label="Verified public project URL (HTTPS)" value={editing.linkUrl} maxLength={500} onChange={v=>update('linkUrl',v)}/>
        <Field label="Source repository URL (HTTPS)" value={editing.repoUrl} maxLength={500} onChange={v=>update('repoUrl',v)}/>
        <p className="text-xs text-slate-600">Only publish real projects and links you can substantiate; do not invent clients, metrics or reviews.</p>
      </>}
      {kind==='services'&&<Field label="Call-to-action URL (HTTPS or internal /path)" value={editing.linkUrl} maxLength={500} onChange={v=>update('linkUrl',v)}/>}
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="SEO title (optional)" value={editing.metaTitle} maxLength={160} onChange={v=>update('metaTitle',v)}/>
        <Field label="SEO meta description (optional)" value={editing.metaDescription} maxLength={320} onChange={v=>update('metaDescription',v)} multiline rows={2}/>
      </div>
      <label className="flex items-center gap-3 text-sm font-semibold"><input type="checkbox" checked={editing.published} onChange={e=>update('published',e.target.checked)} className="w-5 h-5"/> Published to website</label>
      <p className="text-xs text-slate-500">Unpublished documents remain private to your verified administrator. Published documents are accessible publicly and can be indexed.</p>
      <button disabled={saving} className="rounded-xl bg-[#5265D8] text-white px-5 py-3 font-bold disabled:opacity-50">{saving?'Saving…':'Save to Firebase'}</button>
    </form>}
    <div className="bg-white rounded-2xl border border-slate-200 p-4 flex flex-wrap gap-4 items-center">
      <input aria-label="Search content" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search title, slug or category" className="border rounded-lg px-3 py-2.5 text-sm flex-1 min-w-[190px]" />
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={showDrafts} onChange={e=>setShowDrafts(e.target.checked)}/> Show drafts</label>
    </div>
    {loading?<p role="status" className="text-sm">Loading records from Firebase…</p>:
     visible.length===0?<p className="bg-white border rounded-xl p-6 text-sm text-slate-600">No records here yet. Create your first page; no demo data is shown.</p>:
     <div className="grid gap-3">{visible.map(item=><article key={item.slug} className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-wrap justify-between gap-4">
       <div className="min-w-0 flex-1"><h3 className="font-bold text-lg break-words">{item.title}</h3>
         <p className="text-xs text-slate-600 mt-1 break-all">{routes[kind]}{item.slug}/ · {item.published?'Published':'Draft'}</p>
         <p className="text-sm text-slate-600 mt-2">{item.excerpt}</p>
       </div>
       <div className="flex items-start flex-wrap gap-2">
         {item.published&&<a className="border rounded-lg px-3 py-2 text-sm" href={routes[kind]+item.slug+'/'} target="_blank" rel="noopener noreferrer">View</a>}
         <button type="button" className="bg-[#5265D8] text-white rounded-lg px-3 py-2 text-sm" onClick={()=>begin(item)}>Edit</button>
         <button type="button" className="border border-rose-200 text-rose-700 rounded-lg px-3 py-2 text-sm" onClick={()=>void remove(item)}>Delete</button>
       </div>
     </article>)}</div>}
  </section>;
}

function Field({label,value,onChange,multiline=false,rows=3,maxLength,disabled=false}:{
  label:string;value:string;onChange:(v:string)=>void;multiline?:boolean;rows?:number;maxLength:number;disabled?:boolean;
}) {
  return <label className="block text-sm font-semibold">
    {label}
    {multiline?<textarea rows={rows} maxLength={maxLength} disabled={disabled} value={value} onChange={e=>onChange(e.target.value)}
        className="block w-full mt-2 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-normal resize-y"/>:
      <input type="text" maxLength={maxLength} disabled={disabled} value={value} onChange={e=>onChange(e.target.value)}
        className="block w-full mt-2 border border-slate-300 rounded-lg px-3 py-2.5 text-sm font-normal disabled:bg-slate-100"/>}
  </label>;
}

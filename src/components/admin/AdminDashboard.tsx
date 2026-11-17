import React, { useEffect, useMemo, useState } from 'react';
import {
  Activity, AlertCircle, ArrowLeft, ArrowUpRight, Download,
  FileText, FolderKanban, LayoutDashboard, Loader2, LockKeyhole, LogOut,
  Mail, RefreshCw, Search, ShieldCheck, Users,
} from 'lucide-react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { collection, doc, deleteDoc, onSnapshot, updateDoc, type DocumentData } from 'firebase/firestore';
import { auth, db, loginWithEmail, logOut, sendResetPassword, triggerEmailVerification } from '../../firebase';
import { isPrimaryAdministrator, PRIMARY_ADMIN_EMAIL } from '../../utils/adminSecurity';
import { CmsManager, type CmsKind } from './CmsManager';
import { SiteSettingsManager } from './SiteSettingsManager';

type Tab = 'overview' | 'leads' | 'subscribers' | 'content' | 'site' | CmsKind;
type LeadStatus = 'New' | 'Contacted' | 'In Progress' | 'Closed' | 'Spam';
type LeadRecord = {
  id: string; fullName: string; email: string; whatsapp: string; websiteUrl: string;
  businessName: string; service: string; budget: string; description: string;
  status: string; createdAt: string;
};
type Subscriber = { id: string; email: string; status: string; createdAt: string };

const statuses: LeadStatus[] = ['New', 'Contacted', 'In Progress', 'Closed', 'Spam'];
const text = (input: unknown) => typeof input === 'string' ? input : '';
const friendlyDate = (value: string) => {
  if (!value) return 'Not recorded';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Not recorded'
    : date.toLocaleString('en-PK', { dateStyle: 'medium', timeStyle: 'short' });
};
const escapeCsv = (value: unknown) => {
  let safe = String(value ?? '');
  // Prevent spreadsheet formula execution when exporting user-submitted fields.
  if (/^[=+@\-\t\r]/.test(safe)) safe = "'" + safe;
  return '"' + safe.replace(/"/g, '""') + '"';
};

const externalLinks = [
  { name: 'Google Analytics', info: 'Open your real analytics dashboard', href: 'https://analytics.google.com/' },
  { name: 'Google Search Console', info: 'Check indexing and search performance', href: 'https://search.google.com/search-console/' },
  { name: 'Edit blog source', info: 'Articles are published from GitHub source files', href: 'https://github.com/mmoavia7861/moavia-website/blob/main/scripts/generate-trust-pages.mjs' },
  { name: 'Edit project source', info: 'Portfolio pages are generated during deployment', href: 'https://github.com/mmoavia7861/moavia-website/blob/main/scripts/generate-projects-page.mjs' },
  { name: 'Cloudflare dashboard', info: 'Manage website hosting and deployment', href: 'https://dash.cloudflare.com/' },
];

export function AdminDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const [authorized, setAuthorized] = useState(false);
  const [accessCheck, setAccessCheck] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [password, setPassword] = useState('');
  const [resetMode, setResetMode] = useState(false);
  const [busy, setBusy] = useState(false);
  const [authMessage, setAuthMessage] = useState('');
  const [failureCount, setFailureCount] = useState(0);
  const [tab, setTab] = useState<Tab>('overview');
  const [leads, setLeads] = useState<LeadRecord[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [leadsLoading, setLeadsLoading] = useState(true);
  const [subscribersLoading, setSubscribersLoading] = useState(true);
  const [leadsError, setLeadsError] = useState('');
  const [subscribersError, setSubscribersError] = useState('');
  const [writeId, setWriteId] = useState('');
  const [writeError, setWriteError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => onAuthStateChanged(auth, u => {
    setUser(u); setAuthReady(true); setAuthorized(false);
  }), []);

  useEffect(() => {
    let live = true;
    setAuthorized(false);
    if (!user || !user.emailVerified || !isPrimaryAdministrator(user.email || '')) {
      setAccessCheck(false);
      return () => { live = false; };
    }
    setAccessCheck(true);
    void (async () => {
      try {
        const token = await user.getIdTokenResult(true);
        if (live) setAuthorized(
          token.signInProvider === 'password' &&
          token.claims.email_verified === true &&
          token.claims.email === PRIMARY_ADMIN_EMAIL
        );
      } catch {
        if (live) setAuthorized(false);
      } finally {
        if (live) setAccessCheck(false);
      }
    })();
    return () => { live = false; };
  }, [user, refreshKey]);

  // The Firebase Security Rules, not this UI, enforce private-data access.
  // Never subscribe to private collections until the authenticated account passes all checks.
  useEffect(() => {
    if (!authorized) {
      setLeads([]); setSubscribers([]);
      setLeadsLoading(false); setSubscribersLoading(false);
      return;
    }
    setLeadsLoading(true); setSubscribersLoading(true);
    setLeadsError(''); setSubscribersError('');
    const offLeads = onSnapshot(collection(db, 'leads'), snapshot => {
      const rows = snapshot.docs.map(entry => {
        const data: DocumentData = entry.data();
        return {
          id: entry.id, fullName: text(data.fullName), email: text(data.email),
          whatsapp: text(data.whatsapp), websiteUrl: text(data.websiteUrl),
          businessName: text(data.businessName), service: text(data.service),
          budget: text(data.budget), description: text(data.description),
          status: text(data.status) || 'New', createdAt: text(data.createdAt),
        };
      });
      rows.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      setLeads(rows); setLeadsLoading(false);
    }, () => {
      setLeads([]); setLeadsError('Could not load enquiries. Check Firestore permissions and connectivity.');
      setLeadsLoading(false);
    });
    const offSubscribers = onSnapshot(collection(db, 'newsletterSubscribers'), snapshot => {
      const rows = snapshot.docs.map(entry => {
        const data: DocumentData = entry.data();
        const date = data.createdAt?.toDate?.();
        return {
          id: entry.id, email: text(data.email), status: text(data.status),
          createdAt: date instanceof Date ? date.toISOString() : text(data.createdAt),
        };
      });
      rows.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      setSubscribers(rows); setSubscribersLoading(false);
    }, () => {
      setSubscribers([]); setSubscribersError('Could not load subscribers. Check Firestore permissions and connectivity.');
      setSubscribersLoading(false);
    });
    return () => { offLeads(); offSubscribers(); };
  }, [authorized]);

  const filteredLeads = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter(lead =>
      (statusFilter === 'All' || lead.status === statusFilter) &&
      (!q || [lead.fullName, lead.email, lead.businessName, lead.service, lead.websiteUrl]
        .some(value => value.toLowerCase().includes(q)))
    );
  }, [leads, search, statusFilter]);

  const login = async (e: React.FormEvent) => {
    e.preventDefault(); setAuthMessage('');
    if (!password || busy || failureCount >= 5) return;
    setBusy(true);
    try {
      await loginWithEmail(PRIMARY_ADMIN_EMAIL, password);
      setPassword(''); setFailureCount(0);
    } catch {
      setFailureCount(v => v + 1);
      setAuthMessage('Sign-in failed. Check your credentials or try again later.');
    } finally { setBusy(false); }
  };
  const resetPassword = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setAuthMessage('');
    try {
      await sendResetPassword(PRIMARY_ADMIN_EMAIL);
      setAuthMessage('If this Firebase account exists, a recovery email has been requested.');
      setResetMode(false);
    } catch {
      setAuthMessage('Unable to request a reset right now. Please try again later.');
    } finally { setBusy(false); }
  };
  const refreshVerification = async () => {
    if (!user) return;
    setBusy(true); setAuthMessage('');
    try {
      await user.reload();
      await user.getIdToken(true);
      setUser(auth.currentUser);
      setRefreshKey(key => key + 1);
      if (!auth.currentUser?.emailVerified) setAuthMessage('Email is not verified yet.');
    } catch { setAuthMessage('Could not refresh account verification.'); }
    finally { setBusy(false); }
  };
  const changeStatus = async (lead: LeadRecord, next: string) => {
    if (!authorized || !statuses.includes(next as LeadStatus)) return;
    setWriteError(''); setWriteId(lead.id);
    try {
      await updateDoc(doc(db, 'leads', lead.id), { status: next, updatedAt: new Date().toISOString() });
      // onSnapshot updates the UI after a successful Firestore write.
    } catch { setWriteError('Saving failed. Your changes were not confirmed by Firebase.'); }
    finally { setWriteId(''); }
  };
  const deleteLead = async (lead:LeadRecord) => {
    if(!authorized || !window.confirm('Delete enquiry from '+lead.fullName+'? This cannot be undone.'))return;
    setWriteError('');setWriteId(lead.id);
    try {await deleteDoc(doc(db,'leads',lead.id));}
    catch {setWriteError('Could not delete the enquiry. Firebase did not confirm the deletion.');}
    finally {setWriteId('');}
  };
  const unsubscribe = async (subscriber:Subscriber) => {
    if(!authorized || !window.confirm('Mark '+subscriber.email+' as unsubscribed?'))return;
    setWriteError('');setWriteId(subscriber.id);
    try {await updateDoc(doc(db,'newsletterSubscribers',subscriber.id),{status:'unsubscribed'});}
    catch {setWriteError('Could not update the subscription. Please verify Firebase access.');}
    finally {setWriteId('');}
  };
  const deleteSubscriber = async (subscriber:Subscriber) => {
    if(!authorized || !window.confirm('Permanently remove '+subscriber.email+' from the list?'))return;
    setWriteError('');setWriteId(subscriber.id);
    try {await deleteDoc(doc(db,'newsletterSubscribers',subscriber.id));}
    catch {setWriteError('Could not delete this subscriber. Firebase did not confirm deletion.');}
    finally {setWriteId('');}
  };
  const exportLeads = () => {
    const columns = ['ID','Full Name','Email','WhatsApp','Business','Website','Service','Budget','Status','Date'];
    const rows = filteredLeads.map(l =>
      [l.id,l.fullName,l.email,l.whatsapp,l.businessName,l.websiteUrl,l.service,l.budget,l.status,l.createdAt]
        .map(escapeCsv).join(',')
    );
    const csv = '\uFEFF' + [columns.map(escapeCsv).join(','),...rows].join('\r\n');
    const href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
    const link = document.createElement('a'); link.href = href; link.download = 'moaviaseo-leads.csv';
    document.body.appendChild(link); link.click(); link.remove(); window.setTimeout(() => URL.revokeObjectURL(href), 1000);
  };

  if (!authReady || accessCheck) return <div className="min-h-screen grid place-items-center bg-[#f8f9fd]" role="status"><Loader2 className="animate-spin text-[#5265D8]" aria-label="Checking administrator access" /></div>;

  if (!user) return (
    <main className="min-h-screen bg-[#f8f9fd] flex items-center justify-center p-5">
      <section className="w-full max-w-md bg-white p-8 sm:p-10 rounded-3xl shadow-xl border border-slate-200">
        <a href="/" className="text-sm text-[#5265D8] inline-flex gap-2 items-center hover:underline"><ArrowLeft size={16} /> Back to website</a>
        <div className="mt-7 w-12 h-12 bg-indigo-50 rounded-xl grid place-items-center"><ShieldCheck className="text-[#5265D8]" /></div>
        <h1 className="mt-5 text-3xl font-extrabold">Moavia Admin</h1>
        <p className="mt-2 text-sm text-slate-600">Private dashboard for the verified website administrator.</p>
        <form className="mt-7 space-y-4" onSubmit={resetMode ? resetPassword : login}>
          <label className="block text-sm font-semibold">Registered administrator email
            <input type="email" autoComplete="username" readOnly value={PRIMARY_ADMIN_EMAIL} className="block w-full mt-2 px-4 py-3 border rounded-xl bg-slate-50 text-slate-700" />
          </label>
          {!resetMode && <label className="block text-sm font-semibold">Password
            <input type="password" autoComplete="current-password" required value={password} onChange={e=>setPassword(e.target.value)}
              className="block w-full mt-2 px-4 py-3 border rounded-xl bg-white focus:outline-[#5265D8]" />
          </label>}
          {authMessage && <p className="text-sm text-rose-700" role="alert">{authMessage}</p>}
          {failureCount >= 5 && <p className="text-sm text-rose-700" role="alert">Too many attempts in this tab. Reload later to try again. Firebase may also apply its own limits.</p>}
          <button disabled={busy || (!resetMode && failureCount >= 5)} type="submit" className="w-full bg-[#5265D8] text-white px-4 py-3 rounded-xl font-bold disabled:opacity-60 inline-flex items-center justify-center gap-2">
            {busy ? <Loader2 className="animate-spin" size={18}/> : <LockKeyhole size={18}/>}
            {resetMode ? 'Request password reset' : 'Secure sign in'}
          </button>
        </form>
        <button type="button" className="mt-5 text-sm text-[#5265D8] underline" onClick={()=>{setResetMode(!resetMode);setAuthMessage('');}}>
          {resetMode ? 'Return to login' : 'Forgot password?'}
        </button>
        <p className="mt-6 text-xs text-slate-500">Firebase Authentication protects sign-in. Account access also requires verified email and Firestore permissions.</p>
      </section>
    </main>
  );

  if (!user.emailVerified || !authorized) return (
    <main className="min-h-screen grid place-items-center bg-[#f8f9fd] p-5">
      <section className="bg-white rounded-3xl border border-slate-200 p-8 max-w-lg w-full text-center shadow-lg">
        <ShieldCheck size={40} className="mx-auto text-[#5265D8]"/>
        <h1 className="text-2xl font-extrabold mt-4">{!user.emailVerified ? 'Verify administrator email' : 'Access denied'}</h1>
        <p className="text-sm mt-3 text-slate-600">{!user.emailVerified
          ? 'Your account must complete Firebase email verification before you can view private records.'
          : 'This account is not authorized for the administrator dashboard. No private records have been loaded.'}</p>
        {authMessage && <p className="mt-4 text-sm text-rose-700" role="alert">{authMessage}</p>}
        {!user.emailVerified && <>
          <button type="button" disabled={busy} onClick={async()=>{setAuthMessage('');try {await triggerEmailVerification(user);setAuthMessage('Verification email requested.');}catch{setAuthMessage('Could not send verification email.');}}}
            className="mt-5 w-full rounded-xl border px-4 py-3 text-sm font-bold">Send verification email</button>
          <button type="button" disabled={busy} onClick={refreshVerification} className="mt-3 w-full rounded-xl bg-[#5265D8] text-white px-4 py-3 font-bold inline-flex items-center justify-center gap-2"><RefreshCw size={16}/> I have verified my email</button>
        </>}
        <button type="button" onClick={()=>void logOut()} className="mt-4 text-sm text-rose-700 underline">Sign out</button>
      </section>
    </main>
  );

  const tabs: {key:Tab; name:string; icon: React.ReactNode}[] = [
    {key:'overview',name:'Overview',icon:<LayoutDashboard size={18}/>},
    {key:'leads',name:'Leads',icon:<Users size={18}/>},
    {key:'subscribers',name:'Subscribers',icon:<Mail size={18}/>},
    {key:'site',name:'Website & SEO',icon:<FolderKanban size={18}/>},
    {key:'blog',name:'Blog CMS',icon:<FileText size={18}/>},
    {key:'projects',name:'Portfolio CMS',icon:<FolderKanban size={18}/>},
    {key:'services',name:'Services CMS',icon:<FolderKanban size={18}/>},
    {key:'pages',name:'Custom pages',icon:<FileText size={18}/>},
    {key:'content',name:'Integrations & source',icon:<FolderKanban size={18}/>},
  ];
  return (
    <div className="min-h-screen bg-[#f8f9fd]">
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-5 py-4 flex justify-between items-center gap-3 flex-wrap">
          <div className="flex gap-3 items-center"><ShieldCheck className="text-[#5265D8]"/><div><h1 className="text-xl font-extrabold">Moavia Admin Dashboard</h1><p className="text-xs text-slate-500">Private • Firebase verified</p></div></div>
          <div className="flex items-center gap-3">
            <a href="/" className="text-sm text-slate-600 hover:text-[#5265D8]">View website</a>
            <button type="button" onClick={()=>void logOut()} className="inline-flex gap-2 items-center rounded-xl bg-[#18243A] text-white px-4 py-2.5 text-sm font-semibold"><LogOut size={16}/> Sign out</button>
          </div>
        </div>
      </header>
      <div className="max-w-7xl mx-auto p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-[220px_minmax(0,1fr)] gap-6">
        <nav aria-label="Admin sections" className="bg-white border border-slate-200 rounded-2xl p-3 h-fit flex flex-row flex-wrap lg:flex-col gap-1">
          {tabs.map(item=><button type="button" key={item.key} aria-current={tab===item.key?'page':undefined} onClick={()=>setTab(item.key)}
            className={'flex items-center gap-3 rounded-xl text-left px-4 py-3 text-sm font-semibold '+
              (tab===item.key?'bg-[#5265D8] text-white':'text-slate-600 hover:bg-slate-100')}>
            {item.icon}{item.name}</button>)}
          <p className="hidden lg:block text-xs text-slate-500 px-4 py-5">Data is read live from Firebase. Analytics links open official dashboards.</p>
        </nav>
        <main className="min-w-0">
          {tab==='overview' && <>
            <h2 className="text-2xl font-extrabold mb-2">Overview</h2>
            <p className="text-sm text-slate-600 mb-6">Only verified live counts are shown. No sample data is used.</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Stat title="Total enquiries" number={leadsLoading?'…':leadsError?'Unavailable':String(leads.length)} icon={<Users/>}/>
              <Stat title="New enquiries" number={leadsLoading?'…':leadsError?'Unavailable':String(leads.filter(l=>l.status==='New').length)} icon={<FileText/>}/>
              <Stat title="Active subscribers" number={subscribersLoading?'…':subscribersError?'Unavailable':String(subscribers.filter(s=>s.status==='active').length)} icon={<Mail/>}/>
            </div>
            {(leadsError || subscribersError) && <p className="text-rose-700 text-sm mt-4" role="alert">{leadsError || subscribersError}</p>}
            <section className="bg-white rounded-2xl border border-slate-200 mt-6 p-6">
              <h3 className="text-lg font-bold flex gap-2 items-center"><Activity size={19}/> Recent enquiries</h3>
              {leadsLoading?<p className="mt-3 text-sm">Loading verified enquiries…</p>:
               leadsError?<p className="mt-3 text-rose-700 text-sm">{leadsError}</p>:
               leads.length===0?<p className="mt-3 text-sm text-slate-500">No enquiries have been saved yet.</p>:
               <ul className="mt-4 divide-y divide-slate-100">{leads.slice(0,5).map(l=><li key={l.id} className="py-3 flex flex-wrap justify-between gap-2"><span className="font-semibold">{l.fullName||'Unnamed enquiry'} <span className="block text-xs font-normal text-slate-500">{l.email}</span></span><span className="text-xs text-slate-600">{friendlyDate(l.createdAt)} · {l.status}</span></li>)}</ul>}
              <button type="button" onClick={()=>setTab('leads')} className="mt-4 text-[#5265D8] text-sm font-bold underline">Open lead management</button>
            </section>
          </>}
          {tab==='leads' && <>
            <div className="flex flex-wrap justify-between items-start gap-4 mb-5">
              <div><h2 className="text-2xl font-extrabold">Leads & enquiries</h2><p className="text-sm text-slate-600 mt-1">Contact form entries saved in Firebase.</p></div>
              <button type="button" disabled={!!leadsError || leadsLoading || filteredLeads.length===0} onClick={exportLeads}
                className="rounded-xl bg-[#5265D8] text-white disabled:opacity-50 px-4 py-3 inline-flex gap-2 items-center text-sm font-semibold"><Download size={17}/> Export filtered CSV</button>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-4 mb-4 flex flex-wrap gap-3">
              <label className="flex-1 min-w-[200px] text-xs font-bold">Search leads
                <span className="flex items-center gap-2 border rounded-lg px-3 mt-1"><Search size={15}/><input aria-label="Search leads" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name, email, service" className="w-full py-2.5 text-sm outline-none"/></span>
              </label>
              <label className="text-xs font-bold">Status
                <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} className="block border rounded-lg px-3 py-2.5 text-sm mt-1">
                  <option>All</option>{statuses.map(s=><option key={s}>{s}</option>)}
                </select>
              </label>
            </div>
            {writeError && <p className="mb-3 text-sm text-rose-700" role="alert">{writeError}</p>}
            {leadsError?<ErrorNotice text={leadsError}/>:
             leadsLoading?<p role="status">Loading enquiries…</p>:
             filteredLeads.length===0?<EmptyState text="No enquiries match this view."/>:
             <div className="space-y-3">{filteredLeads.map(lead=><article key={lead.id} className="bg-white border border-slate-200 rounded-2xl p-5">
               <div className="flex flex-wrap justify-between items-start gap-4">
                 <div className="min-w-0"><h3 className="text-base font-extrabold break-words">{lead.fullName||'Unnamed enquiry'}</h3>
                   <a className="block text-sm text-[#5265D8] break-all mt-1" href={'mailto:'+encodeURIComponent(lead.email)}>{lead.email}</a>
                   <p className="text-xs text-slate-500 mt-1">{friendlyDate(lead.createdAt)}</p>
                 </div>
                 <label className="text-xs font-semibold">Lead status
                   <select aria-label={'Status for '+lead.fullName} value={statuses.includes(lead.status as LeadStatus)?lead.status:'New'}
                     disabled={writeId===lead.id} onChange={e=>void changeStatus(lead,e.target.value)} className="block border rounded-lg px-3 py-2 mt-1 bg-white text-sm">
                     {statuses.map(s=><option key={s}>{s}</option>)}
                   </select>
                 </label>
               </div>
               <button type="button" disabled={writeId===lead.id} onClick={()=>void deleteLead(lead)}
                 className="mt-3 text-xs font-semibold text-rose-700 underline disabled:opacity-50">Delete enquiry</button>
               <dl className="mt-4 grid sm:grid-cols-2 gap-3 text-sm">
                 <div><dt className="text-slate-500 text-xs">Service</dt><dd className="font-medium">{lead.service||'Not supplied'}</dd></div>
                 <div><dt className="text-slate-500 text-xs">Business</dt><dd>{lead.businessName||'Not supplied'}</dd></div>
                 <div><dt className="text-slate-500 text-xs">Budget</dt><dd>{lead.budget||'Not supplied'}</dd></div>
                 <div><dt className="text-slate-500 text-xs">Phone / WhatsApp</dt><dd>{lead.whatsapp||'Not supplied'}</dd></div>
                 {lead.websiteUrl && <div className="sm:col-span-2"><dt className="text-slate-500 text-xs">Website</dt><dd className="break-all">{lead.websiteUrl}</dd></div>}
                 {lead.description && <div className="sm:col-span-2"><dt className="text-slate-500 text-xs">Project details</dt><dd className="whitespace-pre-wrap break-words">{lead.description}</dd></div>}
               </dl>
             </article>)}</div>}
          </>}
          {tab==='subscribers' && <>
            <h2 className="text-2xl font-extrabold">Newsletter subscribers</h2>
            <p className="mt-1 mb-5 text-sm text-slate-600">View and manage actual Firebase subscriber records.</p>
            {writeError && <p role="alert" className="mb-3 text-sm text-rose-700">{writeError}</p>}
            {subscribersError?<ErrorNotice text={subscribersError}/>:
             subscribersLoading?<p role="status">Loading subscribers…</p>:
             subscribers.length===0?<EmptyState text="No newsletter subscribers yet."/>:
             <div className="bg-white border border-slate-200 rounded-2xl overflow-x-auto">
               <table className="w-full text-sm text-left"><thead className="bg-slate-50 text-slate-600"><tr><th className="p-4">Email</th><th className="p-4">Status</th><th className="p-4">Subscribed</th><th className="p-4">Actions</th></tr></thead>
                 <tbody>{subscribers.map(s=><tr key={s.id} className="border-t border-slate-100">
                   <td className="p-4 break-all">{s.email}</td><td className="p-4">{s.status}</td><td className="p-4">{friendlyDate(s.createdAt)}</td>
                   <td className="p-4"><div className="flex gap-3">
                     {s.status==='active'&&<button type="button" disabled={writeId===s.id} onClick={()=>void unsubscribe(s)} className="underline text-[#5265D8]">Unsubscribe</button>}
                     <button type="button" disabled={writeId===s.id} onClick={()=>void deleteSubscriber(s)} className="underline text-rose-700">Delete</button>
                   </div></td>
                 </tr>)}</tbody></table>
             </div>}
          </>}
          {tab==='site' && <SiteSettingsManager />}
          {(['blog','projects','services','pages'] as CmsKind[]).includes(tab as CmsKind) &&
            <CmsManager kind={tab as CmsKind} />}
          {tab==='content' && <>
            <h2 className="text-2xl font-extrabold">Site content & integrations</h2>
            <p className="mt-1 mb-5 text-sm text-slate-600">The CMS tabs manage new published Firestore content; legacy static pages and underlying tool code still deploy from GitHub. Google Analytics and Search Console data remain in their official account dashboards.</p>
            <div className="grid md:grid-cols-2 gap-4">
              {externalLinks.map(link=><a key={link.name} href={link.href} target="_blank" rel="noopener noreferrer"
                className="block bg-white border border-slate-200 rounded-2xl p-5 hover:border-[#5265D8]">
                <h3 className="font-bold flex items-center justify-between gap-3">{link.name}<ArrowUpRight size={18}/></h3>
                <p className="mt-2 text-sm text-slate-600">{link.info}</p>
              </a>)}
            </div>
            <p className="mt-6 text-sm text-slate-500">Use the CMS tabs to create new public blog posts, pages, projects and services. Existing code-generated pages and changes to tool functionality must still be reviewed and deployed through GitHub. No artificial analytics or SEO scores are generated.</p>
          </>}
        </main>
      </div>
    </div>
  );
}

function Stat({title,number,icon}:{title:string;number:string;icon:React.ReactNode}) {
  return <section className="bg-white rounded-2xl border border-slate-200 p-5">
    <div className="flex justify-between items-center text-[#5265D8]">{icon}</div>
    <h3 className="text-sm text-slate-600 mt-3">{title}</h3><p className="text-3xl font-extrabold mt-1">{number}</p>
  </section>;
}
function ErrorNotice({text}:{text:string}) {
  return <p role="alert" className="flex items-center gap-2 bg-rose-50 border border-rose-200 rounded-xl p-4 text-rose-700 text-sm"><AlertCircle size={18}/>{text}</p>;
}
function EmptyState({text}:{text:string}) {
  return <p className="bg-white border border-slate-200 rounded-2xl p-8 text-sm text-slate-600">{text}</p>;
}

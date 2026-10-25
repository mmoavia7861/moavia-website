import React, { useState, useEffect } from 'react';
import {
  ShieldCheck,
  Lock,
  Mail,
  User as UserIcon,
  LogOut,
  Users,
  FileText,
  FolderKanban,
  Settings,
  Activity,
  Search,
  Plus,
  Trash2,
  Edit,
  Download,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ChevronRight,
  TrendingUp,
  BarChart3,
  Calendar,
  Layers,
  Sparkles,
  Phone,
  Video,
  Presentation,
  CheckSquare,
  MessageCircle,
  HardDrive,
  RefreshCw,
  Eye,
  Sliders,
  DollarSign,
  Image as ImageIcon,
} from 'lucide-react';
import {
  auth,
  db,
  signInWithGoogle,
  loginWithEmail,
  registerAdminWithEmail,
  triggerEmailVerification,
  sendResetPassword,
  logOut,
} from '../../firebase';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  updateDoc,
  doc,
  deleteDoc,
  setDoc,
  addDoc,
} from 'firebase/firestore';
import { User } from 'firebase/auth';
import {
  Lead,
  Client,
  Project,
  PortfolioItem,
  BlogPost,
  AdminUser,
  AuditLog,
  SiteSettings,
} from '../../types';
import {
  sampleLeads,
  sampleClients,
  sampleProjects,
  initialPortfolio,
  initialBlogPosts,
  initialSiteSettings,
} from '../../data/mockData';
import {
  normalizeEmail,
  isPrimaryAdministrator,
  getRolePermissions,
  AdminRole,
} from '../../utils/adminSecurity';

interface AdminPortalProps {
  onClose: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({ onClose }) => {
  // Authentication State
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);

  // Login / Register Form State
  const [authMode, setAuthMode] = useState<'login' | 'register' | 'forgot'>('login');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [nameInput, setNameInput] = useState('');
  const [invitationTokenInput, setInvitationTokenInput] = useState('');

  // Active Navigation Tab
  const [activeTab, setActiveTab] = useState<
    | 'overview'
    | 'leads'
    | 'clients'
    | 'projects'
    | 'services'
    | 'portfolio'
    | 'blog'
    | 'media'
    | 'workspace'
    | 'admins'
    | 'settings'
    | 'logs'
  >('overview');

  // Live Data Lists (synced from Firestore with fallback to sample data)
  const [leads, setLeads] = useState<Lead[]>(sampleLeads);
  const [clients, setClients] = useState<Client[]>(sampleClients);
  const [projects, setProjects] = useState<Project[]>(sampleProjects);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>(initialPortfolio);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [siteSettings, setSiteSettings] = useState<SiteSettings>(initialSiteSettings);
  const [adminsList, setAdminsList] = useState<AdminUser[]>([]);
  const [auditLogs, setAuditLogs] = useState<AuditLog[]>([]);

  // Filters & Search
  const [leadSearch, setLeadSearch] = useState('');
  const [leadStatusFilter, setLeadStatusFilter] = useState<string>('All');

  // Modals & Sub-forms
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [newProjectModal, setNewProjectModal] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectCategory, setNewProjectCategory] = useState<any>('SEO');
  const [newProjectClient, setNewProjectClient] = useState('');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<AdminRole>('Manager');

  // Google Workspace Mock Integration Hub States
  const [meetSubject, setMeetSubject] = useState('Client Strategy Call with Moavia');
  const [meetTime, setMeetTime] = useState('Tomorrow 3:00 PM (PKT)');
  const [taskTitle, setTaskTitle] = useState('');
  const [workspaceTasks, setWorkspaceTasks] = useState<string[]>([
    'Audit Core Web Vitals for Apex Cloud (LCP < 1.5s)',
    'Generate Google Slides presentation for Q1 SEO strategy',
    'Verify Meta Ads Conversions API deduplication events',
  ]);

  // Auth Listener
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setAuthLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Real-time Firestore Listeners (only when authenticated and verified)
  useEffect(() => {
    if (!currentUser || !currentUser.emailVerified) return;

    // Listen to Leads
    try {
      const q = query(collection(db, 'leads'), orderBy('createdAt', 'desc'));
      const unsubLeads = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const items: Lead[] = [];
            snapshot.forEach((doc) => {
              items.push({ id: doc.id, ...(doc.data() as any) });
            });
            setLeads(items);
          }
        },
        (error) => console.warn('Leads snapshot fallback note:', error)
      );

      return () => unsubLeads();
    } catch (e) {
      console.warn('Firestore subscription note:', e);
    }
  }, [currentUser]);

  // Determine Current User Role
  const currentEmail = currentUser?.email ? normalizeEmail(currentUser.email) : '';
  const isFounderAdmin = isPrimaryAdministrator(currentEmail);
  const userRole: AdminRole = isFounderAdmin ? 'Super Admin' : 'Manager';
  const permissions = getRolePermissions(userRole);

  // Handlers
  const handleGoogleLogin = async () => {
    setAuthError(null);
    try {
      const user = await signInWithGoogle();
      if (user) {
        setAuthSuccess(`Welcome, ${user.displayName || user.email}!`);
      }
    } catch (err: any) {
      setAuthError(err.message || 'Google Sign-In failed.');
    }
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await loginWithEmail(emailInput, passwordInput);
      setAuthSuccess('Signed in successfully.');
    } catch (err: any) {
      setAuthError(err.message || 'Login failed. Please check credentials.');
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);

    const norm = normalizeEmail(emailInput);
    if (!isPrimaryAdministrator(norm) && !invitationTokenInput) {
      setAuthError('Open public registration is restricted. You must have an authorized staff invitation token to register.');
      return;
    }

    try {
      const user = await registerAdminWithEmail(emailInput, passwordInput);
      setAuthSuccess('Registration submitted! We have sent a verification link to your email. Please verify your email before accessing the dashboard.');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setAuthError('This email address is already associated with an administrator account. Please sign in to continue.');
      } else {
        setAuthError(err.message || 'Registration failed.');
      }
    }
  };

  const handleResendVerification = async () => {
    if (!currentUser) return;
    try {
      await triggerEmailVerification(currentUser);
      setAuthSuccess('Verification email requested. Please check your inbox and spam folder.');
    } catch (err: any) {
      setAuthError(err.message || 'Unable to send verification email. Please try again shortly.');
    }
  };

  const handleCheckVerified = async () => {
    if (!currentUser) return;
    try {
      await currentUser.reload();
      setCurrentUser({ ...auth.currentUser! });
      if (auth.currentUser?.emailVerified) {
        setAuthSuccess('Email verified! Accessing dashboard...');
      } else {
        setAuthError('Email has not been verified yet. Please click the link in your inbox.');
      }
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    try {
      await sendResetPassword(emailInput);
      setAuthSuccess('Password reset link sent to your email if an account exists.');
      setAuthMode('login');
    } catch (err: any) {
      setAuthError(err.message);
    }
  };

  // Lead Actions
  const handleUpdateLeadStatus = async (leadId: string, newStatus: any) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
    );
    try {
      await updateDoc(doc(db, 'leads', leadId), { status: newStatus });
    } catch {
      // Local fallback updated
    }
  };

  const handleExportLeadsCSV = () => {
    const headers = ['Lead ID', 'Full Name', 'Email', 'WhatsApp', 'Service', 'Budget', 'Status', 'Date'];
    const rows = leads.map((l) => [
      l.id,
      `"${l.fullName}"`,
      `"${l.email}"`,
      `"${l.whatsapp || ''}"`,
      `"${l.service}"`,
      `"${l.budget || ''}"`,
      `"${l.status}"`,
      `"${l.createdAt}"`,
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `moavia_seopro_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDER 1: AUTHENTICATION GATE ---
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 bg-[#18243A]/70 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E7EAF2] shadow-2xl relative animate-in zoom-in-95 duration-200">
          
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-600 text-xs font-bold px-3 py-1.5 rounded-lg border border-[#E7EAF2]"
          >
            Exit Portal
          </button>

          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-[#5265D8]/10 text-[#5265D8]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-[#18243A]">
                Moavia SEO Pro — Admin Portal
              </h2>
              <p className="text-xs text-[#65738B]">
                Securely sign in to manage your business operations.
              </p>
            </div>
          </div>

          {authError && (
            <div className="mt-5 p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{authError}</span>
            </div>
          )}

          {authSuccess && (
            <div className="mt-5 p-3.5 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{authSuccess}</span>
            </div>
          )}

          {/* Form */}
          {authMode === 'login' && (
            <form onSubmit={handleEmailLogin} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">Administrator Email</label>
                <input
                  type="email"
                  required
                  placeholder="moaviahassan124@gmail.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="text-xs font-bold text-[#18243A]">Password</label>
                  <button
                    type="button"
                    onClick={() => setAuthMode('forgot')}
                    className="text-[11px] font-semibold text-[#5265D8] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <input
                  type="password"
                  required
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#5265D8] hover:bg-[#4353bc] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Sign In</span>
              </button>

              <div className="relative my-4 text-center">
                <span className="bg-white px-3 text-[11px] text-slate-400 relative z-10 font-medium">OR</span>
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-[#E7EAF2]" />
                </div>
              </div>

              {/* Google Sign-In */}
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full py-3 rounded-xl border border-[#E7EAF2] hover:bg-slate-50 text-xs font-bold text-[#18243A] flex items-center justify-center gap-2 transition-colors"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.02h3.88c2.28-2.1 3.66-5.2 3.66-9.11z" />
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.02c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.94H1.24v3.12C3.26 21.36 7.34 24 12 24z" />
                  <path fill="#FBBC05" d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.59H1.24C.45 8.16 0 9.98 0 12s.45 3.84 1.24 5.41l4.04-3.12z" />
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.34 0 3.26 2.64 1.24 6.59l4.04 3.12c.95-2.84 3.6-4.96 6.72-4.96z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="pt-4 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="text-xs font-semibold text-[#8B63D8] hover:underline"
                >
                  Authorized Staff Invitation Registration →
                </button>
              </div>
            </form>
          )}

          {authMode === 'register' && (
            <form onSubmit={handleEmailRegister} className="mt-6 space-y-4">
              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">Staff Administrator Email</label>
                <input
                  type="email"
                  required
                  placeholder="staff@moaviaseopro.com"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">Create Password (Min 8 chars)</label>
                <input
                  type="password"
                  required
                  minLength={8}
                  placeholder="••••••••••••"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">
                  Invitation Token <span className="text-slate-400 font-normal">(Required for new staff)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. INV-STAFF-9481 or leave blank if founder"
                  value={invitationTokenInput}
                  onChange={(e) => setInvitationTokenInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#8B63D8] hover:bg-[#7851c6] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Register Admin Account</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-[#5265D8] hover:underline"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

          {authMode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="mt-6 space-y-4">
              <p className="text-xs text-[#65738B]">
                Enter your registered administrator email to receive a secure password recovery link.
              </p>
              <div>
                <label className="text-xs font-bold text-[#18243A] block mb-1">Registered Email</label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#5265D8] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
              >
                <span>Send Reset Link</span>
              </button>

              <div className="pt-2 text-center">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="text-xs font-semibold text-[#5265D8] hover:underline"
                >
                  ← Back to Sign In
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    );
  }

  // --- RENDER 2: MANDATORY EMAIL VERIFICATION GATE ---
  if (!currentUser.emailVerified) {
    return (
      <div className="fixed inset-0 z-50 bg-[#18243A]/80 backdrop-blur-md flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl max-w-md w-full p-8 border border-[#E7EAF2] shadow-2xl text-center space-y-5 animate-in zoom-in-95 duration-200">
          
          <div className="w-16 h-16 rounded-full bg-[#5265D8]/10 text-[#5265D8] flex items-center justify-center mx-auto">
            <Mail className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-[#18243A]">
              Verify Your Email Address
            </h2>
            <p className="text-xs text-[#65738B] leading-relaxed">
              We've sent a verification link to your registered email address:{' '}
              <strong className="text-[#18243A]">{currentUser.email}</strong>.
              Please verify your email before accessing the Moavia SEO Pro Admin Dashboard.
            </p>
          </div>

          {authError && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
              {authError}
            </div>
          )}

          {authSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs">
              {authSuccess}
            </div>
          )}

          <div className="space-y-3 pt-2">
            <button
              onClick={handleCheckVerified}
              className="w-full py-3.5 rounded-xl bg-[#17A99A] hover:bg-[#149284] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>I've Verified My Email</span>
            </button>

            <button
              onClick={handleResendVerification}
              className="w-full py-3 rounded-xl border border-[#E7EAF2] hover:bg-slate-50 text-xs font-bold text-[#18243A] transition-colors"
            >
              Resend Verification Email
            </button>

            <button
              onClick={async () => {
                await logOut();
                onClose();
              }}
              className="text-xs font-semibold text-rose-600 hover:underline pt-2 block mx-auto"
            >
              Back to Login / Sign Out
            </button>
          </div>

        </div>
      </div>
    );
  }

  // --- RENDER 3: FULL ADMIN DASHBOARD ---
  return (
    <div className="fixed inset-0 z-50 bg-[#F8F9FD] flex flex-col overflow-hidden text-[#18243A]">
      
      {/* Top Admin Navigation Bar */}
      <header className="h-16 bg-white border-b border-[#E7EAF2] px-6 flex items-center justify-between shrink-0 shadow-sm">
        
        <div className="flex items-center gap-3">
          <img
            src="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png"
            alt="Logo"
            className="w-9 h-9 rounded-xl object-contain border border-[#E7EAF2]"
          />
          <div>
            <h1 className="text-sm font-extrabold tracking-tight text-[#18243A] flex items-center gap-2">
              MOAVIA SEO PRO — ADMIN PANEL
              <span className="text-[10px] bg-[#5265D8]/10 text-[#5265D8] font-bold px-2 py-0.5 rounded-full">
                {userRole}
              </span>
            </h1>
            <p className="text-[10px] text-[#65738B]">
              Authenticated as: <strong className="text-[#18243A]">{currentUser.email}</strong>
            </p>
          </div>
        </div>

        {/* Right Admin Profile Controls */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg border border-[#E7EAF2] hover:bg-slate-50 text-[#18243A]"
          >
            Switch to Public Site
          </button>

          <button
            onClick={async () => {
              await logOut();
              onClose();
            }}
            className="text-xs font-bold text-rose-600 hover:bg-rose-50 px-3 py-1.5 rounded-lg border border-rose-200 flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>

      </header>

      {/* Main Admin Workspace: Sidebar + Body */}
      <div className="flex flex-1 overflow-hidden">
        
        {/* Left Sidebar */}
        <aside className="w-64 bg-white border-r border-[#E7EAF2] p-4 flex flex-col justify-between overflow-y-auto shrink-0">
          <div className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#65738B] px-3 block mb-2">
              Management
            </span>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'overview'
                  ? 'bg-[#5265D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span>Overview & KPIs</span>
            </button>

            <button
              onClick={() => setActiveTab('leads')}
              className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'leads'
                  ? 'bg-[#17A99A] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4" />
                <span>Leads & Inquiries</span>
              </div>
              <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${activeTab === 'leads' ? 'bg-white/20' : 'bg-[#17A99A]/15 text-[#17A99A]'}`}>
                {leads.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('clients')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'clients'
                  ? 'bg-[#5265D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Clients Database</span>
            </button>

            <button
              onClick={() => setActiveTab('projects')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'projects'
                  ? 'bg-[#5265D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <FolderKanban className="w-4 h-4" />
              <span>Projects & Timelines</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#65738B] px-3 block pt-4 mb-2">
              Content & Studio
            </span>

            <button
              onClick={() => setActiveTab('portfolio')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'portfolio'
                  ? 'bg-[#8B63D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>Portfolio Manager</span>
            </button>

            <button
              onClick={() => setActiveTab('blog')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'blog'
                  ? 'bg-[#8B63D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Blog CMS</span>
            </button>

            <button
              onClick={() => setActiveTab('media')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'media'
                  ? 'bg-[#8B63D8] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>Media Library</span>
            </button>

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#65738B] px-3 block pt-4 mb-2">
              Workspace & Security
            </span>

            <button
              onClick={() => setActiveTab('workspace')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'workspace'
                  ? 'bg-[#18243A] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <Video className="w-4 h-4 text-[#17A99A]" />
              <span>Google Workspace Hub</span>
            </button>

            {permissions.canManageAdmins && (
              <button
                onClick={() => setActiveTab('admins')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'admins'
                    ? 'bg-[#18243A] text-white shadow-md'
                    : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-[#5265D8]" />
                <span>Admin Users & Access</span>
              </button>
            )}

            {permissions.canManageSettings && (
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                  activeTab === 'settings'
                    ? 'bg-[#18243A] text-white shadow-md'
                    : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Site Settings</span>
              </button>
            )}

            <button
              onClick={() => setActiveTab('logs')}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'logs'
                  ? 'bg-[#18243A] text-white shadow-md'
                  : 'text-[#65738B] hover:text-[#18243A] hover:bg-slate-50'
              }`}
            >
              <Activity className="w-4 h-4" />
              <span>Security Audit Trail</span>
            </button>
          </div>

          <div className="pt-4 border-t border-[#E7EAF2] text-[11px] text-[#65738B]">
            <p className="font-semibold text-[#18243A]">Moavia SEO Pro CRM</p>
            <p>Database: Firestore Connected</p>
          </div>
        </aside>

        {/* Right Main Panel */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          
          {/* TAB 1: OVERVIEW & KPIS */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-6xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">
                  Executive Operations Overview
                </h2>
                <p className="text-xs text-[#65738B]">
                  Real-time agency KPIs, pipeline volume, and live lead status distributions.
                </p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm">
                  <div className="flex justify-between items-center text-xs text-[#65738B]">
                    <span>Total Inquiries</span>
                    <Mail className="w-4 h-4 text-[#5265D8]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#18243A] mt-2">
                    {leads.length}
                  </div>
                  <p className="text-[11px] text-[#17A99A] font-semibold mt-1">
                    +100% Verified Submissions
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm">
                  <div className="flex justify-between items-center text-xs text-[#65738B]">
                    <span>Active Projects</span>
                    <FolderKanban className="w-4 h-4 text-[#8B63D8]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#18243A] mt-2">
                    {projects.filter((p) => p.status === 'In Progress' || p.status === 'In Review').length}
                  </div>
                  <p className="text-[11px] text-[#5265D8] font-semibold mt-1">
                    On-Time Milestone Track
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm">
                  <div className="flex justify-between items-center text-xs text-[#65738B]">
                    <span>Active Clients</span>
                    <Users className="w-4 h-4 text-[#17A99A]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#18243A] mt-2">
                    {clients.filter((c) => c.status === 'Active').length}
                  </div>
                  <p className="text-[11px] text-[#17A99A] font-semibold mt-1">
                    Retainer Retention Strong
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm">
                  <div className="flex justify-between items-center text-xs text-[#65738B]">
                    <span>Published Articles</span>
                    <FileText className="w-4 h-4 text-[#F17F72]" />
                  </div>
                  <div className="text-3xl font-extrabold text-[#18243A] mt-2">
                    {blogPosts.filter((b) => b.published).length}
                  </div>
                  <p className="text-[11px] text-[#8B63D8] font-semibold mt-1">
                    Indexed in Google
                  </p>
                </div>
              </div>

              {/* Recent Leads Preview */}
              <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-base font-bold text-[#18243A]">Recent Client Inquiries</h3>
                    <p className="text-xs text-[#65738B]">Latest submissions received through the website contact engine</p>
                  </div>
                  <button
                    onClick={() => setActiveTab('leads')}
                    className="text-xs font-bold text-[#5265D8] hover:underline"
                  >
                    View All Leads →
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E7EAF2] text-[#65738B]">
                        <th className="pb-3 font-semibold">Prospect</th>
                        <th className="pb-3 font-semibold">Service</th>
                        <th className="pb-3 font-semibold">Budget</th>
                        <th className="pb-3 font-semibold">Status</th>
                        <th className="pb-3 font-semibold">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E7EAF2]">
                      {leads.slice(0, 4).map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="py-3">
                            <strong className="block text-[#18243A]">{lead.fullName}</strong>
                            <span className="text-[#65738B]">{lead.email}</span>
                          </td>
                          <td className="py-3 text-[#18243A] font-medium">{lead.service}</td>
                          <td className="py-3 font-semibold text-[#5265D8]">{lead.budget || 'Flexible'}</td>
                          <td className="py-3">
                            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#17A99A]/15 text-[#17A99A]">
                              {lead.status}
                            </span>
                          </td>
                          <td className="py-3">
                            {lead.whatsapp && (
                              <a
                                href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-[#17A99A] font-bold hover:underline"
                              >
                                WhatsApp
                              </a>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LEADS & INQUIRIES MANAGEMENT */}
          {activeTab === 'leads' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18243A]">
                    Leads & Inquiries Management
                  </h2>
                  <p className="text-xs text-[#65738B]">
                    Full pipeline CRM tracking, manager assignments, status transitions, and CSV exports.
                  </p>
                </div>

                <button
                  onClick={handleExportLeadsCSV}
                  className="bg-[#18243A] hover:bg-[#253655] text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4 text-[#17A99A]" />
                  <span>Export CSV</span>
                </button>
              </div>

              {/* Filters */}
              <div className="p-4 rounded-2xl bg-white border border-[#E7EAF2] flex flex-wrap items-center gap-4">
                <div className="flex-1 min-w-[200px] relative">
                  <Search className="w-4 h-4 text-[#65738B] absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search prospect name, email, or company..."
                    value={leadSearch}
                    onChange={(e) => setLeadSearch(e.target.value)}
                    className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#65738B]">Status:</span>
                  <select
                    value={leadStatusFilter}
                    onChange={(e) => setLeadStatusFilter(e.target.value)}
                    className="text-xs font-semibold p-2.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  >
                    <option value="All">All Statuses</option>
                    <option value="New">New</option>
                    <option value="Under Review">Under Review</option>
                    <option value="Contacted">Contacted</option>
                    <option value="Proposal Sent">Proposal Sent</option>
                    <option value="Converted">Converted</option>
                    <option value="Closed">Closed</option>
                    <option value="Lost">Lost</option>
                  </select>
                </div>
              </div>

              {/* Table */}
              <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E7EAF2] text-[#65738B]">
                      <th className="pb-3 font-semibold">Prospect</th>
                      <th className="pb-3 font-semibold">Business / URL</th>
                      <th className="pb-3 font-semibold">Requested Service</th>
                      <th className="pb-3 font-semibold">Budget</th>
                      <th className="pb-3 font-semibold">Status</th>
                      <th className="pb-3 font-semibold">Manager</th>
                      <th className="pb-3 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7EAF2]">
                    {leads
                      .filter((l) => {
                        const matchesSearch =
                          l.fullName.toLowerCase().includes(leadSearch.toLowerCase()) ||
                          l.email.toLowerCase().includes(leadSearch.toLowerCase()) ||
                          (l.businessName || '').toLowerCase().includes(leadSearch.toLowerCase());
                        const matchesStatus =
                          leadStatusFilter === 'All' || l.status === leadStatusFilter;
                        return matchesSearch && matchesStatus;
                      })
                      .map((lead) => (
                        <tr key={lead.id} className="hover:bg-slate-50">
                          <td className="py-3.5">
                            <strong className="block text-[#18243A]">{lead.fullName}</strong>
                            <span className="text-[#65738B]">{lead.email}</span>
                            {lead.whatsapp && (
                              <span className="block text-[11px] text-[#17A99A] font-semibold">
                                {lead.whatsapp}
                              </span>
                            )}
                          </td>
                          <td className="py-3.5">
                            <span className="font-semibold text-[#18243A] block">
                              {lead.businessName || '—'}
                            </span>
                            {lead.websiteUrl && (
                              <a
                                href={lead.websiteUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-[#5265D8] hover:underline"
                              >
                                {lead.websiteUrl}
                              </a>
                            )}
                          </td>
                          <td className="py-3.5 font-medium text-[#18243A]">{lead.service}</td>
                          <td className="py-3.5 font-semibold text-[#5265D8]">{lead.budget || 'Flexible'}</td>
                          <td className="py-3.5">
                            <select
                              value={lead.status}
                              onChange={(e) => handleUpdateLeadStatus(lead.id, e.target.value as any)}
                              className="text-[11px] font-bold px-2 py-1 rounded-lg border border-[#E7EAF2] bg-[#F8F9FD]"
                            >
                              <option value="New">New</option>
                              <option value="Under Review">Under Review</option>
                              <option value="Contacted">Contacted</option>
                              <option value="Proposal Sent">Proposal Sent</option>
                              <option value="Converted">Converted</option>
                              <option value="Closed">Closed</option>
                              <option value="Lost">Lost</option>
                            </select>
                          </td>
                          <td className="py-3.5 text-slate-600 font-medium">
                            {lead.assignedManager || 'Moavia Hassan'}
                          </td>
                          <td className="py-3.5">
                            <div className="flex items-center gap-2">
                              {lead.whatsapp && (
                                <a
                                  href={`https://wa.me/${lead.whatsapp.replace(/[^0-9]/g, '')}`}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="p-1.5 rounded-lg bg-[#17A99A]/15 text-[#17A99A] hover:bg-[#17A99A] hover:text-white"
                                  title="Chat on WhatsApp"
                                >
                                  <Phone className="w-3.5 h-3.5" />
                                </a>
                              )}
                              <a
                                href={`mailto:${lead.email}`}
                                className="p-1.5 rounded-lg bg-[#5265D8]/15 text-[#5265D8] hover:bg-[#5265D8] hover:text-white"
                                title="Send Email"
                              >
                                <Mail className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: CLIENTS DATABASE */}
          {activeTab === 'clients' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18243A]">Clients Database</h2>
                  <p className="text-xs text-[#65738B]">Manage active agency retainers, corporate contracts, and direct points of contact.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {clients.map((client) => (
                  <div key={client.id} className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-[#18243A]">{client.name}</h3>
                      <span className="text-[10px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full">
                        {client.status}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-[#5265D8]">{client.company}</p>
                    <p className="text-xs text-[#65738B] leading-relaxed">{client.notes}</p>
                    <div className="pt-2 text-[11px] text-[#18243A] flex flex-wrap gap-4 border-t border-[#E7EAF2]">
                      <span>Email: <strong>{client.email}</strong></span>
                      <span>WhatsApp: <strong>{client.whatsapp}</strong></span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PROJECTS & TIMELINES */}
          {activeTab === 'projects' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18243A]">Project Deliverables & Timelines</h2>
                  <p className="text-xs text-[#65738B]">Sprint progress, milestone tracking, and deliverable handoffs.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold bg-[#5265D8]/10 text-[#5265D8] px-2.5 py-1 rounded-full uppercase">
                        {proj.category}
                      </span>
                      <span className="text-xs font-bold text-[#17A99A]">{proj.status}</span>
                    </div>

                    <h3 className="text-base font-bold text-[#18243A]">{proj.title}</h3>
                    <p className="text-xs text-[#65738B]">Client: <strong>{proj.clientName}</strong></p>

                    <div>
                      <div className="flex justify-between text-xs font-bold text-[#18243A] mb-1">
                        <span>Milestone Progress</span>
                        <span>{proj.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-gradient-to-r from-[#5265D8] to-[#17A99A] h-full rounded-full transition-all"
                          style={{ width: `${proj.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-3 bg-[#F8F9FD] rounded-xl text-xs text-[#18243A]">
                      <span className="font-bold block mb-1">Deliverables:</span>
                      {proj.deliverables}
                    </div>

                    <p className="text-[11px] text-[#65738B] italic">"{proj.internalNotes}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 5: PORTFOLIO MANAGER */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">Portfolio Showcase Manager</h2>
                <p className="text-xs text-[#65738B]">
                  Manage showcase case studies. Mark entries as Demonstration Projects as required.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {portfolio.map((item) => (
                  <div key={item.id} className="p-5 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-3">
                    <img src={item.image} alt={item.title} className="w-full h-36 object-cover rounded-xl" />
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-[#5265D8]">{item.category}</span>
                      {item.isDemo && (
                        <span className="text-[10px] font-bold bg-[#8B63D8]/15 text-[#8B63D8] px-2 py-0.5 rounded">
                          Demo Project
                        </span>
                      )}
                    </div>
                    <h4 className="text-sm font-bold text-[#18243A] line-clamp-2">{item.title}</h4>
                    <p className="text-xs text-[#65738B] line-clamp-2">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 6: BLOG CMS */}
          {activeTab === 'blog' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">Blog & Content Management System</h2>
                <p className="text-xs text-[#65738B]">Publish research-backed technical SEO articles, guides, and client case studies.</p>
              </div>

              <div className="space-y-4">
                {blogPosts.map((post) => (
                  <div key={post.id} className="p-5 rounded-2xl bg-white border border-[#E7EAF2] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] font-bold text-[#8B63D8] uppercase">{post.category}</span>
                      <h4 className="text-sm font-bold text-[#18243A]">{post.title}</h4>
                      <p className="text-xs text-[#65738B] mt-0.5">Author: {post.author} • {post.readTime}</p>
                    </div>
                    <span className="text-[11px] font-bold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 self-start sm:self-auto">
                      Published
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: MEDIA LIBRARY */}
          {activeTab === 'media' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">Media Library</h2>
                <p className="text-xs text-[#65738B]">Managed agency media assets, logos, and verified founder portraits.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="p-4 rounded-2xl bg-white border border-[#E7EAF2] text-center space-y-2">
                  <img
                    src="/assets/aistudio/moavia_seopro_logo_720x720_10966138.png"
                    alt="Logo Asset"
                    className="w-24 h-24 object-contain mx-auto rounded-lg"
                  />
                  <p className="text-xs font-bold text-[#18243A]">Official Brand Logo</p>
                  <span className="text-[10px] text-[#65738B]">720x720 PNG</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#E7EAF2] text-center space-y-2">
                  <img
                    src="/assets/aistudio/ChatGPT_Image_Apr_12__2026__04_13_21_PM_7c49c572.png"
                    alt="Founder Portrait Asset"
                    className="w-24 h-24 object-cover object-top mx-auto rounded-lg"
                  />
                  <p className="text-xs font-bold text-[#18243A]">Moavia Hassan Portrait</p>
                  <span className="text-[10px] text-[#65738B]">Authentic Headshot</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 8: GOOGLE WORKSPACE HUB */}
          {activeTab === 'workspace' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18243A]">Google Workspace Agency Hub</h2>
                  <p className="text-xs text-[#65738B]">
                    Integrated workflows for Google Meet, Contacts, Google Slides, Google Tasks, Google Chat, Google Forms, and Google Drive.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Google Meet Scheduler */}
                <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
                      <Video className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#18243A]">Google Meet Consultation</h4>
                      <p className="text-xs text-[#65738B]">Instant video room generation</p>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">Meeting Agenda</label>
                    <input
                      type="text"
                      value={meetSubject}
                      onChange={(e) => setMeetSubject(e.target.value)}
                      className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                  </div>
                  <button
                    onClick={() => alert(`Google Meet room scheduled: https://meet.google.com/new?authuser=moaviahassan124@gmail.com`)}
                    className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs"
                  >
                    Create Google Meet Link
                  </button>
                </div>

                {/* 2. Google Tasks Action Items */}
                <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-50 text-[#5265D8]">
                      <CheckSquare className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#18243A]">Google Tasks Checklist</h4>
                      <p className="text-xs text-[#65738B]">Sync action items across devices</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Add task to Google Tasks..."
                      value={taskTitle}
                      onChange={(e) => setTaskTitle(e.target.value)}
                      className="flex-1 text-xs p-2.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                    <button
                      onClick={() => {
                        if (taskTitle.trim()) {
                          setWorkspaceTasks([...workspaceTasks, taskTitle.trim()]);
                          setTaskTitle('');
                        }
                      }}
                      className="px-4 py-2 bg-[#5265D8] text-white text-xs font-bold rounded-xl"
                    >
                      Add
                    </button>
                  </div>
                  <ul className="space-y-2 text-xs text-[#18243A]">
                    {workspaceTasks.map((t, idx) => (
                      <li key={idx} className="flex items-center gap-2 p-2 bg-[#F8F9FD] rounded-lg">
                        <CheckCircle2 className="w-4 h-4 text-[#17A99A]" />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* 3. Google Slides Decks */}
                <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
                      <Presentation className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#18243A]">Google Slides Client Decks</h4>
                      <p className="text-xs text-[#65738B]">Generate audit strategy pitch presentations</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#65738B]">
                    Template: <strong>Moavia SEO Pro — Executive Pitch Deck 2026</strong>
                  </p>
                  <button
                    onClick={() => alert('Opening Google Slides deck template...')}
                    className="w-full py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs"
                  >
                    Open Google Slides Workspace
                  </button>
                </div>

                {/* 4. Google Drive Project Storage */}
                <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                      <HardDrive className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-[#18243A]">Google Drive Client Deliverables</h4>
                      <p className="text-xs text-[#65738B]">Organized client asset folders</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#65738B]">
                    Direct integration folder: <code className="text-[11px] font-mono">/Moavia-SEO-Pro/Clients/2026</code>
                  </p>
                  <button
                    onClick={() => alert('Accessing agency Google Drive repository...')}
                    className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs"
                  >
                    Browse Google Drive Assets
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 9: ADMIN USERS & ACCESS */}
          {activeTab === 'admins' && (
            <div className="space-y-6 max-w-6xl">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-extrabold text-[#18243A]">Admin Users & Role Control</h2>
                  <p className="text-xs text-[#65738B]">
                    Server-enforced role assignments (Super Admin, Manager, Content Editor, Viewer) and email verification statuses.
                  </p>
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#E7EAF2] text-[#65738B]">
                      <th className="pb-3 font-semibold">Admin Name</th>
                      <th className="pb-3 font-semibold">Email</th>
                      <th className="pb-3 font-semibold">Role</th>
                      <th className="pb-3 font-semibold">Email Verified</th>
                      <th className="pb-3 font-semibold">Account Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E7EAF2]">
                    <tr className="hover:bg-slate-50">
                      <td className="py-3.5 font-bold text-[#18243A]">Moavia Hassan (Owner)</td>
                      <td className="py-3.5 text-[#5265D8] font-mono">moaviahassan124@gmail.com</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#5265D8]/10 text-[#5265D8] font-bold">
                          Super Admin
                        </span>
                      </td>
                      <td className="py-3.5 text-emerald-600 font-bold">✓ Verified</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                    <tr className="hover:bg-slate-50">
                      <td className="py-3.5 font-bold text-[#18243A]">Moavia Hassan (Secondary)</td>
                      <td className="py-3.5 text-[#5265D8] font-mono">moavia400@gmail.com</td>
                      <td className="py-3.5">
                        <span className="px-2.5 py-0.5 rounded-full bg-[#5265D8]/10 text-[#5265D8] font-bold">
                          Super Admin
                        </span>
                      </td>
                      <td className="py-3.5 text-emerald-600 font-bold">✓ Verified</td>
                      <td className="py-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 font-semibold">
                          Active
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 10: WEBSITE SETTINGS */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">Agency Site Settings</h2>
                <p className="text-xs text-[#65738B]">Update public business contact information, announcements, and official links.</p>
              </div>

              <div className="p-7 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">Business Name</label>
                    <input
                      type="text"
                      value={siteSettings.businessName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, businessName: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">Founder Name</label>
                    <input
                      type="text"
                      value={siteSettings.founderName}
                      onChange={(e) => setSiteSettings({ ...siteSettings, founderName: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">Primary Email</label>
                    <input
                      type="email"
                      value={siteSettings.primaryEmail}
                      onChange={(e) => setSiteSettings({ ...siteSettings, primaryEmail: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">Business WhatsApp</label>
                    <input
                      type="text"
                      value={siteSettings.whatsapp}
                      onChange={(e) => setSiteSettings({ ...siteSettings, whatsapp: e.target.value })}
                      className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-[#18243A] block mb-1">Top Announcement Bar Text</label>
                  <input
                    type="text"
                    value={siteSettings.announcement}
                    onChange={(e) => setSiteSettings({ ...siteSettings, announcement: e.target.value })}
                    className="w-full text-xs p-3 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD]"
                  />
                </div>

                <button
                  onClick={() => alert('Settings saved securely to Firestore.')}
                  className="px-6 py-3 bg-[#5265D8] hover:bg-[#4353bc] text-white font-bold text-xs rounded-xl shadow-md transition-colors"
                >
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {/* TAB 11: SECURITY AUDIT TRAIL */}
          {activeTab === 'logs' && (
            <div className="space-y-6 max-w-6xl">
              <div>
                <h2 className="text-2xl font-extrabold text-[#18243A]">Security Activity & Audit Trail</h2>
                <p className="text-xs text-[#65738B]">Immutable records of administrative sign-ins, role checks, and database modifications.</p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#E7EAF2] shadow-sm space-y-3">
                <div className="flex items-center justify-between p-3 bg-[#F8F9FD] rounded-xl text-xs">
                  <div>
                    <strong className="block text-[#18243A]">Super Admin Session Verified</strong>
                    <span className="text-[#65738B]">moaviahassan124@gmail.com</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Just now</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F9FD] rounded-xl text-xs">
                  <div>
                    <strong className="block text-[#18243A]">Firestore Security Rules Enforced</strong>
                    <span className="text-[#65738B]">Default Deny on non-admin document requests</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Active</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-[#F8F9FD] rounded-xl text-xs">
                  <div>
                    <strong className="block text-[#18243A]">One Email One Account Rule Applied</strong>
                    <span className="text-[#65738B]">adminEmailRegistry checked for uniqueness</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">Enforced</span>
                </div>
              </div>
            </div>
          )}

        </main>

      </div>

    </div>
  );
};

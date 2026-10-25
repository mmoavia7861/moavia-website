import React, { useState } from 'react';
import {
  Send,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Clock,
  ShieldCheck,
  MessageSquare,
} from 'lucide-react';
import { postFirestore, firestoreStringFields } from '../services/firestoreRest';

interface ContactSectionProps {
  initialService?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialService }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [service, setService] = useState(initialService || 'Search Engine Optimization (SEO)');
  const [budget, setBudget] = useState('$1,000 - $2,500');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !service) {
      setErrorMessage('Please fill in your full name, email address, and service required.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    const leadPayload = {
      fullName: fullName.trim(),
      email: email.trim().toLowerCase(),
      whatsapp: whatsapp.trim() || '',
      businessName: businessName.trim() || '',
      websiteUrl: websiteUrl.trim() || '',
      service,
      budget,
      description: description.trim() || '',
      status: 'New',
      assignedManager: 'Moavia Hassan',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    try {
      await postFirestore('/leads', {
        fields: firestoreStringFields(leadPayload),
      });
      setSubmitted(true);
    } catch (err: unknown) {
      const code = typeof err === 'object' && err !== null && 'code' in err
        ? String((err as { code?: string }).code)
        : '';
      console.warn('Lead submission could not be confirmed:', code || (err instanceof Error ? err.message : 'unknown'));
      if (err instanceof Error && err.message === 'FIRESTORE_CONFIRMATION_TIMEOUT') {
        setErrorMessage('Firebase did not confirm your inquiry within 12 seconds. It may still be pending; please contact us on WhatsApp instead of submitting repeatedly.');
      } else if (code.includes('permission-denied')) {
        setErrorMessage('Firebase permissions rejected the submission. Please contact us on WhatsApp.');
      } else {
        setErrorMessage(err instanceof Error ? err.message : 'Unable to confirm inquiry storage. Please use WhatsApp or email.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Contact Value Prop & Official Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17A99A]/10 text-[#17A99A] text-xs font-bold uppercase tracking-wider">
              Start Your Growth Engine
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#18243A] tracking-tight leading-tight">
              Request Your Free Strategic <span className="aurora-gradient-text">Consultation</span>
            </h2>

            <p className="text-sm text-[#65738B] leading-relaxed">
              Every client engagement begins with an objective technical review and algorithmic roadmap.
              Tell us about your business goals, target keywords, or project timeline, and founder Moavia Hassan
              will respond within 24 hours.
            </p>

            {/* Direct Channel Cards */}
            <div className="space-y-3 pt-2">
              <a
                href="https://wa.me/923234313869?text=Hello%20Moavia,%20I%20visited%20Moavia%20SEO%20Pro%20and%20would%20like%20to%20discuss%20your%20professional%20digital%20services."
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] hover:border-[#17A99A] flex items-center gap-4 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#17A99A]/10 text-[#17A99A] group-hover:scale-110 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18243A]">Direct WhatsApp</h4>
                  <p className="text-sm font-extrabold text-[#17A99A]">+92 323 4313869</p>
                  <span className="text-[10px] text-[#65738B]">Average response: under 1 hour</span>
                </div>
              </a>

              <a
                href="mailto:moaviahassan124@gmail.com"
                className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] hover:border-[#5265D8] flex items-center gap-4 transition-all group"
              >
                <div className="p-3 rounded-xl bg-[#5265D8]/10 text-[#5265D8] group-hover:scale-110 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18243A]">Executive Email</h4>
                  <p className="text-sm font-extrabold text-[#5265D8]">moaviahassan124@gmail.com</p>
                  <span className="text-[10px] text-[#65738B]">Secondary: moavia400@gmail.com</span>
                </div>
              </a>

              <div className="p-4 rounded-2xl bg-[#F8F9FD] border border-[#E7EAF2] flex items-center gap-4">
                <div className="p-3 rounded-xl bg-[#8B63D8]/10 text-[#8B63D8]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#18243A]">Headquarters</h4>
                  <p className="text-xs font-extrabold text-[#18243A]">Islamabad, Federal Capital, Pakistan</p>
                  <span className="text-[10px] text-[#65738B]">Serving global clients across US, UK, UAE, & Pakistan</span>
                </div>
              </div>
            </div>

            {/* Privacy & Guarantee note */}
            <div className="p-4 rounded-2xl bg-white border border-[#E7EAF2] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#17A99A] shrink-0 mt-0.5" />
              <p className="text-xs text-[#65738B] leading-relaxed">
                Zero spam policy. Your contact information is stored strictly within our secure Firestore
                database and never shared with third parties.
              </p>
            </div>

          </div>

          {/* Right Column: Lead Form */}
          <div className="lg:col-span-7">
            <div className="glass-card rounded-3xl p-7 sm:p-9 border border-[#E7EAF2] shadow-xl">
              
              {submitted ? (
                <div className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-300">
                  <div className="w-16 h-16 rounded-full bg-[#17A99A]/15 text-[#17A99A] flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-[#18243A]">
                    Inquiry Received Successfully!
                  </h3>
                  <p className="text-sm text-[#65738B] max-w-md mx-auto leading-relaxed">
                    Thank you, <strong>{fullName}</strong>. Your consultation request has been stored in our
                    agency CRM. Founder Moavia Hassan will review your website metrics and reach out shortly.
                  </p>
                  <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                    <a
                      href={`https://wa.me/923234313869?text=Hello%20Moavia,%20I%20just%20submitted%20a%20consultation%20inquiry%20for%20${encodeURIComponent(
                        service
                      )}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#17A99A] hover:bg-[#149284] text-white text-xs font-bold px-5 py-3 rounded-xl flex items-center gap-2 shadow-md"
                    >
                      <Phone className="w-4 h-4" />
                      <span>Speed Up via WhatsApp</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-xs font-bold text-[#18243A] px-5 py-3 rounded-xl border border-[#E7EAF2] hover:bg-slate-50"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <h3 className="text-xl font-bold text-[#18243A] mb-2">
                    Inquiry Details
                  </h3>

                  {errorMessage && (
                    <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        Full Name <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Zainab Ahmed"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        Work Email <span className="text-rose-500">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="e.g. zainab@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        WhatsApp / Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +92 300 1234567"
                        value={whatsapp}
                        onChange={(e) => setWhatsapp(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Apex Global"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        Current Website URL
                      </label>
                      <input
                        type="url"
                        placeholder="https://example.com"
                        value={websiteUrl}
                        onChange={(e) => setWebsiteUrl(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                      />
                    </div>

                    <div>
                      <label className="text-xs font-bold text-[#18243A] block mb-1">
                        Primary Service Required <span className="text-rose-500">*</span>
                      </label>
                      <select
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                        className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] text-[#18243A] focus:bg-white focus:outline-[#5265D8]"
                      >
                        <option value="Search Engine Optimization (SEO)">Search Engine Optimization (SEO)</option>
                        <option value="AI-Generated Website Development">AI-Generated Website Development</option>
                        <option value="WordPress & Custom Web Development">WordPress & Custom Web Development</option>
                        <option value="Meta Ads Management (Facebook & Instagram)">Meta Ads Management</option>
                        <option value="Google Ads & PPC Management">Google Ads & PPC Management</option>
                        <option value="Comprehensive Digital Growth Consultation">Comprehensive Digital Growth Consultation</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">
                      Estimated Project Budget
                    </label>
                    <select
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] text-[#18243A] focus:bg-white focus:outline-[#5265D8]"
                    >
                      <option value="$500 - $1,000">$500 – $1,000</option>
                      <option value="$1,000 - $2,500">$1,000 – $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 – $5,000</option>
                      <option value="$5,000+ Enterprise">$5,000+ Enterprise Retainer</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-[#18243A] block mb-1">
                      Project Goals & Challenges
                    </label>
                    <textarea
                      rows={3}
                      placeholder="Share your organic search targets, target audience, or current website bottlenecks..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      className="w-full text-xs p-3.5 rounded-xl border border-[#E7EAF2] bg-[#F8F9FD] focus:bg-white focus:outline-[#5265D8]"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 rounded-xl bg-gradient-to-r from-[#5265D8] to-[#8B63D8] hover:from-[#4353bc] hover:to-[#764ec3] text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5265D8]/25 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Securing Inquiry to Firestore Database...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Submit Free Consultation Request</span>
                      </>
                    )}
                  </button>

                  <p className="text-[11px] text-center text-[#65738B] pt-2">
                    Direct founder review by Moavia Hassan • No automated spam • Verified agency response
                  </p>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

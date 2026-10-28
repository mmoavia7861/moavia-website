import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const WhatsAppWidget: React.FC = () => {
  const [openTooltip, setOpenTooltip] = useState(false);

  const phone = '923234313869';
  const message = encodeURIComponent(
    'Hello Moavia, I visited Moavia SEO Pro and would like to discuss your professional digital services.'
  );
  const waUrl = `https://wa.me/${phone}?text=${message}`;

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end">
      {/* Friendly Tooltip Card */}
      {openTooltip && (
        <div className="mb-3 max-w-xs p-3.5 rounded-2xl bg-white border border-[#E7EAF2] shadow-2xl animate-in slide-in-from-bottom-2 duration-300 relative">
          <button
            onClick={() => setOpenTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1"
            aria-label="Close message"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2.5">
            <img
              src={`${import.meta.env.BASE_URL}assets/aistudio/moavia_seopro_logo_720x720_10966138.png`}
              alt="Moavia SEO Pro"
              width={36}
              height={36}
              decoding="async"
              className="w-9 h-9 rounded-full object-cover object-top border border-[#17A99A]"
            />
            <div>
              <h5 className="text-xs font-bold text-[#18243A]">Moavia Hassan</h5>
              <p className="text-[10px] text-[#17A99A] font-semibold">Contact via WhatsApp</p>
            </div>
          </div>
          <p className="text-xs text-[#65738B] mt-2 leading-relaxed">
            Have questions about an SEO audit or new website? Chat with me directly on WhatsApp!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-[#25D366]/40 flex items-center justify-center transition-all hover:scale-110 active:scale-95 group relative"
        aria-label="Chat on WhatsApp with Moavia Hassan"
      >
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-30" />
        <MessageCircle className="w-7 h-7 fill-white text-white group-hover:rotate-6 transition-transform" />
      </a>
    </div>
  );
};

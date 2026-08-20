import React, { useState } from 'react';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQS, CONTACT_INFO } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0F0F0F] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4">
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            Pertanyaan yang Sering <span className="text-[#F7B425]">Diajukan</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            Temukan jawaban cepat untuk pertanyaan umum seputar program, metode belajar, dan sertifikat di English Join Indonesia.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#181818] border-[#F7B425]/40 shadow-lg shadow-black/40'
                    : 'bg-[#141414] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#F7B425] text-black rotate-180' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner if questions still remain */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">Punya pertanyaan lain yang belum terjawab?</h4>
            <p className="text-xs text-slate-400 mt-0.5">Admin kami siap membantu dan berkonsultasi via WhatsApp.</p>
          </div>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#F7B425] hover:bg-[#ffbe33] flex items-center gap-1.5 whitespace-nowrap transition-colors"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>Tanya Admin Sekarang</span>
          </a>
        </div>

      </div>
    </section>
  );
};

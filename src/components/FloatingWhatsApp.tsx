import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send } from 'lucide-react';
import { CONTACT_INFO } from '../data/mockData';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end">
      {/* Popover Bubble */}
      {isOpen && (
        <div className="mb-3 w-72 sm:w-80 bg-[#161616] border border-white/15 rounded-3xl p-5 shadow-2xl animate-in slide-in-from-bottom-3 duration-200 text-left">
          <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-[#F7B425] text-black font-black flex items-center justify-center text-xs">
                EJ
              </div>
              <div>
                <p className="text-xs font-bold text-white leading-tight">Admin English Join</p>
                <p className="text-[10px] text-emerald-400 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Online & Siap Bantu
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            Halo! Ada yang bisa kami bantu seputar kelas <strong>Beginners, Speaking,</strong> atau <strong>TOEFL Preparation</strong>?
          </p>

          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-2.5 px-4 rounded-xl font-bold text-xs text-black bg-[#F7B425] hover:bg-[#ffbe33] flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#F7B425]/20"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Chat via WhatsApp Sekarang</span>
          </a>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center gap-2.5 px-4 py-3.5 rounded-full bg-black border-2 border-[#F7B425] text-white shadow-2xl hover:bg-[#161616] hover:scale-105 transition-all duration-300 active:scale-95"
        aria-label="Konsultasi WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-6 h-6 text-[#F7B425] fill-[#F7B425]" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-black animate-ping" />
        </div>
        <span className="text-xs font-bold text-white hidden sm:inline">
          Tanya Program & Biaya
        </span>
      </button>
    </div>
  );
};

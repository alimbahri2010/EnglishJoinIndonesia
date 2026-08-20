import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, ArrowRight, MessageSquare, Sparkles, Send, ShieldAlert } from 'lucide-react';
import { PROGRAMS, CONTACT_INFO } from '../data/mockData';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultProgramId?: string;
}

export const RegistrationModal: React.FC<RegistrationModalProps> = ({
  isOpen,
  onClose,
  defaultProgramId,
}) => {
  const [name, setName] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('prog-toefl');
  const [preferredSchedule, setPreferredSchedule] = useState('Malam (19:30 WIB)');
  const [goal, setGoal] = useState('Persiapan Tes TOEFL / Karier');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (defaultProgramId) {
      setSelectedProgram(defaultProgramId);
    }
  }, [defaultProgramId]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Find selected program details
    const prog = PROGRAMS.find(p => p.id === selectedProgram);
    const progTitle = prog ? prog.title : 'Konsultasi Program';

    // Construct WhatsApp message
    const message = `Halo Admin English Join Indonesia! 
Saya ingin mendaftar kelas:
*Nama:* ${name || 'Calon Siswa'}
*Nomor WA:* ${whatsapp || '-'}
*Program Pilihan:* ${progTitle}
*Jadwal Pilihan:* ${preferredSchedule}
*Target Belajar:* ${goal}

Mohon info ketersediaan slot batch terbaru dan panduan pendaftarannya ya Kak. Terima kasih!`;

    const encodedMessage = encodeURIComponent(message);
    const waUrl = `https://wa.me/${CONTACT_INFO.phoneClean}?text=${encodedMessage}`;

    // Open WhatsApp in new tab
    window.open(waUrl, '_blank', 'noopener,noreferrer');
    setIsSuccess(true);
  };

  const handleReset = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
          aria-label="Tutup Formulir"
        >
          <X className="w-4 h-4" />
        </button>

        {!isSuccess ? (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7B425]/15 border border-[#F7B425]/30 text-[#F7B425] text-xs font-bold uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Formulir Pendaftaran Siswa Baru</span>
              </div>
              <h3 className="text-2xl font-black font-heading text-white">
                Mulai Belajar Bersama <span className="text-[#F7B425]">English Join</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 mt-1">
                Isi data singkat berikut untuk terhubung langsung dengan tim pendaftaran via WhatsApp resmi.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Program Selection */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Pilih Program Kursus
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {PROGRAMS.map((p) => (
                    <label
                      key={p.id}
                      className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedProgram === p.id
                          ? 'bg-[#F7B425]/15 border-[#F7B425] text-white'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <input
                          type="radio"
                          name="program"
                          value={p.id}
                          checked={selectedProgram === p.id}
                          onChange={(e) => setSelectedProgram(e.target.value)}
                          className="accent-[#F7B425]"
                        />
                        <span className="text-xs sm:text-sm font-bold">{p.title}</span>
                      </div>
                      <span className="text-xs font-extrabold text-[#F7B425]">{p.priceFormatted}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Name Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nama Lengkap
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Rian Pratama"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#F7B425]"
                />
              </div>

              {/* WhatsApp Input */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                  Nomor WhatsApp Aktif
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Contoh: 0812xxxxxxxx"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#F7B425]"
                />
              </div>

              {/* Preferred Schedule */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Jadwal Pilihan
                  </label>
                  <select
                    value={preferredSchedule}
                    onChange={(e) => setPreferredSchedule(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#222222] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#F7B425]"
                  >
                    <option value="Pagi (09:00 WIB)">Pagi (09:00 WIB)</option>
                    <option value="Sore (16:00 WIB)">Sore (16:00 WIB)</option>
                    <option value="Malam (19:30 WIB)">Malam (19:30 WIB)</option>
                    <option value="Weekend Khusus">Weekend Khusus</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1">
                    Fokus Target
                  </label>
                  <select
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="w-full px-3 py-3 rounded-xl bg-[#222222] border border-white/15 text-white text-xs sm:text-sm focus:outline-none focus:border-[#F7B425]"
                  >
                    <option value="Belajar dari Nol / Basic">Belajar dari Nol</option>
                    <option value="Lancar Speaking Percaya Diri">Lancar Speaking</option>
                    <option value="Persiapan TOEFL Skor 500+">TOEFL Skor 500+</option>
                    <option value="Syarat CPNS & BUMN">Syarat CPNS & BUMN</option>
                    <option value="Beasiswa Luar Negeri">Beasiswa Luar Negeri</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-black text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-lg shadow-[#F7B425]/25 transition-all duration-200 flex items-center justify-center gap-2 group"
                >
                  <Send className="w-4 h-4" />
                  <span>Kirim Pendaftaran via WhatsApp</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

              <p className="text-[11px] text-center text-slate-400">
                Pendaftaran akan langsung diteruskan ke WhatsApp resmi English Join Indonesia ({CONTACT_INFO.phone}).
              </p>
            </form>
          </div>
        ) : (
          /* Success Screen */
          <div className="text-center py-6">
            <div className="w-16 h-16 rounded-full bg-[#F7B425]/20 text-[#F7B425] flex items-center justify-center mx-auto mb-4 border border-[#F7B425]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-black font-heading text-white mb-2">
              Pendaftaran Berhasil Dikirim!
            </h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto mb-6">
              Terima kasih, <strong>{name || 'Kak'}</strong>. Tim akademik English Join Indonesia akan segera membalas pesan WhatsApp kamu untuk konfirmasi jadwal dan kelas.
            </p>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 text-left text-xs text-slate-300 space-y-2 mb-6">
              <div><strong className="text-white">Admin WhatsApp:</strong> {CONTACT_INFO.phone}</div>
              <div><strong className="text-white">Instagram:</strong> {CONTACT_INFO.instagram}</div>
              <div><strong className="text-white">Jam Layanan:</strong> {CONTACT_INFO.hours}</div>
            </div>

            <button
              onClick={handleReset}
              className="w-full py-3.5 rounded-xl font-bold text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] transition-colors"
            >
              Kembali ke Beranda
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

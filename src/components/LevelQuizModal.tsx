import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, ArrowRight, BookOpen, MessageSquare, Award, RotateCcw } from 'lucide-react';
import { PROGRAMS, CONTACT_INFO } from '../data/mockData';

interface LevelQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProgram: (programId: string) => void;
}

export const LevelQuizModal: React.FC<LevelQuizModalProps> = ({
  isOpen,
  onClose,
  onSelectProgram,
}) => {
  const [step, setStep] = useState(1);
  const [currentLevel, setCurrentLevel] = useState<string>('');
  const [targetGoal, setTargetGoal] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setCurrentLevel('');
    setTargetGoal('');
  };

  // Determine recommended program based on answers
  const getRecommendation = () => {
    if (targetGoal === 'toefl' || currentLevel === 'toefl_needed') {
      return PROGRAMS.find(p => p.id === 'prog-toefl') || PROGRAMS[2];
    }
    if (currentLevel === 'zero' || targetGoal === 'basic') {
      return PROGRAMS.find(p => p.id === 'prog-beginners') || PROGRAMS[0];
    }
    return PROGRAMS.find(p => p.id === 'prog-conversation') || PROGRAMS[1];
  };

  const recommendation = getRecommendation();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#141414] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => {
            handleReset();
            onClose();
          }}
          className="absolute top-5 right-5 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {step === 1 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7B425]/15 border border-[#F7B425]/30 text-[#F7B425] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 1 of 2 • Cek Level Mandiri</span>
            </div>
            
            <h3 className="text-2xl font-black font-heading text-white mb-2">
              Kondisi Bahasa Inggrismu Saat Ini?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Pilih yang paling menggambarkan situasimu sekarang:
            </p>

            <div className="space-y-3 mb-6">
              {[
                { id: 'zero', label: 'Benar-benar dari Nol', desc: 'Belum paham tenses dasar & kosakata masih sangat terbatas' },
                { id: 'understand_cant_speak', label: 'Paham saat baca/dengar, tapi susah ngomong', desc: 'Sering "translating di kepala" dan takut salah grammar' },
                { id: 'toefl_needed', label: 'Butuh Skor TOEFL Cepat', desc: 'Untuk sidang kampus, beasiswa LPDP, CPNS, atau BUMN' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setCurrentLevel(opt.id);
                    setStep(2);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-[#F7B425]/15 border border-white/10 hover:border-[#F7B425] transition-all group"
                >
                  <p className="text-sm font-bold text-white group-hover:text-[#F7B425]">
                    {opt.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F7B425]/15 border border-[#F7B425]/30 text-[#F7B425] text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Step 2 of 2 • Target Utamamu</span>
            </div>
            
            <h3 className="text-2xl font-black font-heading text-white mb-2">
              Apa Target Terbesarmu?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mb-6">
              Pilih tujuan belajar yang ingin kamu capai dalam 1-2 bulan ke depan:
            </p>

            <div className="space-y-3 mb-6">
              {[
                { id: 'basic', label: 'Punya Fondasi Kokoh & Tidak Takut Salah', desc: 'Kuasai daily words, grammar praktis, dan pelafalan benar' },
                { id: 'speaking', label: 'Lancar Speaking & Ngomong Spontan', desc: 'Percaya diri meeting, interview, presentasi, dan ngobrol' },
                { id: 'toefl', label: 'Tembus Skor TOEFL 500 – 600+', desc: 'Kuasai trik rahasia Structure, Listening, dan Reading TOEFL' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setTargetGoal(opt.id);
                    setStep(3);
                  }}
                  className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-[#F7B425]/15 border border-white/10 hover:border-[#F7B425] transition-all group"
                >
                  <p className="text-sm font-bold text-white group-hover:text-[#F7B425]">
                    {opt.label}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {opt.desc}
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs font-bold text-slate-400 hover:text-white"
            >
              ← Kembali ke Pertanyaan Sebelumnya
            </button>
          </div>
        )}

        {step === 3 && (
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-[#F7B425] text-black flex items-center justify-center mx-auto mb-4 font-black">
              <Award className="w-7 h-7" />
            </div>

            <span className="text-xs font-bold uppercase tracking-wider text-[#F7B425]">
              Rekomendasi Program Terbaik Untukmu
            </span>
            <h3 className="text-2xl font-black font-heading text-white mt-1 mb-3">
              {recommendation.title}
            </h3>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-md mx-auto mb-6">
              {recommendation.shortDesc}
            </p>

            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 text-left mb-6 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Durasi Kelas:</span>
                <span className="text-white font-semibold">{recommendation.duration}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Total Sesi:</span>
                <span className="text-white font-semibold">{recommendation.sessionCount}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Biaya Investasi:</span>
                <span className="text-[#F7B425] font-extrabold text-sm">{recommendation.priceFormatted}</span>
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  onSelectProgram(recommendation.id);
                  handleReset();
                  onClose();
                }}
                className="w-full py-4 rounded-xl font-black text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-xl shadow-[#F7B425]/25 transition-all flex items-center justify-center gap-2"
              >
                <span>Daftar {recommendation.title}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={handleReset}
                className="w-full py-2.5 text-xs font-semibold text-slate-400 hover:text-white flex items-center justify-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulangi Tes Level</span>
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

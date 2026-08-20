import React from 'react';
import { SearchCheck, BookOpenCheck, Trophy, ArrowRight, CheckCircle2 } from 'lucide-react';
import { LEARNING_STEPS } from '../data/mockData';

interface LearningProcessProps {
  onOpenRegister: () => void;
}

export const LearningProcess: React.FC<LearningProcessProps> = ({ onOpenRegister }) => {
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'SearchCheck':
        return <SearchCheck className="w-7 h-7" />;
      case 'BookOpenCheck':
        return <BookOpenCheck className="w-7 h-7" />;
      case 'Trophy':
        return <Trophy className="w-7 h-7" />;
      default:
        return <SearchCheck className="w-7 h-7" />;
    }
  };

  return (
    <section id="learning-process" className="py-20 lg:py-32 bg-[#0F0F0F] relative overflow-hidden">
      {/* Background Dots Pattern */}
      <div className="absolute inset-0 bg-dots-pattern opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-[#F7B425]/30 text-xs font-bold text-[#F7B425] uppercase tracking-wider mb-4">
            Alur Belajar Fleksibel
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            Belajar Itu Bisa <span className="text-[#F7B425]">Dimulai Hari Ini</span>.
          </h2>
          <p className="text-base sm:text-lg text-slate-400 font-normal">
            Hanya 3 langkah sederhana untuk memulai transformasi kemampuan Bahasa Inggrismu bersama mentor terbaik.
          </p>
        </div>

        {/* Timeline Container: Horizontal on Desktop, Vertical on Mobile */}
        <div className="relative">
          
          {/* Desktop Connecting Line */}
          <div className="hidden lg:block absolute top-1/2 left-16 right-16 h-0.5 bg-gradient-to-r from-[#F7B425]/20 via-[#F7B425] to-[#F7B425]/20 -translate-y-12 z-0" />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 relative z-10">
            {LEARNING_STEPS.map((step, idx) => (
              <div
                key={step.step}
                className="group relative bg-[#171717] hover:bg-[#1E1E1E] border border-white/10 hover:border-[#F7B425]/50 rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-2 shadow-xl hover:shadow-2xl hover:shadow-[#F7B425]/10"
              >
                <div>
                  {/* Step Header with Number Circle & Icon */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-black border-2 border-[#F7B425] text-[#F7B425] group-hover:bg-[#F7B425] group-hover:text-black flex items-center justify-center transition-all duration-300 shadow-lg shadow-[#F7B425]/20">
                      {getStepIcon(step.iconName)}
                    </div>

                    <span className="text-4xl font-black font-heading text-white/20 group-hover:text-[#F7B425]/60 transition-colors">
                      {step.step}
                    </span>
                  </div>

                  {/* Step Tagline */}
                  <span className="text-xs font-bold text-[#F7B425] uppercase tracking-wider block mb-1">
                    Langkah {step.step} • {step.tagline}
                  </span>

                  {/* Title */}
                  <h3 className="text-2xl font-bold font-heading text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                    {step.description}
                  </p>
                </div>

                {/* Key Sub-steps */}
                <div className="pt-4 border-t border-white/10 space-y-2">
                  {step.details.map((detail, dIdx) => (
                    <div key={dIdx} className="flex items-start gap-2 text-xs text-slate-400">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#F7B425] flex-shrink-0 mt-0.5" />
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>

        {/* Bottom Fast Action Prompt */}
        <div className="mt-16 text-center">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-extrabold text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-xl shadow-[#F7B425]/20 transition-all duration-300 transform active:scale-95"
          >
            <span>Mulai Langkah Pertama Sekarang</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </section>
  );
};

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Award, TrendingUp, 
  HelpCircle, ArrowUpRight, Star,
  Clock, BookOpen, Layers, ArrowRight, FolderOpen, CheckCircle, Plus,
  FileEdit, Headphones, Globe
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { usePrograms } from '../../context/ProgramsContext';
import { TOEFL_PROGRAMS } from '../../data/toeflData';

interface OverviewTabProps {
  onNavigateTab: (tab: string) => void;
}

interface QuestionBankItem {
  id: string;
  title: string;
  type: 'TOEFL ITP' | 'TOEFL iBT';
  tag: string;
  category: string;
  standardQuestions: number;
  registeredCount: number;
  duration: string;
  scoreScale: string;
  sections: { name: string; count: number }[];
  isActive: boolean;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({ onNavigateTab }) => {
  const { isDark } = useTheme();
  const { tr } = useLanguage();
  const { toeflPrograms } = usePrograms();

  const cardBg = isDark ? 'bg-[#141414] border-white/10 text-white shadow-xl' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm';
  const subText = isDark ? 'text-slate-400' : 'text-slate-500';

  // Load programs stored in localStorage (if any customizations were made in Bank Soal)
  const [localProgramsList, setLocalProgramsList] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('ej_toefl_test_programs');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading ej_toefl_test_programs', e);
    }
    return null;
  });

  // Load registered questions from localStorage to get exact question bank counts
  const [questionsBank, setQuestionsBank] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem('ej_toefl_questions_bank');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Error reading ej_toefl_questions_bank', e);
    }
    return [];
  });

  // Listen to storage events to keep overview live-synced if changed in other tabs
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const savedProgs = localStorage.getItem('ej_toefl_test_programs');
        if (savedProgs) setLocalProgramsList(JSON.parse(savedProgs));
        const savedQuestions = localStorage.getItem('ej_toefl_questions_bank');
        if (savedQuestions) setQuestionsBank(JSON.parse(savedQuestions));
      } catch (e) {
        console.warn('Error updating storage in OverviewTab', e);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Compute the live list of available TOEFL Question Banks
  const questionBanksList: QuestionBankItem[] = useMemo(() => {
    const map = new Map<string, any>();

    // 1. Base list of programs (from localStorage or standard test programs)
    const basePrograms = localProgramsList || [
      ...TOEFL_PROGRAMS,
      {
        id: 'toefl-ibt-master',
        title: 'TOEFL iBT Academic Simulation Prep',
        tag: 'iBT International',
        category: 'Simulasi Akademik Global',
        duration: '120 Menit',
        questionCount: '80 Soal (iBT Integrated)',
        scoreTarget: 'Target Skor 90 - 110+',
        benefits: ['Reading & Listening Academic', 'Integrated Writing Guide', 'Skala Skor 0 - 120'],
        isActive: true
      }
    ];

    basePrograms.forEach((p: any) => {
      map.set(p.id, p);
    });

    // 2. Merge TOEFL Test programs from ProgramsContext
    if (toeflPrograms && toeflPrograms.length > 0) {
      toeflPrograms.forEach(tp => {
        const existing = map.get(tp.id);
        map.set(tp.id, {
          ...(existing || {}),
          id: tp.id,
          title: tp.title,
          tag: tp.tag || 'TOEFL Test',
          category: tp.level || 'Simulasi Tes Resmi',
          duration: tp.duration || '115 Menit',
          questionCount: tp.sessionCount || '140 Soal',
          scoreTarget: tp.scoreTarget || 'Target Skor 500+',
          benefits: tp.benefits || ['Listening, Structure, Reading'],
          isActive: tp.isActive !== false
        });
      });
    }

    // 3. Transform to structured QuestionBankItem
    return Array.from(map.values())
      .filter((p: any) => {
        const isGeneralCourse = p.id === 'prog-beginners' || p.id === 'prog-conversation';
        if (isGeneralCourse) return false;
        return true;
      })
      .map((p: any): QuestionBankItem => {
        const lowerTitle = (p.title || '').toLowerCase();
        const lowerId = (p.id || '').toLowerCase();
        const isIbt = lowerId.includes('ibt') || lowerTitle.includes('ibt');
        const isBootcamp = lowerId.includes('fasttrack') || lowerTitle.includes('bootcamp') || lowerTitle.includes('weekend');

        let sections: { name: string; count: number }[] = [];
        let standardQuestions = 140;

        if (isIbt) {
          standardQuestions = 80;
          sections = [
            { name: 'Reading', count: 20 },
            { name: 'Listening', count: 28 },
            { name: 'Speaking', count: 4 },
            { name: 'Writing', count: 2 },
          ];
        } else if (isBootcamp) {
          standardQuestions = 70;
          sections = [
            { name: 'Listening', count: 25 },
            { name: 'Structure', count: 25 },
            { name: 'Reading', count: 20 },
          ];
        } else {
          standardQuestions = 140;
          sections = [
            { name: 'Listening', count: 50 },
            { name: 'Structure', count: 40 },
            { name: 'Reading', count: 50 },
          ];
        }

        const registeredCount = questionsBank.filter(q => q.programId === p.id).length;

        return {
          id: p.id,
          title: p.title,
          type: isIbt ? 'TOEFL iBT' : 'TOEFL ITP',
          tag: p.tag || (isIbt ? 'iBT International' : 'Simulasi Resmi'),
          category: p.category || 'Simulasi Tes',
          standardQuestions,
          registeredCount,
          duration: p.duration || '115 Menit',
          scoreScale: p.scoreTarget || (isIbt ? 'Target 90 - 110+ (0-120)' : 'Skala 310 - 677'),
          sections,
          isActive: p.isActive !== false
        };
      });
  }, [localProgramsList, toeflPrograms, questionsBank]);

  // Navigate directly to this program's question management
  const handleOpenProgramQuestions = (programId: string) => {
    try {
      sessionStorage.setItem('ej_active_manage_program_id', programId);
    } catch (e) {
      console.warn('Error setting sessionStorage', e);
    }
    onNavigateTab('questions');
  };

  const totalStandardQuestions = useMemo(() => {
    return questionBanksList.reduce((acc, b) => acc + b.standardQuestions, 0);
  }, [questionBanksList]);

  return (
    <div className="space-y-6">
      
      {/* 4 STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Pendaftar */}
        <div className={`rounded-3xl p-6 flex flex-col justify-between h-36 border relative overflow-hidden group hover:border-[#F7B425]/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between text-slate-300">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{tr('Total Siswa Terdaftar', 'Total Registered Students')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-bold">
              <Users className="w-4 h-4 text-[#F7B425]" />
            </div>
          </div>
          <div>
            <div className={`text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>1,548+</div>
            <p className="text-[11px] font-semibold text-[#F7B425] mt-1 flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#F7B425]" />
              <span className="text-[#F7B425]">{tr('+38 peserta baru minggu ini', '+38 new students this week')}</span>
            </p>
          </div>
        </div>

        {/* Rata-Rata Skor TOEFL */}
        <div className="bg-[#F7B425] rounded-3xl p-6 shadow-xl flex flex-col justify-between h-36 text-black relative overflow-hidden group hover:scale-[1.02] transition-transform">
          <div className="flex items-center justify-between">
            <span className="text-xs font-black uppercase tracking-wider">{tr('Rata-Rata Skor TOEFL', 'Average TOEFL Score')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#000000] flex items-center justify-center">
              <Star className="w-4 h-4 fill-[#F7B425] text-[#F7B425]" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-black font-heading text-black">535.4</div>
            <p className="text-[11px] font-bold mt-1 text-black/80">{tr('94% di atas passing grade 500', '94% above passing grade of 500')}</p>
          </div>
        </div>

        {/* Sertifikat Diterbitkan */}
        <div className={`rounded-3xl p-6 flex flex-col justify-between h-36 border relative overflow-hidden group hover:border-[#F7B425]/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between text-slate-300">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{tr('Sertifikat Resmi Terbit', 'Certificates Issued')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-bold">
              <Award className="w-4 h-4 text-[#F7B425]" />
            </div>
          </div>
          <div>
            <div className={`text-3xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>1,420</div>
            <p className={`text-[11px] mt-1 font-mono ${subText}`}>{tr('Sertifikat Resmi', 'Official Certificates')}</p>
          </div>
        </div>

        {/* Program Aktif */}
        <div className={`rounded-3xl p-6 flex flex-col justify-between h-36 border relative overflow-hidden group hover:border-[#F7B425]/50 transition-all ${cardBg}`}>
          <div className="flex items-center justify-between text-slate-300">
            <span className={`text-xs font-bold ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>{tr('Total Bank Soal TOEFL', 'Total Question Bank')}</span>
            <div className="w-8 h-8 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-bold">
              <HelpCircle className="w-4 h-4 text-[#F7B425]" />
            </div>
          </div>
          <div>
            <div id="stat-total-question-banks" className={`text-2xl font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {questionBanksList.length} {tr('Paket Bank Soal', 'Question Banks')}
            </div>
            <p className={`text-[11px] mt-1 ${subText}`}>
              {totalStandardQuestions} {tr('Soal Ujian', 'Exam Questions')} • {questionsBank.length} {tr('Soal Terdaftar', 'Registered Questions')}
            </p>
          </div>
        </div>
      </div>

      {/* MIDDLE SECTION: TOEFL QUESTION BANK LIST */}
      <div className={`rounded-3xl p-6 border space-y-5 ${cardBg}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className={`text-base font-black font-heading flex items-center gap-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>
              <span className="w-2.5 h-2.5 rounded-full bg-[#F7B425] shadow-xs shadow-[#F7B425]/50" />
              {tr('Daftar Bank Soal TOEFL (Question Bank)', 'TOEFL Question Bank List')}
              <span className="text-xs px-2 py-0.5 rounded-full bg-[#F7B425]/15 text-[#F7B425] border border-[#F7B425]/30 font-bold ml-1 font-mono">
                {questionBanksList.length} {tr('Tersedia', 'Available')}
              </span>
            </h3>
            <p className={`text-xs ${subText} mt-0.5`}>
              {tr(
                'Daftar paket bank soal TOEFL ITP & iBT aktif, sinkron langsung dengan program tes TOEFL dan bank butir soal yang terdaftar.',
                'Active TOEFL ITP & iBT question bank packages, directly synced with TOEFL test programs and registered question items.'
              )}
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => onNavigateTab('questions')}
              className="text-xs font-extrabold text-black bg-[#F7B425] hover:bg-amber-400 px-4 py-2 rounded-xl transition-all cursor-pointer shadow-md shadow-[#F7B425]/20 flex items-center gap-1.5 active:scale-95"
            >
              <FolderOpen className="w-3.5 h-3.5 stroke-[2.5]" />
              <span>{tr('Buka Halaman Bank Soal', 'Open Question Banks Page')}</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Selected Element: Grid list of TOEFL Question Banks */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {questionBanksList.length === 0 ? (
            <div className="col-span-full py-10 text-center text-slate-400">
              <HelpCircle className="w-8 h-8 mx-auto mb-2 opacity-30 text-[#F7B425]" />
              <p className="font-semibold text-sm">{tr('Belum ada paket Bank Soal TOEFL yang terdaftar.', 'No TOEFL Question Bank packages registered yet.')}</p>
              <button
                type="button"
                onClick={() => onNavigateTab('questions')}
                className="mt-3 px-4 py-2 rounded-xl bg-[#F7B425] text-black text-xs font-bold hover:bg-amber-400 transition-colors"
              >
                {tr('Tambah Bank Soal di Sini', 'Add Question Bank Here')}
              </button>
            </div>
          ) : (
            questionBanksList.map((qb) => (
              <div 
                key={qb.id} 
                className={`p-4 sm:p-5 rounded-2xl border flex flex-col justify-between transition-all duration-200 group relative ${
                  isDark 
                    ? 'bg-[#000000] border-white/10 hover:border-[#F7B425]/60 hover:bg-[#121212]' 
                    : 'bg-slate-50 border-slate-200/90 hover:border-amber-400 hover:bg-white shadow-xs'
                }`}
              >
                <div>
                  {/* Top Badges: Category / Format Ujian + Active Status Badge */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    {(() => {
                      const catLower = (qb.category || '').toLowerCase();
                      let CatIcon = Layers;
                      let badgeStyle = 'bg-blue-500/15 text-blue-400 border-blue-500/30';

                      if (catLower.includes('structure') || catLower.includes('tata bahasa')) {
                        CatIcon = FileEdit;
                        badgeStyle = 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30';
                      } else if (catLower.includes('listening') || catLower.includes('percakapan') || catLower.includes('audio')) {
                        CatIcon = Headphones;
                        badgeStyle = 'bg-amber-500/15 text-[#F7B425] border-[#F7B425]/30';
                      } else if (catLower.includes('reading') || catLower.includes('bacaan')) {
                        CatIcon = BookOpen;
                        badgeStyle = 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30';
                      } else if (catLower.includes('ibt') || qb.type === 'TOEFL iBT' || catLower.includes('global') || catLower.includes('international')) {
                        CatIcon = Globe;
                        badgeStyle = 'bg-purple-500/15 text-purple-400 border-purple-500/30';
                      } else if (catLower.includes('intensif')) {
                        CatIcon = Award;
                        badgeStyle = 'bg-indigo-500/15 text-indigo-400 border-indigo-500/30';
                      }

                      return (
                        <span 
                          id={`category-badge-${qb.id}`}
                          title={`Kategori / Format Ujian: ${qb.category}`}
                          className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 border max-w-[70%] ${badgeStyle}`}
                        >
                          <CatIcon className="w-3 h-3 stroke-[2.5] shrink-0" />
                          <span className="truncate">{qb.category}</span>
                        </span>
                      );
                    })()}
                    
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold flex items-center gap-1 border ${
                      qb.isActive
                        ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                        : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${qb.isActive ? 'bg-emerald-400 animate-pulse' : 'bg-rose-400'}`} />
                      <span>{qb.isActive ? tr('Aktif (ON)', 'Active') : tr('Nonaktif (OFF)', 'Inactive')}</span>
                    </span>
                  </div>

                  {/* Title */}
                  <h4 className={`text-sm font-black font-heading leading-snug group-hover:text-[#F7B425] transition-colors ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}>
                    {qb.title}
                  </h4>

                  {/* Tag */}
                  <div className="flex items-center gap-2 mt-1 mb-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${
                      isDark ? 'bg-white/5 text-slate-300' : 'bg-slate-200/80 text-slate-700'
                    }`}>
                      {qb.tag}
                    </span>
                  </div>

                  {/* Question Count Stats Badge */}
                  <div className={`p-2.5 rounded-xl mb-3 flex items-center justify-between ${
                    isDark ? 'bg-white/5 border border-white/5' : 'bg-slate-100/90 border border-slate-200/60'
                  }`}>
                    <div className="flex items-center gap-2">
                      <BookOpen className="w-3.5 h-3.5 text-[#F7B425]" />
                      <span className="text-[11px] font-bold">
                        {qb.standardQuestions} {tr('Soal Ujian', 'Exam Questions')}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-[10px] font-bold text-blue-400">
                      <Layers className="w-3 h-3" />
                      <span>{qb.registeredCount} {tr('Tersimpan', 'Saved')}</span>
                    </div>
                  </div>
                </div>

                {/* Card Bottom Meta & Direct Action */}
                <div className="pt-3 border-t border-white/5 mt-2 space-y-2.5">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="flex items-center gap-1 text-slate-400">
                      <Clock className="w-3.5 h-3.5 text-[#F7B425]" />
                      <span>{qb.duration}</span>
                    </span>
                    <span className="font-semibold text-[#F7B425] text-[10px]">
                      {qb.scoreScale}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleOpenProgramQuestions(qb.id)}
                    className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                      isDark 
                        ? 'bg-white/5 hover:bg-[#F7B425] hover:text-black text-slate-200 border border-white/10 hover:border-[#F7B425]' 
                        : 'bg-slate-200/80 hover:bg-[#F7B425] hover:text-black text-slate-800 border border-slate-300 hover:border-[#F7B425]'
                    }`}
                    title={tr(`Buka dan kelola soal ${qb.title}`, `Open and manage questions for ${qb.title}`)}
                  >
                    <FolderOpen className="w-3.5 h-3.5" />
                    <span>{tr('Buka & Kelola Soal', 'Open & Manage Questions')}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Banner inside Middle Section */}
        <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg ${
          isDark 
            ? 'bg-gradient-to-r from-black via-[#181818] to-black border-[#F7B425]/30 text-white' 
            : 'bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-amber-500/40 text-white'
        }`}>
          <div>
            <span className="text-sm font-black block text-[#F7B425]">{tr('Kelola Pengaturan Skor TOEFL', 'Manage TOEFL Score Settings')}</span>
            <span className="text-xs text-slate-300">{tr('Atur tabel konversi raw score 310 - 677 untuk scoring otomatis ujian online', 'Configure raw score conversion tables 310 - 677 for online automated grading')}</span>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('score_settings')}
            className="px-4 py-2 rounded-xl bg-[#F7B425] text-black text-xs font-extrabold hover:bg-amber-400 transition-colors cursor-pointer shadow-md shadow-[#F7B425]/20 self-start sm:self-auto flex-shrink-0"
          >
            {tr('Atur Skor TOEFL', 'Set TOEFL Scores')}
          </button>
        </div>
      </div>

    </div>
  );
};



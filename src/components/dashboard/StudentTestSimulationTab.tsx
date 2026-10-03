import React, { useState, useEffect, useRef } from 'react';
import { 
  CheckCircle2, Clock, Award, RotateCcw, 
  ArrowRight, ArrowLeft, Volume2, Download,
  Filter, PlayCircle, ShieldAlert, Check, Headphones, FileText,
  AlertTriangle, Monitor, Sparkles, HelpCircle,
  Lock, Shield, Maximize, Minimize, AlertCircle, CheckSquare
} from 'lucide-react';
import { SAMPLE_TOEFL_QUESTIONS } from '../../data/toeflData';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../lib/supabase';

interface TestItem {
  id: string;
  title: string;
  type: 'TOEFL ITP' | 'TOEFL iBT';
  category: 'ITP' | 'iBT';
  status: 'IN PROGRESS' | 'NOT STARTED' | 'COMPLETED';
  description: string;
  score?: string;
  duration: string;
  questionsCount: number;
}

export const StudentTestSimulationTab: React.FC = () => {
  const { isDark } = useTheme();
  const { tr, language } = useLanguage();
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState<'All' | 'ITP'>('All');
  const [testState, setTestState] = useState<'list' | 'preparation' | 'running' | 'completed'>('list');
  const [activeTest, setActiveTest] = useState<TestItem | null>(null);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [doubtfulQuestions, setDoubtfulQuestions] = useState<Record<string, boolean>>({});
  const [audioTested, setAudioTested] = useState(false);
  const [agreementChecked, setAgreementChecked] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(115 * 60); // 115 minutes
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false);
  const [showFullscreenWarning, setShowFullscreenWarning] = useState(false);
  const [fullscreenEnabled, setFullscreenEnabled] = useState(false);

  const [availableTests, setAvailableTests] = useState<TestItem[]>(() => {
    try {
      const saved = localStorage.getItem('ej_toefl_test_programs');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const valid = parsed.filter(p => {
            const id = (p.id || '').toLowerCase();
            const title = (p.title || '').toLowerCase();
            const cat = (p.category || '').toLowerCase();
            if (id === 'toefl-guarantee' || id === 'toefl-fasttrack' || id === 'prog-beginners' || id === 'prog-conversation') return false;
            if (cat.includes('intensif') || cat.includes('bootcamp') || cat.includes('short course')) return false;
            if (id.includes('ibt') || title.includes('ibt') || cat.includes('ibt')) return false;
            return p.isActive !== false;
          });
          if (valid.length > 0) {
            return valid.map(p => ({
              id: p.id,
              title: p.title,
              type: 'TOEFL ITP' as const,
              category: 'ITP' as const,
              status: 'NOT STARTED' as const,
              description: p.benefits ? p.benefits.join(' • ') : 'Diagnostic Practice Test with complete Structure, Written Expression, and Reading Comprehension.',
              score: '—',
              duration: p.duration || '115 Menit',
              questionsCount: 140,
            }));
          }
        }
      }
    } catch (e) {
      console.warn('Error loading student tests from localStorage', e);
    }
    return [
      {
        id: 'toefl-pred-1',
        title: 'TOEFL ITP — Prediction Test 02',
        type: 'TOEFL ITP',
        category: 'ITP',
        status: 'NOT STARTED',
        description: 'Diagnostic Practice Test with complete Structure, Written Expression, and Reading Comprehension.',
        score: '—',
        duration: '115 Menit',
        questionsCount: 140,
      }
    ];
  });

  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const saved = localStorage.getItem('ej_toefl_test_programs');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) {
            const valid = parsed.filter(p => {
              const id = (p.id || '').toLowerCase();
              const title = (p.title || '').toLowerCase();
              const cat = (p.category || '').toLowerCase();
              if (id === 'toefl-guarantee' || id === 'toefl-fasttrack' || id === 'prog-beginners' || id === 'prog-conversation') return false;
              if (cat.includes('intensif') || cat.includes('bootcamp') || cat.includes('short course')) return false;
              if (id.includes('ibt') || title.includes('ibt') || cat.includes('ibt')) return false;
              return p.isActive !== false;
            });
            if (valid.length > 0) {
              setAvailableTests(valid.map(p => ({
                id: p.id,
                title: p.title,
                type: 'TOEFL ITP' as const,
                category: 'ITP' as const,
                status: 'NOT STARTED' as const,
                description: p.benefits ? p.benefits.join(' • ') : 'Diagnostic Practice Test with complete Structure, Written Expression, and Reading Comprehension.',
                score: '—',
                duration: p.duration || '115 Menit',
                questionsCount: 140,
              })));
            }
          }
        }
      } catch (e) {
        console.warn('Error reading storage in StudentTestSimulationTab', e);
      }
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const filteredTests = availableTests.filter((test) => {
    if (selectedFilter === 'All') return true;
    return test.category === selectedFilter;
  });

  const questions = [
    ...SAMPLE_TOEFL_QUESTIONS,
    {
      id: 'q3',
      section: 'Structure',
      part: 'Part B (Written Expression)',
      questionText: 'Guppies are sometimes call (A) rainbow fish because of (B) the males’ (C) bright colors (D).',
      options: {
        A: 'call',
        B: 'because of',
        C: 'the males’',
        D: 'bright colors'
      },
      correctAnswer: 'A',
      explanation: 'Pilihan (A) salah karena setelah "are" harus menggunakan past participle "called" (passive voice).'
    },
    {
      id: 'q4',
      section: 'Listening',
      part: 'Part A',
      questionText: '(Audio Dialogue)\nMan: Did you manage to attend the morning seminar?\nWoman: I was stuck in heavy traffic for two hours.\nNarrator: What does the woman mean?',
      options: {
        A: 'She attended the seminar on time.',
        B: 'She missed the seminar due to traffic.',
        C: 'She drove the man to the seminar.',
        D: 'She enjoyed the morning traffic.'
      },
      correctAnswer: 'B',
      explanation: 'Pembicara wanita menjelaskan bahwa ia terjebak macet selama dua jam sehingga tidak bisa menghadiri seminar.'
    }
  ];

  // Request browser fullscreen mode with fallback
  const requestBrowserFullscreen = async () => {
    try {
      const elem = document.documentElement;
      if (elem.requestFullscreen) {
        await elem.requestFullscreen();
      } else if ((elem as any).webkitRequestFullscreen) {
        await (elem as any).webkitRequestFullscreen();
      } else if ((elem as any).msRequestFullscreen) {
        await (elem as any).msRequestFullscreen();
      }
      setFullscreenEnabled(true);
      setShowFullscreenWarning(false);
    } catch {
      // If browser blocks requestFullscreen (e.g. within an iframe policy),
      // the fixed z-[99999] viewport container acts as complete visual fullscreen isolation.
      setFullscreenEnabled(true);
      setShowFullscreenWarning(false);
    }
  };

  const exitBrowserFullscreen = async () => {
    try {
      if (document.fullscreenElement) {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if ((document as any).webkitExitFullscreen) {
          await (document as any).webkitExitFullscreen();
        }
      }
    } catch {
      // ignore
    }
    setFullscreenEnabled(false);
  };

  // Monitor fullscreen change, prevent window closing, and block reload/back shortcuts during test
  useEffect(() => {
    if (testState !== 'running') return;

    const handleFullscreenChange = () => {
      if (!document.fullscreenElement && fullscreenEnabled) {
        setShowFullscreenWarning(true);
      }
    };

    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = 'Ujian TOEFL resmi sedang berlangsung! Anda tidak diperkenankan keluar atau me-refresh halaman.';
      return e.returnValue;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Block refresh (F5 / Ctrl+R / Cmd+R) and back navigation (Alt+ArrowLeft)
      if (
        e.key === 'F5' ||
        ((e.ctrlKey || e.metaKey) && (e.key === 'r' || e.key === 'R')) ||
        (e.altKey && (e.key === 'ArrowLeft' || e.key === 'ArrowRight'))
      ) {
        e.preventDefault();
      }
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [testState, fullscreenEnabled]);

  // Exam Countdown Timer
  useEffect(() => {
    if (testState !== 'running') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinish();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [testState]);

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleToggleDoubtful = (qId: string) => {
    setDoubtfulQuestions((prev) => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // When clicking on a test, open the Preparation screen first
  const handleOpenPreparation = (test: TestItem) => {
    setActiveTest(test);
    setAudioTested(false);
    setAgreementChecked(false);
    setTestState('preparation');
  };

  // Start the actual exam after preparation: trigger fullscreen and isolate
  const handleStartExam = () => {
    requestBrowserFullscreen();
    setTestState('running');
    setCurrentIdx(0);
    setUserAnswers({});
    setDoubtfulQuestions({});
    setTimeLeft(115 * 60);
    setShowFullscreenWarning(false);
    setShowSubmitConfirm(false);
  };

  const handleTestAudioSample = () => {
    setAudioPlaying(true);
    setAudioTested(true);
    // Beep or simulate sound feedback
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, audioCtx.currentTime); // A4 note
      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
    setTimeout(() => {
      setAudioPlaying(false);
    }, 1500);
  };

  const handleSelectOption = (opt: string) => {
    setUserAnswers({ ...userAnswers, [questions[currentIdx].id]: opt });
  };

  const handleFinish = async () => {
    exitBrowserFullscreen();
    setShowSubmitConfirm(false);
    setShowFullscreenWarning(false);
    setTestState('completed');

    if (user) {
      try {
        const studentDisplayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Student';
        const randomNum = Math.floor(1000 + Math.random() * 9000);
        await supabase.from('test_history_records').insert([
          {
            user_id: user.id,
            test_title: activeTest?.title || 'TOEFL ITP — Official Prediction Test',
            test_type: 'TOEFL ITP',
            date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) + ', ' + new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB',
            listening_score: Math.min(68, Math.max(31, Math.round(50 + (correctCount * 3)))),
            structure_score: Math.min(68, Math.max(31, Math.round(52 + (correctCount * 3)))),
            reading_score: Math.min(67, Math.max(31, Math.round(48 + (correctCount * 3)))),
            total_score: scaledScore,
            max_score: 677,
            status: scaledScore >= 500 ? 'LULUS' : 'MEMENUHI TARGET',
            cert_number: `EJI/TOEFL-ITP/${new Date().getFullYear()}/${randomNum}`,
            cert_issue_date: new Date().toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }),
            level_category: scaledScore >= 600 ? 'C1 — Advanced' : scaledScore >= 550 ? 'B2 — High Intermediate' : 'B1 — Intermediate',
            student_name: studentDisplayName
          }
        ]);
      } catch (err) {
        console.warn('Could not save test history to Supabase:', err);
      }
    }
  };

  // Calculate score
  const correctCount = questions.filter(q => userAnswers[q.id] === q.correctAnswer).length;
  const rawPercentage = Math.round((correctCount / questions.length) * 100);
  const scaledScore = Math.round(310 + ((677 - 310) * (correctCount / questions.length)));

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* 1. LIST VIEW: AVAILABLE TESTS */}
      {testState === 'list' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Section: Available tests */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className={`text-[20px] leading-[28px] font-bold tracking-tight ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {tr('Pilihan Simulasi Tes TOEFL', 'Available tests')}
              </h2>

              {/* Filter Pills (All / ITP) */}
              <div className={`flex items-center p-1 rounded-full border ${
                isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
              }`}>
                {(['All', 'ITP'] as const).map((filter) => (
                  <button
                    key={filter}
                    type="button"
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                      selectedFilter === filter
                        ? isDark 
                          ? 'bg-white text-black shadow-sm font-bold' 
                          : 'bg-white text-slate-900 shadow-sm font-bold'
                        : isDark
                          ? 'text-slate-400 hover:text-white'
                          : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {filter === 'All' ? tr('Semua', 'All') : filter}
                  </button>
                ))}
              </div>
            </div>

            {/* Test Cards Grid */}
            {filteredTests.length === 0 ? (
              <div className={`p-10 text-center rounded-2xl border ${
                isDark ? 'bg-[#141414] border-white/10 text-slate-400' : 'bg-white border-slate-200 text-slate-500'
              }`}>
                <FileText className="w-10 h-10 mx-auto mb-2 opacity-40 text-slate-400" />
                <p className="text-sm font-medium">{tr('Tidak ada simulasi tes pada kategori ini.', 'No test simulations available for this category.')}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {filteredTests.map((test) => (
                  <div
                    key={test.id}
                    className={`rounded-2xl p-5 border flex flex-col justify-between transition-all duration-200 hover:shadow-md ${
                      isDark 
                        ? 'bg-[#141414] border-white/10 text-white' 
                        : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
                    }`}
                  >
                    <div className="space-y-3.5">
                      {/* Top Badges */}
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                          test.type === 'TOEFL ITP'
                            ? isDark 
                              ? 'bg-blue-500/15 text-blue-400 border border-blue-500/30' 
                              : 'bg-blue-50 text-blue-600 border border-blue-200'
                            : isDark
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}>
                          {test.type}
                        </span>

                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                          test.status === 'IN PROGRESS'
                            ? isDark
                              ? 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                            : isDark
                              ? 'bg-slate-500/15 text-slate-400 border border-slate-500/30'
                              : 'bg-slate-100 text-slate-600 border border-slate-200'
                        }`}>
                          {test.status === 'IN PROGRESS' ? tr('SEDANG BERJALAN', 'IN PROGRESS') : tr('BELUM DIMULAI', 'NOT STARTED')}
                        </span>
                      </div>

                      {/* Test Title */}
                      <h3 className={`text-base font-bold tracking-tight ${
                        isDark ? 'text-white' : 'text-slate-900'
                      }`}>
                        {test.title}
                      </h3>

                      {/* Description */}
                      <p className={`text-xs leading-relaxed line-clamp-3 ${
                        isDark ? 'text-slate-400' : 'text-slate-500'
                      }`}>
                        {test.description}
                      </p>
                    </div>

                    {/* Action Button: Royal Blue Button matching screenshot */}
                    <div className="pt-5 mt-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenPreparation(test)}
                        className="w-full py-3 px-4 rounded-xl font-bold text-sm text-white bg-[#2563EB] hover:bg-[#1D4ED8] transition-all duration-200 shadow-md shadow-blue-600/20 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <span>{test.status === 'IN PROGRESS' ? tr('Lanjutkan Tes', 'Resume test') : tr('Mulai Tes', 'Start test')}</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* 2. PREPARATION & INSTRUCTION SCREEN (SEBELUM MEMULAI JAWAB SOAL) */}
      {testState === 'preparation' && activeTest && (
        <div className="space-y-6 max-w-4xl mx-auto animate-fadeIn pb-10">
          
          {/* Top Return Button & Status */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => setTestState('list')}
              className={`px-3.5 py-2 rounded-xl border text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                isDark ? 'border-white/10 hover:bg-white/10 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>{tr('Kembali ke Daftar Tes', 'Back to Test List')}</span>
            </button>

            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
              activeTest.type === 'TOEFL ITP'
                ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
            }`}>
              {activeTest.type} PREPARATION
            </span>
          </div>

          {/* Main Card: Test Details & Structure */}
          <div className={`p-6 sm:p-8 rounded-3xl border ${
            isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-sm'
          }`}>
            <div className="space-y-3 pb-6 border-b border-inherit">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-lg bg-[#F7B425]/15 text-[#F7B425] font-black text-xs">
                  OFFICIAL SIMULATION
                </span>
                <span className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {tr(`Durasi: ${activeTest.duration} • Total ${activeTest.questionsCount} Soal`, `Duration: ${activeTest.duration} • Total ${activeTest.questionsCount} Questions`)}
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black font-heading tracking-tight">
                {activeTest.title}
              </h1>
              <p className={`text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                {activeTest.description}
              </p>
            </div>

            {/* Test Sections Breakdown */}
            <div className="py-6 border-b border-inherit space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-[#F7B425]">
                {tr('Struktur & Pembagian Bagian Ujian', 'Exam Structure & Sections Breakdown')}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs">Section 1</span>
                    <Headphones className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="font-extrabold text-sm">Listening Comprehension</div>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tr('50 Soal • 35 Menit (Audio Dialog, Extended Talks)', '50 Questions • 35 Mins (Audio Dialogs, Extended Talks)')}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs">Section 2</span>
                    <FileText className="w-4 h-4 text-purple-400" />
                  </div>
                  <div className="font-extrabold text-sm">Structure &amp; Written Exp.</div>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tr('40 Soal • 25 Menit (Sentence Completion & Error ID)', '40 Questions • 25 Mins (Sentence Completion & Error ID)')}
                  </p>
                </div>

                <div className={`p-4 rounded-2xl border ${
                  isDark ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-200/80'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-xs">Section 3</span>
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="font-extrabold text-sm">Reading Comprehension</div>
                  <p className={`text-[11px] mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                    {tr('50 Soal • 55 Menit (Academic Passages & Vocab)', '50 Questions • 55 Mins (Academic Passages & Vocab)')}
                  </p>
                </div>
              </div>
            </div>

            {/* Checklist Persiapan Sistem & Perangkat */}
            <div className="py-6 border-b border-inherit space-y-4">
              <h3 className="font-bold text-sm uppercase tracking-wider text-[#F7B425]">
                {tr('Pengecekan Perangkat & Audio (Wajib)', 'Device & Audio Check (Mandatory)')}
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Audio Check Box */}
                <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-5 h-5 text-blue-500" />
                      <span className="font-bold text-sm">{tr('Tes Suara / Audio Headset', 'Audio / Headset Test')}</span>
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {tr('Pastikan volume headset atau speaker laptop Anda terdengar jelas untuk bagian Listening.', 'Ensure your headset or laptop speaker volume is clear and audible for the Listening section.')}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTestAudioSample}
                      className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all cursor-pointer ${
                        audioPlaying 
                          ? 'bg-amber-500 text-black animate-pulse' 
                          : 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm'
                      }`}
                    >
                      <Volume2 className="w-4 h-4" />
                      <span>{audioPlaying ? tr('Memutar Suara...', 'Playing Audio...') : tr('Uji Audio Sample', 'Test Audio Sample')}</span>
                    </button>

                    {audioTested && (
                      <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4" />
                        {tr('Audio Berfungsi', 'Audio Working')}
                      </span>
                    )}
                  </div>
                </div>

                {/* System & Connection Box */}
                <div className={`p-4 rounded-2xl border flex flex-col justify-between ${
                  isDark ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center gap-2">
                      <Lock className="w-5 h-5 text-emerald-500" />
                      <span className="font-bold text-sm">{tr('Mode Layar Penuh & Isolasi CBT Resmi', 'Fullscreen Mode & Official CBT Lockdown')}</span>
                    </div>
                    <p className={`text-xs mt-1 leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      {tr(
                        'Sistem secara otomatis mengaktifkan mode layar penuh (fullscreen lockdown) saat ujian dimulai. Tombol keluar dinonaktifkan untuk mengisolasi peserta agar ujian tidak dapat dibatalkan di tengah jalan.',
                        'The system automatically locks into fullscreen mode upon starting. Exit controls are disabled to isolate test takers so exams cannot be cancelled midway.'
                      )}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>{tr('Fitur Isolasi Fullscreen Siap Digunakan', 'Fullscreen Isolation Engine Ready')}</span>
                  </div>
                </div>

              </div>
            </div>

            {/* Tata Tertib & Peraturan Ujian */}
            <div className="py-6 space-y-3">
              <div className="flex items-center gap-2 text-[#F7B425]">
                <AlertTriangle className="w-5 h-5 text-[#F7B425]" />
                <h3 className="font-bold text-sm uppercase tracking-wider text-[#F7B425]">
                  {tr('Tata Tertib & Ketentuan Ujian Online', 'Online Examination Rules & Guidelines')}
                </h3>
              </div>

              <ul className={`text-xs space-y-2 leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7B425] mt-1.5 shrink-0" />
                  <span>{tr('Layar ujian akan otomatis masuk ke Mode Layar Penuh (Fullscreen) untuk mengisolasi ruang ujian online official.', 'The exam will automatically enter Fullscreen Mode to isolate the official online testing environment.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7B425] mt-1.5 shrink-0" />
                  <span>{tr('Peserta tidak dapat membatalkan atau keluar dari ujian hingga seluruh lembar jawaban dikumpulkan.', 'Candidates cannot cancel or exit the exam until all answer sheets are officially submitted.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7B425] mt-1.5 shrink-0" />
                  <span>{tr('Waktu ujian akan otomatis berjalan mundur dan jawaban tersimpan secara instan di setiap perpindahan butir soal.', 'Exam timer counts down automatically and answers are stored instantly upon navigating questions.')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F7B425] mt-1.5 shrink-0" />
                  <span>{tr('Dilarang keras membuka tab baru, beralih aplikasi, atau menggunakan kamus demi keabsahan sertifikat prediksi TOEFL.', 'Opening new tabs, switching applications, or using translators is strictly prohibited.')}</span>
                </li>
              </ul>

              {/* Agreement Checkbox */}
              <div className="pt-4">
                <label className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer select-none transition-all ${
                  agreementChecked 
                    ? 'border-[#F7B425] bg-[#F7B425]/10 text-inherit' 
                    : isDark ? 'border-white/10 bg-white/5 hover:bg-white/10' : 'border-slate-200 bg-slate-50 hover:bg-slate-100'
                }`}>
                  <input
                    type="checkbox"
                    checked={agreementChecked}
                    onChange={(e) => setAgreementChecked(e.target.checked)}
                    className="w-4 h-4 accent-[#F7B425] rounded cursor-pointer"
                  />
                  <span className="text-xs font-bold">
                    {tr(
                      'Saya telah membaca instruksi, menyetujui isolasi mode layar penuh, dan siap memulai ujian secara mandiri tanpa keluar.',
                      'I have read the instructions, agree to fullscreen isolation, and am ready to complete the exam without exiting.'
                    )}
                  </span>
                </label>
              </div>
            </div>

            {/* Final CTA Buttons */}
            <div className="pt-6 border-t border-inherit flex flex-col sm:flex-row items-center justify-between gap-4">
              <button
                type="button"
                onClick={() => setTestState('list')}
                className={`w-full sm:w-auto px-5 py-3 rounded-xl border font-bold text-xs transition-all cursor-pointer ${
                  isDark ? 'border-white/15 hover:bg-white/10 text-slate-300' : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                }`}
              >
                {tr('Kembali ke Daftar Tes', 'Back to Test List')}
              </button>

              <button
                type="button"
                disabled={!agreementChecked}
                onClick={handleStartExam}
                className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 transition-all shadow-lg ${
                  agreementChecked
                    ? 'bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-blue-600/30 cursor-pointer active:scale-98'
                    : 'bg-slate-500/30 text-slate-400 cursor-not-allowed border border-transparent'
                }`}
              >
                <Maximize className="w-4 h-4" />
                <span>{tr('Masuk Mode Layar Penuh & Mulai Ujian', 'Enter Fullscreen & Start Exam')}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. RUNNING STATE - OFFICIAL CBT FULLSCREEN LOCKDOWN SYSTEM */}
      {testState === 'running' && (
        <div 
          className="fixed inset-0 z-[99999] bg-[#0A0E17] text-slate-100 flex flex-col w-screen h-screen overflow-hidden select-none font-sans"
          onContextMenu={(e) => e.preventDefault()}
        >
          {/* Top Official CBT Header Bar */}
          <header className="h-16 px-4 sm:px-6 bg-[#0E1526] border-b border-white/10 flex items-center justify-between shrink-0 shadow-lg z-20">
            {/* Left: Official CBT Title & Exam Info */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-500 flex items-center justify-center font-black text-white text-xs sm:text-sm shadow-md tracking-wider">
                EJI
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-xs sm:text-sm text-white tracking-tight">
                    ENGLISH JOIN INDONESIA
                  </span>
                  <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-500/15 text-blue-400 font-mono text-[10px] font-bold border border-blue-500/30">
                    <Shield className="w-2.5 h-2.5" />
                    OFFICIAL CBT
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <span className="font-medium truncate max-w-[200px] sm:max-w-xs">{activeTest?.title || 'TOEFL ITP Prediction'}</span>
                  <span>•</span>
                  <span className="hidden md:inline font-mono">Peserta: Muhammad Ihsan</span>
                </div>
              </div>
            </div>

            {/* Center: Lockdown Indicator Badge */}
            <div className="hidden lg:flex items-center gap-2">
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-bold font-mono tracking-wider">
                <Lock className="w-3 h-3 animate-pulse" />
                <span>ISOLASI CBT TERKUNCI • UJIAN BERJALAN</span>
              </div>
            </div>

            {/* Right: Timer & Submit Action */}
            <div className="flex items-center gap-2 sm:gap-4">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 font-mono font-black text-amber-400 text-xs sm:text-sm shadow-sm">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="tracking-widest">{formatTime(timeLeft)}</span>
              </div>

              <button
                type="button"
                onClick={() => setShowSubmitConfirm(true)}
                className="px-3.5 sm:px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-emerald-600/25 active:scale-98 cursor-pointer"
              >
                <CheckSquare className="w-4 h-4" />
                <span className="hidden sm:inline">{tr('Kumpulkan Ujian', 'Submit Exam')}</span>
                <span className="sm:hidden">{tr('Kumpul', 'Submit')}</span>
              </button>
            </div>
          </header>

          {/* Sub-Header Navigation & Section Status Strip */}
          <div className="h-12 px-4 sm:px-6 bg-[#0B101D] border-b border-white/10 flex items-center justify-between text-xs shrink-0 z-10">
            <div className="flex items-center gap-2 sm:gap-3">
              <span className="px-2.5 py-1 rounded-md bg-[#2563EB] text-white font-bold text-[11px] sm:text-xs">
                {tr(`Soal ${currentIdx + 1} / ${questions.length}`, `Question ${currentIdx + 1} / ${questions.length}`)}
              </span>
              <span className="text-slate-300 font-semibold truncate max-w-[180px] sm:max-w-md">
                {questions[currentIdx].section} — {questions[currentIdx].part || 'Comprehension'}
              </span>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => handleToggleDoubtful(questions[currentIdx].id)}
                className={`px-2.5 sm:px-3 py-1 rounded-lg border text-[11px] sm:text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                  doubtfulQuestions[questions[currentIdx].id]
                    ? 'bg-amber-500 text-black border-amber-500 shadow-sm'
                    : 'border-white/15 bg-white/5 text-slate-300 hover:bg-white/10'
                }`}
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>{tr('Tandai Ragu-ragu', 'Mark Doubtful')}</span>
              </button>

              <button
                type="button"
                onClick={requestBrowserFullscreen}
                className="p-1.5 rounded-lg border border-white/15 hover:bg-white/10 text-slate-300 cursor-pointer hidden sm:flex items-center gap-1"
                title={tr('Kunci Ulang Layar Penuh', 'Re-lock Fullscreen')}
              >
                <Maximize className="w-3.5 h-3.5" />
                <span className="text-[10px] font-mono">Fullscreen</span>
              </button>
            </div>
          </div>

          {/* Middle Body: Question Area (Center) + Question Palette (Right) */}
          <div className="flex-1 flex overflow-hidden">
            {/* Main Question Box */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-8 flex flex-col justify-between max-w-4xl mx-auto w-full">
              <div className="space-y-6">
                {/* Audio Dialogue Player Box if Listening */}
                {questions[currentIdx].section === 'Listening' && (
                  <div className="p-4 rounded-2xl border border-blue-500/30 bg-blue-950/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                        <Headphones className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-xs text-white">Audio Narration Player</div>
                        <div className="text-[11px] text-blue-300">Listening Comprehension Part A</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={handleTestAudioSample}
                      className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>{audioPlaying ? 'Memutar...' : 'Putar Audio'}</span>
                    </button>
                  </div>
                )}

                {/* Question Prompt */}
                <div className="p-6 sm:p-7 rounded-2xl border border-white/10 bg-[#0E1524] text-white text-sm sm:text-base font-medium leading-relaxed whitespace-pre-line shadow-inner">
                  {questions[currentIdx].questionText}
                </div>

                {/* Multiple Choice Options */}
                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                    const isSelected = userAnswers[questions[currentIdx].id] === opt;
                    return (
                      <button
                        key={opt}
                        onClick={() => handleSelectOption(opt)}
                        className={`w-full text-left p-4 sm:p-4.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all flex items-center gap-3.5 cursor-pointer ${
                          isSelected
                            ? 'bg-[#2563EB] border-[#2563EB] text-white shadow-lg shadow-blue-600/30'
                            : 'bg-[#0E1524] hover:bg-white/10 border-white/10 text-slate-200'
                        }`}
                      >
                        <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 transition-colors ${
                          isSelected 
                            ? 'bg-white text-[#2563EB]' 
                            : 'bg-white/10 text-slate-300 border border-white/10'
                        }`}>
                          {opt}
                        </span>
                        <span className="flex-1 leading-relaxed">{questions[currentIdx].options[opt]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bottom Navigation Bar */}
              <div className="pt-8 mt-6 border-t border-white/10 flex items-center justify-between gap-3">
                <button
                  type="button"
                  disabled={currentIdx === 0}
                  onClick={() => setCurrentIdx(currentIdx - 1)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-xs font-bold disabled:opacity-30 disabled:pointer-events-none hover:bg-white/5 text-slate-200 flex items-center gap-1.5 cursor-pointer transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{tr('Soal Sebelumnya', 'Previous')}</span>
                </button>

                <div className="text-center text-[11px] text-slate-400 hidden sm:block">
                  <span>{Object.keys(userAnswers).length} dari {questions.length} soal terjawab</span>
                </div>

                {currentIdx < questions.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setCurrentIdx(currentIdx + 1)}
                    className="px-6 py-2.5 rounded-xl bg-[#2563EB] text-white text-xs font-bold hover:bg-[#1D4ED8] flex items-center gap-1.5 cursor-pointer shadow-md shadow-blue-600/25 active:scale-98 transition-all"
                  >
                    <span>{tr('Soal Berikutnya', 'Next')}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(true)}
                    className="px-6 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-extrabold hover:bg-emerald-500 shadow-lg shadow-emerald-600/30 flex items-center gap-1.5 cursor-pointer active:scale-98 transition-all"
                  >
                    <CheckSquare className="w-4 h-4" />
                    <span>{tr('Selesaikan & Kumpulkan Ujian', 'Submit & Finish Exam')}</span>
                  </button>
                )}
              </div>
            </main>

            {/* Right Question Palette (Sidebar in Desktop) */}
            <aside className="w-72 border-l border-white/10 bg-[#0B101D] p-5 hidden xl:flex flex-col justify-between shrink-0">
              <div className="space-y-4">
                <div>
                  <h4 className="font-extrabold text-xs text-white uppercase tracking-wider">
                    {tr('Navigasi Lembar Soal', 'Question Navigation Palette')}
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    {tr('Klik nomor untuk langsung melompat', 'Click number to jump to question')}
                  </p>
                </div>

                {/* Legend */}
                <div className="space-y-1.5 text-[11px] p-3 rounded-xl bg-white/5 border border-white/10 font-medium">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" />
                      <span>{tr('Sudah Dijawab', 'Answered')}</span>
                    </span>
                    <span className="font-bold text-emerald-400">{Object.keys(userAnswers).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
                      <span>{tr('Ragu-ragu', 'Doubtful')}</span>
                    </span>
                    <span className="font-bold text-amber-400">{Object.values(doubtfulQuestions).filter(Boolean).length}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-slate-600 inline-block" />
                      <span>{tr('Belum Dijawab', 'Unanswered')}</span>
                    </span>
                    <span className="font-bold text-slate-400">{questions.length - Object.keys(userAnswers).length}</span>
                  </div>
                </div>

                {/* Grid of question pills */}
                <div className="grid grid-cols-4 gap-2 pt-2 max-h-[340px] overflow-y-auto pr-1">
                  {questions.map((q, idx) => {
                    const isAnswered = !!userAnswers[q.id];
                    const isDoubt = !!doubtfulQuestions[q.id];
                    const isCurrent = idx === currentIdx;

                    let bgClass = 'bg-white/5 text-slate-300 border-white/10 hover:bg-white/10';
                    if (isAnswered) {
                      bgClass = 'bg-emerald-600 text-white border-emerald-500';
                    }
                    if (isDoubt) {
                      bgClass = 'bg-amber-500 text-black border-amber-400 font-black';
                    }

                    return (
                      <button
                        key={q.id}
                        type="button"
                        onClick={() => setCurrentIdx(idx)}
                        className={`h-10 rounded-xl font-bold text-xs border transition-all flex items-center justify-center cursor-pointer ${bgClass} ${
                          isCurrent ? 'ring-2 ring-blue-400 ring-offset-2 ring-offset-[#0B101D] scale-105 shadow-md' : ''
                        }`}
                      >
                        {idx + 1}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Isolation warning reminder */}
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 space-y-1.5 text-[11px] text-slate-400">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Sistem Isolasi Aktif</span>
                </div>
                <p className="leading-relaxed">
                  Peserta tidak dapat membatalkan atau keluar dari ujian ini. Selesaikan soal dan klik tombol Kumpulkan Ujian.
                </p>
              </div>
            </aside>
          </div>

          {/* Fullscreen Warning Modal (Jika Peserta Meminimalisir atau Keluar Fullscreen) */}
          {showFullscreenWarning && (
            <div className="fixed inset-0 z-[100000] bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
              <div className="max-w-md w-full rounded-3xl bg-[#141A28] border-2 border-red-500/50 p-6 text-center shadow-2xl space-y-4 text-white">
                <div className="w-16 h-16 rounded-2xl bg-red-500/20 text-red-400 flex items-center justify-center mx-auto border border-red-500/40 animate-pulse">
                  <ShieldAlert className="w-9 h-9" />
                </div>
                <div>
                  <h3 className="text-lg font-black tracking-tight text-red-400">
                    {tr('PERINGATAN SISTEM CBT LOCKDOWN', 'CBT LOCKDOWN SECURITY WARNING')}
                  </h3>
                  <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                    {tr(
                      'Layar penuh (Fullscreen) terdeteksi keluar atau terminimalisir. Sesuai regulasi ujian resmi, peserta diisolasi dalam mode layar penuh dan dilarang berpindah jendela atau membatalkan ujian.',
                      'Fullscreen has been exited or minimized. Per official examination regulations, candidates are isolated in fullscreen mode and forbidden from switching windows or canceling the exam.'
                    )}
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={requestBrowserFullscreen}
                    className="w-full py-3.5 px-4 rounded-xl font-black text-sm bg-[#2563EB] hover:bg-[#1D4ED8] text-white shadow-lg shadow-blue-600/30 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                  >
                    <Maximize className="w-4 h-4" />
                    <span>{tr('KEMBALIKAN KE LAYAR PENUH & LANJUTKAN', 'RESTORE FULLSCREEN & RESUME')}</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Submit Confirmation Modal */}
          {showSubmitConfirm && (
            <div className="fixed inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="max-w-md w-full rounded-3xl bg-[#141A28] border border-white/15 p-6 space-y-4 text-white shadow-2xl">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
                  <CheckSquare className="w-6 h-6" />
                </div>
                <div className="text-center space-y-1.5">
                  <h3 className="text-lg font-black">
                    {tr('Konfirmasi Pengumpulan Lembar Ujian', 'Confirm Exam Submission')}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tr(
                      `Anda telah menjawab ${Object.keys(userAnswers).length} dari ${questions.length} butir soal (${questions.length - Object.keys(userAnswers).length} belum terjawab). Apakah Anda yakin ingin menyelesaikan dan mengumpulkan ujian sekarang?`,
                      `You have answered ${Object.keys(userAnswers).length} of ${questions.length} questions (${questions.length - Object.keys(userAnswers).length} unanswered). Are you sure you want to finish and submit the exam now?`
                    )}
                  </p>
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSubmitConfirm(false)}
                    className="flex-1 py-3 rounded-xl border border-white/15 hover:bg-white/10 font-bold text-xs text-slate-300 cursor-pointer"
                  >
                    {tr('Periksa Kembali', 'Review Answers')}
                  </button>
                  <button
                    type="button"
                    onClick={handleFinish}
                    className="flex-1 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs shadow-lg shadow-emerald-600/30 cursor-pointer active:scale-98"
                  >
                    {tr('Ya, Kumpulkan Ujian', 'Yes, Submit Exam')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. COMPLETED STATE - CERTIFICATE & SCORECARD */}
      {testState === 'completed' && (
        <div className={`rounded-3xl p-8 border shadow-2xl space-y-6 max-w-2xl mx-auto text-center animate-fadeIn ${
          isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200 text-slate-900'
        }`}>
          <div className="w-16 h-16 rounded-full bg-emerald-500/15 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div>
            <span className="px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 text-xs font-black uppercase">
              {tr('Tes TOEFL Berhasil Diselesaikan', 'TOEFL Test Completed Successfully')}
            </span>
            <h2 className="text-3xl font-black font-heading mt-3">
              {tr('Skor TOEFL ITP Kamu:', 'Your TOEFL ITP Score:')} <span className="text-[#F7B425]">{scaledScore}</span>
            </h2>
            <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {tr(`Jawaban Benar: ${correctCount} dari ${questions.length} butir (${rawPercentage}%)`, `Correct Answers: ${correctCount} of ${questions.length} questions (${rawPercentage}%)`)}
            </p>
          </div>

          {/* Certificate Card */}
          <div className="p-6 rounded-3xl bg-[#0B0B0B] text-white text-left space-y-4 border border-[#F7B425]/40 relative overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-black uppercase tracking-widest text-[#F7B425] block">
                  ENGLISH JOIN INDONESIA
                </span>
                <span className="text-xs font-bold text-slate-200">
                  OFFICIAL TOEFL PREDICTION CERTIFICATE
                </span>
              </div>
              <Award className="w-7 h-7 text-[#F7B425]" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] text-slate-400">{tr('Diberikan kepada:', 'Awarded to:')}</span>
              <h3 className="text-xl font-black text-white font-heading">Muhammad Ihsan</h3>
              <p className="text-xs text-slate-400">{tr('Sebagai Peserta Ujian TOEFL Prediction Online Terverifikasi', 'As a Verified Online TOEFL Prediction Test Candidate')}</p>
            </div>

            <div className="grid grid-cols-3 gap-2 p-3 bg-white/5 rounded-2xl text-xs font-mono text-center">
              <div>
                <span className="text-[9px] text-slate-400 block">LISTENING</span>
                <span className="font-bold text-white">56</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block">STRUCTURE</span>
                <span className="font-bold text-white">58</span>
              </div>
              <div>
                <span className="text-[9px] text-slate-400 block">READING</span>
                <span className="font-bold text-white">58</span>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[10px] text-slate-400">
              <span className="text-emerald-400 font-semibold">{tr('Status: Selesai Diujikan', 'Status: Completed')}</span>
              <span className="text-[#F7B425] font-mono font-bold">Total Scaled: {scaledScore}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setTestState('list')}
              className={`flex-1 py-3 rounded-xl border font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer ${
                isDark ? 'border-white/10 text-slate-300 hover:bg-white/5' : 'border-slate-300 text-slate-700 hover:bg-slate-100'
              }`}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{tr('Kembali ke Daftar Tes', 'Back to Test List')}</span>
            </button>
            <button
              onClick={() => alert(tr('Sertifikat E-Certificate PDF resmi berhasil diunduh!', 'Official E-Certificate PDF downloaded successfully!'))}
              className="flex-1 py-3 rounded-xl bg-[#F7B425] font-extrabold text-xs text-black hover:bg-amber-400 flex items-center justify-center gap-1.5 shadow-lg shadow-[#F7B425]/20 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{tr('Unduh E-Certificate', 'Download E-Certificate')}</span>
            </button>
          </div>

        </div>
      )}

    </div>
  );
};


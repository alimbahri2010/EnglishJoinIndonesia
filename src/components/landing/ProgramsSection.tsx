import React, { useState } from 'react';
import { Sparkles, MessageSquare, Award, CheckCircle2, Clock, Calendar, ArrowRight, Star, BookOpen, MessageCircle } from 'lucide-react';
import { usePrograms, ManagedProgram } from '../../context/ProgramsContext';
import { useLanguage } from '../../context/LanguageContext';

interface ProgramsSectionProps {
  onOpenRegister: (programId?: string) => void;
}

export const ProgramsSection: React.FC<ProgramsSectionProps> = ({ onOpenRegister }) => {
  const { landingPrograms } = usePrograms();
  const { tr, t } = useLanguage();
  const [selectedProgram, setSelectedProgram] = useState<ManagedProgram | null>(null);

  const defaultProgramTranslations: Record<string, {
    description: string;
    level: string;
    duration: string;
    sessionCount: string;
    benefits: string[];
    fullDesc?: string;
    targetAudience?: string;
  }> = {
    'prog-beginners': {
      description: tr(
        'Fondasi bahasa Inggris dari nol untuk pemula. Fokus pada kosakata dasar, kalimat harian, dan menghilangkan rasa takut salah.',
        'English foundations from scratch for beginners. Focuses on essential vocabulary, daily sentences, and eliminating the fear of mistakes.'
      ),
      level: tr('Tingkat Pemula (Level 0)', 'Beginner (Level 0)'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('12 Sesi Live', '12 Live Sessions'),
      benefits: [
        tr('Pembelajaran interaktif dan santai', 'Interactive and relaxed learning'),
        tr('Modul materi digital lengkap (PDF & Audio)', 'Full digital modules (PDF & Audio)'),
        tr('Grup diskusi dan tanya jawab ramah tutor', 'Supportive tutor Q&A discussion group'),
        tr('E-Certificate resmi English Join', 'Official English Join E-Certificate')
      ],
      fullDesc: tr(
        'Program "English for Beginners" dirancang bagi kamu yang merasa belum bisa bahasa Inggris sama sekali, pernah trauma belajar rumus grammar yang rumit, atau ragu saat ingin mulai berbicara. Dengan silabus bertahap, mentor akan memandu penguasaan percakapan dasar sehari-hari dengan suasana yang hangat dan bebas rasa takut salah.',
        'The "English for Beginners" program is designed for those starting completely from scratch, intimidated by complicated grammar rules, or hesitant to speak. With a gradual syllabus, mentors guide daily basic conversations in a welcoming environment without fear of errors.'
      ),
      targetAudience: tr('Pelajar, mahasiswa baru, fresh graduate, atau umum yang ingin memulai dari nol.', 'Students, freshmen, fresh grads, or anyone wanting to start from scratch.')
    },
    'prog-1': {
      description: tr(
        'Fondasi bahasa Inggris dari nol untuk pemula. Fokus pada kosakata dasar, kalimat harian, dan menghilangkan rasa takut salah.',
        'English foundations from scratch for beginners. Focuses on essential vocabulary, daily sentences, and eliminating the fear of mistakes.'
      ),
      level: tr('Tingkat Pemula (Level 0)', 'Beginner (Level 0)'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('12 Sesi Live', '12 Live Sessions'),
      benefits: [
        tr('Pembelajaran interaktif dan santai', 'Interactive and relaxed learning'),
        tr('Modul materi digital lengkap (PDF & Audio)', 'Full digital modules (PDF & Audio)'),
        tr('Grup diskusi dan tanya jawab ramah tutor', 'Supportive tutor Q&A discussion group'),
        tr('E-Certificate resmi English Join', 'Official English Join E-Certificate')
      ],
      fullDesc: tr(
        'Program "English for Beginners" dirancang bagi kamu yang merasa belum bisa bahasa Inggris sama sekali, pernah trauma belajar rumus grammar yang rumit, atau ragu saat ingin mulai berbicara. Dengan silabus bertahap, mentor akan memandu penguasaan percakapan dasar sehari-hari dengan suasana yang hangat dan bebas rasa takut salah.',
        'The "English for Beginners" program is designed for those starting completely from scratch, intimidated by complicated grammar rules, or hesitant to speak. With a gradual syllabus, mentors guide daily basic conversations in a welcoming environment without fear of errors.'
      ),
      targetAudience: tr('Pelajar, mahasiswa baru, fresh graduate, atau umum yang ingin memulai dari nol.', 'Students, freshmen, fresh grads, or anyone wanting to start from scratch.')
    },
    'prog-conversation': {
      description: tr(
        'Tingkatkan kelancaran dan kepercayaan diri berbicara dalam berbagai topik sehari-hari, kerja, dan sosial.',
        'Boost speaking fluency and confidence across daily, workplace, and social conversation topics.'
      ),
      level: tr('Menengah (Intermediate)', 'Intermediate'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('12 Sesi Live', '12 Live Sessions'),
      benefits: [
        tr('Praktek langsung bicara setiap sesi', 'Direct speaking practice every session'),
        tr('Koreksi pelafalan (pronunciation) personal', 'Personal pronunciation feedback'),
        tr('Simulasi obrolan dunia nyata & roleplay', 'Real-world dialogue simulation & roleplay'),
        tr('E-Certificate resmi English Join', 'Official English Join E-Certificate')
      ],
      fullDesc: tr(
        'Fokus 100% pada praktek aktif! Dalam program Active Speaking & Conversation, kamu akan dilatih merespon pertanyaan spontan, menyusun argumen dalam bahasa Inggris, memperluas idiom, serta mengasah aksen alami lewat simulasi skenario harian dan presentasi santai.',
        '100% focused on active practice! In Active Speaking & Conversation, you are trained to respond spontaneously, formulate arguments in English, expand idioms, and polish your accent through real scenarios and relaxed presentations.'
      ),
      targetAudience: tr('Karyawan, profesional, mahasiswa, atau siapa saja yang sudah paham teori tetapi masih kaku saat berbicara.', 'Employees, professionals, students, or anyone who knows basic theory but feels hesitant when speaking.')
    },
    'prog-2': {
      description: tr(
        'Tingkatkan kelancaran dan kepercayaan diri berbicara dalam berbagai topik sehari-hari, kerja, dan sosial.',
        'Boost speaking fluency and confidence across daily, workplace, and social conversation topics.'
      ),
      level: tr('Menengah (Intermediate)', 'Intermediate'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('12 Sesi Live', '12 Live Sessions'),
      benefits: [
        tr('Praktek langsung bicara setiap sesi', 'Direct speaking practice every session'),
        tr('Koreksi pelafalan (pronunciation) personal', 'Personal pronunciation feedback'),
        tr('Simulasi obrolan dunia nyata & roleplay', 'Real-world dialogue simulation & roleplay'),
        tr('E-Certificate resmi English Join', 'Official English Join E-Certificate')
      ],
      fullDesc: tr(
        'Fokus 100% pada praktek aktif! Dalam program Active Speaking & Conversation, kamu akan dilatih merespon pertanyaan spontan, menyusun argumen dalam bahasa Inggris, memperluas idiom, serta mengasah aksen alami lewat simulasi skenario harian dan presentasi santai.',
        '100% focused on active practice! In Active Speaking & Conversation, you are trained to respond spontaneously, formulate arguments in English, expand idioms, and polish your accent through real scenarios and relaxed presentations.'
      ),
      targetAudience: tr('Karyawan, profesional, mahasiswa, atau siapa saja yang sudah paham teori tetapi masih kaku saat berbicara.', 'Employees, professionals, students, or anyone who knows basic theory but feels hesitant when speaking.')
    },
    'prog-toefl': {
      description: tr(
        'Kupas tuntas strategi, tips eliminasi kilat, dan latihan intensif soal Listening, Structure, & Reading TOEFL ITP.',
        'Master proven strategies, rapid elimination tricks, and intensive drills for TOEFL ITP Listening, Structure, & Reading.'
      ),
      level: tr('Semua Level (Persiapan Ujian)', 'All Levels (Exam Prep)'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('16 Sesi Intensif', '16 Intensive Sessions'),
      benefits: [
        tr('Trik cepat menjawab soal Structure tanpa terjemah kata per kata', 'Fast Structure problem-solving without word-for-word translation'),
        tr('1x Tes TOEFL Prediction + Sertifikat Resmi', '1x Official TOEFL Prediction Test + Certificate'),
        tr('Bank soal lengkap & pembahasan detail', 'Comprehensive question bank & detailed explanations'),
        tr('Konsultasi target skor beasiswa & syarat kerja', 'Target score consultation for scholarships & jobs')
      ],
      fullDesc: tr(
        'Program andalan English Join Indonesia yang telah membantu ribuan alumni menaikkan skor 80–120 poin. Membongkar tuntas pola soal TOEFL ITP: Listening Comprehension, Structure & Written Expression, dan Reading Comprehension dengan teknik eliminasi super cepat dari Sir Alwi.',
        'English Join Indonesia’s flagship program that has helped thousands of alumni raise their score by 80–120 points. Thoroughly breaks down TOEFL ITP patterns: Listening, Structure, and Reading with Sir Alwi’s super-fast elimination methods.'
      ),
      targetAudience: tr('Calon pelamar beasiswa luar negeri, pejuang CPNS/BUMN, mahasiswa tingkat akhir untuk syarat kelulusan/wisuda.', 'Scholarship applicants, CPNS/BUMN job seekers, and graduating university students.')
    },
    'prog-3': {
      description: tr(
        'Kupas tuntas strategi, tips eliminasi kilat, dan latihan intensif soal Listening, Structure, & Reading TOEFL ITP.',
        'Master proven strategies, rapid elimination tricks, and intensive drills for TOEFL ITP Listening, Structure, & Reading.'
      ),
      level: tr('Semua Level (Persiapan Ujian)', 'All Levels (Exam Prep)'),
      duration: tr('1 Bulan', '1 Month'),
      sessionCount: tr('16 Sesi Intensif', '16 Intensive Sessions'),
      benefits: [
        tr('Trik cepat menjawab soal Structure tanpa terjemah kata per kata', 'Fast Structure problem-solving without word-for-word translation'),
        tr('1x Tes TOEFL Prediction + Sertifikat Resmi', '1x Official TOEFL Prediction Test + Certificate'),
        tr('Bank soal lengkap & pembahasan detail', 'Comprehensive question bank & detailed explanations'),
        tr('Konsultasi target skor beasiswa & syarat kerja', 'Target score consultation for scholarships & jobs')
      ],
      fullDesc: tr(
        'Program andalan English Join Indonesia yang telah membantu ribuan alumni menaikkan skor 80–120 poin. Membongkar tuntas pola soal TOEFL ITP: Listening Comprehension, Structure & Written Expression, dan Reading Comprehension dengan teknik eliminasi super cepat dari Sir Alwi.',
        'English Join Indonesia’s flagship program that has helped thousands of alumni raise their score by 80–120 points. Thoroughly breaks down TOEFL ITP patterns: Listening, Structure, and Reading with Sir Alwi’s super-fast elimination methods.'
      ),
      targetAudience: tr('Calon pelamar beasiswa luar negeri, pejuang CPNS/BUMN, mahasiswa tingkat akhir untuk syarat kelulusan/wisuda.', 'Scholarship applicants, CPNS/BUMN job seekers, and graduating university students.')
    }
  };

  const getProgramIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'MessageSquare':
      case 'MessageSquareText':
        return <MessageSquare className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <section id="programs" className="py-20 lg:py-28 bg-[#0A0A0A] relative overflow-hidden">
      {/* Glow Effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#F7B425]/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            {tr('Pilihan Program', 'Choose Your')}{' '}
            <span className="text-[#F7B425]">{tr('Kursus Terbaik', 'English Journey')}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-300 font-normal max-w-2xl mx-auto">
            {tr(
              'Pilih program yang paling sesuai dengan kebutuhanmu, mulai dari dasar, speaking aktif, hingga persiapan ujian TOEFL.',
              'Choose the program that fits your goals, from zero basics to fluent speaking and guaranteed TOEFL preparation.'
            )}
          </p>
        </div>

        {/* Dynamic Program Cards Grid from Shared Context / Admin */}
        {landingPrograms.length === 0 ? (
          <div className="text-center py-12 bg-white/5 border border-white/10 rounded-3xl p-8 max-w-lg mx-auto">
            <BookOpen className="w-12 h-12 text-slate-500 mx-auto mb-3" />
            <p className="text-slate-300 font-bold">{tr('Program sedang diperbarui oleh Admin.', 'Programs are being updated by Admin.')}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {landingPrograms.map((program) => {
              const isFeatured = program.isFeatured;
              const translation = defaultProgramTranslations[program.id];
              const displayDesc = translation ? translation.description : program.description;
              const displayLevel = translation ? translation.level : program.level;
              const displayDuration = translation ? translation.duration : program.duration;
              const displaySessions = translation ? translation.sessionCount : program.sessionCount;
              const displayBenefits = translation ? translation.benefits : program.benefits;

              return (
                <div
                  key={program.id}
                  className={`relative rounded-3xl flex flex-col justify-between transition-all duration-300 ${
                    isFeatured
                      ? 'bg-[#141414] border-2 border-[#F7B425] shadow-2xl shadow-[#F7B425]/15'
                      : 'bg-[#141414] border border-white/10 hover:border-white/20 hover:shadow-xl hover:shadow-black/60'
                  } p-6 sm:p-8`}
                >
                  {/* Featured Badge Ribbon */}
                  {isFeatured && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-[#F7B425] text-black text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 whitespace-nowrap">
                      <Star className="w-3.5 h-3.5 fill-black" />
                      <span>{program.tag || tr('FEATURED • PROGRAM UNGGULAN', 'FEATURED • RECOMMENDED')}</span>
                    </div>
                  )}

                  <div>
                    {/* Card Header: Icon & Level */}
                    <div className="flex items-center justify-between mb-5">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${
                          isFeatured
                            ? 'bg-[#F7B425] text-black shadow-md'
                            : 'bg-white/5 border border-white/10 text-[#F7B425]'
                        }`}
                      >
                        {getProgramIcon(program.iconName)}
                      </div>

                      {displayLevel && (
                        <span
                          className={`text-xs font-semibold px-3.5 py-1 rounded-full ${
                            isFeatured
                              ? 'bg-[#F7B425]/15 text-[#F7B425] border border-[#F7B425]/30'
                              : 'bg-white/5 text-slate-300 border border-white/10'
                          }`}
                        >
                          {displayLevel}
                        </span>
                      )}
                    </div>

                    {/* Program Title */}
                    <h3 className="text-2xl font-black font-heading text-white mb-2">
                      {program.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-6 min-h-[44px]">
                      {displayDesc}
                    </p>

                    {/* Price & Meta info */}
                    <div className="mb-6 pb-6 border-b border-white/10">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-3xl font-black font-heading text-white">
                          {program.priceFormatted}
                        </span>
                        {program.originalPrice && (
                          <span className="text-xs text-slate-500 line-through">
                            {program.originalPrice}
                          </span>
                        )}
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 mt-2">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-[#F7B425]" />
                          {displayDuration}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#F7B425]" />
                          {displaySessions}
                        </span>
                      </div>
                    </div>

                    {/* Key Highlights / Benefits List */}
                    <div className="space-y-3 mb-8">
                      <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                        {t.programs.whatYouGet || tr('YANG KAMU DAPATKAN:', 'WHAT YOU GET:')}
                      </p>
                      <div className="space-y-2.5">
                        {displayBenefits.slice(0, 4).map((highlight, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                            <CheckCircle2
                              className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                isFeatured ? 'text-[#F7B425]' : 'text-emerald-400'
                              }`}
                            />
                            <span className="leading-relaxed">{highlight}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="space-y-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onOpenRegister(program.id)}
                      className={`relative group overflow-hidden w-full py-3.5 px-6 rounded-[25px] font-black text-sm flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:shadow-xl hover:-translate-y-0.5 active:scale-95 cursor-pointer ${
                        isFeatured
                          ? 'bg-[#F7B425] text-black hover:bg-[#ffbe33] shadow-[#F7B425]/25 hover:shadow-[#F7B425]/40'
                          : 'bg-white text-black hover:bg-slate-100'
                      }`}
                    >
                      <span className="relative z-10 flex items-center justify-center gap-2">
                        <span>{tr('Daftar Program Ini', 'Enroll in Program')}</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </span>

                      {/* Glossy / Mengkilap Shimmer Reflection Sweep on Hover */}
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform ease-out pointer-events-none" />

                      {/* Ambient Top Glow Reflection */}
                      <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-[25px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </button>

                    {/* Tanya via WhatsApp Button */}
                    <a
                      id={`btn-wa-${program.id}`}
                      href={`https://wa.me/6281242507738?text=${encodeURIComponent(
                        `Halo Sir Alwi & Admin English Join Indonesia, saya ingin tanya informasi lebih lanjut tentang program ${program.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full py-3 px-6 rounded-full font-bold text-sm sm:text-base text-[#25D366] bg-[#141414] hover:bg-[#1f1f1f] border border-[#25D366] shadow-sm hover:shadow-md hover:shadow-[#25D366]/20 transition-all duration-300 flex items-center justify-center gap-2.5 active:scale-95 cursor-pointer"
                      title={tr('Tanya via WhatsApp', 'Ask via WhatsApp')}
                    >
                      <MessageCircle className="w-5 h-5 text-[#25D366]" />
                      <span>{tr('Tanya via WhatsApp', 'Ask via WhatsApp')}</span>
                    </a>

                    <button
                      type="button"
                      onClick={() => setSelectedProgram(program)}
                      className="w-full text-center text-xs font-semibold text-slate-400 hover:text-white transition-colors py-1 block cursor-pointer"
                    >
                      {tr('Pelajari Lebih Lanjut', 'Learn More Details')}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* Program Details Modal */}
      {selectedProgram && (() => {
        const modalTranslation = defaultProgramTranslations[selectedProgram.id];
        const modalDesc = modalTranslation?.fullDesc || selectedProgram.fullDesc || modalTranslation?.description || selectedProgram.description;
        const modalAudience = modalTranslation?.targetAudience || selectedProgram.targetAudience;
        const modalDuration = modalTranslation?.duration || selectedProgram.duration;
        const modalSessions = modalTranslation?.sessionCount || selectedProgram.sessionCount;
        const modalBenefits = modalTranslation?.benefits || selectedProgram.benefits;
        const modalLevel = modalTranslation?.level || selectedProgram.level;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#141414] border border-white/15 rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
              <button
                type="button"
                onClick={() => setSelectedProgram(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 text-slate-300 hover:text-white flex items-center justify-center text-sm font-bold cursor-pointer"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#F7B425] text-black flex items-center justify-center">
                  {getProgramIcon(selectedProgram.iconName)}
                </div>
                <div>
                  <span className="text-xs font-bold text-[#F7B425] uppercase tracking-wider">
                    {selectedProgram.tag || modalLevel || 'Program English Join'}
                  </span>
                  <h3 className="text-xl font-bold text-white">
                    {selectedProgram.title}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-slate-300 leading-relaxed mb-6">
                {modalDesc}
              </p>

              <div className="bg-black/50 border border-white/10 rounded-xl p-4 mb-6 space-y-2">
                {modalAudience && (
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-400">{tr('Target Peserta:', 'Target Audience:')}</span>
                    <span className="text-white font-medium text-right max-w-[200px]">{modalAudience}</span>
                  </div>
                )}
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{tr('Durasi & Sesi:', 'Duration & Sessions:')}</span>
                  <span className="text-white font-medium">{modalDuration} • {modalSessions}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">{tr('Biaya Investasi:', 'Tuition Fee:')}</span>
                  <span className="text-[#F7B425] font-bold text-sm">{selectedProgram.priceFormatted}</span>
                </div>
              </div>

              <div className="mb-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-300 mb-3">
                  {tr('Silabus & Fasilitas Lengkap:', 'Full Syllabus & Benefits:')}
                </h4>
                <ul className="space-y-2.5">
                  {modalBenefits.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <CheckCircle2 className="w-4 h-4 text-[#F7B425] flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedProgram.id;
                    setSelectedProgram(null);
                    onOpenRegister(id);
                  }}
                  className="relative group overflow-hidden flex-1 py-3.5 rounded-[25px] font-black text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-lg shadow-[#F7B425]/25 hover:shadow-xl hover:shadow-[#F7B425]/40 transition-all duration-300 flex items-center justify-center gap-2 hover:-translate-y-0.5 active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    <span>{tr('Daftar Program Ini Sekarang', 'Enroll in this Program Now')}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>

                  {/* Glossy / Mengkilap Shimmer Reflection Sweep on Hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 bg-gradient-to-r from-transparent via-white/70 to-transparent transition-transform ease-out pointer-events-none" />

                  {/* Ambient Top Glow Reflection */}
                  <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/30 to-transparent rounded-t-[25px] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </button>

                <a
                  href={`https://wa.me/6281242507738?text=${encodeURIComponent(
                    `Halo Sir Alwi & Admin English Join Indonesia, saya ingin tanya lebih lanjut tentang program ${selectedProgram.title}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-5 rounded-full font-bold text-sm text-[#25D366] bg-[#141414] hover:bg-[#1f1f1f] border border-[#25D366] shadow-sm transition-all duration-300 flex items-center justify-center gap-2 active:scale-95 cursor-pointer"
                  title={tr('Tanya via WhatsApp', 'Ask via WhatsApp')}
                >
                  <MessageCircle className="w-4 h-4 text-[#25D366]" />
                  <span>{tr('Tanya via WhatsApp', 'Ask via WhatsApp')}</span>
                </a>
              </div>
            </div>
          </div>
        );
      })()}
    </section>
  );
};

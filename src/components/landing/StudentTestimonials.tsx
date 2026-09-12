import React, { useState } from 'react';
import { Star, Award } from 'lucide-react';
import { TESTIMONIALS } from '../../data/mockData';
import toeflSuccessImg from '../../assets/images/toefl_success_cert_1787217497301.jpg';
import { useLanguage } from '../../context/LanguageContext';

export const StudentTestimonials: React.FC = () => {
  const { tr } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'All' | 'TOEFL' | 'Conversation' | 'Beginner'>('All');

  const testimonialTranslations: Record<string, { role: string; scoreBadge: string; text: string; universityOrCompany: string }> = {
    't-1': {
      role: tr('Mahasiswi Universitas Indonesia', 'Student at Universitas Indonesia'),
      scoreBadge: tr('Skor TOEFL: 567 (Naik 110 Poin)', 'TOEFL Score: 567 (+110 Points)'),
      text: tr(
        'Belajarnya seru banget dan trik structure TOEFL dari Sir Alwi beneran manjur! Dulu mentok di 450, setelah 1 bulan di English Join Indonesia langsung tembus 567 dan lolos berkas beasiswa.',
        'Learning was so fun and Sir Alwi’s TOEFL structure tricks really worked! I was stuck at 450 before, but after 1 month at English Join Indonesia I reached 567 and secured my scholarship.'
      ),
      universityOrCompany: tr('Awardee Beasiswa Unggulan', 'Excellence Scholarship Awardee')
    },
    't-2': {
      role: tr('Staff Operasional PT Pertamina (Persero)', 'Operations Staff at Pertamina'),
      scoreBadge: tr('Lolos Interview BUMN', 'Passed State Enterprise (BUMN) Interview'),
      text: tr(
        'Dulu saya paling takut kalau diminta perkenalan diri bahasa Inggris saat interview kerja. Di kelas Conversation diajarin cara bicara natural dan percaya diri. Hasilnya langsung tembus BUMN!',
        'I used to dread introducing myself in English during job interviews. In the Conversation class, I learned to speak naturally and confidently. The result: hired at Pertamina!'
      ),
      universityOrCompany: tr('BUMN Achiever', 'State Enterprise Achiever')
    },
    't-3': {
      role: tr('Fresh Graduate', 'Fresh Graduate'),
      scoreBadge: tr('Mulai dari Nol ke Lancar', 'From Scratch to Fluent'),
      text: tr(
        'Belajar dari nol sama sekali gak dijudge. Penjelasan materinya santai dan gampang dipahami. Sekarang saya jauh lebih percaya diri berbicara Bahasa Inggris sehari-hari.',
        'Learning from zero was totally judgment-free. The lessons were relaxed and so easy to grasp. I now speak English daily with real confidence.'
      ),
      universityOrCompany: tr('Alumni Batch 18', 'Batch 18 Alumni')
    },
    't-4': {
      role: tr('PNS Kementerian Keuangan', 'Civil Servant, Ministry of Finance'),
      scoreBadge: tr('TOEFL 580 - Lolos CPNS', 'TOEFL 580 - Passed Civil Service'),
      text: tr(
        'Tips listening & reading di English Join Indonesia sangat to the point. Tidak buang-buang waktu baca panjang, teknik eliminasi jawabannya luar biasa akurat. Sangat recommended!',
        'The listening & reading techniques at English Join Indonesia were spot on. No wasting time reading long paragraphs, the elimination methods are super accurate!'
      ),
      universityOrCompany: tr('Kemenkeu RI', 'Ministry of Finance RI')
    },
    't-5': {
      role: tr('Content Creator & Freelancer', 'Content Creator & Freelancer'),
      scoreBadge: tr('Speaking Aktif dengan Klien Luar', 'Active Speaking with Global Clients'),
      text: tr(
        'Komunitas belajarnya super positif! Tidak ada yang saling menjudge kalau ada grammar yang salah, tutornya selalu memberi motivasi. Sekarang saya berani handle klien internasional.',
        'The learning community is incredibly supportive! Nobody judges mistakes and tutors constantly encourage you. Now I confidently handle international clients.'
      ),
      universityOrCompany: tr('Desainer Lepas', 'Freelance Designer')
    }
  };

  const filteredTestimonials = activeFilter === 'All'
    ? TESTIMONIALS
    : TESTIMONIALS.filter(t => t.category === activeFilter);

  return (
    <section id="testimonials" className="py-20 lg:py-32 bg-[#0A0A0A] relative overflow-hidden border-t border-white/5">
      {/* Background glow */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#F7B425]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            {tr('Apa Kata', 'What Our')}{' '}
            <span className="text-[#F7B425]">{tr('Mereka?', 'Students Say')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            {tr(
              'Cerita nyata dari ratusan alumni yang telah membuktikan peningkatan kemampuan dan pencapaian target mereka.',
              'Real stories from hundreds of alumni who achieved their language milestones and score goals.'
            )}
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mt-8">
            {(['All', 'TOEFL', 'Conversation', 'Beginner'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#F7B425] text-black shadow-md shadow-[#F7B425]/20'
                    : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10 border border-white/10'
                }`}
              >
                {filter === 'All' ? tr('Semua Cerita', 'All Stories') : filter === 'Beginner' ? tr('Pemula', 'Beginner') : filter}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Student Proof Banner */}
        <div className="mb-12 rounded-3xl bg-gradient-to-r from-[#171510] via-[#1A1812] to-[#141414] p-6 sm:p-8 flex flex-col md:flex-row items-center gap-6 shadow-xl">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 shadow-lg">
            <img
              src={toeflSuccessImg}
              alt="Alumni holding official TOEFL certificate"
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#F7B425] text-black text-[11px] font-black uppercase tracking-wider mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>{tr('Target Skor Terbukti', 'Proven Score Target')}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-heading">
              {tr('9 dari 10 Peserta Berhasil Menaikkan Skor TOEFL 80–120 Poin', '9 out of 10 Students Raised Their TOEFL Score by 80–120 Points')}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {tr(
                'Dengan metode pembedahan rumus structure dan eliminasi cepat soal reading & listening tanpa tebak-tebakan.',
                'Through our proven structure analysis and rapid elimination techniques for reading and listening without guessing.'
              )}
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end justify-center">
            <span className="text-3xl sm:text-4xl font-black font-heading text-[#F7B425]">580+</span>
            <span className="text-xs text-slate-400 font-medium">{tr('Rekor Skor Tertinggi Alumni', 'Alumni Highest Score Record')}</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTestimonials.map((testi) => {
            const translation = testimonialTranslations[testi.id];
            const role = translation ? translation.role : testi.role;
            const scoreBadge = translation ? translation.scoreBadge : testi.scoreBadge;
            const text = translation ? translation.text : testi.text;
            const universityOrCompany = translation ? translation.universityOrCompany : testi.universityOrCompany;

            return (
              <div
                key={testi.id}
                className="group bg-[#141414] hover:bg-[#181818] border border-white/10 hover:border-[#F7B425]/40 rounded-3xl p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl"
              >
                <div>
                  {/* Rating & Badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1 text-amber-400">
                      {[...Array(testi.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#F7B425] text-[#F7B425]" />
                      ))}
                    </div>

                    {scoreBadge && (
                      <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#F7B425]/15 text-[#F7B425] border border-[#F7B425]/30">
                        {scoreBadge}
                      </span>
                    )}
                  </div>

                  {/* Testimonial Quote */}
                  <p className="text-sm text-slate-200 leading-relaxed italic mb-6 font-normal">
                    “{text}”
                  </p>
                </div>

                {/* Author Info */}
                <div className="flex items-center gap-3.5 pt-4 border-t border-white/5">
                  <img
                    src={testi.avatarUrl}
                    alt={testi.name}
                    referrerPolicy="no-referrer"
                    className="w-11 h-11 rounded-full object-cover border border-white/20"
                  />
                  <div>
                    <h4 className="text-sm font-bold text-white group-hover:text-[#F7B425] transition-colors">
                      {testi.name}
                    </h4>
                    <p className="text-xs text-slate-400">
                      {role}
                    </p>
                    {universityOrCompany && (
                      <p className="text-[10px] text-[#F7B425] font-semibold">
                        {universityOrCompany}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

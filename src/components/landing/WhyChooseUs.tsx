import React from 'react';
import { Clock, BookOpen, Users, Award, Check, ArrowRight, Sparkles } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

interface WhyChooseUsProps {
  onOpenRegister: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenRegister }) => {
  const { tr } = useLanguage();

  const features = [
    {
      number: '01',
      title: tr('FLEXIBLE SCHEDULE', 'FLEXIBLE SCHEDULE'),
      subtitle: tr('Jadwal Fleksibel', 'Flexible Schedule'),
      description: tr(
        'Pilihan jadwal kelas yang dapat disesuaikan dengan aktivitas kuliah, pekerjaan kantor, maupun kesibukan harianmu.',
        'Class schedules tailored to your college routines, office work, and daily commitments.'
      ),
      iconName: 'Clock',
      keyBenefits: [
        tr('Pilihan kelas pagi, sore, dan malam', 'Morning, afternoon, and evening class options'),
        tr('Tersedia rekaman kelas seumur hidup', 'Lifetime access to class recordings'),
        tr('Bebas atur waktu tanpa mengorbankan rutinitas', 'Learn at your pace without disrupting your daily routine')
      ]
    },
    {
      number: '02',
      title: tr('PRACTICAL & EFFECTIVE METHOD', 'PRACTICAL & EFFECTIVE METHOD'),
      subtitle: tr('Metode Praktis & Efektif', 'Practical & Effective Method'),
      description: tr(
        'Fokus pada pola pemahaman cepat dan praktik aktif tanpa hafalan rumus yang membingungkan. Langsung bisa dipraktikkan.',
        'Focus on fast comprehension and active practice without confusing memorization. Immediately applicable.'
      ),
      iconName: 'BookOpen',
      keyBenefits: [
        tr('80% praktik berbicara dan simulasi soal', '80% speaking practice and real test simulations'),
        tr('Trik cepat eliminasi jawaban TOEFL', 'Fast elimination tricks for TOEFL questions'),
        tr('Penjelasan step-by-step dari dasar', 'Step-by-step guidance from the ground up')
      ]
    },
    {
      number: '03',
      title: tr('SUPPORTIVE COMMUNITY', 'SUPPORTIVE COMMUNITY'),
      subtitle: tr('Komunitas Suportif', 'Supportive Community'),
      description: tr(
        'Belajar di lingkungan yang positif, ramah pemula, bebas rasa takut salah atau dihakimi, dipandu oleh Sir Alwi & tim mentor berpengalaman.',
        'Learn in a positive, beginner-friendly space free from fear of making mistakes, guided by Sir Alwi & experienced mentors.'
      ),
      iconName: 'Users',
      keyBenefits: [
        tr('Bimbingan ramah dan bebas rasa minder', 'Encouraging mentorship without feeling intimidated'),
        tr('Grup diskusi interaktif sesama pembelajar', 'Interactive discussion community with peers'),
        tr('Networking luas dari berbagai kota di Indonesia', 'Wide nationwide network across Indonesia')
      ]
    },
    {
      number: '04',
      title: tr('CERTIFICATE OF ACHIEVEMENT', 'CERTIFICATE OF ACHIEVEMENT'),
      subtitle: tr('Sertifikat Pencapaian Resmi', 'Official Certificate of Achievement'),
      description: tr(
        'Dapatkan sertifikat resmi ber-nomor verifikasi yang dapat dilampirkan untuk administrasi CPNS, BUMN, beasiswa, dan syarat kelulusan.',
        'Earn an official verified certificate valid for civil service (CPNS), state-owned enterprises (BUMN), scholarships, and graduation.'
      ),
      iconName: 'Award',
      keyBenefits: [
        tr('Sertifikat TOEFL Prediction berstandar', 'Standardized TOEFL Prediction certificate'),
        tr('Diakui untuk persyaratan administrasi kerja', 'Recognized for career and employment applications'),
        tr('Meningkatkan nilai portofolio CV & LinkedIn', 'Strengthens your CV & LinkedIn portfolio')
      ]
    }
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Clock':
        return <Clock className="w-6 h-6" />;
      case 'BookOpen':
        return <BookOpen className="w-6 h-6" />;
      case 'Users':
        return <Users className="w-6 h-6" />;
      case 'Award':
        return <Award className="w-6 h-6" />;
      default:
        return <BookOpen className="w-6 h-6" />;
    }
  };

  return (
    <section id="why-us" className="py-20 lg:py-28 bg-[#0F0F0F] relative overflow-hidden border-t border-white/5">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-[#F7B425]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-heading text-white tracking-tight leading-tight mb-4 uppercase">
            {tr('Mengapa Memilih', 'Why Choose')} <span className="text-[#F7B425]">{tr('Kami?', 'Us?')}</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 font-normal">
            {tr(
              'Alasan mengapa ribuan siswa dan alumni mempercayakan peningkatan kemampuan Bahasa Inggris dan persiapan TOEFL mereka di English Join Indonesia.',
              'Why thousands of students and alumni trust English Join Indonesia to elevate their English fluency and master TOEFL preparation.'
            )}
          </p>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
          {features.map((feature) => (
            <div
              key={feature.number}
              className="group relative bg-[#161616] hover:bg-[#1C1C1C] border border-white/10 hover:border-[#F7B425]/50 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1.5 shadow-xl hover:shadow-2xl hover:shadow-[#F7B425]/10"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-3xl sm:text-4xl font-black font-heading text-[#F7B425] tracking-tighter opacity-90 group-hover:opacity-100 transition-opacity">
                    {feature.number}
                  </span>
                  
                  <div className="w-12 h-12 rounded-2xl bg-white/5 group-hover:bg-[#F7B425] text-[#F7B425] group-hover:text-black flex items-center justify-center transition-all duration-300 border border-white/10 group-hover:border-[#F7B425] shadow-inner">
                    {getIcon(feature.iconName)}
                  </div>
                </div>

                <span className="text-[11px] font-bold text-[#F7B425] uppercase tracking-wider block mb-1">
                  {feature.subtitle}
                </span>

                <h3 className="text-lg sm:text-xl font-black font-heading text-white mb-3 group-hover:text-[#F7B425] transition-colors leading-snug uppercase">
                  {feature.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6 font-normal">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <ul className="space-y-2">
                  {feature.keyBenefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-400">
                      <Check className="w-3.5 h-3.5 text-[#F7B425] flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-[#F7B425] to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-full" />
            </div>
          ))}
        </div>

        {/* Bottom Action Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenRegister}
            className="inline-flex items-center gap-2 text-sm font-bold text-[#F7B425] hover:text-white transition-colors group cursor-pointer"
          >
            <span>{tr('Konsultasikan Kebutuhan Belajarmu Bersama Sir Alwi', 'Consult Your Learning Goals with Sir Alwi')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};

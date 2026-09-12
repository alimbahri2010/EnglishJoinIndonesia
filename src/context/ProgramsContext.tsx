import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ManagedProgram {
  id: string;
  title: string;
  category: 'Landing Page' | 'TOEFL Test';
  tag: string;
  level?: string;
  duration: string;
  sessionCount: string;
  priceFormatted: string;
  originalPrice?: string;
  scoreTarget?: string;
  certificate?: string;
  description: string;
  fullDesc?: string;
  targetAudience?: string;
  benefits: string[];
  isFeatured?: boolean;
  isActive: boolean;
  iconName?: string;
}

export const DEFAULT_PROGRAMS: ManagedProgram[] = [
  // --- 3 PROGRAM SECTION CHOSEN PROGRAM (LANDING PAGE) ---
  {
    id: 'prog-beginners',
    title: 'English for Beginners',
    category: 'Landing Page',
    tag: 'Belajar dari Nol Besar',
    level: 'Beginner (A1 - A2)',
    duration: '1 Bulan Intensif',
    sessionCount: '16 Sesi Interaktif + Modul Lengkap',
    priceFormatted: 'Rp 299.000',
    originalPrice: 'Rp 450.000',
    description: 'Untuk kamu yang ingin mulai belajar Bahasa Inggris dari dasar dengan metode santai dan bebas rasa takut salah.',
    fullDesc: 'Program dasar yang dirancang khusus bagi pemula yang belum pernah belajar bahasa Inggris atau merasa nol besar. Dipandu mentor sabar dengan pendekatan interaktif, santai, dan aplikatif.',
    targetAudience: 'Pemula total, siswa/mahasiswa yang ingin memperkuat fondasi bahasa Inggris.',
    benefits: [
      'Belajar dari Nol (Nol Besar Sangat Welcome)',
      'Basic Daily Vocabulary 500+ Kata Penting',
      'Simple Grammar tanpa rumus membingungkan',
      'Praktik pelafalan (Pronunciation) yang benar',
      'Grup diskusi santai & ramah pemula',
      'Modul digital & rekaman kelas seumur hidup'
    ],
    isFeatured: false,
    isActive: true,
    iconName: 'Sparkles'
  },
  {
    id: 'prog-conversation',
    title: 'English Conversation',
    category: 'Landing Page',
    tag: 'Popular Speaking Class',
    level: 'Intermediate (B1 - B2)',
    duration: '1 - 2 Bulan Fleksibel',
    sessionCount: '20 Sesi Praktik Speaking + Feedback',
    priceFormatted: 'Rp 349.000',
    originalPrice: 'Rp 500.000',
    description: 'Tingkatkan kemampuan speaking dan percaya dirimu dalam berkomunikasi di kehidupan sehari-hari maupun dunia kerja.',
    fullDesc: 'Fokus 80% pada praktik berbicara (speaking) dengan berbagai topik aktual, simulasi percakapan profesional, debat ringan, dan presentasi kerja.',
    targetAudience: 'Mahasiswa, fresh graduates, profesional, dan siapa saja yang ingin lancar ngomong Inggris.',
    benefits: [
      '80% Praktik Speaking di setiap pertemuan',
      'Small Group (4-6 orang) agar semua dapat giliran',
      'Topik diskusi kasual, bisnis, & presentasi',
      'Koreksi pronunciation & natural expression',
      'Live Feedback langsung dari tutor berpengalaman',
      'Sertifikat Resmi & Komunitas Speaking Club'
    ],
    isFeatured: false,
    isActive: true,
    iconName: 'MessageSquare'
  },
  {
    id: 'prog-toefl',
    title: 'TOEFL Preparation',
    category: 'Landing Page',
    tag: '⭐ Target Skor 500+ • Lolos Seleksi',
    level: 'All Levels to Advanced',
    duration: '1 Bulan Intensif / Fast Track',
    sessionCount: '24 Sesi + 3x Real TOEFL Simulation',
    priceFormatted: 'Rp 399.000',
    originalPrice: 'Rp 650.000',
    scoreTarget: 'Target Skor 500+',
    description: 'Tingkatkan skor TOEFL untuk lanjut studi, beasiswa, CPNS, BUMN, Perusahaan Swasta, dan berbagai kebutuhan karier.',
    fullDesc: 'Program komprehensif membedah rahasia soal Listening Comprehension, Structure & Written Expression, serta Reading Comprehension dengan rumus cepat dan tips trik akurat.',
    targetAudience: 'Calon pendaftar CPNS, BUMN, beasiswa LPDP, dan syarat kelulusan skripsi.',
    benefits: [
      'Tips & Trik Cepat Jawab Soal TOEFL (Listening, Structure, Reading)',
      '3x Simulasi Ujian TOEFL Prediction standar ETS',
      'Pembahasan mendalam 1000+ bank soal terbaru',
      'Prediksi Skor & Analisis Kelemahan Personal',
      'Sertifikat TOEFL Prediction Resmi CPNS & BUMN',
      'Garansi konsultasi hingga tembus target skor'
    ],
    isFeatured: true,
    isActive: true,
    iconName: 'Award'
  },

  // --- 3 PROGRAM SECTION KATALOG TEST TOEFL (LOGIN PORTAL) ---
  {
    id: 'toefl-pred-1',
    title: 'TOEFL ITP Prediction Test (Online)',
    category: 'TOEFL Test',
    tag: 'Paling Populer',
    level: 'Simulasi Tes Resmi',
    duration: '115 Menit',
    sessionCount: '140 Soal (L, S, R)',
    priceFormatted: 'Rp 149.000',
    scoreTarget: 'Skala 310 - 677',
    description: 'Simulasi ujian TOEFL online berstandar ETS dengan hasil instan dan verifikasi online resmi.',
    fullDesc: 'Tes simulasi akurat yang mengukur kemampuan bahasa Inggris secara objektif untuk syarat sidang, CPNS, dan BUMN.',
    targetAudience: 'Peserta yang membutuhkan skor TOEFL Prediction secara cepat dan resmi.',
    benefits: [
      'Listening, Structure, Reading',
      'Hasil Keluar Instan 24 Jam',
      'Barcode Verifikasi Online'
    ],
    isFeatured: false,
    isActive: true,
    iconName: 'Award'
  },
  {
    id: 'toefl-guarantee',
    title: 'TOEFL Preparation & Test (Garansi 500+)',
    category: 'TOEFL Test',
    tag: 'Garansi Lolos',
    level: 'Program Intensif',
    duration: '4 Minggu (24 Sesi)',
    sessionCount: '10x Simulasi Lengkap',
    priceFormatted: 'Rp 749.000',
    scoreTarget: 'Target Skor 500 - 550+',
    certificate: 'Sertifikat Resmi Syarat CPNS & LPDP',
    description: 'Bedah trik pola soal sulit Inversion & Subjunctive dengan bimbingan mentor alumni Kampung Inggris & garansi retake 2x.',
    fullDesc: 'Kelas intensif bergaransi peningkatan skor hingga 500-550+ dengan bimbingan tutor ahli dan fasilitas retake gratis.',
    targetAudience: 'Pendaftar beasiswa LPDP, AAS, Fulbright, dan seleksi BUMN Bintang 5.',
    benefits: [
      'Bedah Trik Soal Sulit Inversion & Subjunctive',
      'Mentor Alumni Kampung Inggris',
      'Free Retake Tes 2x',
      'Sertifikat Resmi Syarat CPNS & LPDP'
    ],
    isFeatured: true,
    isActive: true,
    iconName: 'Award'
  },
  {
    id: 'toefl-fasttrack',
    title: 'TOEFL Fast-Track Weekend Bootcamp',
    category: 'TOEFL Test',
    tag: 'Weekend Class',
    level: 'Short Course',
    duration: '2 Minggu (8 Sesi)',
    sessionCount: '5x Mini Tests',
    priceFormatted: 'Rp 450.000',
    scoreTarget: 'Target Skor 480+',
    certificate: 'Sertifikat Kelulusan Resmi',
    description: 'Kelas kilat akhir pekan khusus karyawan dan mahasiswa akhir via Zoom dilengkapi modul PDF ringkas dan rekaman kelas.',
    fullDesc: 'Dirancang khusus untuk Anda yang memiliki jadwal padat di hari kerja, memaksimalkan pemahaman TOEFL dalam 2 pekan.',
    targetAudience: 'Karyawan, pekerja profesional, dan mahasiswa tingkat akhir yang sibuk di hari kerja.',
    benefits: [
      'Khusus Karyawan & Mahasiswa Akhir',
      'Live Interactive via Zoom',
      'Modul PDF & Rekaman Kelas',
      'Sertifikat Kelulusan Resmi'
    ],
    isFeatured: false,
    isActive: true,
    iconName: 'Sparkles'
  }
];

const STORAGE_KEY = 'english_join_programs_master_v3';

interface ProgramsContextType {
  programs: ManagedProgram[];
  landingPrograms: ManagedProgram[];
  toeflPrograms: ManagedProgram[];
  addProgram: (program: Omit<ManagedProgram, 'id'>) => void;
  updateProgram: (program: ManagedProgram) => void;
  deleteProgram: (id: string) => void;
  toggleProgramActive: (id: string) => void;
  reorderPrograms: (reordered: ManagedProgram[]) => void;
  resetToDefaults: () => void;
}

const ProgramsContext = createContext<ProgramsContextType | undefined>(undefined);

export const ProgramsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [programs, setPrograms] = useState<ManagedProgram[]>(() => {
    try {
      // Purge legacy storage versions that might contain old SK Diknas text
      if (typeof window !== 'undefined' && window.localStorage) {
        localStorage.removeItem('english_join_programs_master_v1');
        localStorage.removeItem('english_join_programs_master_v2');
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // Clean any cached items containing Diknas or legacy SK text
          const cleaned = parsed.map((p: ManagedProgram) => {
            const cleanBenefits = (p.benefits || []).filter(
              (b: string) => !b.toLowerCase().includes('diknas') && !b.includes('421.9')
            );
            const cleanCert = (p.certificate && (p.certificate.toLowerCase().includes('diknas') || p.certificate.includes('421.9')))
              ? ''
              : p.certificate;
            return {
              ...p,
              certificate: p.id === 'toefl-pred-1' ? '' : cleanCert,
              benefits: cleanBenefits
            };
          });
          return cleaned;
        }
      }
    } catch (e) {
      console.warn('Error reading programs from localStorage', e);
    }
    return DEFAULT_PROGRAMS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(programs));
    } catch (e) {
      console.error('Error saving programs to localStorage', e);
    }
  }, [programs]);

  const landingPrograms = programs.filter(p => p.category === 'Landing Page' && p.isActive);
  const toeflPrograms = programs.filter(p => p.category === 'TOEFL Test' && p.isActive);

  const addProgram = (newProg: Omit<ManagedProgram, 'id'>) => {
    const created: ManagedProgram = {
      ...newProg,
      id: `prog-${Date.now()}`
    };
    setPrograms(prev => [created, ...prev]);
  };

  const updateProgram = (updatedProg: ManagedProgram) => {
    setPrograms(prev => prev.map(p => p.id === updatedProg.id ? updatedProg : p));
  };

  const deleteProgram = (id: string) => {
    setPrograms(prev => prev.filter(p => p.id !== id));
  };

  const toggleProgramActive = (id: string) => {
    setPrograms(prev => prev.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const reorderPrograms = (newPrograms: ManagedProgram[]) => {
    setPrograms(newPrograms);
  };

  const resetToDefaults = () => {
    setPrograms(DEFAULT_PROGRAMS);
  };

  return (
    <ProgramsContext.Provider
      value={{
        programs,
        landingPrograms,
        toeflPrograms,
        addProgram,
        updateProgram,
        deleteProgram,
        toggleProgramActive,
        reorderPrograms,
        resetToDefaults
      }}
    >
      {children}
    </ProgramsContext.Provider>
  );
};

export const usePrograms = (): ProgramsContextType => {
  const context = useContext(ProgramsContext);
  if (!context) {
    throw new Error('usePrograms must be used within a ProgramsProvider');
  }
  return context;
};

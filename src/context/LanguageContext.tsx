import React, { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'id' | 'en';

interface Translations {
  nav: {
    home: string;
    whyUs: string;
    programs: string;
    learningProcess: string;
    testimonials: string;
    login: string;
    register: string;
    quickTest: string;
  };
  hero: {
    pill: string;
    pillSub: string;
    title1: string;
    title2: string;
    title3: string;
    desc: string;
    ctaPrimary: string;
    ctaWa: string;
    alumniCount: string;
    ratingText: string;
  };
  programs: {
    sectionTitle: string;
    sectionSubtitle: string;
    learnMore: string;
    enrollNow: string;
    whatYouGet: string;
  };
  dashboard: {
    sidebar: {
      overview: string;
      students: string;
      programs: string;
      mentors: string;
      questions: string;
      scoreSettings: string;
      studentTest: string;
      studentScores: string;
      portalAccess: string;
      administrator: string;
      student: string;
      exitToHome: string;
    };
    header: {
      lightMode: string;
      darkMode: string;
      academicAdmin: string;
      toeflStudent: string;
    };
    testSimulation: {
      availableTests: string;
      all: string;
      startTest: string;
      resume: string;
      inProgress: string;
      notStarted: string;
      completed: string;
    };
  };
}

const translations: Record<Language, Translations> = {
  id: {
    nav: {
      home: 'Home',
      whyUs: 'Kenapa Kami',
      programs: 'Programs',
      learningProcess: 'Cara Belajar',
      testimonials: 'Testimonials',
      login: 'Login',
      register: 'Daftar Sekarang',
      quickTest: 'Tes Level & Rekomendasi'
    },
    hero: {
      pill: 'English Join Indonesia',
      pillSub: 'Kursus Bahasa Inggris Terpercaya',
      title1: 'Masih Bingung',
      title2: 'Cari Tempat Kursus Bahasa Inggris',
      title3: 'Dari Nol ?',
      desc: 'Atau ingin meningkatkan skor TOEFL untuk lanjut studi, CPNS, BUMN, Perusahaan Swasta, dan berbagai kebutuhan karier?',
      ctaPrimary: 'Daftar Sekarang',
      ctaWa: 'Konsultasi WA (Sir Alwi)',
      alumniCount: 'Alumni Terbantu',
      ratingText: 'Rating Kepuasan'
    },
    programs: {
      sectionTitle: 'Pilihan Program Kursus Terbaik',
      sectionSubtitle: 'Dari dasar nol hingga persiapan ujian TOEFL bergaransi, pilih kelas yang paling sesuai dengan kebutuhanmu.',
      learnMore: 'Pelajari Lebih Lanjut',
      enrollNow: 'Daftar Program Ini',
      whatYouGet: 'YANG KAMU DAPATKAN:'
    },
    dashboard: {
      sidebar: {
        overview: 'Ringkasan / Overview',
        students: 'Data Pendaftar Siswa',
        programs: 'Pilihan Program',
        mentors: 'Kelola Mentor & Coach',
        questions: 'Bank Soal Test TOEFL',
        scoreSettings: 'Pengaturan Skor TOEFL',
        studentTest: 'Simulasi Tes TOEFL',
        studentScores: 'Riwayat & Sertifikat',
        portalAccess: 'Akses Portal',
        administrator: 'Administrator',
        student: 'Student / Peserta',
        exitToHome: 'Keluar ke Beranda'
      },
      header: {
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        academicAdmin: 'Admin Akademik',
        toeflStudent: 'Peserta TOEFL'
      },
      testSimulation: {
        availableTests: 'Tes Tersedia',
        all: 'Semua',
        startTest: 'Mulai Tes',
        resume: 'Lanjutkan',
        inProgress: 'Sedang Berjalan',
        notStarted: 'Belum Dimulai',
        completed: 'Selesai'
      }
    }
  },
  en: {
    nav: {
      home: 'Home',
      whyUs: 'Why Us',
      programs: 'Programs',
      learningProcess: 'Learning Method',
      testimonials: 'Testimonials',
      login: 'Login',
      register: 'Enroll Now',
      quickTest: 'Level Test & Recommendation'
    },
    hero: {
      pill: 'English Join Indonesia',
      pillSub: 'Trusted English Learning Academy',
      title1: 'Still Wondering',
      title2: 'Where to Learn English Easily',
      title3: 'From Scratch?',
      desc: 'Or looking to boost your TOEFL score for university admissions, scholarships, civil service (CPNS), state enterprises (BUMN), or career advancement?',
      ctaPrimary: 'Enroll Now',
      ctaWa: 'WhatsApp Consultation',
      alumniCount: 'Alumni Empowered',
      ratingText: 'Satisfaction Rating'
    },
    programs: {
      sectionTitle: 'Featured English Programs',
      sectionSubtitle: 'From beginner foundations to guaranteed TOEFL preparation, choose the best program tailored for your success.',
      learnMore: 'Learn More',
      enrollNow: 'Enroll in Program',
      whatYouGet: 'WHAT YOU GET:'
    },
    dashboard: {
      sidebar: {
        overview: 'Overview & Summary',
        students: 'Student Registrations',
        programs: 'Available Programs',
        mentors: 'Mentors & Coaches',
        questions: 'TOEFL Question Bank',
        scoreSettings: 'TOEFL Score Settings',
        studentTest: 'TOEFL Test Simulation',
        studentScores: 'Scores & Certificates',
        portalAccess: 'Portal Access',
        administrator: 'Administrator',
        student: 'Student / Candidate',
        exitToHome: 'Exit to Home'
      },
      header: {
        lightMode: 'Light Mode',
        darkMode: 'Dark Mode',
        academicAdmin: 'Academic Admin',
        toeflStudent: 'TOEFL Student'
      },
      testSimulation: {
        availableTests: 'Available tests',
        all: 'All',
        startTest: 'Start test',
        resume: 'Resume',
        inProgress: 'In Progress',
        notStarted: 'Not Started',
        completed: 'Completed'
      }
    }
  }
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  t: Translations;
  tr: (idText: string, enText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('english_join_lang');
      if (saved === 'id' || saved === 'en') {
        return saved;
      }
    } catch {
      // ignore
    }
    return 'id';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    try {
      localStorage.setItem('english_join_lang', lang);
    } catch {
      // ignore
    }
  };

  const toggleLanguage = () => {
    setLanguage(language === 'id' ? 'en' : 'id');
  };

  const tr = (idText: string, enText: string): string => {
    return language === 'id' ? idText : enText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        t: translations[language],
        tr
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

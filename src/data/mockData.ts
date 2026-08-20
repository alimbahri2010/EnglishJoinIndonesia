import { Program, Testimonial, FaqItem, WhyFeature, StepProcess, Mentor } from '../types';
import mentorSirAlwiImg from '../assets/images/mentor_sir_alwi_1787219294978.jpg';
import mentorMissNadiaImg from '../assets/images/mentor_miss_nadia_1787219307389.jpg';
import mentorKakFajarImg from '../assets/images/mentor_kak_fajar_1787219321341.jpg';

export const CONTACT_INFO = {
  phone: '0812-4250-7738',
  phoneDisplay: '0812-4250-7738 (Sir Alwi)',
  mentorName: 'Sir Alwi',
  phoneClean: '6281242507738',
  whatsappUrl: 'https://wa.me/6281242507738?text=Halo%20Sir%20Alwi%20%26%20Admin%20English%20Join%20Indonesia%2C%20saya%20tertarik%20untuk%20konsultasi%20dan%20daftar%20kursus%20Bahasa%20Inggris.',
  instagram: '@englishjoin.id',
  instagramUrl: 'https://instagram.com/englishjoin.id',
  email: 'info@englishjoin.id',
  location: 'Indonesia (Online & Interactive Hybrid Classes)',
  hours: 'Senin - Minggu (08:00 - 21:00 WIB)',
};

export const BANNER_PILLARS = [
  {
    title: 'Interactive & Fun Learning',
    subtitle: 'Metode interaktif, seru, dan mudah dipahami',
    iconName: 'TrendingUp',
  },
  {
    title: 'Global Communication',
    subtitle: 'Percaya diri berbicara bahasa Inggris di kancah global',
    iconName: 'MessageCircle',
  },
  {
    title: 'Brighter Future Ahead',
    subtitle: 'Raih peluang karier, beasiswa, dan masa depan gemilang',
    iconName: 'Globe',
  },
];

export const PROGRAMS: Program[] = [
  {
    id: 'prog-beginners',
    title: 'English for Beginners',
    slug: 'english-for-beginners',
    category: 'Fundamental & Grammar',
    badge: 'Belajar dari Nol Besar',
    isFeatured: false,
    shortDesc: 'Untuk kamu yang ingin mulai belajar Bahasa Inggris dari dasar dengan metode santai dan bebas rasa takut salah.',
    fullDesc: 'Program komprehensif yang dirancang khusus bagi pemula yang merasa minder atau belum pernah belajar Bahasa Inggris secara mendalam. Di sini kamu akan dipandu step-by-step dari pengucapan huruf, kosakata harian, hingga struktur kalimat sederhana yang aplikatif.',
    targetAudience: 'Pemula total, mahasiswa baru, & siapa pun yang ingin membangun fondasi bahasa Inggris kokoh.',
    iconName: 'Sparkles',
    level: 'Beginner (A1 - A2)',
    duration: '1 Bulan Intensif',
    sessionCount: '16 Sesi Interaktif + Modul Lengkap',
    priceFormatted: 'Rp 299.000',
    originalPrice: 'Rp 450.000',
    highlights: [
      'Belajar dari Nol (Nol Besar Sangat Welcome)',
      'Basic Daily Vocabulary 500+ Kata Penting',
      'Simple Grammar tanpa rumus membingungkan',
      'Praktik pelafalan (Pronunciation) yang benar',
      'Grup diskusi santai & ramah pemula',
      'Modul digital & rekaman kelas seumur hidup'
    ]
  },
  {
    id: 'prog-conversation',
    title: 'English Conversation',
    slug: 'english-conversation',
    category: 'Speaking & Confidence',
    badge: 'Popular Speaking Class',
    isFeatured: false,
    shortDesc: 'Tingkatkan kemampuan speaking dan percaya dirimu dalam berkomunikasi di kehidupan sehari-hari maupun dunia kerja.',
    fullDesc: 'Fokus 80% pada praktik berbicara langsung. Hilangkan kebiasaan translating di kepala dan mulailah berbicara secara spontan dengan intonasi yang natural. Dilengkapi topik-topik aktual, simulasi presentasi, dan diskusi interaktif.',
    targetAudience: 'Mahasiswa, jobseeker, & profesional yang ingin lancar ngomong Inggris tanpa gugup.',
    iconName: 'MessageSquareText',
    level: 'Intermediate (B1 - B2)',
    duration: '1 - 2 Bulan Fleksibel',
    sessionCount: '20 Sesi Praktik Speaking + Feedback',
    priceFormatted: 'Rp 349.000',
    originalPrice: 'Rp 500.000',
    highlights: [
      '80% Praktik Speaking di setiap pertemuan',
      'Small Group (4-6 orang) agar semua dapat giliran',
      'Topik diskusi kasual, bisnis, & presentasi',
      'Koreksi pronunciation & natural expression',
      'Live Feedback langsung dari tutor berpengalaman',
      'Sertifikat Resmi & Komunitas Speaking Club'
    ]
  },
  {
    id: 'prog-toefl',
    title: 'TOEFL Preparation',
    slug: 'toefl-preparation',
    category: 'Test & Career Booster',
    badge: '⭐ Target Skor TOEFL 500+ • Lolos Seleksi',
    isFeatured: true,
    shortDesc: 'Tingkatkan skor TOEFL untuk lanjut studi, beasiswa, CPNS, BUMN, Perusahaan Swasta, dan berbagai kebutuhan karier.',
    fullDesc: 'Bedah tuntas strategi dan trik menjawab soal TOEFL ITP & Prediction dengan cepat dan akurat. Dilengkapi teknik memecah soal Listening Comprehension, Structure & Written Expression, serta Reading tanpa perlu membaca seluruh teks berulang-ulang.',
    targetAudience: 'Pejuang Beasiswa LPDP, Pelamar Kerja BUMN/CPNS, Mahasiswa Skripsi/Wisuda.',
    iconName: 'Award',
    level: 'All Levels to Advanced',
    duration: '1 Bulan Intensif / Fast Track',
    sessionCount: '24 Sesi + 3x Real TOEFL Simulation',
    priceFormatted: 'Rp 399.000',
    originalPrice: 'Rp 650.000',
    highlights: [
      'Tips & Trik Cepat Jawab Soal TOEFL (Listening, Structure, Reading)',
      '3x Simulasi Ujian TOEFL Prediction berstandar ETS',
      'Pembahasan mendalam 1000+ bank soal terbaru',
      'Prediksi Skor & Analisis Kelemahan Personal',
      'Sertifikat TOEFL Prediction Resmi untuk CPNS & BUMN',
      'Garansi konsultasi hingga tembus target skor'
    ]
  }
];

export const WHY_FEATURES: WhyFeature[] = [
  {
    number: '01',
    title: 'FLEXIBLE SCHEDULE',
    subtitle: 'Jadwal Fleksibel',
    description: 'Pilihan jadwal kelas yang dapat disesuaikan dengan aktivitas kuliah, pekerjaan kantor, maupun kesibukan harianmu.',
    iconName: 'Clock',
    keyBenefits: [
      'Pilihan kelas pagi, sore, dan malam',
      'Tersedia rekaman kelas seumur hidup',
      'Bebas atur waktu tanpa mengorbankan rutinitas'
    ]
  },
  {
    number: '02',
    title: 'PRACTICAL & EFFECTIVE METHOD',
    subtitle: 'Metode Praktis & Efektif',
    description: 'Fokus pada pola pemahaman cepat dan praktik aktif tanpa hafalan rumus yang membingungkan. Langsung bisa dipraktikkan.',
    iconName: 'BookOpen',
    keyBenefits: [
      '80% praktik berbicara dan simulasi soal',
      'Trik cepat eliminasi jawaban TOEFL',
      'Penjelasan step-by-step dari dasar'
    ]
  },
  {
    number: '03',
    title: 'SUPPORTIVE COMMUNITY',
    subtitle: 'Komunitas Suportif',
    description: 'Belajar di lingkungan yang positif, ramah pemula, bebas rasa takut salah atau dihakimi, dipandu oleh Sir Alwi & tim mentor berpengalaman.',
    iconName: 'Users',
    keyBenefits: [
      'Bimbingan ramah dan bebas rasa minder',
      'Grup diskusi interaktif sesama pembelajar',
      'Networking luas dari berbagai kota di Indonesia'
    ]
  },
  {
    number: '04',
    title: 'CERTIFICATE OF ACHIEVEMENT',
    subtitle: 'Sertifikat Pencapaian Resmi',
    description: 'Dapatkan sertifikat resmi ber-nomor verifikasi yang dapat dilampirkan untuk administrasi CPNS, BUMN, beasiswa, dan syarat kelulusan.',
    iconName: 'Award',
    keyBenefits: [
      'Sertifikat TOEFL Prediction berstandar',
      'Diakui untuk persyaratan administrasi kerja',
      'Meningkatkan nilai portofolio CV & LinkedIn'
    ]
  }
];

export const LEARNING_STEPS: StepProcess[] = [
  {
    step: '01',
    title: 'Pilih Program',
    tagline: 'Temukan yang Paling Pas',
    description: 'Temukan program yang sesuai dengan kebutuhan, level awal, dan target masa depanmu.',
    details: [
      'Konsultasi gratis via WhatsApp dengan Sir Alwi & tim',
      'Cek level kemampuan awal secara singkat',
      'Pilih jadwal kelas (Pagi, Sore, atau Malam)'
    ],
    iconName: 'SearchCheck'
  },
  {
    step: '02',
    title: 'Mulai Belajar',
    tagline: 'Praktik Interaktif & Menyenangkan',
    description: 'Ikuti pembelajaran dengan materi yang mudah dipahami, tutor interaktif, dan latihan speaking langsung.',
    details: [
      'Akses ke kelas live interaktif dan modul lengkap',
      'Praktik aktif bersama mentor & teman sekelas',
      'Tanya jawab langsung tanpa rasa sungkan'
    ],
    iconName: 'BookOpenCheck'
  },
  {
    step: '03',
    title: 'Grow & Achieve',
    tagline: 'Raih Target & Peluang Baru',
    description: 'Tingkatkan kemampuanmu, dapatkan sertifikat resmi, dan raih peluang pendidikan serta karier yang lebih besar.',
    details: [
      'Skor TOEFL meningkat & kemampuan speaking terasah',
      'Dapatkan sertifikat resmi kelulusan program',
      'Buka pintu karier BUMN, CPNS, beasiswa, & global'
    ],
    iconName: 'Trophy'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'testi-1',
    name: 'Anisa Rahmawati',
    role: 'Mahasiswi Universitas Indonesia',
    category: 'TOEFL',
    scoreBadge: 'TOEFL Score: 567 (Naik 110 Poin)',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Belajarnya seru banget dan trik structure TOEFL dari Sir Alwi beneran manjur! Dulu mentok di 450, setelah 1 bulan di English Join Indonesia langsung tembus 567 dan lolos berkas beasiswa.',
    universityOrCompany: 'Awardee Beasiswa Unggulan'
  },
  {
    id: 'testi-2',
    name: 'Rian Pratama',
    role: 'Staff Operasional PT Pertamina (Persero)',
    category: 'Conversation',
    scoreBadge: 'Lolos Interview BUMN',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Dulu saya paling takut kalau diminta perkenalan diri bahasa Inggris saat interview kerja. Di kelas Conversation diajarin cara bicara natural dan percaya diri. Hasilnya langsung tembus BUMN!',
    universityOrCompany: 'BUMN Achiever'
  },
  {
    id: 'testi-3',
    name: 'Dinda Ayu Lestari',
    role: 'Fresh Graduate',
    category: 'Beginner',
    scoreBadge: 'Mulai dari Nol ke Lancar',
    avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Belajar dari nol sama sekali gak dijudge. Penjelasan materinya santai dan gampang dipahami. Sekarang saya jauh lebih percaya diri berbicara Bahasa Inggris sehari-hari.',
    universityOrCompany: 'Alumni Batch 18'
  },
  {
    id: 'testi-4',
    name: 'Fauzan Fadilah',
    role: 'PNS Kementerian Keuangan',
    category: 'TOEFL',
    scoreBadge: 'TOEFL 580 - Lolos CPNS',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Tips listening & reading di English Join Indonesia sangat to the point. Tidak buang-buang waktu baca panjang, teknik eliminasi jawabannya luar biasa akurat. Sangat recommended!',
    universityOrCompany: 'Kemenkeu RI'
  },
  {
    id: 'testi-5',
    name: 'Siti Nurhaliza',
    role: 'Content Creator & Freelancer',
    category: 'Conversation',
    scoreBadge: 'Speaking Aktif dengan Klien Luar',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=200&auto=format&fit=crop&q=80',
    rating: 5,
    text: 'Komunitas belajarnya super positif! Tidak ada yang saling menjudge kalau ada grammar yang salah, tutornya selalu memberi motivasi. Sekarang saya berani handle klien internasional.',
    universityOrCompany: 'Freelance Designer'
  }
];

export const FAQS: FaqItem[] = [
  {
    id: 'faq-1',
    category: 'Umum',
    question: 'Apakah benar bisa ikut meski saya belum bisa Bahasa Inggris sama sekali (dari nol)?',
    answer: 'Tentu saja! Program "English for Beginners" memang dirancang khusus untuk peserta yang ingin belajar dari nol tanpa tekanan. Tutor akan membimbing dengan bahasa yang ramah dan pendekatan bertahap sehingga kamu tidak akan merasa tertinggal.'
  },
  {
    id: 'faq-2',
    category: 'Metode',
    question: 'Bagaimana metode dan sistem pembelajarannya?',
    answer: 'Pembelajaran diadakan secara online interaktif (Live Class via Zoom/GMeet), di mana setiap peserta aktif berpartisipasi dan berbicara langsung. Kamu juga mendapatkan akses ke modul digital eksklusif, grup diskusi Telegram/WhatsApp, dan rekaman kelas bila berhalangan hadir.'
  },
  {
    id: 'faq-3',
    category: 'Jadwal & Biaya',
    question: 'Apakah jadwal kelas fleksibel untuk pekerja atau mahasiswa?',
    answer: 'Ya, sesuai dengan pilar "Flexible Schedule", kami menyediakan pilihan jadwal Pagi, Sore, dan Kelas Malam yang ramah bagi mahasiswa maupun karyawan. Jika suatu hari kamu ada halangan, kamu tetap bisa menyimak rekaman kelas dan bertanya langsung ke mentor.'
  },
  {
    id: 'faq-4',
    category: 'Metode',
    question: 'Apakah sertifikat TOEFL dari English Join Indonesia berlaku untuk syarat CPNS & BUMN?',
    answer: 'Ya! Untuk program TOEFL Preparation, kamu akan mendapatkan Sertifikat TOEFL Prediction resmi dari English Join Indonesia yang dilengkapi nomor verifikasi, tanggal uji, dan rincian skor Section 1, 2, dan 3 yang dapat digunakan untuk lampiran administrasi seleksi kerja, CPNS, BUMN, maupun persyaratan sidang skripsi di berbagai kampus.'
  },
  {
    id: 'faq-5',
    category: 'Umum',
    question: 'Bagaimana cara mendaftar dan menghubungi admin?',
    answer: 'Kamu bisa langsung klik tombol "Daftar Sekarang" atau hubungi WhatsApp resmi di 0812-4250-7738 (Sir Alwi) dan Instagram @englishjoin.id. Tim kami akan memandu proses pendaftaran dengan cepat dan ramah.'
  }
];

export const STATS = [
  { value: '1,500+', label: 'Alumni & Siswa Aktif' },
  { value: '98.4%', label: 'Tingkat Kepuasan Belajar' },
  { value: '550+', label: 'Rata-rata Skor TOEFL Alumni' },
  { value: '4.9 / 5.0', label: 'Rating Ulasan Siswa' },
];

export const VOCABULARY_WORDS = [
  { en: 'Opportunity', id: 'Peluang' },
  { en: 'Confidence', id: 'Percaya Diri' },
  { en: 'Fluency', id: 'Kelancaran' },
  { en: 'Achievement', id: 'Pencapaian' },
  { en: 'Career Growth', id: 'Kemajuan Karier' },
  { en: 'Mastery', id: 'Penguasaan' },
];

export const MENTORS: Mentor[] = [
  {
    id: 'mentor-alwi',
    name: 'Sir Alwi',
    title: 'Founder & Lead Academic Mentor',
    role: 'TOEFL & Academic Specialist',
    badge: '⭐ Lead Mentor & Founder',
    bio: 'Pakar strategi TOEFL & kurikulum bahasa Inggris terapan. Berpengalaman mendampingi ribuan siswa lolos seleksi beasiswa luar negeri, CPNS, BUMN, dan ujian kelulusan universitas dengan metode cepat dan akurat.',
    avatarUrl: mentorSirAlwiImg,
    experience: '7+ Tahun Pengalaman',
    specialties: [
      'TOEFL ITP & Prediction Mastery',
      'Fast Structure Elimination Tactic',
      'Academic Grammar & Reading Strategy'
    ],
    educationOrCert: 'Certified TOEFL & TESOL Trainer'
  },
  {
    id: 'mentor-nadia',
    name: 'Miss Nadia',
    title: 'Senior Conversation Coach',
    role: 'Speaking & Fluency Specialist',
    badge: 'Active Speaking Coach',
    bio: 'Spesialis melatih rasa percaya diri berbicara bahasa Inggris tanpa rasa takut salah. Membimbing peserta aktif berdialog, memperbaiki pelafalan (pronunciation), dan melatih public speaking dengan suasana kelas yang seru.',
    avatarUrl: mentorMissNadiaImg,
    experience: '5+ Tahun Pengalaman',
    specialties: [
      'Everyday English Conversation',
      'Pronunciation & Natural Accent',
      'Confidence Building & Public Speaking'
    ],
    educationOrCert: 'English Education Graduate • Certified Speaking Coach'
  },
  {
    id: 'mentor-fajar',
    name: 'Kak Fajar',
    title: 'Beginner Program Specialist',
    role: 'Fundamental & Grammar Coach',
    badge: 'Spesialis Belajar dari Nol',
    bio: 'Dikenal dengan gaya mengajarnya yang sangat ramah, sabar, dan komunikatif. Ahli menyederhanakan materi dasar bahasa Inggris sehingga mudah dipahami bahkan oleh mereka yang belum pernah belajar sebelumnya.',
    avatarUrl: mentorKakFajarImg,
    experience: '4+ Tahun Pengalaman',
    specialties: [
      'Zero-to-Hero English Fundamentals',
      'Practical Grammar without Rumus Ribet',
      'Daily Vocabulary & Sentence Patterns'
    ],
    educationOrCert: 'Certified English Tutor • Interactive Learning Specialist'
  }
];



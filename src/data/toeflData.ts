import { ToeflTestProgram, ToeflQuestion } from '../types';

export const TOEFL_PROGRAMS: ToeflTestProgram[] = [
  {
    id: 'toefl-pred-1',
    title: 'TOEFL ITP Prediction Test (Online)',
    tag: 'Paling Populer',
    category: 'Simulasi Tes Resmi',
    duration: '115 Menit',
    questionCount: '140 Soal (L, S, R)',
    scoreTarget: 'Skala 310 - 677',
    benefits: ['Listening, Structure, Reading', 'Hasil Keluar Instan 24 Jam', 'Barcode Verifikasi Online']
  },
  {
    id: 'toefl-guarantee',
    title: 'TOEFL Preparation & Test (Garansi 500+)',
    tag: 'Garansi Lolos',
    category: 'Program Intensif',
    duration: '4 Minggu (24 Sesi)',
    questionCount: '10x Simulasi Lengkap',
    scoreTarget: 'Target Skor 500 - 550+',
    certificate: 'Sertifikat Resmi Syarat CPNS & LPDP',
    benefits: ['Bedah Trik Soal Sulit Inversion & Subjunctive', 'Mentor Alumni Kampung Inggris', 'Free Retake Tes 2x']
  },
  {
    id: 'toefl-fasttrack',
    title: 'TOEFL Fast-Track Weekend Bootcamp',
    tag: 'Weekend Class',
    category: 'Short Course',
    duration: '2 Minggu (8 Sesi)',
    questionCount: '5x Mini Tests',
    scoreTarget: 'Target Skor 480+',
    certificate: 'Sertifikat Kelulusan Resmi',
    benefits: ['Khusus Karyawan & Mahasiswa Akhir', 'Live Interactive via Zoom', 'Modul PDF & Rekaman Kelas']
  }
];

export const SAMPLE_TOEFL_QUESTIONS: ToeflQuestion[] = [
  {
    id: 'q1',
    section: 'Structure',
    part: 'Part A',
    questionText: 'The North Platte River ______ from Wyoming into Nebraska.',
    options: {
      A: 'it flowed',
      B: 'flows',
      C: 'flowing',
      D: 'with flowing water'
    },
    correctAnswer: 'B',
    explanation: 'Kalimat membutuhkan kata kerja utama (main verb) dalam bentuk simple present untuk melengkapi subjek "The North Platte River".'
  },
  {
    id: 'q2',
    section: 'Structure',
    part: 'Part A',
    questionText: '______ Biloxi received its name from a Sioux word meaning "first people".',
    options: {
      A: 'The city of',
      B: 'Located in',
      C: 'It is in',
      D: 'The tour of'
    },
    correctAnswer: 'A',
    explanation: 'Kalimat membutuhkan subjek (noun phrase). "The city of Biloxi" bertindak sebagai subjek lengkap sebelum verb "received".'
  }
];

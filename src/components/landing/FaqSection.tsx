import React, { useState } from 'react';
import { ChevronDown, MessageSquare } from 'lucide-react';
import { CONTACT_INFO } from '../../data/mockData';
import { useLanguage } from '../../context/LanguageContext';

export const FaqSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>('faq-1');
  const { tr } = useLanguage();

  const faqs = [
    {
      id: 'faq-1',
      question: tr(
        'Apakah benar bisa ikut meski saya belum bisa Bahasa Inggris sama sekali (dari nol)?',
        'Can I join even if I have zero English background (starting from scratch)?'
      ),
      answer: tr(
        'Tentu saja! Program "English for Beginners" memang dirancang khusus untuk peserta yang ingin belajar dari nol tanpa tekanan. Tutor akan membimbing dengan bahasa yang ramah dan pendekatan bertahap sehingga kamu tidak akan merasa tertinggal.',
        'Absolutely! The "English for Beginners" program is specially designed for learners starting completely from zero without pressure. Tutors guide you patiently so you will never feel left behind.'
      )
    },
    {
      id: 'faq-2',
      question: tr(
        'Bagaimana metode dan sistem pembelajarannya?',
        'What is the learning method and class format?'
      ),
      answer: tr(
        'Pembelajaran diadakan secara online interaktif (Live Class via Zoom/GMeet), di mana setiap peserta aktif berpartisipasi dan berbicara langsung. Kamu juga mendapatkan akses ke modul digital eksklusif, grup diskusi Telegram/WhatsApp, dan rekaman kelas bila berhalangan hadir.',
        'Classes are conducted interactively online (Live Class via Zoom/GMeet), where every student actively speaks. You also receive exclusive digital modules, discussion groups on WhatsApp/Telegram, and lifetime class recordings if you ever miss a session.'
      )
    },
    {
      id: 'faq-3',
      question: tr(
        'Apakah jadwal kelas fleksibel untuk pekerja atau mahasiswa?',
        'Are class schedules flexible for workers and college students?'
      ),
      answer: tr(
        'Ya, sesuai dengan pilar "Flexible Schedule", kami menyediakan pilihan jadwal Pagi, Sore, dan Kelas Malam yang ramah bagi mahasiswa maupun karyawan. Jika suatu hari kamu ada halangan, kamu tetap bisa menyimak rekaman kelas dan bertanya langsung ke mentor.',
        'Yes! True to our "Flexible Schedule" pillar, we offer Morning, Afternoon, and Evening batches suitable for workers and students alike. If you miss a class, you can always watch the recording and ask mentors directly.'
      )
    },
    {
      id: 'faq-4',
      question: tr(
        'Apakah sertifikat TOEFL dari English Join Indonesia berlaku untuk syarat CPNS & BUMN?',
        'Is the English Join Indonesia TOEFL certificate valid for CPNS and BUMN requirements?'
      ),
      answer: tr(
        'Ya! Untuk program TOEFL Preparation, kamu akan mendapatkan Sertifikat TOEFL Prediction resmi dari English Join Indonesia yang dilengkapi nomor verifikasi, tanggal uji, dan rincian skor Section 1, 2, dan 3 yang dapat digunakan untuk lampiran administrasi seleksi kerja, CPNS, BUMN, maupun persyaratan sidang skripsi di berbagai kampus.',
        'Yes! For TOEFL Preparation, you receive an official TOEFL Prediction Certificate from English Join Indonesia with a verification number, test date, and detailed breakdown of Sections 1, 2, and 3, accepted for job applications, CPNS, BUMN, and university graduation requirements.'
      )
    },
    {
      id: 'faq-5',
      question: tr(
        'Bagaimana cara mendaftar dan menghubungi admin?',
        'How do I enroll and contact the academic admin?'
      ),
      answer: tr(
        'Kamu bisa langsung klik tombol "Daftar Sekarang" atau hubungi WhatsApp resmi di 0812-4250-7738 (Sir Alwi) dan Instagram @englishjoin.id. Tim kami akan memandu proses pendaftaran dengan cepat dan ramah.',
        'Simply click "Enroll Now" or contact our official WhatsApp at 0812-4250-7738 (Sir Alwi) and Instagram @englishjoin.id. Our team will guide you through the enrollment smoothly and quickly.'
      )
    }
  ];

  const toggleFaq = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0F0F0F] relative overflow-hidden border-t border-white/5">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-black font-heading text-white tracking-tight leading-tight mb-4">
            {tr('Pertanyaan yang Sering', 'Frequently Asked')}{' '}
            <span className="text-[#F7B425]">{tr('Diajukan', 'Questions')}</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-400">
            {tr(
              'Temukan jawaban cepat untuk pertanyaan umum seputar program, metode belajar, dan sertifikat di English Join Indonesia.',
              'Find quick answers to common questions about programs, learning methods, and certificates at English Join Indonesia.'
            )}
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div
                key={faq.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-[#181818] border-[#F7B425]/40 shadow-lg shadow-black/40'
                    : 'bg-[#141414] border-white/10 hover:border-white/20'
                }`}
              >
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-sm sm:text-base text-white">
                    {faq.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
                      isOpen ? 'bg-[#F7B425] text-black rotate-180' : 'bg-white/5 text-slate-400'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-white/5 animate-in fade-in-50 duration-200">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Help Banner */}
        <div className="mt-12 text-center p-6 rounded-2xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-white">
              {tr('Punya pertanyaan lain yang belum terjawab?', 'Have other questions that are not answered here?')}
            </h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {tr('Admin kami siap membantu dan berkonsultasi via WhatsApp.', 'Our team is ready to consult and answer your questions via WhatsApp.')}
            </p>
          </div>
          <a
            href={CONTACT_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-full text-xs font-bold text-black bg-[#F7B425] hover:bg-[#ffbe33] flex items-center gap-1.5 whitespace-nowrap transition-colors cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{tr('Tanya Admin Sekarang', 'Ask Admin on WhatsApp')}</span>
          </a>
        </div>

      </div>
    </section>
  );
};

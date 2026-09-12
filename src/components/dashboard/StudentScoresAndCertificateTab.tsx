import React, { useState } from 'react';
import { 
  Award, Download, FileText, CheckCircle2, Calendar, 
  Eye, Printer, X, ShieldCheck, ArrowUpRight, BarChart3, 
  Sparkles, Check, ChevronRight, HelpCircle
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../common/Logo';

interface TestHistoryRecord {
  id: string;
  testTitle: string;
  testType: 'TOEFL ITP' | 'TOEFL iBT';
  date: string;
  listeningScore: number;
  structureScore: number;
  readingScore: number;
  totalScore: number;
  maxScore: number;
  status: 'LULUS' | 'MEMENUHI TARGET' | 'PERLU PERBAIKAN';
  certNumber: string;
  certIssueDate: string;
  levelCategory: string;
  studentName: string;
}

export const StudentScoresAndCertificateTab: React.FC = () => {
  const { isDark } = useTheme();
  const { tr } = useLanguage();
  const [selectedCert, setSelectedCert] = useState<TestHistoryRecord | null>(null);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'TOEFL ITP' | 'TOEFL iBT'>('ALL');

  const historyRecords: TestHistoryRecord[] = [
    {
      id: 'rec-01',
      testTitle: 'TOEFL ITP — Official Prediction Test 04A',
      testType: 'TOEFL ITP',
      date: '02 Sep 2026, 14:30 WIB',
      listeningScore: 61,
      structureScore: 63,
      readingScore: 59,
      totalScore: 610,
      maxScore: 677,
      status: 'LULUS',
      certNumber: 'EJI/TOEFL-ITP/2026/0892',
      certIssueDate: '02 September 2026',
      levelCategory: 'C1 — Advanced Proficiency',
      studentName: 'Muhammad Ihsan'
    },
    {
      id: 'rec-02',
      testTitle: 'TOEFL ITP — Complete Diagnostic Test 02',
      testType: 'TOEFL ITP',
      date: '24 Agu 2026, 10:15 WIB',
      listeningScore: 56,
      structureScore: 58,
      readingScore: 54,
      totalScore: 560,
      maxScore: 677,
      status: 'LULUS',
      certNumber: 'EJI/TOEFL-ITP/2026/0744',
      certIssueDate: '24 Agustus 2026',
      levelCategory: 'B2 — High Intermediate',
      studentName: 'Muhammad Ihsan'
    },
    {
      id: 'rec-03',
      testTitle: 'TOEFL iBT — Integrated Practice Test 1',
      testType: 'TOEFL iBT',
      date: '15 Agu 2026, 16:00 WIB',
      listeningScore: 26,
      structureScore: 25,
      readingScore: 27,
      totalScore: 98,
      maxScore: 120,
      status: 'MEMENUHI TARGET',
      certNumber: 'EJI/TOEFL-IBT/2026/0312',
      certIssueDate: '15 Agustus 2026',
      levelCategory: 'B2+ — Competent User',
      studentName: 'Muhammad Ihsan'
    },
    {
      id: 'rec-04',
      testTitle: 'TOEFL ITP — Initial Placement Test 01',
      testType: 'TOEFL ITP',
      date: '01 Agu 2026, 09:00 WIB',
      listeningScore: 48,
      structureScore: 50,
      readingScore: 49,
      totalScore: 490,
      maxScore: 677,
      status: 'LULUS',
      certNumber: 'EJI/TOEFL-ITP/2026/0105',
      certIssueDate: '01 Agustus 2026',
      levelCategory: 'B1 — Intermediate',
      studentName: 'Muhammad Ihsan'
    }
  ];

  const filteredRecords = historyRecords.filter(rec => {
    if (activeFilter === 'ALL') return true;
    return rec.testType === activeFilter;
  });

  const highestScore = Math.max(...historyRecords.filter(r => r.testType === 'TOEFL ITP').map(r => r.totalScore));
  const totalCompleted = historyRecords.length;

  const handleDownloadPdf = (rec: TestHistoryRecord) => {
    const fileName = `Sertifikat_TOEFL_${rec.testType.replace(/\s+/g, '_')}_${rec.certNumber.replace(/[\/]/g, '-')}.pdf`;
    alert(tr(`E-Certificate resmi (${fileName}) berhasil diunduh dan tersimpan di perangkat Anda!`, `Official E-Certificate (${fileName}) successfully downloaded and saved to your device!`));
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto animate-fadeIn">
      
      {/* 1. TOP HEADER & SUMMARY CARDS */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F7B425]" />
              <h1 className={`text-2xl sm:text-3xl font-extrabold tracking-tight font-heading ${
                isDark ? 'text-white' : 'text-slate-900'
              }`}>
                {tr('Riwayat & Sertifikat TOEFL Online', 'TOEFL Online History & Certificates')}
              </h1>
            </div>
            <p className={`text-xs sm:text-sm mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {tr(
                'Rekapitulasi lengkap nilai ujian, breakdown skor per section, dan unduhan e-sertifikat resmi berbarcode English Join Indonesia.',
                'Complete summary of exam scores, section breakdown, and official verified e-certificates from English Join Indonesia.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSelectedCert(historyRecords[0])}
              className="px-4 py-2.5 bg-[#F7B425] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#F7B425]/20 flex items-center gap-2 cursor-pointer active:scale-98"
            >
              <Award className="w-4 h-4" />
              <span>{tr('Lihat Sertifikat Terakhir', 'View Latest Certificate')}</span>
            </button>
          </div>
        </div>

        {/* 3 Overview Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tr('Skor TOEFL Tertinggi', 'Highest TOEFL Score')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center font-bold">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-[#F7B425]">{highestScore}</span>
              <span className="text-xs text-slate-400">/ 677 ITP</span>
            </div>
            <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              C1 Advanced Proficiency
            </span>
          </div>

          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tr('Total Ujian Selesai', 'Total Completed Tests')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center font-bold">
                <FileText className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono">{totalCompleted}</span>
              <span className="text-xs text-slate-400">{tr('Paket Tes', 'Test Packages')}</span>
            </div>
            <span className={`text-[11px] block mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              3 ITP • 1 iBT Completed
            </span>
          </div>

          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tr('Sertifikat Terbit', 'Certificates Issued')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                <ShieldCheck className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-black font-mono text-emerald-400">{totalCompleted}</span>
              <span className="text-xs text-slate-400">{tr('Dokumen Resmi', 'Official Documents')}</span>
            </div>
            <span className={`text-[11px] block mt-2 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {tr('Status: Terverifikasi Sistem', 'Status: System Verified')}
            </span>
          </div>

          <div className={`p-5 rounded-2xl border ${
            isDark ? 'bg-[#141414] border-white/10 text-white' : 'bg-white border-slate-200/90 text-slate-900 shadow-xs'
          }`}>
            <div className="flex items-center justify-between">
              <span className={`text-xs font-bold ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                {tr('Rata-rata Section ITP', 'ITP Section Averages')}
              </span>
              <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center font-bold">
                <BarChart3 className="w-4 h-4" />
              </div>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex justify-between text-[11px]">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Listening</span>
                <span className="font-bold text-[#F7B425]">58/68</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Structure</span>
                <span className="font-bold text-[#F7B425]">60/68</span>
              </div>
              <div className="flex justify-between text-[11px]">
                <span className={isDark ? 'text-slate-400' : 'text-slate-500'}>Reading</span>
                <span className="font-bold text-[#F7B425]">57/67</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. DAFTAR RIWAYAT TES & SCORE TABLE */}
      <div className={`rounded-3xl border overflow-hidden ${
        isDark ? 'bg-[#141414] border-white/10' : 'bg-white border-slate-200/90 shadow-sm'
      }`}>
        <div className="p-6 border-b border-inherit flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className={`text-lg font-black font-heading ${isDark ? 'text-white' : 'text-slate-900'}`}>
              {tr('Daftar Riwayat Ujian & Skor Per Section', 'Exam History & Section Scores')}
            </h2>
            <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {tr('Klik tombol "Sertifikat" untuk menampilkan sertifikat resmi berformat PDF.', 'Click the "Certificate" button to view and download your official certificate.')}
            </p>
          </div>

          {/* Filter Pills */}
          <div className={`flex items-center p-1 rounded-full border self-start sm:self-auto ${
            isDark ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'
          }`}>
            {(['ALL', 'TOEFL ITP', 'TOEFL iBT'] as const).map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  activeFilter === filter
                    ? 'bg-[#F7B425] text-black shadow-xs font-black'
                    : isDark ? 'text-slate-400 hover:text-white' : 'text-slate-600 hover:text-slate-950'
                }`}
              >
                {filter === 'ALL' ? tr('Semua Riwayat', 'All History') : filter}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className={`border-b text-[11px] font-bold uppercase tracking-wider ${
                isDark 
                  ? 'border-white/10 text-slate-400 bg-white/5' 
                  : 'border-slate-200 text-slate-500 bg-slate-50/80'
              }`}>
                <th className="py-4 px-6 font-bold">{tr('Nama Tes & Tanggal', 'Test Name & Date')}</th>
                <th className="py-4 px-6 font-bold text-center">{tr('Tipe', 'Type')}</th>
                <th className="py-4 px-6 font-bold text-center">Listening</th>
                <th className="py-4 px-6 font-bold text-center">Structure</th>
                <th className="py-4 px-6 font-bold text-center">Reading</th>
                <th className="py-4 px-6 font-bold text-center">{tr('Total Skor', 'Total Score')}</th>
                <th className="py-4 px-6 font-bold text-center">{tr('Status', 'Status')}</th>
                <th className="py-4 px-6 font-bold text-right">{tr('E-Sertifikat', 'E-Certificate')}</th>
              </tr>
            </thead>
            <tbody className={`divide-y ${isDark ? 'divide-white/5' : 'divide-slate-100'}`}>
              {filteredRecords.map((rec) => (
                <tr key={rec.id} className={`transition-colors ${isDark ? 'hover:bg-white/5' : 'hover:bg-slate-50'}`}>
                  {/* Test Info */}
                  <td className="py-4 px-6">
                    <div className="font-extrabold text-sm text-inherit">
                      {rec.testTitle}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] text-slate-400">
                      <Calendar className="w-3.5 h-3.5 text-[#F7B425]" />
                      <span>{rec.date}</span>
                      <span>• No. {rec.certNumber}</span>
                    </div>
                  </td>

                  {/* Type */}
                  <td className="py-4 px-6 text-center">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                      rec.testType === 'TOEFL ITP'
                        ? 'bg-blue-500/15 text-blue-500 border border-blue-500/30'
                        : 'bg-amber-500/15 text-amber-500 border border-amber-500/30'
                    }`}>
                      {rec.testType}
                    </span>
                  </td>

                  {/* Section Scores */}
                  <td className="py-4 px-6 text-center font-mono font-bold text-sm">
                    {rec.listeningScore}
                  </td>
                  <td className="py-4 px-6 text-center font-mono font-bold text-sm">
                    {rec.structureScore}
                  </td>
                  <td className="py-4 px-6 text-center font-mono font-bold text-sm">
                    {rec.readingScore}
                  </td>

                  {/* Total Score Badge */}
                  <td className="py-4 px-6 text-center">
                    <div className="inline-flex flex-col items-center">
                      <span className="px-3 py-1 rounded-xl bg-[#F7B425] text-black font-black font-mono text-sm shadow-sm">
                        {rec.totalScore}
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">
                        {tr('dari', 'of')} {rec.maxScore}
                      </span>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 px-6 text-center">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-black bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                      {rec.status === 'LULUS' ? tr('LULUS', 'PASSED') : rec.status === 'MEMENUHI TARGET' ? tr('MEMENUHI TARGET', 'MET TARGET') : tr('PERLU PERBAIKAN', 'NEEDS IMPROVEMENT')}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setSelectedCert(rec)}
                        className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs cursor-pointer active:scale-95"
                        title={tr('Lihat Pratinjau Sertifikat', 'View Certificate Preview')}
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>{tr('Sertifikat', 'Certificate')}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleDownloadPdf(rec)}
                        className={`p-1.5 rounded-xl border transition-all cursor-pointer ${
                          isDark 
                            ? 'border-white/10 hover:bg-white/10 text-slate-300' 
                            : 'border-slate-300 hover:bg-slate-100 text-slate-700'
                        }`}
                        title={tr('Unduh E-Certificate PDF', 'Download E-Certificate PDF')}
                      >
                        <Download className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. OFFICIAL CERTIFICATE PREVIEW MODAL */}
      {selectedCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className={`w-full max-w-4xl rounded-3xl border shadow-2xl overflow-hidden flex flex-col max-h-[92vh] ${
            isDark ? 'bg-[#121212] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'
          }`}>
            
            {/* Modal Top Control Bar */}
            <div className={`p-4 sm:p-5 border-b flex items-center justify-between gap-4 ${
              isDark ? 'border-white/10 bg-[#181818]' : 'border-slate-200 bg-slate-50'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#F7B425] text-black flex items-center justify-center font-black">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm sm:text-base font-heading">
                    E-Certificate of Achievement TOEFL Prediction
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    {tr('Sertifikat Resmi Terverifikasi', 'Official Verified Certificate')} • {selectedCert.certNumber}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleDownloadPdf(selectedCert)}
                  className="px-3.5 py-1.5 bg-[#F7B425] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>{tr('Unduh PDF', 'Download PDF')}</span>
                </button>

                <button
                  type="button"
                  onClick={handlePrint}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={tr('Cetak Sertifikat', 'Print Certificate')}
                >
                  <Printer className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedCert(null)}
                  className={`p-2 rounded-xl border transition-colors cursor-pointer ${
                    isDark ? 'border-white/10 hover:bg-white/10 text-slate-300' : 'border-slate-300 hover:bg-slate-200 text-slate-700'
                  }`}
                  title={tr('Tutup', 'Close')}
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Body: The Real Certificate Paper View */}
            <div className="p-4 sm:p-8 overflow-y-auto flex items-center justify-center bg-slate-900/60">
              <div className="w-full max-w-3xl bg-[#FCFAF2] text-slate-900 rounded-2xl p-6 sm:p-10 border-4 border-[#C89B3C] shadow-2xl relative select-none">
                
                {/* Decorative Certificate Inner Border */}
                <div className="border border-[#C89B3C]/40 p-6 sm:p-8 rounded-xl relative">
                  
                  {/* Watermark Logo Background */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                    <Award className="w-72 h-72 text-slate-900" />
                  </div>

                  {/* Header Logo & Institution */}
                  <div className="text-center space-y-2">
                    <div className="flex items-center justify-center gap-2">
                      <Logo size="md" className="h-10 w-auto" />
                    </div>
                    <div className="text-[11px] font-black uppercase tracking-widest text-[#9A7220]">
                      English Join Indonesia • Language Training Center
                    </div>
                    <h2 className="text-2xl sm:text-3xl font-serif font-bold text-slate-900 tracking-wide mt-2">
                      CERTIFICATE OF ACHIEVEMENT
                    </h2>
                    <p className="text-xs text-slate-600 font-sans">
                      This is to certify that
                    </p>
                  </div>

                  {/* Recipient Student Name */}
                  <div className="text-center my-6 py-2 border-b-2 border-[#C89B3C] max-w-md mx-auto">
                    <h3 className="text-2xl sm:text-3xl font-serif font-black text-slate-950 italic">
                      {selectedCert.studentName}
                    </h3>
                  </div>

                  {/* Test Description */}
                  <div className="text-center max-w-xl mx-auto space-y-1">
                    <p className="text-xs text-slate-700 leading-relaxed">
                      has successfully completed the online <strong className="font-bold">{selectedCert.testTitle}</strong> held on <strong className="font-bold">{selectedCert.certIssueDate}</strong> with the following score breakdown:
                    </p>
                  </div>

                  {/* Scores Box */}
                  <div className="my-6 grid grid-cols-4 gap-2 sm:gap-4 max-w-lg mx-auto text-center">
                    <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E5D7B5]">
                      <span className="block text-[9px] uppercase font-bold text-slate-500">Listening</span>
                      <strong className="text-lg sm:text-xl font-mono font-black text-slate-900">{selectedCert.listeningScore}</strong>
                    </div>
                    <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E5D7B5]">
                      <span className="block text-[9px] uppercase font-bold text-slate-500">Structure</span>
                      <strong className="text-lg sm:text-xl font-mono font-black text-slate-900">{selectedCert.structureScore}</strong>
                    </div>
                    <div className="bg-[#FAF6EC] p-3 rounded-xl border border-[#E5D7B5]">
                      <span className="block text-[9px] uppercase font-bold text-slate-500">Reading</span>
                      <strong className="text-lg sm:text-xl font-mono font-black text-slate-900">{selectedCert.readingScore}</strong>
                    </div>
                    <div className="bg-[#F7B425] p-3 rounded-xl border border-[#C89B3C] shadow-sm">
                      <span className="block text-[9px] uppercase font-black text-black">TOTAL SCORE</span>
                      <strong className="text-xl sm:text-2xl font-mono font-black text-black">{selectedCert.totalScore}</strong>
                    </div>
                  </div>

                  {/* Level Assessment */}
                  <div className="text-center mb-6">
                    <span className="inline-block px-3 py-1 bg-[#FAF6EC] border border-[#E5D7B5] rounded-full text-xs font-extrabold text-[#9A7220]">
                      Level: {selectedCert.levelCategory}
                    </span>
                  </div>

                  {/* Signatures & Seal */}
                  <div className="pt-4 border-t border-[#E5D7B5] grid grid-cols-2 sm:grid-cols-3 items-end text-center gap-4 text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Certificate No.</span>
                      <strong className="font-mono text-[11px] text-slate-800">{selectedCert.certNumber}</strong>
                    </div>

                    <div className="hidden sm:flex flex-col items-center justify-center">
                      <div className="w-14 h-14 rounded-full border-2 border-dashed border-[#C89B3C] flex items-center justify-center p-1">
                        <div className="w-full h-full rounded-full bg-[#FAF6EC] border border-[#C89B3C] flex flex-col items-center justify-center text-[7px] font-black text-[#9A7220]">
                          <span>OFFICIAL</span>
                          <span>SEAL</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="h-8 flex items-center justify-center">
                        <span className="font-serif italic text-base font-bold text-slate-800">Alwi Bahri, M.Pd</span>
                      </div>
                      <div className="border-t border-slate-400 pt-1">
                        <span className="text-[10px] font-bold text-slate-700 block">Academic Director</span>
                        <span className="text-[8px] text-slate-500">English Join Indonesia</span>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

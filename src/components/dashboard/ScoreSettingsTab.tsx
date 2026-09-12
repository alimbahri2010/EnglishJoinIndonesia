import React, { useState } from 'react';
import { 
  Settings2, Save, Award, CheckCircle2, ShieldCheck, 
  HelpCircle, RefreshCw, Layers, Sliders
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { CustomDropdown } from '../common/CustomDropdown';

export const ScoreSettingsTab: React.FC = () => {
  const { isDark } = useTheme();
  const [minPassingScore, setMinPassingScore] = useState<number>(500);
  const [lpdpTargetScore, setLpdpTargetScore] = useState<number>(550);
  const [cpnsTargetScore, setCpnsTargetScore] = useState<number>(450);
  const [validityPeriodYears, setValidityPeriodYears] = useState<number>(2);
  const [isSaved, setIsSaved] = useState(false);

  // Conversion samples
  const conversionSamples = [
    { raw: '50 (Max)', listening: '68', structure: '68', reading: '67', totalScaled: '677' },
    { raw: '45', listening: '62', structure: '63', reading: '60', totalScaled: '617' },
    { raw: '40', listening: '57', structure: '58', reading: '55', totalScaled: '567' },
    { raw: '35', listening: '52', structure: '54', reading: '51', totalScaled: '523' },
    { raw: '30', listening: '48', structure: '49', reading: '46', totalScaled: '477' },
    { raw: '20', listening: '38', structure: '40', reading: '37', totalScaled: '383' },
    { raw: '10', listening: '32', structure: '31', reading: '31', totalScaled: '313' },
  ];

  const handleSave = () => {
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#141414] p-5 rounded-3xl border border-white/10 shadow-xl text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#F7B425]/15 flex items-center justify-center text-[#F7B425] font-bold">
            <Settings2 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg font-black text-white font-heading">
              Pengaturan Score Test TOEFL ITP
            </h2>
            <p className="text-xs text-slate-400">
              Konfigurasi skala scoring resmi (310 - 677), passing grade sertifikat, dan rumus konversi.
            </p>
          </div>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2.5 bg-[#F7B425] hover:bg-amber-400 text-black font-extrabold text-xs rounded-xl transition-all shadow-lg shadow-[#F7B425]/20 flex items-center gap-1.5 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>{isSaved ? 'Pengaturan Disimpan!' : 'Simpan Pengaturan'}</span>
        </button>
      </div>

      {isSaved && (
        <div className="p-4 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Pengaturan bobot skor TOEFL berhasil diperbarui di seluruh sistem evaluasi!</span>
        </div>
      )}

      {/* Main Grid: Parameters & Formula */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left: Configuration Form (lg:col-span-6) */}
        <div className="lg:col-span-6 bg-[#141414] rounded-3xl p-6 shadow-xl border border-white/10 space-y-5 text-white">
          <div className="flex items-center gap-2 pb-3 border-b border-white/10">
            <Sliders className="w-4 h-4 text-[#F7B425]" />
            <h3 className="text-base font-black text-white font-heading">
              Standar Nilai Kelulusan (Passing Grade)
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            
            {/* Standard Passing Grade */}
            <div className="p-4 bg-[#000000] rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-200">
                  Standar Kelulusan English Join (Garansi)
                </label>
                <span className="font-mono font-black text-sm text-black bg-[#F7B425] px-2.5 py-0.5 rounded-md">
                  {minPassingScore}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Siswa yang mencapai skor ini akan menerima predikat &quot;Passed / Proficient&quot; di E-Certificate.
              </p>
              <input
                type="range"
                min={400}
                max={600}
                step={5}
                value={minPassingScore}
                onChange={(e) => setMinPassingScore(Number(e.target.value))}
                className="w-full accent-[#F7B425]"
              />
            </div>

            {/* LPDP & Scholarship Grade */}
            <div className="p-4 bg-[#000000] rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-200">
                  Target Beasiswa LPDP / AAS / Luar Negeri
                </label>
                <span className="font-mono font-black text-sm text-[#F7B425] bg-[#F7B425]/15 border border-[#F7B425]/30 px-2.5 py-0.5 rounded-md">
                  {lpdpTargetScore}
                </span>
              </div>
              <input
                type="range"
                min={500}
                max={650}
                step={5}
                value={lpdpTargetScore}
                onChange={(e) => setLpdpTargetScore(Number(e.target.value))}
                className="w-full accent-[#F7B425]"
              />
            </div>

            {/* CPNS & BUMN */}
            <div className="p-4 bg-[#000000] rounded-2xl border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <label className="font-bold text-slate-200">
                  Syarat Minimum CPNS &amp; Rekrutmen Bersama BUMN
                </label>
                <span className="font-mono font-black text-sm text-slate-300 bg-white/10 px-2.5 py-0.5 rounded-md">
                  {cpnsTargetScore}
                </span>
              </div>
              <input
                type="range"
                min={400}
                max={500}
                step={5}
                value={cpnsTargetScore}
                onChange={(e) => setCpnsTargetScore(Number(e.target.value))}
                className="w-full accent-[#F7B425]"
              />
            </div>

            {/* Validity Period */}
            <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
              <CustomDropdown
                label="Masa Berlaku Sertifikat"
                value={String(validityPeriodYears)}
                onChange={(val) => setValidityPeriodYears(Number(val))}
                options={[
                  { value: '1', label: '1 Tahun Masa Berlaku' },
                  { value: '2', label: '2 Tahun (Standar Resmi ETS)', badge: 'Rekomendasi' },
                  { value: '3', label: '3 Tahun Masa Berlaku' },
                ]}
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Standar resmi TOEFL Prediction ETS untuk keperluan beasiswa & administrasi</span>
            </div>

          </div>
        </div>

        {/* Right: Conversion Formula & Table (lg:col-span-6) */}
        <div className="lg:col-span-6 space-y-5">
          
          {/* Formula Card */}
          <div className="bg-[#141414] rounded-3xl p-6 shadow-xl border border-white/10 space-y-3 text-white">
            <div className="flex items-center gap-2 pb-2 border-b border-white/10">
              <Layers className="w-4 h-4 text-[#F7B425]" />
              <h3 className="text-base font-black text-white font-heading">
                Rumus Perhitungan Skor TOEFL ITP
              </h3>
            </div>

            <div className="p-4 bg-black/60 rounded-2xl text-white font-mono text-xs space-y-2 border border-white/5">
              <div className="text-[#F7B425] font-bold">Total Score Formula:</div>
              <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-center text-sm font-bold text-[#F7B425]">
                Total = ((Scaled_L + Scaled_S + Scaled_R) × 10) ÷ 3
              </div>
              <p className="text-[11px] text-slate-400">
                • Section 1 (Listening Comprehension): 50 Soal → Scaled 31-68<br />
                • Section 2 (Structure &amp; Written): 40 Soal → Scaled 31-68<br />
                • Section 3 (Reading Comprehension): 50 Soal → Scaled 31-67
              </p>
            </div>
          </div>

          {/* Conversion Sample Table */}
          <div className="bg-[#141414] rounded-3xl p-6 shadow-xl border border-white/10 text-white">
            <h3 className="text-sm font-black text-white font-heading mb-3">
              Tabel Sampel Konversi Raw Score
            </h3>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs font-mono">
                <thead>
                  <tr className="bg-white/5 border-b border-white/10 text-slate-400 font-bold uppercase text-[10px]">
                    <th className="py-2.5 px-3">Benar (Raw)</th>
                    <th className="py-2.5 px-2">Listening</th>
                    <th className="py-2.5 px-2">Structure</th>
                    <th className="py-2.5 px-2">Reading</th>
                    <th className="py-2.5 px-3 text-right">Skor Akhir</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {conversionSamples.map((row, idx) => (
                    <tr key={idx} className="hover:bg-white/5 transition-colors">
                      <td className="py-2 px-3 font-bold text-white">{row.raw}</td>
                      <td className="py-2 px-2 text-slate-400">{row.listening}</td>
                      <td className="py-2 px-2 text-slate-400">{row.structure}</td>
                      <td className="py-2 px-2 text-slate-400">{row.reading}</td>
                      <td className="py-2 px-3 text-right font-black text-[#F7B425] bg-[#F7B425]/10">
                        {row.totalScaled}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

import React, { useState } from 'react';
import { 
  Lock, Mail, User, ShieldCheck, ArrowRight, ArrowLeft, 
  Sparkles, CheckCircle2, Clock, Calendar, Eye, EyeOff, Award, BookOpen, MessageSquare
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { LanguageToggle } from '../common/LanguageToggle';
import { UserRole } from '../../types';
import { usePrograms } from '../../context/ProgramsContext';
import { useLanguage } from '../../context/LanguageContext';

interface LoginPageProps {
  onLoginSuccess: (role: UserRole) => void;
  onBackToLanding: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onLoginSuccess, onBackToLanding }) => {
  const { landingPrograms } = usePrograms();
  const { language } = useLanguage();
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [email, setEmail] = useState('student.toefl@englishjoin.id');
  const [password, setPassword] = useState('toefl2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const getProgramIcon = (iconName?: string) => {
    switch (iconName) {
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#F7B425]" />;
      case 'MessageSquare':
      case 'MessageSquareText':
        return <MessageSquare className="w-5 h-5 text-[#F7B425]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#F7B425]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#F7B425]" />;
    }
  };

  const handleRoleChange = (role: UserRole) => {
    setSelectedRole(role);
    if (role === 'admin') {
      setEmail('admin.akademik@englishjoin.id');
      setPassword('admin2026');
    } else {
      setEmail('student.toefl@englishjoin.id');
      setPassword('toefl2026');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(selectedRole);
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#F7B425] selection:text-black flex flex-col justify-between relative overflow-hidden">
      
      {/* Background Decorative Ambient Glows */}
      <div className="absolute top-10 left-1/4 w-[500px] h-[500px] bg-[#F7B425]/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#F7B425]/10 rounded-full blur-[130px] pointer-events-none" />

      {/* Top Header Navigation */}
      <header className="border-b border-white/10 bg-[#0A0A0A]/90 backdrop-blur-md px-4 sm:px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-xl shadow-black/40">
        <div className="flex items-center gap-3">
          <Logo size="sm" />
          <div className="hidden sm:block border-l border-white/15 pl-3">
            <span className="text-[11px] font-bold text-[#F7B425] uppercase tracking-wider block">
              {language === 'id' ? 'Portal Login & TOEFL Dashboard' : 'Login Portal & TOEFL Dashboard'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Language Toggle ID - EN matching the screenshot */}
          <LanguageToggle size="sm" />

          <button
            onClick={onBackToLanding}
            className="inline-flex items-center gap-2 text-xs font-bold text-slate-300 hover:text-black hover:bg-[#F7B425] bg-white/5 px-3.5 sm:px-4 py-2 rounded-full border border-white/10 hover:border-[#F7B425] transition-all duration-300 shadow-sm cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden xs:inline">{language === 'id' ? 'Kembali ke Beranda' : 'Back to Home'}</span>
          </button>
        </div>
      </header>

      {/* Main Login + TOEFL Programs Layout */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start relative z-10">
        
        {/* LEFT COLUMN: LOGIN CARD (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-[#141414]/90 border border-white/15 hover:border-[#F7B425]/40 rounded-3xl p-6 sm:p-8 shadow-2xl backdrop-blur-md relative overflow-hidden transition-all duration-300">
          
          {/* Subtle Accent Glow */}
          <div className="absolute top-0 right-0 w-48 h-48 bg-[#F7B425]/15 rounded-full blur-3xl pointer-events-none" />

          {/* Heading */}
          <div className="mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#F7B425]/10 border border-[#F7B425]/30 text-[#F7B425] text-xs font-extrabold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'id' ? 'Portal Single Sign-On (SSO)' : 'Single Sign-On (SSO) Portal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white font-heading tracking-tight">
              {language === 'id' ? (
                <>Masuk ke <span className="text-[#F7B425]">Dashboard</span></>
              ) : (
                <>Sign in to <span className="text-[#F7B425]">Dashboard</span></>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'id' 
                ? 'Pilih role login untuk mengakses panel data atau simulasi tes TOEFL.' 
                : 'Select login role to access data panels or TOEFL test simulation.'}
            </p>
          </div>

          {/* Role Selector Tabs (Admin vs Student) */}
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-black/60 rounded-2xl border border-white/10 mb-6 relative z-10">
            <button
              type="button"
              onClick={() => handleRoleChange('student')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'student'
                  ? 'bg-[#F7B425] text-black shadow-lg shadow-[#F7B425]/25 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <User className="w-4 h-4" />
              <span>{language === 'id' ? 'Student / Peserta' : 'Student / Candidate'}</span>
            </button>

            <button
              type="button"
              onClick={() => handleRoleChange('admin')}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-extrabold transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer ${
                selectedRole === 'admin'
                  ? 'bg-[#F7B425] text-black shadow-lg shadow-[#F7B425]/25 font-black'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{language === 'id' ? 'Admin Akademik' : 'Academic Admin'}</span>
            </button>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            
            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                {language === 'id' 
                  ? `Email Akun ${selectedRole === 'admin' ? 'Administrator' : 'Peserta TOEFL'}`
                  : `${selectedRole === 'admin' ? 'Administrator' : 'TOEFL Student'} Account Email`}
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@englishjoin.id"
                  className="w-full pl-11 pr-4 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#F7B425] focus:ring-1 focus:ring-[#F7B425] transition-colors"
                />
                <Mail className="w-4 h-4 text-[#F7B425] absolute left-4 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Password
                </label>
                <span className="text-[11px] text-[#F7B425] cursor-pointer hover:underline font-medium">
                  {language === 'id' ? 'Lupa password?' : 'Forgot password?'}
                </span>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full pl-11 pr-11 py-3 rounded-xl bg-black/60 border border-white/15 text-white placeholder:text-slate-500 text-sm focus:outline-none focus:border-[#F7B425] focus:ring-1 focus:ring-[#F7B425] transition-colors"
                />
                <Lock className="w-4 h-4 text-[#F7B425] absolute left-4 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 rounded-xl font-black text-sm text-black bg-[#F7B425] hover:bg-[#ffbe33] shadow-xl shadow-[#F7B425]/25 hover:shadow-2xl hover:shadow-[#F7B425]/40 transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer active:scale-98"
            >
              {isLoading ? (
                <span>{language === 'id' ? 'Memproses Masuk...' : 'Signing in...'}</span>
              ) : (
                <>
                  <span>
                    {language === 'id' 
                      ? `Masuk sebagai ${selectedRole === 'admin' ? 'Admin' : 'Student'}`
                      : `Sign in as ${selectedRole === 'admin' ? 'Admin' : 'Student'}`}
                  </span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

        </div>

        {/* RIGHT COLUMN: PROGRAM-PROGRAM KURSUS AKTIF (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div>
            <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
              {language === 'id' ? (
                <>Program-Program <span className="text-[#F7B425]">Kursus Aktif</span></>
              ) : (
                <>Active <span className="text-[#F7B425]">Course Programs</span></>
              )}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              {language === 'id'
                ? 'Pilihan program kursus unggulan seperti di beranda, mulai dari pemula, conversation aktif, hingga persiapan ujian TOEFL resmi.'
                : 'Active course programs as available on the landing page, from beginners to active conversation and official TOEFL preparation.'}
            </p>
          </div>

          {landingPrograms.length === 0 ? (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 text-center">
              <BookOpen className="w-10 h-10 text-slate-500 mx-auto mb-2" />
              <p className="text-sm text-slate-400">
                {language === 'id' ? 'Belum ada program kursus aktif.' : 'No active course programs available yet.'}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {landingPrograms.map((program) => (
                <div 
                  key={program.id}
                  className="p-6 rounded-2xl bg-[#141414]/90 border border-white/10 hover:border-[#F7B425]/50 transition-all duration-300 space-y-4 shadow-lg backdrop-blur-sm group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#F7B425]/15 text-[#F7B425] flex items-center justify-center shrink-0">
                        {getProgramIcon(program.iconName)}
                      </div>
                      <div>
                        <h4 className="text-lg font-black text-white group-hover:text-[#F7B425] transition-colors">
                          {program.title}
                        </h4>
                        {program.level && (
                          <span className="text-xs text-slate-400 font-medium block mt-0.5">
                            {program.level}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {program.description && (
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {program.description}
                    </p>
                  )}

                  <div className="flex items-center gap-4 text-xs text-slate-300">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#F7B425]" />
                      {program.duration}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#F7B425]" />
                      {program.sessionCount}
                    </span>
                  </div>

                  {program.benefits && program.benefits.length > 0 && (
                    <div className="p-3.5 bg-black/50 rounded-xl border border-white/5 space-y-2">
                      <div className="text-[11px] font-bold text-slate-200">
                        {language === 'id' ? 'Fasilitas & Keunggulan:' : 'Features & Benefits:'}
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-300">
                        {program.benefits.slice(0, 4).map((b, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#F7B425] flex-shrink-0" />
                            <span className="line-clamp-1">{b}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/5">
                    <div className="flex items-baseline gap-2">
                      {program.originalPrice && (
                        <span className="text-slate-500 text-[11px] line-through font-mono">
                          {program.originalPrice}
                        </span>
                      )}
                      <span className="text-base font-black font-mono text-[#F7B425] bg-[#F7B425]/10 px-3 py-1 rounded-xl border border-[#F7B425]/20 shadow-xs">
                        {program.priceFormatted}
                      </span>
                    </div>

                    <a
                      href={`https://wa.me/6281242507738?text=${encodeURIComponent(
                        `Halo Sir Alwi & Admin English Join Indonesia, saya ingin daftar program ${program.title}.`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 rounded-xl text-xs font-black bg-[#F7B425] hover:bg-[#ffbe33] text-black transition-all duration-200 shadow-md shadow-[#F7B425]/20 hover:shadow-[#F7B425]/40 flex items-center justify-center gap-1.5 cursor-pointer active:scale-95 shrink-0"
                    >
                      <ArrowRight className="w-3.5 h-3.5" />
                      <span>{language === 'id' ? 'Daftar Program' : 'Enroll Now'}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>

      </main>

      {/* Footer Strip */}
      <footer className="border-t border-white/10 bg-black/40 py-4 px-6 text-center text-xs text-slate-400">
        © {new Date().getFullYear()} English Join Indonesia (Central Course Kampung Inggris). {language === 'id' ? 'Hak Cipta Dilindungi.' : 'All Rights Reserved.'}
      </footer>

    </div>
  );
};


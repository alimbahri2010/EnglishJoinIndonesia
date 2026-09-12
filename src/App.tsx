/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/landing/HeroSection';
import { CampusCarouselSection } from './components/landing/CampusCarouselSection';
import { WhyChooseUs } from './components/landing/WhyChooseUs';
import { ProgramsSection } from './components/landing/ProgramsSection';
import { MotivationQuote } from './components/landing/MotivationQuote';
import { LearningProcess } from './components/landing/LearningProcess';
import { MentorsSection } from './components/landing/MentorsSection';
import { StudentTestimonials } from './components/landing/StudentTestimonials';
import { FaqSection } from './components/landing/FaqSection';
import { CtaSection } from './components/landing/CtaSection';
import { LevelQuizModal } from './components/modals/LevelQuizModal';
import { FloatingWhatsApp } from './components/common/FloatingWhatsApp';
import { AdminDashboard } from './components/dashboard/AdminDashboard';
import { LoginPage } from './components/auth/LoginPage';
import { UserRole } from './types';
import { ProgramsProvider } from './context/ProgramsContext';
import { MentorsProvider } from './context/MentorsContext';
import { CampusLogosProvider } from './context/CampusLogosContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';

function AppContent() {
  const [viewMode, setViewMode] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [userRole, setUserRole] = useState<UserRole>('admin');
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenRegister = () => {
    setViewMode('login');
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleSelectFromQuiz = () => {
    setIsQuizOpen(false);
    setViewMode('login');
  };

  const handleLoginSuccess = (role: UserRole) => {
    setUserRole(role);
    setViewMode('dashboard');
  };

  // If Login page is active, render dedicated Login view
  if (viewMode === 'login') {
    return (
      <LoginPage 
        onLoginSuccess={handleLoginSuccess}
        onBackToLanding={() => setViewMode('landing')}
      />
    );
  }

  // If Dashboard mode is active, render full standalone Admin / Student Dashboard view
  if (viewMode === 'dashboard') {
    return (
      <AdminDashboard 
        initialRole={userRole}
        onExit={() => setViewMode('landing')} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#F7B425] selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenQuiz={handleOpenQuiz}
        onOpenLogin={() => setViewMode('login')}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection
          onOpenRegister={() => setViewMode('login')}
          onOpenQuiz={handleOpenQuiz}
          onOpenLogin={() => setViewMode('login')}
        />

        {/* Carousel Logo Kampus Alumni */}
        <CampusCarouselSection />

        {/* 3. Why Choose English Join Indonesia */}
        <WhyChooseUs
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* 4. Programs Section */}
        <ProgramsSection
          onOpenRegister={handleOpenRegister}
        />

        {/* 5. Motivation / Quote Section */}
        <MotivationQuote />

        {/* 6. Learning Process Section */}
        <LearningProcess
          onOpenRegister={() => handleOpenRegister()}
        />

        {/* Dedicated Mentors & Instructors Section */}
        <MentorsSection
          onOpenRegister={handleOpenRegister}
        />

        {/* 7. Student Testimonials */}
        <StudentTestimonials />

        {/* FAQ Section */}
        <FaqSection />

        {/* 8. Call to Action (CTA) Section */}
        <CtaSection
          onOpenRegister={() => handleOpenRegister()}
          onOpenQuiz={handleOpenQuiz}
        />
      </main>

      {/* 9. Footer */}
      <Footer 
        onOpenRegister={handleOpenRegister} 
        onOpenLogin={() => setViewMode('login')}
      />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

      {/* Interactive Level Placement & Goal Quiz Modal */}
      <LevelQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProgram={handleSelectFromQuiz}
      />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgramsProvider>
          <MentorsProvider>
            <CampusLogosProvider>
              <AppContent />
            </CampusLogosProvider>
          </MentorsProvider>
        </ProgramsProvider>
      </LanguageProvider>
    </ThemeProvider>
  );
}


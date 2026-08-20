/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ProgramsSection } from './components/ProgramsSection';
import { MotivationQuote } from './components/MotivationQuote';
import { LearningProcess } from './components/LearningProcess';
import { MentorsSection } from './components/MentorsSection';
import { StudentTestimonials } from './components/StudentTestimonials';
import { FaqSection } from './components/FaqSection';
import { CtaSection } from './components/CtaSection';
import { Footer } from './components/Footer';
import { RegistrationModal } from './components/RegistrationModal';
import { LevelQuizModal } from './components/LevelQuizModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';

export default function App() {
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | undefined>(undefined);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  const handleOpenRegister = (programId?: string) => {
    setSelectedProgramId(programId || 'prog-toefl');
    setIsRegisterOpen(true);
  };

  const handleOpenQuiz = () => {
    setIsQuizOpen(true);
  };

  const handleSelectFromQuiz = (programId: string) => {
    setSelectedProgramId(programId);
    setIsRegisterOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-slate-100 font-sans selection:bg-[#F7B425] selection:text-black">
      {/* Sticky Navigation Bar */}
      <Navbar
        onOpenRegister={handleOpenRegister}
        onOpenQuiz={handleOpenQuiz}
      />

      <main>
        {/* 2. Hero Section */}
        <HeroSection
          onOpenRegister={() => handleOpenRegister()}
          onOpenQuiz={handleOpenQuiz}
        />

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
      <Footer onOpenRegister={handleOpenRegister} />

      {/* Floating WhatsApp Quick Action */}
      <FloatingWhatsApp />

      {/* Interactive Registration Modal */}
      <RegistrationModal
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        defaultProgramId={selectedProgramId}
      />

      {/* Interactive Level Placement & Goal Quiz Modal */}
      <LevelQuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        onSelectProgram={handleSelectFromQuiz}
      />
    </div>
  );
}


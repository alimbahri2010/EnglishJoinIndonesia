import React, { createContext, useContext, useState, useEffect } from 'react';
import { Mentor } from '../types';
import { MENTORS as DEFAULT_MENTORS_DATA } from '../data/mockData';

export interface ManagedMentor extends Mentor {
  isActive: boolean;
  order?: number;
}

const INITIAL_MENTORS: ManagedMentor[] = DEFAULT_MENTORS_DATA.map((m, idx) => ({
  ...m,
  isActive: true,
  order: idx + 1,
}));

const STORAGE_KEY = 'english_join_mentors_master_v1';

interface MentorsContextType {
  mentors: ManagedMentor[];
  activeMentors: ManagedMentor[];
  addMentor: (mentor: Omit<ManagedMentor, 'id'>) => void;
  updateMentor: (mentor: ManagedMentor) => void;
  deleteMentor: (id: string) => void;
  toggleMentorActive: (id: string) => void;
  reorderMentors: (newMentors: ManagedMentor[]) => void;
  resetToDefaults: () => void;
}

const MentorsContext = createContext<MentorsContextType | undefined>(undefined);

export const MentorsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mentors, setMentors] = useState<ManagedMentor[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading mentors from localStorage', e);
    }
    return INITIAL_MENTORS;
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mentors));
    } catch (e) {
      console.error('Error saving mentors to localStorage', e);
    }
  }, [mentors]);

  const activeMentors = mentors.filter((m) => m.isActive);

  const addMentor = (newMentor: Omit<ManagedMentor, 'id'>) => {
    const created: ManagedMentor = {
      ...newMentor,
      id: `mentor-${Date.now()}`,
    };
    setMentors((prev) => [...prev, created]);
  };

  const updateMentor = (updatedMentor: ManagedMentor) => {
    setMentors((prev) => prev.map((m) => (m.id === updatedMentor.id ? updatedMentor : m)));
  };

  const deleteMentor = (id: string) => {
    setMentors((prev) => prev.filter((m) => m.id !== id));
  };

  const toggleMentorActive = (id: string) => {
    setMentors((prev) =>
      prev.map((m) => (m.id === id ? { ...m, isActive: !m.isActive } : m))
    );
  };

  const reorderMentors = (newMentors: ManagedMentor[]) => {
    const updated = newMentors.map((m, idx) => ({
      ...m,
      order: idx + 1,
    }));
    setMentors(updated);
  };

  const resetToDefaults = () => {
    setMentors(INITIAL_MENTORS);
  };

  return (
    <MentorsContext.Provider
      value={{
        mentors,
        activeMentors,
        addMentor,
        updateMentor,
        deleteMentor,
        toggleMentorActive,
        reorderMentors,
        resetToDefaults,
      }}
    >
      {children}
    </MentorsContext.Provider>
  );
};

export const useMentors = (): MentorsContextType => {
  const context = useContext(MentorsContext);
  if (!context) {
    throw new Error('useMentors must be used within a MentorsProvider');
  }
  return context;
};

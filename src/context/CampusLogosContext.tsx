import React, { createContext, useContext, useState, useEffect } from 'react';
import { CampusLogo } from '../types/campus';
import { DEFAULT_CAMPUS_LOGOS } from '../data/defaultCampusLogos';

const STORAGE_KEY = 'english_join_campus_logos_v1';

interface CampusLogosContextType {
  campusLogos: CampusLogo[];
  activeCampusLogos: CampusLogo[];
  addCampusLogo: (newLogo: Omit<CampusLogo, 'id'>) => void;
  updateCampusLogo: (updatedLogo: CampusLogo) => void;
  deleteCampusLogo: (id: string) => void;
  toggleCampusLogoActive: (id: string) => void;
  resetToDefaults: () => void;
  reorderCampusLogos: (newOrder: CampusLogo[]) => void;
}

const CampusLogosContext = createContext<CampusLogosContextType | undefined>(undefined);

export const CampusLogosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [campusLogos, setCampusLogos] = useState<CampusLogo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Error reading campus logos from localStorage', e);
    }
    return DEFAULT_CAMPUS_LOGOS;
  });

  // Save to localStorage on change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(campusLogos));
    } catch (e) {
      console.error('Error saving campus logos to localStorage', e);
    }
  }, [campusLogos]);

  const activeCampusLogos = campusLogos
    .filter((c) => c.isActive)
    .sort((a, b) => a.order - b.order);

  const addCampusLogo = (newLogo: Omit<CampusLogo, 'id'>) => {
    const created: CampusLogo = {
      ...newLogo,
      id: `campus-${Date.now()}`,
      order: newLogo.order || campusLogos.length + 1,
    };
    setCampusLogos((prev) => [...prev, created]);
  };

  const updateCampusLogo = (updatedLogo: CampusLogo) => {
    setCampusLogos((prev) =>
      prev.map((c) => (c.id === updatedLogo.id ? updatedLogo : c))
    );
  };

  const deleteCampusLogo = (id: string) => {
    setCampusLogos((prev) => prev.filter((c) => c.id !== id));
  };

  const toggleCampusLogoActive = (id: string) => {
    setCampusLogos((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isActive: !c.isActive } : c))
    );
  };

  const resetToDefaults = () => {
    setCampusLogos(DEFAULT_CAMPUS_LOGOS);
  };

  const reorderCampusLogos = (newOrder: CampusLogo[]) => {
    setCampusLogos(newOrder.map((item, idx) => ({ ...item, order: idx + 1 })));
  };

  return (
    <CampusLogosContext.Provider
      value={{
        campusLogos,
        activeCampusLogos,
        addCampusLogo,
        updateCampusLogo,
        deleteCampusLogo,
        toggleCampusLogoActive,
        resetToDefaults,
        reorderCampusLogos,
      }}
    >
      {children}
    </CampusLogosContext.Provider>
  );
};

export const useCampusLogos = (): CampusLogosContextType => {
  const context = useContext(CampusLogosContext);
  if (!context) {
    throw new Error('useCampusLogos must be used within a CampusLogosProvider');
  }
  return context;
};

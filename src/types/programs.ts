export interface Program {
  id: string;
  title: string;
  slug: string;
  category: string;
  badge?: string;
  isFeatured?: boolean;
  shortDesc: string;
  fullDesc: string;
  targetAudience: string;
  iconName: string;
  highlights: string[];
  duration: string;
  sessionCount: string;
  level: string;
  priceFormatted: string;
  originalPrice?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  category: 'Beginner' | 'Conversation' | 'TOEFL';
  scoreBadge?: string;
  avatarUrl: string;
  rating: number;
  text: string;
  universityOrCompany?: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'Umum' | 'Metode' | 'Jadwal & Biaya';
}

export interface WhyFeature {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
  keyBenefits: string[];
}

export interface StepProcess {
  step: string;
  title: string;
  tagline: string;
  description: string;
  details: string[];
  iconName: string;
}

export interface Mentor {
  id: string;
  name: string;
  title: string;
  role: string;
  badge: string;
  bio: string;
  avatarUrl: string;
  experience: string;
  specialties: string[];
  educationOrCert: string;
}

export interface ContactInfo {
  phone: string;
  phoneClean: string;
  whatsappUrl: string;
  email: string;
  location: string;
  instagram: string;
  hours: string;
}

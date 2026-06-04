// Unified content model.
//
// These files in `data/` are the single source of truth: the website reads them
// directly, and `scripts/build-cv.mjs` turns the same data into the LaTeX CV.
// Keep values plain/semantic (no HTML, no LaTeX) — each consumer adds its own
// formatting (the site renders HTML, the CV generator emits LaTeX).

export interface Bilingual {
  en: string;
  zh: string;
}

export interface AboutData {
  name: string;
  title: string;
  affiliation: string;
  department: string;
  /** CV header line, e.g. "PhD Student · Olin Business School". CV-only. */
  cvPosition: string;
  bio: Bilingual;
  researchInterests: {
    en: string[];
    zh: string[];
  };
  email: string;
  /** Phone shown in the CV header. CV-only. */
  phone?: string;
  office: string;
  homepage?: string;
  googleScholar?: string;
  linkedin?: string;
  cv: string;
}

export type PublicationStatus = 'published' | 'in_review' | 'in_prep';

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  /** Journal/conference for published work. */
  venue?: string;
  year?: string;
  status: PublicationStatus;
  /** Status note for unpublished work, e.g. "In preparation.". */
  note?: string;
  /** A distinction to spotlight, e.g. "Accepted, 2026 MSOM TIE SIG Conference". */
  highlight?: string;
  abstract?: string;
  pdf?: string;
  ssrn?: string;
}

export interface PublicationsData {
  /** Flat, status-tagged list. Site and CV bucket it as needed. */
  publications: Publication[];
}

export interface EducationEntry {
  id: string;
  degree: string;
  institution: string;
  location: string;
  /** e.g. "2024 - present" */
  date: string;
  advisor?: string;
  notes?: string[];
}

export interface TeachingCourse {
  id: string;
  course: string;
  semester: string;
  role: 'ta' | 'instructor';
  /** e.g. "USTC" */
  location?: string;
}

export interface NewsItem {
  date: string;
  type: 'conference' | 'award' | 'other';
  title: string;
  description: string;
}

export interface ExperienceEntry {
  id: string;
  /** Project / engagement name. */
  title: string;
  /** Your role, e.g. "PhD Lead". */
  role: string;
  organization: string;
  date: string;
  notes?: string[];
}

export interface Award {
  id: string;
  title: string;
  organization: string;
  /** Amount or location, optional. */
  detail?: string;
  date: string;
}

export interface Presentation {
  id: string;
  title: string;
  /** Hosting event / seminar / conference. */
  event: string;
  location?: string;
  date?: string;
  authors?: string[];
}

export interface MentoringEntry {
  id: string;
  name: string;
  relationship: string;
  location?: string;
  date: string;
}

export interface ServiceEntry {
  id: string;
  organization: string;
  role: string;
  location?: string;
  date: string;
}

export interface DevelopmentItem {
  id: string;
  title: string;
  year?: string;
  location?: string;
}

/** CV sections that don't map onto an existing website page. */
export interface CVData {
  experience: ExperienceEntry[];
  awards: Award[];
  presentations: {
    invited: Presentation[];
    contributed: Presentation[];
  };
  mentoring: MentoringEntry[];
  service: ServiceEntry[];
  development: DevelopmentItem[];
  peerReview: string[];
  memberships: string[];
}

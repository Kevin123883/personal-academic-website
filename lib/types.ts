export interface AboutData {
  name: string;
  title: string;
  affiliation: string;
  department: string;
  bio: {
    en: string;
    zh: string;
  };
  researchInterests: {
    en: string[];
    zh: string[];
  };
  email: string;
  office: string;
  googleScholar?: string;
  linkedin?: string;
  cv: string;
}

export interface Publication {
  id: string;
  title: string;
  authors: string[];
  venue: string;
  abstract?: string;
  pdf?: string;
  ssrn?: string;
}

export interface PublicationsData {
  workingPapers: Publication[];
  publications: Publication[];
}

export interface TeachingCourse {
  id: string;
  course: string;
  semester: string;
  role: 'ta' | 'instructor';
}

export interface NewsItem {
  date: string;
  type: 'conference' | 'award' | 'other';
  title: string;
  description: string;
}

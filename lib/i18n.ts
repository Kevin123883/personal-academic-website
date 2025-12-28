export type Locale = 'en' | 'zh';

export const locales: Locale[] = ['en', 'zh'];
export const defaultLocale: Locale = 'en';

export const translations = {
  en: {
    nav: {
      home: 'Home',
      research: 'Research',
      teaching: 'Teaching',
      news: 'News',
      contact: 'Contact',
    },
    home: {
      title: 'About Me',
      phdCandidate: 'PhD Candidate',
      downloadCV: 'Download CV',
    },
    research: {
      title: 'Research',
      workingPapers: 'Working Papers',
      publications: 'Publications',
      abstract: 'Abstract',
      showAbstract: 'Show Abstract',
      hideAbstract: 'Hide Abstract',
      pdf: 'PDF',
      ssrn: 'SSRN',
    },
    teaching: {
      title: 'Teaching',
      role: {
        ta: 'Teaching Assistant',
        instructor: 'Instructor',
      },
    },
    news: {
      title: 'News',
      conference: 'Conference',
      award: 'Award',
    },
    contact: {
      title: 'Contact',
      email: 'Email',
      office: 'Office',
      googleScholar: 'Google Scholar',
      linkedin: 'LinkedIn',
    },
  },
  zh: {
    nav: {
      home: '首页',
      research: '研究',
      teaching: '教学',
      news: '新闻',
      contact: '联系',
    },
    home: {
      title: '关于我',
      phdCandidate: '博士生',
      downloadCV: '下载简历',
    },
    research: {
      title: '研究',
      workingPapers: '工作论文',
      publications: '已发表文章',
      abstract: '摘要',
      showAbstract: '显示摘要',
      hideAbstract: '隐藏摘要',
      pdf: 'PDF',
      ssrn: 'SSRN',
    },
    teaching: {
      title: '教学',
      role: {
        ta: '助教',
        instructor: '讲师',
      },
    },
    news: {
      title: '新闻',
      conference: '会议',
      award: '获奖',
    },
    contact: {
      title: '联系方式',
      email: '邮箱',
      office: '办公室',
      googleScholar: 'Google Scholar',
      linkedin: 'LinkedIn',
    },
  },
} as const;

export function getTranslations(locale: Locale) {
  return translations[locale];
}


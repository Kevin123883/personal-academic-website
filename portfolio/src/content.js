// Structural facts come from the repo-wide single source in ../data,
// mirrored into src/data by scripts/sync-data.mjs before dev/build.
// Positioning copy specific to the portfolio lives here so the CV stays untouched.
import about from './data/about.json'
import education from './data/education.json'
import cv from './data/cv.json'
import teaching from './data/teaching.json'
import publications from './data/publications.json'

export const person = {
  name: about.name,
  title: about.title,
  affiliation: about.affiliation,
  department: about.department,
  email: about.email,
  phone: about.phone,
  office: about.office,
  linkedin: about.linkedin,
  cvUrl: '/cv.pdf',
  avatar: '/images/avatar.jpg',
}

export const hero = {
  eyebrow: 'PhD Candidate · Supply Chain, Operations & Technology',
  headline: ['Modeling how AI', 'reshapes what we built —', 'platforms, firms, and beyond.'],
  sub: 'The pre-AI world designed its institutions for humans: e-commerce platforms, organizational structures, market mechanisms. I study how AI rewrites their operating logic — through analytical modeling and empirical evidence.',
}

export const aboutSection = {
  intro: [
    'I am a PhD candidate in Supply Chain, Operations & Technology at Olin Business School, Washington University in St. Louis, advised by Lingxiu Dong.',
    'My research asks a simple question with complicated answers: when AI can search, decide, and coordinate, what happens to everything the pre-AI era built — e-commerce platforms, firm and organizational structures, market institutions? Agentic commerce is my current entry point, but the question runs wider. I approach it with economic modeling, disciplined by empirical work on real operational data.',
    'Before WashU, I earned a B.S. in Statistics from the University of Science and Technology of China.',
  ],
}

export const educationList = education

export const projects = [
  {
    id: 'agentic-commerce',
    index: '01',
    kind: 'Research · Under Review',
    title: publications.publications[0].title,
    org: 'with Lingxiu Dong & Fasheng Xu',
    date: '2025 — present',
    art: 'agentic',
    link: { href: publications.publications[0].ssrn, label: 'Read the paper on SSRN' },
    tags: ['Economic modeling', 'Platform economics', 'AI agents'],
    description:
      'When consumers delegate shopping to AI agents, the interface of commerce shifts: instead of searching over products, people articulate preferences. This paper builds an economic model of agentic commerce to trace what that shift does to search frictions, product complexity, and price discrimination — and how platforms should redesign themselves.',
    highlight: 'Under review at Management Science · Accepted — 2026 MSOM TIE SIG Conference · presented at POMS & INFORMS 2026',
  },
  {
    id: 'potter-warehouse',
    index: '02',
    kind: 'Industry Project · Potter Global Technologies',
    title: 'Data-Driven Warehouse Layout Optimization for Life-Saving Products',
    org: 'PhD Lead · Boeing Center (BCSCI)',
    date: '2025 Fall',
    art: 'warehouse',
    tags: ['Optimization', 'Warehouse operations', 'Field data'],
    description:
      'Led the redesign of a fire-safety manufacturer’s warehouse layout, turning SKU-level movement data into a slotting optimization that shortens pick paths for products where minutes matter.',
    highlight: 'Project of the Year Award — 2026 BCSCI Symposium',
  },
  {
    id: 'edward-jones-funnel',
    index: '03',
    kind: 'Industry Project · Edward Jones',
    title: 'Data-Driven Development Funnel Capacity Analysis',
    org: 'PhD Lead · Boeing Center (BCSCI)',
    date: '2026 Spring',
    art: 'funnel',
    tags: ['Capacity analysis', 'Stochastic modeling', 'People analytics'],
    description:
      'Modeled the advisor-development pipeline of a Fortune 500 financial firm as a capacitated flow, quantifying where the funnel leaks and how staffing policy reshapes throughput.',
    highlight: 'Best Presentation Award — 2026 BCSCI Symposium',
  },
]

export const strengths = [
  {
    id: 'modeling',
    label: 'Analytical Modeling',
    text: 'Microeconomic and stochastic models — built to isolate the mechanism, not decorate it. Formal training in economics and statistics underpins every model I write.',
  },
  {
    id: 'empirics',
    label: 'Empirical Methods',
    text: 'A statistics degree underneath every regression. Econometrics and data analytics on real operational data, from SKU movements to development funnels.',
  },
  {
    id: 'industry',
    label: 'Industry Translation',
    text: 'Two award-winning engagements with Potter Global Technologies and Edward Jones — research questions sourced from, and answers returned to, practice.',
  },
  {
    id: 'teaching',
    label: 'Teaching & Communication',
    text: `${teaching.length} courses taught across WashU and USTC — from Prescriptive Analytics to Linear Algebra. Complex ideas, delivered plainly.`,
  },
]

export const scot = cv // exported for future sections (awards, talks)

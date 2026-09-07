// Structural facts come from the repo-wide single source in ../data,
// mirrored into src/data by scripts/sync-data.mjs before dev/build.
// Positioning copy specific to the site lives here so the CV stays untouched.
import about from './data/about.json'
import education from './data/education.json'
import cv from './data/cv.json'
import teaching from './data/teaching.json'
import publications from './data/publications.json'

export const person = {
  name: about.name,
  title: about.title,
  affiliation: about.affiliation,
  school: 'Olin Business School',
  department: about.department,
  field: 'Operations Management',
  email: about.email,
  office: about.office,
  linkedin: about.linkedin,
  cvUrl: '/cv.pdf',
  avatar: '/images/avatar.jpg',
}

export const nav = [
  { href: '#research', label: 'Research' },
  { href: '#writing', label: 'Writing' },
  { href: '#teaching', label: 'Teaching' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export const hero = {
  eyebrow: 'PhD Candidate',
  statement:
    'I study how AI reshapes the institutions the pre-AI world designed for humans: e-commerce platforms, organizational structures, market mechanisms. Analytical modeling, disciplined by empirical work on real operational data.',
}

export const aboutSection = {
  intro: [
    'I am a PhD candidate in Supply Chain, Operations & Technology at Olin Business School, Washington University in St. Louis, advised by Lingxiu Dong.',
    'My research asks a simple question with complicated answers: when AI can search, decide, and coordinate, what happens to everything the pre-AI era built for humans, from e-commerce platforms to firm structures and market institutions? Agentic commerce is my current entry point, but the question runs wider. I approach it with economic modeling, and I keep the models honest with empirical work on real operational data.',
    'Before WashU, I earned a B.S. in Statistics from the University of Science and Technology of China.',
  ],
}

export const educationList = education
export const awards = cv.awards
export const talks = cv.presentations.contributed
export const teachingList = teaching
export const papers = publications.publications

const paper = publications.publications[0]
const [mainTitle, subTitle] = paper.title.split(': ')

export const research = [
  {
    id: paper.id,
    index: '01',
    kind: 'Working paper',
    title: mainTitle,
    subtitle: subTitle,
    description:
      'When consumers delegate shopping to AI agents, the interface of commerce shifts: instead of searching over products, people articulate preferences. The paper builds an economic model of agentic commerce to trace what that shift does to search frictions, product complexity, and price discrimination, and how platforms should redesign themselves in response.',
    coauthors: 'with Lingxiu Dong and Fasheng Xu',
    status: paper.note.replace(/\.$/, ''),
    venues: 'MSOM TIE SIG 2026 · POMS 2026 · INFORMS 2026',
    link: { href: paper.ssrn, label: 'Paper on SSRN' },
  },
  {
    id: 'potter-warehouse',
    index: '02',
    kind: 'Applied project',
    title: 'Data-Driven Warehouse Layout Optimization for Life-Saving Products',
    description:
      'Redesign of a fire-safety manufacturer’s warehouse layout, turning SKU-level movement data into a slotting optimization that shortens pick paths for products where minutes matter.',
    coauthors: 'PhD lead · Potter Global Technologies · Boeing Center for Supply Chain Innovation',
    status: 'Project of the Year, 2026 BCSCI Symposium',
  },
  {
    id: 'edward-jones-funnel',
    index: '03',
    kind: 'Applied project',
    title: 'Data-Driven Development Funnel Capacity Analysis',
    description:
      'The advisor-development pipeline of a Fortune 500 financial firm, modeled as a capacitated flow to quantify where the funnel leaks and how staffing policy reshapes throughput.',
    coauthors: 'PhD lead · Edward Jones · Boeing Center for Supply Chain Innovation',
    status: 'Best Presentation, 2026 BCSCI Symposium',
  },
]

# WashU Academic Website

A professional academic website built with Next.js 15 (App Router) and Tailwind CSS for Washington University in St. Louis SCOT PhD candidates.

## ✨ Features

- **Bilingual Support**: English and Chinese (Simplified) with language preference persistence
- **Responsive Design**: Perfectly adapted for mobile and desktop
- **Data-Driven Content**: All content managed through JSON files, no code changes needed
- **Single-Source CV**: The downloadable CV PDF is generated from the *same* JSON via LaTeX (`npm run cv`), so the website and the CV never drift apart
- **Modern UI**: Minimalist, academic, and professional design
- **WashU Branding**: Official WashU colors (Green #007360, Red #A51417)
- **SEO Optimized**: Comprehensive metadata, Open Graph, and Twitter Card support
- **Type Safety**: Full TypeScript type definitions for all data structures
- **Error Handling**: Error boundary component for graceful error handling

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Add your personal assets:**
   - Place your avatar image at `public/images/avatar.png` (recommended: 512x512 or larger, square)
   - Place paper PDFs in `public/papers/` directory (if applicable)
   - The CV at `public/cv.pdf` is **generated** — see [CV: one source of truth](#-cv-one-source-of-truth) below, not hand-placed

3. **Update your information in `data/about.json`:**
   - Name, title, affiliation
   - Bio (both English and Chinese)
   - Research interests
   - Contact information (email, office, Google Scholar, LinkedIn)
   - **Important**: Replace the Google Scholar placeholder URL with your actual profile URL

4. **Update your publications in `data/publications.json`:**
   - One flat list; each item has a `status` of `published`, `in_review`, or `in_prep`
   - The site buckets these into Publications (published) and Working Papers (in review / in prep); the CV prints them as Published / In Review / In Prep
   - Include title, authors, and (for published work) venue/year; add `abstract`, `pdf`, `ssrn` as available

5. **Update your teaching experience in `data/teaching.json`:**
   - Course name, semester, role (`ta` or `instructor`), and optional `location`

6. **Update your news in `data/news.json`:**
   - Conference presentations, awards, and other news items (website only)

7. **Update your education and CV-only sections:**
   - `data/education.json` — degrees, advisor (shown on the home page and the CV)
   - `data/cv.json` — awards, presentations, mentoring, service, development, peer review, memberships

### Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

Build for production:

```bash
npm run build
```

Start production server:

```bash
npm start
```

### Lint

Run ESLint:

```bash
npm run lint
```

## 📄 CV: one source of truth

The website **and** the downloadable CV PDF are built from the same JSON in `data/`.
Edit the data once, run one command, and both update — they can never drift apart.

```bash
npm run cv
```

This runs `scripts/build-cv.mjs`, which:

1. Reads `data/about.json`, `education.json`, `publications.json`, `teaching.json`, and `cv.json`.
2. Generates the LaTeX section files under `CV/cv/*.tex` (these are **auto-generated — do not edit by hand**).
3. Compiles the CV with XeLaTeX (`latexmk`) and copies the result to `public/cv.pdf`.

**Typical workflow:** edit a `data/*.json` file → `npm run cv` → the new `public/cv.pdf` is ready and the website (which reads the same JSON) already reflects the change.

### Requirements

- A LaTeX distribution with **XeLaTeX** on your `PATH` (MiKTeX on Windows, TeX Live / MacTeX elsewhere). `latexmk` must be available.
- The CV's look lives in `CV/cv.tex` (layout, which sections are included) and `CV/academic-cv.cls` (styling, fonts). Edit those to restyle the CV; edit `data/` to change its content.
- Fonts are bundled in `CV/fonts/`; the build points XeTeX at them automatically.

> The generated `.tex` files and LaTeX build artifacts (`CV/cv.pdf`, `*.aux`, `*.log`, …) are git-ignored. `public/cv.pdf` is the committed, served output.

## 📁 Project Structure

```
washu-academic-website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout (with navigation and metadata)
│   ├── page.tsx           # Home/About page
│   ├── globals.css        # Global styles
│   ├── research/          # Research page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── teaching/          # Teaching page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── news/              # News page
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── contact/           # Contact page
│       ├── layout.tsx
│       └── page.tsx
├── components/            # Reusable React components
│   ├── AppWrapper.tsx     # App wrapper (with error boundary)
│   ├── Avatar.tsx         # Avatar component
│   ├── ErrorBoundary.tsx  # Error boundary component
│   ├── LocaleProvider.tsx # Locale provider
│   ├── Navigation.tsx     # Navigation bar component
│   ├── NewsTimeline.tsx   # News timeline component
│   └── PublicationCard.tsx # Publication card component
├── data/                  # JSON data files — the single source of truth
│   ├── about.json         # Personal information (+ CV header fields)
│   ├── education.json     # Education entries
│   ├── publications.json  # Research papers (status-tagged)
│   ├── teaching.json      # Teaching experience
│   ├── news.json          # News and events (website only)
│   └── cv.json            # CV-only sections (awards, talks, service, ...)
├── CV/                    # LaTeX CV template (the CV's "skin")
│   ├── cv.tex             # Main document (layout + included sections)
│   ├── academic-cv.cls    # Class file (styling)
│   ├── fonts/             # Bundled fonts
│   └── cv/                # Section files — AUTO-GENERATED by build-cv.mjs
├── scripts/
│   └── build-cv.mjs       # data/ → LaTeX → public/cv.pdf  (`npm run cv`)
├── lib/                   # Utility functions
│   ├── i18n.ts            # Internationalization translations
│   └── types.ts           # TypeScript type definitions
├── public/                # Static assets
│   ├── images/            # Images (avatar, etc.)
│   │   └── avatar.png     # Avatar file (PNG format)
│   ├── papers/            # Paper PDF files
│   └── cv.pdf             # CV file (generated — do not edit by hand)
├── next.config.js         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Project dependencies and scripts
```

## 🎨 Customization

### Colors

WashU brand colors are defined in `tailwind.config.ts`:
- `washu-green`: #007360
- `washu-red`: #A51417

You can modify these color values as needed.

### Adding Content

All content is managed through JSON files in the `data/` directory. Simply edit these files to update your website content without modifying code:

- **Publications**: Edit `data/publications.json`
- **News**: Edit `data/news.json`
- **Teaching**: Edit `data/teaching.json`
- **About**: Edit `data/about.json`

### Update Avatar and CV

1. **Update Avatar:**
   - Name your avatar image (PNG format) as `avatar.png`
   - Place it in the `public/images/` directory
   - Recommended size: 512x512 or larger, square

2. **Update CV:**
   - Don't edit `public/cv.pdf` directly — it's generated.
   - Edit the content in `data/` and run `npm run cv`. See [CV: one source of truth](#-cv-one-source-of-truth).

## 🚢 Deployment

### Pre-deployment

Before deploying, make sure to:

1. **Update Website URL:**
   - Update `openGraph.url` and `alternates.canonical` in `app/layout.tsx`
   - Replace `https://kaiwenluo.ink` with your actual domain

2. **Run Build:**
   ```bash
   npm run build
   ```
   Ensure everything compiles correctly

### Deployment Platforms

This website can be deployed to various platforms:

- **Vercel** (Recommended): Connect your GitHub repository and deploy automatically
- **Netlify**: Connect via Git or drag and drop the `.next` folder
- **Other platforms**: Any platform that supports Next.js

### Environment Variables

No environment variables are required for basic functionality. The website uses static JSON files to manage content.

## 🔧 Technical Details

### Tech Stack

- **Framework**: Next.js 15 (App Router)
- **UI Library**: React 19
- **Styling**: Tailwind CSS 3.4+
- **Language**: TypeScript 5+
- **Font**: Inter (Google Fonts)

### Type Safety

All data structures are fully typed using TypeScript. Type definitions are located in `lib/types.ts`. This ensures type safety when working with JSON data files.

### Language Persistence

User language preferences are automatically saved to localStorage and persist across page refreshes.

### SEO Features

- Dynamic metadata generation based on personal information
- Open Graph tags for social media sharing
- Twitter Card support
- Page-specific metadata for each route

### Error Handling

The website includes an error boundary component that gracefully handles unexpected errors and provides a user-friendly error message.

## 📝 Data File Formats

### about.json

```json
{
  "name": "Your Name",
  "title": "Your Title",
  "affiliation": "Your Affiliation",
  "department": "Your Department",
  "bio": {
    "en": "English bio",
    "zh": "Chinese bio"
  },
  "researchInterests": {
    "en": ["Interest 1", "Interest 2"],
    "zh": ["兴趣1", "兴趣2"]
  },
  "email": "your.email@example.com",
  "office": "Your Office",
  "googleScholar": "https://scholar.google.com/citations?user=YOUR_ID",
  "linkedin": "https://www.linkedin.com/in/yourprofile",
  "cv": "/cv.pdf"
}
```

### publications.json

One flat list; `status` is `published`, `in_review`, or `in_prep`. For unpublished
work use `note` (e.g. `"In preparation."`) instead of `venue`.

```json
{
  "publications": [
    {
      "id": "unique-id",
      "title": "Paper Title",
      "authors": ["Author 1", "Author 2"],
      "status": "in_prep",
      "note": "In preparation.",
      "venue": "Journal Name",
      "year": "2025",
      "abstract": "Abstract text",
      "pdf": "/papers/paper.pdf",
      "ssrn": "https://ssrn.com/abstract=XXXXX"
    }
  ]
}
```

### teaching.json

```json
[
  {
    "id": "unique-id",
    "course": "Course Name",
    "semester": "Fall 2024",
    "role": "ta",
    "location": "USTC"
  }
]
```

### education.json

```json
[
  {
    "id": "unique-id",
    "degree": "PhD in ...",
    "institution": "University Name",
    "location": "City",
    "date": "2024 - present",
    "advisor": "Advisor Name"
  }
]
```

### cv.json

CV-only sections (some also surface on the home page). Each list may be empty;
empty sections are hidden on the site and printed as bare headings in the CV.

```json
{
  "experience": [],
  "awards": [],
  "presentations": { "invited": [], "contributed": [] },
  "mentoring": [],
  "service": [
    { "id": "id", "organization": "Org", "role": "Chair", "location": "", "date": "2022-2023" }
  ],
  "development": [
    { "id": "id", "title": "Workshop Name", "year": "2025", "location": "STL" }
  ],
  "peerReview": [],
  "memberships": []
}
```

### news.json

```json
[
  {
    "date": "2024-01-01",
    "type": "conference",
    "title": "News Title",
    "description": "News description"
  }
]
```

## 📄 License

This project is for personal academic use.

## 🤝 Contributing

This is a personal academic website template. If you have suggestions for improvements, feel free to submit an Issue or Pull Request.

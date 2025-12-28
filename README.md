# WashU Academic Website

A professional academic website built with Next.js 15 (App Router) and Tailwind CSS for Washington University in St. Louis SCOT PhD candidates.

## Features

- **Bilingual Support**: English and Chinese (中文) with language preference persistence
- **Responsive Design**: Perfectly adapted for mobile and desktop
- **Data-Driven Content**: All content managed through JSON files
- **Modern UI**: Minimalist, academic, and professional design
- **WashU Branding**: Official WashU colors (Green #007360, Red #A51417)
- **SEO Optimized**: Comprehensive metadata, Open Graph, and Twitter Card support
- **Type Safety**: Full TypeScript type definitions for all data structures
- **Error Handling**: Error boundary component for graceful error handling

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Add your personal assets:
   - Place your avatar image at `public/images/avatar.jpg` (recommended: 512x512 or larger, square)
   - Place your CV PDF at `public/cv.pdf`
   - Place paper PDFs in `public/papers/` directory (if applicable)

3. Update your information in `data/about.json`:
   - Name, title, affiliation
   - Bio (both English and Chinese)
   - Research interests
   - Contact information (email, office, Google Scholar, LinkedIn)
   - **Important**: Replace the Google Scholar placeholder URL with your actual profile URL

4. Update your publications in `data/publications.json`:
   - Add working papers and publications
   - Include title, authors, venue, abstract, PDF, and SSRN links

5. Update your teaching experience in `data/teaching.json`:
   - Course name, semester, and role (TA or Instructor)

6. Update your news in `data/news.json`:
   - Conference presentations, awards, and other news items

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

## Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Home/About page
│   ├── research/          # Research page
│   ├── teaching/          # Teaching page
│   ├── news/              # News page
│   └── contact/           # Contact page
├── components/            # Reusable React components
│   ├── Navigation.tsx    # Navigation bar
│   ├── PublicationCard.tsx
│   ├── NewsTimeline.tsx
│   ├── LocaleProvider.tsx
│   ├── ErrorBoundary.tsx # Error handling
│   └── AppWrapper.tsx   # App wrapper with error boundary
├── data/                  # JSON data files
│   ├── about.json        # Personal information
│   ├── publications.json # Research papers
│   ├── news.json         # News and events
│   └── teaching.json     # Teaching experience
├── lib/                   # Utility functions
│   ├── i18n.ts           # Internationalization
│   └── types.ts          # TypeScript type definitions
└── public/               # Static assets
    ├── images/           # Images (avatar, etc.)
    ├── papers/           # Paper PDFs
    └── cv.pdf            # CV file
```

## Customization

### Colors

WashU brand colors are defined in `tailwind.config.ts`:
- `washu-green`: #007360
- `washu-red`: #A51417

### Adding Content

All content is managed through JSON files in the `data/` directory. Simply edit these files to update your website:

- **Publications**: Edit `data/publications.json`
- **News**: Edit `data/news.json`
- **Teaching**: Edit `data/teaching.json`
- **About**: Edit `data/about.json`

No code changes needed!

## Deployment

### Build for Production

Before deploying, make sure to:

1. Update the website URL in `app/layout.tsx` (replace `https://yourwebsite.com` with your actual domain)
2. Run the build command to ensure everything compiles:
   ```bash
   npm run build
   ```

### Deployment Platforms

This website can be deployed to various platforms:

- **Vercel** (Recommended): Connect your GitHub repository and deploy automatically
- **Netlify**: Drag and drop the `.next` folder or connect via Git
- **Other platforms**: Any platform that supports Next.js static export

### Environment Variables

No environment variables are required for basic functionality. The website uses static JSON files for content.

## Technical Details

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

## License

This project is for personal academic use.


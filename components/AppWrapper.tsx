'use client';

import { ErrorBoundary } from './ErrorBoundary';
import Navigation from './Navigation';
import { LocaleProvider } from './LocaleProvider';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary>
      <LocaleProvider>
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-grow">{children}</main>
          <footer className="bg-gray-50 border-t border-gray-200 py-8 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-600">
                © {new Date().getFullYear()} Washington University in St. Louis
              </p>
            </div>
          </footer>
        </div>
      </LocaleProvider>
    </ErrorBoundary>
  );
}

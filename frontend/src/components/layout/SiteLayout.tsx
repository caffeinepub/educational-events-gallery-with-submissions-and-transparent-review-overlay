import { BookOpen, Plus, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SiteLayoutProps {
  children: React.ReactNode;
  currentView: 'gallery' | 'submit';
  onNavigate: (view: 'gallery' | 'submit') => void;
}

export function SiteLayout({ children, currentView, onNavigate }: SiteLayoutProps) {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' ? window.location.hostname : 'unknown-app';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold tracking-tight">Educational Events</h1>
          </div>
          <nav className="flex items-center gap-2">
            <Button
              variant={currentView === 'gallery' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('gallery')}
              className="gap-2"
            >
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Gallery</span>
            </Button>
            <Button
              variant={currentView === 'submit' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onNavigate('submit')}
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Submit Event</span>
            </Button>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t bg-muted/30 py-6 mt-12">
        <div className="container flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground">
          <p>
            © {currentYear} Educational Events. Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(appIdentifier)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-foreground hover:text-primary transition-colors underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}

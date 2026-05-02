import Navbar from './Navbar';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand bg-brand backdrop-blur">
      <div className="border-b border-brand/80 bg-white/65 px-4 py-2 md:px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-xs text-brand-muted">
          <p>We build websites and apps with clear communication.</p>
          <p className="hidden sm:block">Response time: within 24 hours</p>
        </div>
      </div>
      <div className="px-4 py-3 md:px-6">
        <div className="mx-auto max-w-7xl">
          <Navbar />
        </div>
      </div>
    </header>
  );
}




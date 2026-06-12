import Navbar from './Navbar';

export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand bg-brand/90 backdrop-blur">
      <div className="px-4 py-3 md:px-6">
        <div className="mx-auto max-w-7xl">
          <Navbar />
        </div>
      </div>
    </header>
  );
}


import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { DesignCard } from '../../src/components/DesignCard';
import { getAllDesigns, getDesignsByCategory } from '../../src/data/designs';

export const metadata = {
  title: 'Design Templates | Gen-Ji Digital Studio',
  description: 'Browse and select from our collection of professional design templates. Explore modern, responsive designs for your next project.',
  keywords: ['design templates', 'web design', 'UI templates', 'responsive designs', 'professional templates'],
  openGraph: {
    title: 'Design Templates - Gen-Ji Digital Studio',
    description: 'Browse our collection of professional design templates.',
    url: 'https://gen-ji.me/designs',
    type: 'website',
  },
  alternates: {
    canonical: 'https://gen-ji.me/designs',
  },
};

export default function DesignsPage() {
  const allDesigns = getAllDesigns();
  const categories = Array.from(new Set(allDesigns.map(d => d.category)));

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <Navbar />

      {/* Hero Section */}
      <PageHero
        eyebrow="Design Gallery"
        title="Browse Professional Design Templates"
        description="Explore our collection of modern, responsive design templates. Preview each design and submit your request to get started."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Designs' },
        ]}
      />

      {/* Designs Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* All Designs */}
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                All Templates
              </h2>
              <p className="text-slate-600 dark:text-slate-400">
                {allDesigns.length} designs available
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allDesigns.map(design => (
                <DesignCard key={design.id} design={design} />
              ))}
            </div>
          </div>

          {/* By Category */}
          {categories.map(category => {
            const categoryDesigns = getDesignsByCategory(category);
            if (categoryDesigns.length === 0) return null;

            return (
              <div key={category} className="mb-16">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {category}
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400">
                    {categoryDesigns.length} design{categoryDesigns.length !== 1 ? 's' : ''}
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {categoryDesigns.map(design => (
                    <DesignCard key={design.id} design={design} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}

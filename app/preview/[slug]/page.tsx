import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { DesignPreview } from '../../../src/components/DesignPreview';
import { getDesignBySlug } from '../../../src/data/designs';

interface PreviewPageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PreviewPageProps) {
  const design = getDesignBySlug(params.slug);

  if (!design) {
    return {
      title: 'Design Not Found',
    };
  }

  return {
    title: `${design.title} - Preview`,
    description: design.description,
  };
}

export default function PreviewPage({ params }: PreviewPageProps) {
  const design = getDesignBySlug(params.slug);

  if (!design) {
    notFound();
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold mb-4"
            >
              ← Back to Designs
            </Link>

            <div className="card">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
                      {design.title}
                    </h1>
                    <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                      {design.category}
                    </span>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-400">
                    {design.description}
                  </p>
                </div>
              </div>

              {/* Features */}
              {design.features && design.features.length > 0 && (
                <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                    Key Features
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {design.features.map(feature => (
                      <span
                        key={feature}
                        className="px-3 py-1 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm"
                      >
                        ✓ {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Preview */}
          <div className="mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">Live Preview</h2>
            <DesignPreview design={design} />
          </div>

          {/* CTA Section */}
          <div className="card bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h3 className="text-2xl font-bold mb-2">Interested in this design?</h3>
                <p className="text-blue-100">Select this design and let us know your requirements.</p>
              </div>
              <Link
                href={`/select/${design.slug}`}
                className="px-6 py-3 rounded-lg bg-white text-blue-600 font-semibold transition-transform hover:scale-105 active:scale-95 whitespace-nowrap"
              >
                Select This Design
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

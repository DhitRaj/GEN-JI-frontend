import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export const metadata = {
  title: 'Design Not Found',
  description: 'The design you are looking for does not exist.',
};

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <div className="text-6xl font-bold text-slate-200 dark:text-slate-800 mb-6">
            404
          </div>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Design Not Found
          </h1>

          <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
            Sorry, the design you&apos;re looking for doesn&apos;t exist or has been removed.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/designs"
              className="px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-colors"
            >
              Browse All Designs
            </Link>

            <Link
              href="/"
              className="px-6 py-3 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-300 dark:hover:bg-slate-700 font-semibold transition-colors"
            >
              Go Home
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

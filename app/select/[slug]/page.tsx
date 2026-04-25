'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { DesignForm } from '../../../src/components/DesignForm';
import { getDesignBySlug } from '../../../src/data/designs';

interface SelectPageProps {
  params: {
    slug: string;
  };
}

export default function SelectPage({ params }: SelectPageProps) {
  const router = useRouter();
  const design = getDesignBySlug(params.slug);
  const [isSubmitted, setIsSubmitted] = useState(false);

  if (!design) {
    notFound();
  }

  const handleFormSuccess = () => {
    setIsSubmitted(true);
    // Redirect after 2 seconds
    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href={`/preview/${design.slug}`}
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold mb-4"
            >
              ← Back to Preview
            </Link>

            <div className="card mb-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Request {design.title}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    Fill out the form below and we'll get in touch with you shortly.
                  </p>
                </div>
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 whitespace-nowrap">
                  {design.category}
                </span>
              </div>
            </div>
          </div>

          {/* Success Message */}
          {isSubmitted && (
            <div className="card bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 mb-8">
              <div className="text-center">
                <div className="text-4xl mb-3">✓</div>
                <h2 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">
                  Request Submitted Successfully!
                </h2>
                <p className="text-green-700 dark:text-green-400">
                  We've received your request. You'll be redirected shortly...
                </p>
              </div>
            </div>
          )}

          {/* Form */}
          {!isSubmitted && (
            <div className="card">
              <DesignForm
                designSlug={design.slug}
                designTitle={design.title}
                onSuccess={handleFormSuccess}
              />
            </div>
          )}

          {/* Info Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="card">
              <div className="text-3xl mb-3">📋</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Tell Us More</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Share your project requirements and vision so we can better understand your needs.
              </p>
            </div>

            <div className="card">
              <div className="text-3xl mb-3">⏱️</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Quick Response</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Our team will review your request and get back to you within 24 hours.
              </p>
            </div>

            <div className="card">
              <div className="text-3xl mb-3">🚀</div>
              <h3 className="font-bold text-slate-900 dark:text-white mb-2">Ready to Start</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                We'll work with you to customize and implement your chosen design.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}

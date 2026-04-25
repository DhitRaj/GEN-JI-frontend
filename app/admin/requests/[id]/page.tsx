'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

interface DesignRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  designSlug: string;
  designTitle: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt: string;
  themeCustomization?: {
    primaryColor?: string;
    secondaryColor?: string;
    accentColor?: string;
    typography?: string;
    spacing?: string;
    borderRadius?: string;
    shadowIntensity?: string;
    fontFamily?: string;
    componentSize?: string;
    animationSpeed?: string;
    contrastLevel?: string;
    layoutWidth?: string;
  };
}

interface DetailPageProps {
  params: {
    id: string;
  };
}

const statusColors = {
  pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
  reviewed: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  approved: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
};

export default function RequestDetailPage({ params }: DetailPageProps) {
  const [request, setRequest] = useState<DesignRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);

  useEffect(() => {
    const fetchRequest = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        const response = await fetch(`${baseUrl}/api/requests/${params.id}`);
        
        if (!response.ok) {
          setError('Request not found');
          setLoading(false);
          return;
        }
        
        const data = await response.json();
        setRequest(data.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch request');
      } finally {
        setLoading(false);
      }
    };

    fetchRequest();
  }, [params.id]);

  const handleStatusChange = async (newStatus: string) => {
    if (!request) return;
    
    setUpdatingStatus(true);
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/api/requests/${request.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (response.ok) {
        const data = await response.json();
        setRequest(data.data);
      }
    } catch (err) {
      console.error('Error updating status:', err);
    } finally {
      setUpdatingStatus(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card animate-pulse">
              <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/3 mb-4" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-full mb-2" />
              <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3" />
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !request) {
    return (
      <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
        <Navbar />
        <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="card text-center py-12">
              <p className="text-red-600 dark:text-red-400 mb-4">{error || 'Request not found'}</p>
              <Link
                href="/admin/requests"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Back to Requests
              </Link>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/admin/requests"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-semibold mb-4"
            >
              ← Back to Requests
            </Link>

            <div className="card mb-8">
              <div className="flex items-start justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                    Request from {request.name}
                  </h1>
                  <p className="text-slate-600 dark:text-slate-400">
                    {request.email}
                  </p>
                </div>
                <span
                  className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap ${
                    statusColors[request.status]
                  }`}
                >
                  {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                </span>
              </div>

              {/* Status Update */}
              <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-3">
                  Update Status
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['pending', 'reviewed', 'approved', 'rejected'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={updatingStatus || request.status === status}
                      className={`px-4 py-2 rounded-lg font-semibold text-sm transition-colors ${
                        request.status === status
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 cursor-default'
                          : 'bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white disabled:opacity-50'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Request Details */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Basic Info */}
            <div className="card">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Request Details
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Design
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {request.designTitle || request.designSlug}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Submitted Date
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {new Date(request.submittedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="card">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Name
                  </p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white mt-1">
                    {request.name}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    Email
                  </p>
                  <a
                    href={`mailto:${request.email}`}
                    className="text-lg font-semibold text-blue-600 dark:text-blue-400 hover:underline mt-1"
                  >
                    {request.email}
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <div className="card mb-8">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Project Message
            </h2>
            <p className="text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
              {request.message}
            </p>
          </div>

          {/* Theme Customization */}
          {request.themeCustomization && Object.keys(request.themeCustomization).length > 0 && (
            <div className="card">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-6">
                Theme Customization Details
              </h2>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Primary Color */}
                {request.themeCustomization.primaryColor && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Primary Color
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: request.themeCustomization.primaryColor }}
                      />
                      <p className="font-mono text-sm text-slate-900 dark:text-white">
                        {request.themeCustomization.primaryColor}
                      </p>
                    </div>
                  </div>
                )}

                {/* Secondary Color */}
                {request.themeCustomization.secondaryColor && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Secondary Color
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: request.themeCustomization.secondaryColor }}
                      />
                      <p className="font-mono text-sm text-slate-900 dark:text-white">
                        {request.themeCustomization.secondaryColor}
                      </p>
                    </div>
                  </div>
                )}

                {/* Typography */}
                {request.themeCustomization.typography && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Typography
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.typography}
                    </p>
                  </div>
                )}

                {/* Border Radius */}
                {request.themeCustomization.borderRadius && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Border Radius
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.borderRadius}
                    </p>
                  </div>
                )}

                {/* Shadow Intensity */}
                {request.themeCustomization.shadowIntensity && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Shadow Intensity
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.shadowIntensity}
                    </p>
                  </div>
                )}

                {/* Component Size */}
                {request.themeCustomization.componentSize && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Component Size
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.componentSize}
                    </p>
                  </div>
                )}

                {/* Font Family */}
                {request.themeCustomization.fontFamily && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Font Family
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.fontFamily}
                    </p>
                  </div>
                )}

                {/* Animation Speed */}
                {request.themeCustomization.animationSpeed && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Animation Speed
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.animationSpeed}
                    </p>
                  </div>
                )}

                {/* Spacing */}
                {request.themeCustomization.spacing && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Spacing
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.spacing}
                    </p>
                  </div>
                )}

                {/* Contrast Level */}
                {request.themeCustomization.contrastLevel && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Contrast Level
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.contrastLevel}
                    </p>
                  </div>
                )}

                {/* Layout Width */}
                {request.themeCustomization.layoutWidth && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Layout Width
                    </p>
                    <p className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-semibold">
                      {request.themeCustomization.layoutWidth}
                    </p>
                  </div>
                )}

                {/* Accent Color */}
                {request.themeCustomization.accentColor && (
                  <div>
                    <p className="text-sm font-semibold text-slate-600 dark:text-slate-400 mb-2">
                      Accent Color
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-lg border-2 border-slate-300 dark:border-slate-600"
                        style={{ backgroundColor: request.themeCustomization.accentColor }}
                      />
                      <p className="font-mono text-sm text-slate-900 dark:text-white">
                        {request.themeCustomization.accentColor}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

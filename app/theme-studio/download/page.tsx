'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import PageHero from '../../../components/PageHero';
import { DEFAULT_THEME_CONFIG } from '../../../src/data/defaults';
import { ThemeConfig } from '../../../src/types/theme';

const STORAGE_KEY = 'themeStudioPreviewConfig';

export default function ThemeStudioDownloadPage() {
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>(DEFAULT_THEME_CONFIG);
  const [isLoadedFromDraft, setIsLoadedFromDraft] = useState(false);
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientMessage, setClientMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState<{ type: 'success' | 'error' | null; text: string }>({
    type: null,
    text: '',
  });

  useEffect(() => {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      setThemeConfig(DEFAULT_THEME_CONFIG);
      setIsLoadedFromDraft(false);
      return;
    }

    try {
      const parsed = JSON.parse(raw) as ThemeConfig;
      setThemeConfig(parsed);
      setIsLoadedFromDraft(true);
    } catch {
      setThemeConfig(DEFAULT_THEME_CONFIG);
    }
  }, []);

  const sendToAdmin = async () => {
    setSendStatus({ type: null, text: '' });

    if (!clientName.trim() || !clientEmail.trim() || !clientMessage.trim()) {
      setSendStatus({
        type: 'error',
        text: 'Please fill name, email, and message before sending to admin.',
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: clientName.trim(),
          email: clientEmail.trim(),
          message: clientMessage.trim(),
          designSlug: 'theme-studio-custom',
          designTitle: themeConfig.name || 'Custom Theme Draft',
          themeCustomization: {
            primaryColor: themeConfig.colors.primary,
            secondaryColor: themeConfig.colors.secondary,
            accentColor: themeConfig.colors.accent,
            typography: themeConfig.typography,
            spacing: themeConfig.spacing,
            borderRadius: themeConfig.borderRadius,
            shadowIntensity: themeConfig.shadowIntensity,
            fontFamily: themeConfig.fontFamily,
            componentSize: themeConfig.componentSize,
            animationSpeed: themeConfig.animationSpeed,
            contrastLevel: themeConfig.contrast,
            layoutWidth: themeConfig.layoutWidth,
          },
        }),
      });

      const data = await response.json();

      if (!response.ok || !data?.success) {
        setSendStatus({
          type: 'error',
          text: data?.message || 'Failed to send request to admin.',
        });
        return;
      }

      setSendStatus({
        type: 'success',
        text: 'Your design has been sent to admin successfully.',
      });
      setClientName('');
      setClientEmail('');
      setClientMessage('');
    } catch {
      setSendStatus({
        type: 'error',
        text: 'Something went wrong while sending to admin. Please try again.',
      });
    } finally {
      setIsSending(false);
    }
  };

  const previewStyle = useMemo(
    () => ({
      background: themeConfig.colors.secondary,
      color: themeConfig.contrast === 'high' ? '#0f172a' : '#1e293b',
      filter: `contrast(${themeConfig.contrast === 'high' ? 1.2 : 1})`,
      borderRadius:
        themeConfig.borderRadius === 'sharp'
          ? '0px'
          : themeConfig.borderRadius === 'mild'
            ? '10px'
            : themeConfig.borderRadius === 'rounded'
              ? '18px'
              : '9999px',
      boxShadow:
        themeConfig.shadowIntensity === 'none'
          ? 'none'
          : themeConfig.shadowIntensity === 'subtle'
            ? '0 2px 10px rgba(15, 23, 42, 0.08)'
            : themeConfig.shadowIntensity === 'medium'
              ? '0 8px 22px rgba(15, 23, 42, 0.16)'
              : '0 12px 30px rgba(15, 23, 42, 0.24)',
    }),
    [themeConfig]
  );

  const typographyScale =
    themeConfig.typography === 'sm' ? 0.95 : themeConfig.typography === 'lg' ? 1.1 : 1;
  const spacingScale =
    themeConfig.spacing === 'compact' ? 0.85 : themeConfig.spacing === 'spacious' ? 1.2 : 1;
  const componentScale =
    themeConfig.componentSize === 'sm' ? 0.9 : themeConfig.componentSize === 'lg' ? 1.15 : 1;
  const animationDuration =
    themeConfig.animationSpeed === 'slow'
      ? '400ms'
      : themeConfig.animationSpeed === 'fast'
        ? '120ms'
        : '220ms';
  const layoutMaxWidth =
    themeConfig.layoutWidth === 'compact'
      ? '960px'
      : themeConfig.layoutWidth === 'wide'
        ? '1400px'
        : '1160px';

  const demoRadius =
    themeConfig.borderRadius === 'sharp'
      ? '0px'
      : themeConfig.borderRadius === 'mild'
        ? '8px'
        : themeConfig.borderRadius === 'rounded'
          ? '16px'
          : '9999px';

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <PageHero
        eyebrow="Theme Review"
        title="Review your custom theme"
        description="Client apna selected design yahan full preview me dekh sakta hai aur admin ko send kar sakta hai."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design System Builder', href: '/theme-studio' },
          { label: 'Download' },
        ]}
      />

      <section className="pb-16">
        <div className="section-shell">
          <div className="card">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Current draft</p>
                <h2 className="mt-3 text-2xl font-bold">
                  {themeConfig.name || 'Custom Theme'}
                </h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  {isLoadedFromDraft
                    ? 'Latest selected design loaded from Design System Builder.'
                    : 'No recent draft found. Showing default theme values.'}
                </p>
              </div>

              <div className="flex gap-2">
                <Link href="/theme-studio" className="btn btn-secondary px-5 py-3">
                  Back to Studio
                </Link>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 p-4 md:p-6 bg-white dark:bg-slate-900">
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Full Page Demo</p>

              <div
                className="min-h-[70vh] rounded-2xl overflow-hidden border border-slate-200/70 dark:border-slate-700/70"
                style={previewStyle}
              >
                <div className="px-6 py-4 border-b border-black/10 flex items-center justify-between" style={{ background: 'rgba(255,255,255,0.15)' }}>
                  <div className="flex items-center gap-3">
                    <div
                      className="h-9 w-9 flex items-center justify-center text-sm font-bold"
                      style={{ background: themeConfig.colors.primary, color: '#fff', borderRadius: demoRadius }}
                    >
                      GJ
                    </div>
                    <div>
                      <p className="text-sm font-semibold">{themeConfig.name || 'Custom Theme Demo'}</p>
                      <p className="text-xs opacity-80">Live full-page preview</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 text-xs font-semibold"
                    style={{ background: themeConfig.colors.accent, color: '#0f172a', borderRadius: demoRadius, transitionDuration: animationDuration }}
                  >
                    Preview Mode
                  </button>
                </div>

                <div
                  className="p-6 lg:p-10 grid lg:grid-cols-12"
                  style={{
                    gap: `${24 * spacingScale}px`,
                    maxWidth: layoutMaxWidth,
                    margin: '0 auto',
                  }}
                >
                  <div className="lg:col-span-8 space-y-5">
                    <h3 className="text-3xl md:text-4xl font-bold leading-tight" style={{ fontFamily: themeConfig.fontFamily === 'serif' ? 'Georgia, serif' : themeConfig.fontFamily === 'mono' ? 'Fira Code, monospace' : 'system-ui, -apple-system, sans-serif', fontSize: `${2.25 * typographyScale}rem` }}>
                      This is your selected design shown as a full demo page.
                    </h3>
                    <p className="text-sm md:text-base opacity-90 max-w-2xl" style={{ fontSize: `${1 * typographyScale}rem` }}>
                      Layout, colors, spacing, border radius, and hierarchy follow your selected configuration so client ko final feel pura page pe samajh aaye.
                    </p>
                    <div className="flex flex-wrap gap-3 pt-1">
                      <button
                        type="button"
                        className="px-5 py-2.5 text-sm font-semibold"
                        style={{
                          background: themeConfig.colors.primary,
                          color: '#fff',
                          borderRadius: demoRadius,
                          padding: `${10 * componentScale}px ${20 * componentScale}px`,
                          fontSize: `${14 * componentScale}px`,
                          transitionDuration: animationDuration,
                        }}
                      >
                        Get Started
                      </button>
                      <button
                        type="button"
                        className="px-5 py-2.5 text-sm font-semibold border"
                        style={{
                          borderColor: themeConfig.colors.primary,
                          color: themeConfig.colors.primary,
                          borderRadius: demoRadius,
                          background: 'transparent',
                          padding: `${10 * componentScale}px ${20 * componentScale}px`,
                          fontSize: `${14 * componentScale}px`,
                          transitionDuration: animationDuration,
                        }}
                      >
                        Explore Features
                      </button>
                    </div>
                  </div>

                  <div className="lg:col-span-4 grid gap-4">
                    <div className="p-4" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: demoRadius }}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-80">Theme</p>
                      <p className="mt-2 text-lg font-bold">{themeConfig.theme}</p>
                    </div>
                    <div className="p-4" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: demoRadius }}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-80">Typography</p>
                      <p className="mt-2 text-lg font-bold">{themeConfig.typography}</p>
                    </div>
                    <div className="p-4" style={{ background: 'rgba(255,255,255,0.2)', borderRadius: demoRadius }}>
                      <p className="text-xs uppercase tracking-[0.18em] opacity-80">Spacing</p>
                      <p className="mt-2 text-lg font-bold">{themeConfig.spacing}</p>
                    </div>
                  </div>
                </div>

                <div
                  className="px-6 pb-6 lg:px-10 lg:pb-10 grid md:grid-cols-3"
                  style={{ gap: `${16 * spacingScale}px`, maxWidth: layoutMaxWidth, margin: '0 auto' }}
                >
                  {[1, 2, 3].map((item) => (
                    <div
                      key={item}
                      className="p-4 border border-black/10"
                      style={{ background: 'rgba(255,255,255,0.2)', borderRadius: demoRadius, transitionDuration: animationDuration }}
                    >
                      <p className="text-xs uppercase tracking-[0.18em] opacity-80">Section {item}</p>
                      <p className="mt-2 text-sm font-medium" style={{ fontSize: `${14 * typographyScale}px` }}>
                        Demo content card to show how your selected theme behaves across repeated UI blocks.
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
                <p className="text-sm font-semibold text-slate-700 dark:text-slate-200 mb-4">Selected Values</p>
                <div className="grid md:grid-cols-3 gap-3 text-sm">
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Theme name: {themeConfig.name || 'Custom Theme'}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Theme: {themeConfig.theme}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Typography: {themeConfig.typography}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Spacing: {themeConfig.spacing}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Radius: {themeConfig.borderRadius}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Shadow: {themeConfig.shadowIntensity}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Font: {themeConfig.fontFamily}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Component: {themeConfig.componentSize}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Animation: {themeConfig.animationSpeed}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Contrast: {themeConfig.contrast}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Layout: {themeConfig.layoutWidth}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Primary: {themeConfig.colors.primary}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">Secondary: {themeConfig.colors.secondary}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 md:col-span-3">Accent: {themeConfig.colors.accent}</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2 md:col-span-3">
                    Colors combined: {themeConfig.colors.primary} | {themeConfig.colors.secondary} | {themeConfig.colors.accent}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 dark:border-slate-700 p-6 bg-white dark:bg-slate-900">
              <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Send to admin</p>
                  <h3 className="mt-2 text-xl font-bold">Share this finalized design with admin</h3>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
                    Client yahan se directly admin ko request bhej sakta hai, jisme full theme details automatically attach hongi.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="clientName" className="block text-sm font-semibold mb-2">
                    Your Name
                  </label>
                  <input
                    id="clientName"
                    type="text"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="clientEmail" className="block text-sm font-semibold mb-2">
                    Email
                  </label>
                  <input
                    id="clientEmail"
                    type="email"
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
                    placeholder="john@example.com"
                  />
                </div>

                <div className="md:col-span-2">
                  <label htmlFor="clientMessage" className="block text-sm font-semibold mb-2">
                    Message for Admin
                  </label>
                  <textarea
                    id="clientMessage"
                    rows={4}
                    value={clientMessage}
                    onChange={(e) => setClientMessage(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 px-3 py-2"
                    placeholder="Please proceed with this design and contact me for next steps."
                  />
                </div>
              </div>

              {sendStatus.type && (
                <p
                  className={`mt-4 text-sm font-semibold ${
                    sendStatus.type === 'success'
                      ? 'text-green-600 dark:text-green-400'
                      : 'text-red-600 dark:text-red-400'
                  }`}
                >
                  {sendStatus.text}
                </p>
              )}

              <div className="mt-5">
                <button
                  type="button"
                  onClick={sendToAdmin}
                  disabled={isSending}
                  className="btn btn-primary px-5 py-3 disabled:opacity-60"
                >
                  {isSending ? 'Sending...' : 'Send to Admin'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

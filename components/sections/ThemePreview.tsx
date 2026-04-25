'use client';

import { useEffect, useRef, useState } from 'react';
import { MdTouchApp, MdRestartAlt } from 'react-icons/md';
import {
  DEFAULT_THEME_ID,
  getThemeOption,
  resolveThemeId,
  setThemeOnDocument,
  THEME_OPTIONS,
  THEME_STORAGE_KEY,
} from '@/lib/theme';
import type { ThemeId } from '@/lib/theme';

const PREVIEW_DURATION_MS = 12000;

const themePitch = {
  light: 'Bright and minimal for clean product demos.',
  midnight: 'Premium dark mode with sharper contrast and depth.',
  dawn: 'Warm editorial styling with a softer conversion feel.',
  forest: 'Natural glassmorphism for calm, modern presentations.',
} as const;

export default function ThemePreview() {
  const [activeTheme, setActiveTheme] = useState<ThemeId>(DEFAULT_THEME_ID);
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const restoreThemeRef = useRef<ThemeId>(DEFAULT_THEME_ID);
  const timeoutRef = useRef<number | null>(null);
  const tickRef = useRef<number | null>(null);

  const clearTimers = () => {
    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (tickRef.current !== null) {
      window.clearInterval(tickRef.current);
      tickRef.current = null;
    }
  };

  const restoreTheme = () => {
    clearTimers();
    setThemeOnDocument(restoreThemeRef.current);
    setActiveTheme(restoreThemeRef.current);
    setIsPreviewing(false);
    setSecondsLeft(0);
  };

  useEffect(() => {
    const storedTheme = resolveThemeId(localStorage.getItem(THEME_STORAGE_KEY));
    restoreThemeRef.current = storedTheme;
    setActiveTheme(storedTheme);
    setThemeOnDocument(storedTheme);

    return () => {
      clearTimers();
      setThemeOnDocument(storedTheme);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const previewTheme = (themeId: ThemeId) => {
    clearTimers();

    if (!isPreviewing) {
      restoreThemeRef.current = activeTheme;
    }

    setIsPreviewing(true);
    setActiveTheme(themeId);
    setThemeOnDocument(themeId);
    setSecondsLeft(Math.ceil(PREVIEW_DURATION_MS / 1000));

    tickRef.current = window.setInterval(() => {
      setSecondsLeft((current) => Math.max(current - 1, 0));
    }, 1000);

    timeoutRef.current = window.setTimeout(() => {
      restoreTheme();
    }, PREVIEW_DURATION_MS);
  };

  const currentTheme = getThemeOption(activeTheme);
  const cardSurfaceStyle = (isActive: boolean) => ({
    background: isActive ? 'var(--surface-strong)' : 'var(--surface)',
    borderColor: 'var(--border-strong)',
    boxShadow: isActive
      ? '0 18px 45px color-mix(in srgb, var(--primary) 18%, transparent)'
      : '0 12px 28px rgba(15, 23, 42, 0.06)',
  });

  return (
    <section className="pb-20">
      <div className="section-shell">
        <div className="glass-panel rounded-[2rem] p-6 md:p-8 overflow-hidden relative">
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_right,rgba(96,165,250,0.18),transparent_34%),radial-gradient(circle_at_bottom_left,rgba(99,102,241,0.14),transparent_30%)]" />
          <div className="relative">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.22em]" style={{ color: 'var(--primary)' }}>Design System Builder</p>
              <h2 className="mt-3 text-3xl md:text-4xl font-bold">Client touch karke multiple themes preview kar sakte hain.</h2>
              <p className="mt-4 text-slate-600 dark:text-slate-300 leading-relaxed">
                Har card ek alag visual direction dikhata hai. Tap karte hi pura interface temporarily change ho jayega, aur timer ke baad original theme automatically wapas aa jayegi.
              </p>
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="glass-chip px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-200 inline-flex items-center gap-2" style={{ borderColor: 'var(--border-strong)' }}>
                <MdTouchApp /> Tap to preview
              </span>
              <span className="glass-chip px-3 py-1 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-200" style={{ borderColor: 'var(--border-strong)' }}>
                {isPreviewing ? `Preview active · auto reset in ${secondsLeft}s` : 'Preview is temporary and safe'}
              </span>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {THEME_OPTIONS.map((theme) => {
                const isActive = activeTheme === theme.id;

                return (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => previewTheme(theme.id)}
                    className={[
                      'group text-left rounded-[1.75rem] border p-4 md:p-5 transition-all duration-300 hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[color:var(--primary)]',
                      isActive
                        ? 'text-slate-900 dark:text-white'
                        : 'text-slate-900 dark:text-white',
                    ].join(' ')}
                    style={cardSurfaceStyle(isActive)}
                    aria-pressed={isActive}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-semibold uppercase tracking-[0.2em]" style={{ color: 'var(--muted)' }}>
                          {theme.id === DEFAULT_THEME_ID ? 'Default demo' : 'Theme option'}
                        </p>
                        <h3 className="mt-2 text-xl font-bold">{theme.name}</h3>
                      </div>
                      <div
                        className="h-12 w-16 rounded-2xl border border-white/70 shadow-sm"
                        style={{ background: theme.preview }}
                        aria-hidden="true"
                      />
                    </div>

                    <p className="mt-3 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                      {themePitch[theme.id]}
                    </p>

                    <div className="mt-4 flex items-center justify-between gap-3">
                      <span className="inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.18em]" style={{ background: 'var(--surface-strong)', color: 'var(--text)' }}>
                        {theme.mode}
                      </span>
                      <span className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>Tap to preview</span>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-[1.2fr_0.8fr] items-stretch">
              <div className="rounded-[1.75rem] border p-5" style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)' }}>
                <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>Current preview</p>
                <h3 className="mt-2 text-2xl font-bold">{currentTheme.name}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                  {themePitch[currentTheme.id]}
                </p>
              </div>

              <div className="rounded-[1.75rem] border p-5 flex flex-col justify-between gap-4" style={{ background: 'var(--surface)', borderColor: 'var(--border-strong)' }}>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em]" style={{ color: 'var(--muted)' }}>Preview controls</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--muted)' }}>
                    Ye preview saved theme ko overwrite nahi karega. Timer khatam hote hi original theme restore ho jayegi.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={restoreTheme}
                  className="btn btn-secondary w-full md:w-auto self-start"
                >
                  <MdRestartAlt /> Restore original theme
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

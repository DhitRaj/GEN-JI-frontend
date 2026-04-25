'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';
import { useThemeBuilder } from '../../src/hooks/useThemeBuilder';
import { PresetGrid } from '../../src/components/ThemePresets/PresetGrid';
import { ColorCustomizer } from '../../src/components/ThemeBuilder/ColorCustomizer';
import { OptionSelector } from '../../src/components/ThemeBuilder/OptionSelector';
import {
  TYPOGRAPHY_OPTIONS,
  SPACING_OPTIONS,
  BORDER_RADIUS_OPTIONS,
  SHADOW_OPTIONS,
  FONT_FAMILY_OPTIONS,
  COMPONENT_SIZE_OPTIONS,
  ANIMATION_OPTIONS,
  CONTRAST_OPTIONS,
  LAYOUT_OPTIONS,
} from '../../src/data/presets';

export default function ThemeStudioPage() {
  const { config, updateColors, updateThemeProperty, applyPreset } = useThemeBuilder();
  const [isOpeningDownload, setIsOpeningDownload] = useState(false);
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('themeStudioPreviewConfig', JSON.stringify(config));
  }, [config]);

  const openDownloadPage = () => {
    setIsOpeningDownload(true);
    localStorage.setItem('themeStudioPreviewConfig', JSON.stringify(config));
    router.push('/theme-studio/download');
  };

  return (
    <main className="min-h-screen relative overflow-hidden">
      <Navbar />
      <PageHero
        eyebrow="Design System Builder"
        title="Build and review your custom design system."
        description="Select a direction, customize each setting, then review the final result before sending to admin."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Design System Builder' },
        ]}
      />

      <section className="pb-10">
        <div className="section-shell">
          <div className="card">
            <div className="grid lg:grid-cols-2 gap-6 items-start">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Current selection</p>
                <h2 className="mt-2 text-2xl font-bold">{config.name || 'Custom Theme'}</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300 text-sm">
                  The settings below are live and will open exactly the same on the review page.
                </p>
                <div className="mt-4 flex gap-2">
                  {[config.colors.primary, config.colors.secondary, config.colors.accent].map((color) => (
                    <div key={color} className="h-8 w-8 rounded-lg border border-slate-300 dark:border-slate-600" style={{ backgroundColor: color }} />
                  ))}
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Flow</p>
                <div className="mt-3 grid gap-2 text-sm">
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">1. Choose pre-built direction</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">2. Customize all options</div>
                  <div className="rounded-lg bg-slate-100 dark:bg-slate-800 px-3 py-2">3. Review final page and send to admin</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pre-built Themes */}
      <PresetGrid selectedTheme={config.theme} onSelectPreset={applyPreset} />

      {/* Color Customizer */}
      <ColorCustomizer colors={config.colors} onChange={updateColors} />

      {/* Typography */}
      <OptionSelector
        title="Typography style"
        description="Choose a typography scale that fits your brand voice."
        options={TYPOGRAPHY_OPTIONS}
        selectedId={config.typography}
        onSelect={id => updateThemeProperty('typography', id)}
        renderOption={(option) => (
          <p className="mt-2 font-semibold text-lg" style={{ fontSize: option.size }}>
            The quick brown fox
          </p>
        )}
        columns={3}
      />

      {/* Spacing */}
      <OptionSelector
        title="Spacing & layout"
        description="Select how tight or loose your component spacing should feel."
        options={SPACING_OPTIONS}
        selectedId={config.spacing}
        onSelect={id => updateThemeProperty('spacing', id)}
        renderOption={(option) => (
          <div className="mt-4 flex gap-2" style={{ gap: option.gap }}>
            {[1, 2, 3].map(i => (
              <div key={i} className="h-8 bg-blue-200 dark:bg-blue-800 rounded" style={{ flex: 1 }} />
            ))}
          </div>
        )}
        columns={3}
      />

      {/* Border Radius */}
      <OptionSelector
        title="Border radius"
        description="Choose how rounded or sharp your components should be."
        options={BORDER_RADIUS_OPTIONS}
        selectedId={config.borderRadius}
        onSelect={id => updateThemeProperty('borderRadius', id)}
        renderOption={(option) => (
          <div className="mt-4 h-12 w-12 bg-blue-400 dark:bg-blue-600" style={{ borderRadius: option.radius }} />
        )}
        columns={4}
      />

      {/* Shadow Intensity */}
      <OptionSelector
        title="Shadow intensity"
        description="Set the depth and prominence of shadows on components."
        options={SHADOW_OPTIONS}
        selectedId={config.shadowIntensity}
        onSelect={id => updateThemeProperty('shadowIntensity', id)}
        renderOption={(option) => (
          <div
            className="mt-4 h-12 w-12 bg-white dark:bg-slate-800 rounded-md"
            style={{ boxShadow: option.shadow || 'none' }}
          />
        )}
        columns={4}
      />

      {/* Font Family */}
      <OptionSelector
        title="Font family"
        description="Pick a typeface that matches your brand personality."
        options={FONT_FAMILY_OPTIONS}
        selectedId={config.fontFamily}
        onSelect={id => updateThemeProperty('fontFamily', id)}
        renderOption={(option) => (
          <p className="mt-4 text-lg font-semibold" style={{ fontFamily: option.font }}>
            The quick brown fox
          </p>
        )}
        columns={3}
      />

      {/* Component Size */}
      <OptionSelector
        title="Component size"
        description="Set the default size of buttons, inputs, and other elements."
        options={COMPONENT_SIZE_OPTIONS}
        selectedId={config.componentSize}
        onSelect={id => updateThemeProperty('componentSize', id)}
        renderOption={(option) => (
          <div
            className="mt-4 px-4 py-2 rounded-md bg-blue-500 text-white text-sm font-semibold inline-block pointer-events-none"
            style={{ padding: option.size }}
          >
            Button
          </div>
        )}
        columns={3}
      />

      {/* Animation Speed */}
      <OptionSelector
        title="Animation speed"
        description="Choose how fast transitions and animations should be."
        options={ANIMATION_OPTIONS}
        selectedId={config.animationSpeed}
        onSelect={id => updateThemeProperty('animationSpeed', id)}
        renderOption={(option) => (
          <>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{option.duration}</p>
            <div
              className="mt-4 h-8 w-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full animate-pulse"
              style={{ animationDuration: option.duration }}
            />
          </>
        )}
        columns={3}
      />

      {/* Contrast Level */}
      <OptionSelector
        title="Contrast level"
        description="Improve text and color contrast for better accessibility."
        options={CONTRAST_OPTIONS}
        selectedId={config.contrast}
        onSelect={id => updateThemeProperty('contrast', id)}
        renderOption={(option) => (
          <p className="mt-3 text-sm" style={{ filter: `contrast(${option.contrast})` }}>
            Text with {option.label.toLowerCase()} contrast
          </p>
        )}
        columns={2}
      />

      {/* Layout Width */}
      <OptionSelector
        title="Layout width"
        description="Set the maximum width of content containers."
        options={LAYOUT_OPTIONS}
        selectedId={config.layoutWidth}
        onSelect={id => updateThemeProperty('layoutWidth', id)}
        renderOption={() => (
          <div className="mt-4 space-y-2">
            <div className="h-1 bg-blue-300 rounded" style={{ width: '100%' }} />
            <div className="h-1 bg-blue-300 rounded" style={{ width: '90%' }} />
            <div className="h-1 bg-blue-300 rounded" style={{ width: '85%' }} />
          </div>
        )}
        columns={3}
      />

      {/* Download Page CTA */}
      <section className="pb-16">
        <div className="section-shell">
          <div className="card">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Ready to review</p>
                <h2 className="mt-3 text-2xl font-bold">Open design review page</h2>
                <p className="mt-2 text-slate-600 dark:text-slate-300">
                  Your selected theme will open in a dedicated page where the client can preview the final design and send it to admin.
                </p>
              </div>

              <button
                type="button"
                onClick={openDownloadPage}
                disabled={isOpeningDownload}
                className="btn btn-primary px-6 py-3 disabled:opacity-60"
              >
                {isOpeningDownload ? 'Opening...' : 'Review Final Design'}
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

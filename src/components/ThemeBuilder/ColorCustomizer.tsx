import { ThemeColors } from '../../types/theme';

interface ColorCustomizerProps {
  colors: ThemeColors;
  onChange: (colors: Partial<ThemeColors>) => void;
}

export const ColorCustomizer = ({ colors, onChange }: ColorCustomizerProps) => {
  const handleColorChange = (colorType: keyof ThemeColors, value: string) => {
    onChange({ [colorType]: value });
  };

  return (
    <section className="pb-10">
      <div className="section-shell">
        <div className="card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Customize</p>
            <h2 className="mt-3 text-2xl font-bold">Color palette</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">
              Adjust the primary, secondary, and accent colors for your design system.
            </p>
          </div>

          <div className="mt-8 grid md:grid-cols-3 gap-8">
            {[
              { key: 'primary', label: 'Primary', description: 'Main interactive color' },
              { key: 'secondary', label: 'Secondary', description: 'Supporting color' },
              { key: 'accent', label: 'Accent', description: 'Highlight color' },
            ].map(color => (
              <div key={color.key} className="flex flex-col gap-3">
                <div>
                  <label className="text-sm font-semibold block">{color.label}</label>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{color.description}</p>
                </div>
                <div className="flex gap-3 items-center">
                  <input
                    type="color"
                    value={colors[color.key as keyof ThemeColors]}
                    onChange={e => handleColorChange(color.key as keyof ThemeColors, e.target.value)}
                    className="h-12 w-12 rounded-lg cursor-pointer border border-slate-300 dark:border-slate-600"
                  />
                  <input
                    type="text"
                    value={colors[color.key as keyof ThemeColors]}
                    onChange={e => handleColorChange(color.key as keyof ThemeColors, e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-sm font-mono"
                    placeholder="#000000"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

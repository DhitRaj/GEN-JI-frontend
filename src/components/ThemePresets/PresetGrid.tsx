import { PRESETS } from '../../data/presets';

interface PresetGridProps {
  selectedTheme: string;
  onSelectPreset: (presetId: string) => void;
}

export const PresetGrid = ({ selectedTheme, onSelectPreset }: PresetGridProps) => {
  return (
    <section className="pb-10">
      <div className="section-shell">
        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Start here</p>
          <h2 className="mt-3 text-2xl font-bold">Pre-built theme directions</h2>
        </div>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {PRESETS.map(preset => (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset.id)}
              className={`rounded-[1.2rem] border-2 p-6 transition-all duration-200 text-left ${
                selectedTheme === preset.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 shadow-lg'
                  : 'border-slate-200 dark:border-slate-700 hover:border-blue-300'
              }`}
            >
              <h3 className="font-bold text-lg">{preset.name}</h3>
              {preset.description && (
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {preset.description}
                </p>
              )}

              <div className="mt-4 flex gap-3">
                {[preset.colors.primary, preset.colors.secondary, preset.colors.accent].map(color => (
                  <div
                    key={color}
                    className="h-8 w-8 rounded-lg border border-slate-300 dark:border-slate-600"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {preset.typography.fontSize.toUpperCase()} type
                </span>
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {preset.spacing}
                </span>
                <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200">
                  {preset.borderRadius || 'mild'} radius
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

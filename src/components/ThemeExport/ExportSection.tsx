import { ThemeConfig } from '../../types/theme';
import { exportAsJS, exportAsCSS, exportAsTokens, exportAsTailwind } from '../../lib/exportFormats';

interface ExportSectionProps {
  config: ThemeConfig;
  selectedFormat: string;
  onFormatChange: (format: string) => void;
  onExport: (format: string) => void;
}

export const ExportSection = ({
  config,
  selectedFormat,
  onFormatChange,
  onExport,
}: ExportSectionProps) => {
  const getExportContent = (format: string) => {
    switch (format) {
      case 'js':
        return exportAsJS(config);
      case 'css':
        return exportAsCSS(config);
      case 'tokens':
        return exportAsTokens(config);
      case 'tailwind':
        return exportAsTailwind(config);
      default:
        return '';
    }
  };

  const exportContent = getExportContent(selectedFormat);

  return (
    <section className="pb-16">
      <div className="section-shell">
        <div className="card">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Ready to build</p>
              <h2 className="mt-3 text-2xl font-bold">Export your configuration</h2>
              <p className="mt-2 text-slate-600 dark:text-slate-300">
                Download your complete design system in multiple formats.
              </p>
            </div>
          </div>

          <div className="mt-6 flex gap-2 flex-wrap">
            {['js', 'css', 'tokens', 'tailwind'].map(format => (
              <button
                key={format}
                onClick={() => onFormatChange(format)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  selectedFormat === format
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100'
                }`}
              >
                {format.toUpperCase()}
              </button>
            ))}
          </div>

          <button
            onClick={() => onExport(selectedFormat)}
            className="mt-4 btn btn-primary px-6 py-3"
          >
            Download {selectedFormat.toUpperCase()}
          </button>

          <div className="mt-8 bg-slate-100 dark:bg-slate-900 rounded-lg p-6 font-mono text-sm overflow-auto max-h-64">
            <pre>{exportContent}</pre>
          </div>
        </div>
      </div>
    </section>
  );
};

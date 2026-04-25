interface SelectorOption {
  id: string;
  label: string;
  [key: string]: any;
}

interface OptionSelectorProps<T extends SelectorOption> {
  title: string;
  description: string;
  options: T[];
  selectedId: string;
  onSelect: (id: string) => void;
  renderOption?: (option: T, isSelected: boolean) => React.ReactNode;
  columns?: number;
}

export const OptionSelector = <T extends SelectorOption>({
  title,
  description,
  options,
  selectedId,
  onSelect,
  renderOption,
  columns = 3,
}: OptionSelectorProps<T>) => {
  const gridClass =
    columns === 2
      ? 'mt-8 grid md:grid-cols-2 gap-4'
      : columns === 4
        ? 'mt-8 grid md:grid-cols-4 gap-4'
        : 'mt-8 grid md:grid-cols-3 gap-4';

  return (
    <section className="pb-10">
      <div className="section-shell">
        <div className="card">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-600">Customize</p>
            <h2 className="mt-3 text-2xl font-bold">{title}</h2>
            <p className="mt-2 text-slate-600 dark:text-slate-300">{description}</p>
          </div>

          <div className={gridClass}>
            {options.map(option => (
              <button
                key={option.id}
                onClick={() => onSelect(option.id)}
                className={`relative rounded-lg border-2 p-4 transition-all text-left ${
                  selectedId === option.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30'
                    : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
                aria-pressed={selectedId === option.id}
              >
                {selectedId === option.id && (
                  <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-blue-600 text-white text-[10px] px-2 py-0.5 font-bold">
                    Selected
                  </span>
                )}
                <p className="text-xs font-semibold uppercase text-slate-500">{option.label}</p>
                {renderOption && renderOption(option, selectedId === option.id)}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

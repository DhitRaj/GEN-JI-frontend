type PageSkeletonProps = {
  cards?: number;
  columns?: 2 | 3 | 4;
};

function gridClass(columns: 2 | 3 | 4) {
  if (columns === 2) return 'md:grid-cols-2';
  if (columns === 4) return 'md:grid-cols-2 lg:grid-cols-4';
  return 'md:grid-cols-2 lg:grid-cols-3';
}

export default function PageSkeleton({ cards = 3, columns = 3 }: PageSkeletonProps) {
  return (
    <main className="min-h-screen relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 right-[-12rem] h-[28rem] w-[28rem] rounded-full bg-blue-300/20 blur-3xl" />
        <div className="absolute top-[34rem] left-[-10rem] h-[24rem] w-[24rem] rounded-full bg-cyan-300/20 blur-3xl" />
      </div>

      <div className="section-shell pt-6">
        <div className="glass-panel h-16 rounded-2xl px-4 md:px-6 flex items-center justify-between animate-pulse">
          <div className="h-6 w-32 rounded-full bg-slate-200/90" />
          <div className="hidden md:flex items-center gap-3">
            <div className="h-4 w-20 rounded-full bg-slate-200/90" />
            <div className="h-4 w-20 rounded-full bg-slate-200/90" />
            <div className="h-4 w-20 rounded-full bg-slate-200/90" />
            <div className="h-10 w-20 rounded-xl bg-slate-200/90" />
          </div>
        </div>
      </div>

      <section className="pt-20 md:pt-24 pb-12 md:pb-16">
        <div className="section-shell">
          <div className="card animate-pulse space-y-5">
            <div className="h-5 w-32 rounded-full bg-slate-200/90" />
            <div className="h-14 w-3/4 rounded-2xl bg-slate-200/90" />
            <div className="space-y-3 max-w-3xl">
              <div className="h-4 w-full rounded-full bg-slate-200/90" />
              <div className="h-4 w-[92%] rounded-full bg-slate-200/90" />
              <div className="h-4 w-[84%] rounded-full bg-slate-200/90" />
            </div>
            <div className="flex gap-2 pt-2">
              <div className="h-4 w-16 rounded-full bg-slate-200/90" />
              <div className="h-4 w-3 rounded-full bg-slate-200/90" />
              <div className="h-4 w-20 rounded-full bg-slate-200/90" />
              <div className="h-4 w-3 rounded-full bg-slate-200/90" />
              <div className="h-4 w-24 rounded-full bg-slate-200/90" />
            </div>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="section-shell">
          <div className={`grid grid-cols-1 gap-4 ${gridClass(columns)}`}>
            {Array.from({ length: cards }).map((_, index) => (
              <div key={index} className="card animate-pulse space-y-4">
                <div className="h-5 w-20 rounded-full bg-slate-200/90" />
                <div className="h-7 w-2/3 rounded-full bg-slate-200/90" />
                <div className="space-y-3">
                  <div className="h-4 w-full rounded-full bg-slate-200/90" />
                  <div className="h-4 w-[88%] rounded-full bg-slate-200/90" />
                  <div className="h-4 w-[76%] rounded-full bg-slate-200/90" />
                </div>
                <div className="flex gap-2 pt-2">
                  <div className="h-6 w-16 rounded-full bg-slate-200/90" />
                  <div className="h-6 w-20 rounded-full bg-slate-200/90" />
                  <div className="h-6 w-14 rounded-full bg-slate-200/90" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
import { Metadata } from 'next';
import ServicesPageClient from './ServicesPageClient';

export const metadata: Metadata = {
  title: 'Services | Gen-Ji Digital Studio',
  description: 'Explore our range of digital services including web development, mobile apps, and custom backend systems.',
};

export default function ServicesPage() {
  return <ServicesPageClient />;
}
          ))}
        </div>

        {/* DELIVERY PROCESS */}
        <div className="min-h-screen w-full flex items-center justify-center p-10">
          <GlassCard className="max-w-6xl w-full">
            <h2 className="text-4xl font-black text-slate-900 mb-12 uppercase tracking-widest text-center">Execution Plan</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div className="p-6 bg-black/5 rounded-2xl border border-black/5">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">01. Discovery</h4>
                  <p className="text-slate-500">We map goals, business constraints, and the user journey.</p>
                </div>
                <div className="p-6 bg-black/5 rounded-2xl border border-black/5">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">02. Design System</h4>
                  <p className="text-slate-500">We design reusable patterns so the product stays consistent.</p>
                </div>
              </div>
              <div className="space-y-8">
                <div className="p-6 bg-black/5 rounded-2xl border border-black/5">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">03. Development</h4>
                  <p className="text-slate-500">We build the experience with performance and maintainability.</p>
                </div>
                <div className="p-6 bg-black/5 rounded-2xl border border-black/5">
                  <h4 className="text-xl font-bold text-slate-900 mb-2">04. Launch</h4>
                  <p className="text-slate-500">We ship, monitor, and iterate with real usage feedback.</p>
                </div>
              </div>
            </div>
          </GlassCard>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </PageScene>
  );
}

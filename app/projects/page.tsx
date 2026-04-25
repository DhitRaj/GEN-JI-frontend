import { Metadata } from 'next';
import ProjectsPageClient from './ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projects | Gen-Ji Digital Studio',
  description: 'A showcase of our recent work and digital solutions delivered for modern businesses.',
};

export default function ProjectsPage() {
  return <ProjectsPageClient />;
}
            {insights.map((item, idx) => (
              <GlassCard key={idx} className="text-center">
                <div className="text-6xl font-black text-slate-900 mb-4 tracking-tighter">{item.value}</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">{item.title}</h3>
                <p className="text-slate-500">{item.desc}</p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* FOOTER */}
        <Footer />
      </div>
    </PageScene>
  );
}

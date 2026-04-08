'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

type AdminUser = {
  id: string;
  email: string;
  role: string;
};

type Client = {
  _id: string;
  name: string;
  email: string;
  requirement: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
};

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack?: string[];
};

type ClientsResponse = {
  clients: Client[];
};

type ProjectsResponse = {
  projects: Project[];
};

export default function AdminDashboard() {
  const [admin, setAdmin] = useState<AdminUser | null>(null);
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const initializeDashboard = async () => {
      const token = localStorage.getItem('adminToken');
      const storedAdmin = localStorage.getItem('admin');

      if (!token) {
        router.push('/admin');
        setLoading(false);
        return;
      }

      if (storedAdmin) {
        setAdmin(JSON.parse(storedAdmin) as AdminUser);
      }

      try {
        const [clientsRes, projectsRes] = await Promise.all([
          axios.get<ClientsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/clients`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get<ProjectsResponse>(`${process.env.NEXT_PUBLIC_API_URL}/api/projects`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        setClients(clientsRes.data.clients || []);
        setProjects(projectsRes.data.projects || []);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    initializeDashboard();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    router.push('/admin');
  };

  if (!admin) return null;

  return (
    <div className="min-h-screen pb-12 relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-20 right-[-10rem] h-[24rem] w-[24rem] rounded-full bg-blue-300/20 blur-3xl" />
      </div>

      <header className="pt-5">
        <div className="section-shell">
          <div className="glass-panel rounded-2xl px-4 md:px-6 py-4 flex flex-col md:flex-row justify-between gap-4 md:items-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]">
            <div>
              <h1 className="text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-slate-600 mt-1">Overview of incoming leads and active projects</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-slate-600">Welcome, {admin?.email}</span>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="section-shell py-8">
        {loading ? (
          <div className="card text-center py-12">Loading data...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Recent Clients</h2>
              {clients.length === 0 ? (
                <p className="text-slate-600">No clients yet</p>
              ) : (
                <div className="space-y-4">
                  {clients.slice(0, 5).map((client) => (
                    <div
                      key={client._id}
                      className="p-4 border border-white/70 bg-white/45 rounded-xl backdrop-blur-md"
                    >
                      <h3 className="font-semibold">{client.name}</h3>
                      <p className="text-sm text-slate-600">{client.email}</p>
                      <p className="text-sm mt-2 text-slate-700">{client.requirement}</p>
                      <span className="text-xs mt-3 inline-block px-2 py-1 bg-blue-50 text-blue-700 rounded-lg font-semibold">
                        {client.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="card">
              <h2 className="text-2xl font-bold mb-6">Projects</h2>
              {projects.length === 0 ? (
                <p className="text-slate-600">No projects yet</p>
              ) : (
                <div className="space-y-4">
                  {projects.slice(0, 5).map((project) => (
                    <div
                      key={project._id}
                      className="p-4 border border-white/70 bg-white/45 rounded-xl backdrop-blur-md"
                    >
                      <h3 className="font-semibold">{project.title}</h3>
                      <p className="text-sm text-slate-600 line-clamp-2">
                        {project.description}
                      </p>
                      <div className="flex gap-2 mt-2">
                        {project.techStack?.slice(0, 3).map((tech, idx) => (
                          <span
                            key={idx}
                            className="text-xs px-2 py-1 bg-slate-100 rounded-lg"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{clients.length}</div>
            <p className="text-slate-600">Total Clients</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">{projects.length}</div>
            <p className="text-slate-600">Total Projects</p>
          </div>
          <div className="card text-center">
            <div className="text-3xl font-bold text-blue-600">
              {clients.filter((c: Client) => c.status === 'new').length}
            </div>
            <p className="text-slate-600">New Inquiries</p>
          </div>
        </div>
      </main>
    </div>
  );
}

'use client';

import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, requests: 0 });
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }

    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [clientsRes, projectsRes] = await Promise.all([
        fetch(`${API_URL}/api/clients`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const clientsData = await clientsRes.json();
      const projectsData = await projectsRes.json();

      setStats({
        clients: clientsData.clients?.length || 0,
        projects: projectsData.projects?.length || 0,
        requests: clientsData.clients?.filter((c: any) => c.status === 'new').length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
        <h2 style={{ margin: '0 0 30px 0', fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
          Gen-Ji Admin
        </h2>
        
        <nav>
          <a href="/admin/dashboard" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', background: '#eff6ff', color: '#2563eb', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Dashboard
          </a>
          <a href="/admin/projects" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Projects
          </a>
          <a href="/admin/clients" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Clients
          </a>
          <a href="/admin/content" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Content
          </a>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '12px',
            background: '#fee2e2',
            color: '#dc2626',
            border: 'none',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px' }}>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Projects</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>
              {loading ? '-' : stats.projects}
            </p>
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Clients</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>
              {loading ? '-' : stats.clients}
            </p>
          </div>
          
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>New Requests</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>
              {loading ? '-' : stats.requests}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
            <a href="/admin/projects" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>Manage Projects</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Add, edit, or delete projects</p>
            </a>
            <a href="/admin/clients" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>View Clients</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Manage client requests</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

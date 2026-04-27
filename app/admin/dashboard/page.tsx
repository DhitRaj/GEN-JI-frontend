'use client';

import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

export default function Dashboard() {
  const [stats, setStats] = useState({ clients: 0, projects: 0, requests: 0, users: 0, services: 0 });
  const [loading, setLoading] = useState(true);
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  const fetchStats = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const [clientsRes, projectsRes, usersRes, servicesRes] = await Promise.all([
        fetch(`${API_URL}/api/clients`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/projects`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/users`, {
          headers: { Authorization: `Bearer ${token}` }
        }),
        fetch(`${API_URL}/api/services`, {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);

      const clientsData = await clientsRes.json();
      const projectsData = await projectsRes.json();
      const usersData = await usersRes.json();
      const servicesData = await servicesRes.json();

      setStats({
        clients: clientsData.clients?.length || 0,
        projects: projectsData.projects?.length || 0,
        requests: clientsData.clients?.filter((c: any) => c.status === 'new').length || 0,
        users: usersData.users?.length || 0,
        services: servicesData.services?.length || 0
      });
    } catch (error) {
      console.error('Failed to fetch stats:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <AdminLayout>
      <div>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
          Dashboard
        </h1>

        {/* Stats Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
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

          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Users</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>
              {loading ? '-' : stats.users}
            </p>
          </div>

          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
            <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#64748b', fontWeight: '500' }}>Total Services</p>
            <p style={{ margin: 0, fontSize: '32px', fontWeight: '700', color: '#0f172a' }}>
              {loading ? '-' : stats.services}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
          <h2 style={{ margin: '0 0 16px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
            Quick Actions
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '12px' }}>
            <a href="/admin/projects" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>💼 Manage Projects</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Add, edit, or delete projects</p>
            </a>
            <a href="/admin/clients" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>👥 View Clients</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Manage client requests</p>
            </a>
            <a href="/admin/services" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>⚙️ Manage Services</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Add or edit services</p>
            </a>
            <a href="/admin/users" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>👤 User Management</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Manage system users</p>
            </a>
            <a href="/admin/media" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>🖼️ Media Library</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Upload and manage images</p>
            </a>
            <a href="/admin/settings" style={{ padding: '16px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', textDecoration: 'none', color: '#0f172a' }}>
              <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600' }}>⚙️ Site Settings</p>
              <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>Configure site settings</p>
            </a>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

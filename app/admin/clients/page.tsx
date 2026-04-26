'use client';

import { useEffect, useState } from 'react';

type Client = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  requirement: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed';
  createdAt: string;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }

    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/clients`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      setClients(data.clients || []);
    } catch (error) {
      console.error('Failed to fetch clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: Client['status']) => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/clients/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });

      if (response.ok) {
        fetchClients();
      } else {
        alert('Failed to update status');
      }
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Failed to update status');
    }
  };

  const deleteClient = async (id: string) => {
    if (!confirm('Delete this client request?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/clients/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        fetchClients();
      } else {
        alert('Failed to delete request');
      }
    } catch (error) {
      console.error('Failed to delete request:', error);
      alert('Failed to delete request');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    window.location.href = '/admin';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      <div style={{ width: '250px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
        <h2 style={{ margin: '0 0 30px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
          Gen-Ji Admin
        </h2>

        <nav>
          <a href="/admin/dashboard" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Dashboard
          </a>
          <a href="/admin/projects" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Projects
          </a>
          <a href="/admin/clients" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', background: '#3b82f6', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Clients
          </a>
        </nav>

        <button
          onClick={handleLogout}
          style={{
            width: '100%',
            marginTop: '30px',
            padding: '12px',
            background: 'white',
            color: '#dc2626',
            border: '1px solid #fecaca',
            borderRadius: '6px',
            fontSize: '14px',
            fontWeight: '600',
            cursor: 'pointer',
          }}
        >
          Logout
        </button>
      </div>

      <div style={{ flex: 1, padding: '30px', background: '#ffffff' }}>
        <h1 style={{ margin: '0 0 24px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>Client Requests</h1>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading requests...</div>
        ) : clients.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '8px', border: '2px dashed #e2e8f0' }}>
            <p style={{ margin: 0, fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>No client requests yet</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '12px' }}>
            {clients.map((client) => (
              <div key={client._id} style={{ border: '1px solid #e2e8f0', borderRadius: '8px', padding: '16px', background: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ margin: '0 0 6px 0', fontSize: '18px', color: '#0f172a' }}>{client.name}</h3>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', color: '#475569' }}>{client.email}</p>
                    {client.phone && <p style={{ margin: 0, fontSize: '14px', color: '#475569' }}>{client.phone}</p>}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <select
                      value={client.status}
                      onChange={(e) => updateStatus(client._id, e.target.value as Client['status'])}
                      style={{ padding: '8px', borderRadius: '6px', border: '1px solid #cbd5e1', fontSize: '13px' }}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                    <button
                      onClick={() => deleteClient(client._id)}
                      style={{ padding: '8px 12px', borderRadius: '6px', border: '1px solid #fecaca', background: '#fee2e2', color: '#b91c1c', cursor: 'pointer' }}
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <p style={{ margin: '12px 0 8px 0', color: '#1e293b', whiteSpace: 'pre-wrap', lineHeight: 1.5 }}>
                  {client.requirement}
                </p>
                <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                  Submitted: {new Date(client.createdAt).toLocaleString('en-IN')}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

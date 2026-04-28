'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [admin, setAdmin] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const adminData = localStorage.getItem('admin');
    
    if (!token || !adminData) {
      router.push('/admin');
      return;
    }

    setAdmin(JSON.parse(adminData));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('admin');
    router.push('/admin');
  };

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { path: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/admin/projects', label: 'Projects', icon: '💼' },
    { path: '/admin/clients', label: 'Clients', icon: '👥' },
    { path: '/admin/services', label: 'Services', icon: '⚙️' },
    { path: '/admin/users', label: 'User Management', icon: '👤' },
    { path: '/admin/media', label: 'Media Library', icon: '🖼️' },
    { path: '/admin/settings', label: 'Site Settings', icon: '⚙️' },
  ];

  if (!admin) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '280px', background: 'white', borderRight: '1px solid #e2e8f0', padding: '20px', position: 'fixed', height: '100vh', overflowY: 'auto' }}>
        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>
            Gen-Ji Admin
          </h2>
          <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
            {admin.email}
          </p>
        </div>
        
        <nav>
          {menuItems.map((item) => (
            <a
              key={item.path}
              href={item.path}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 16px',
                marginBottom: '4px',
                background: isActive(item.path) ? '#eff6ff' : 'transparent',
                color: isActive(item.path) ? '#2563eb' : '#64748b',
                borderRadius: '6px',
                textDecoration: 'none',
                fontSize: '14px',
                fontWeight: '500',
                transition: 'all 0.2s',
              }}
            >
              <span style={{ fontSize: '18px' }}>{item.icon}</span>
              <span>{item.label}</span>
            </a>
          ))}
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
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
          }}
        >
          <span>🚪</span>
          <span>Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div style={{ marginLeft: '280px', flex: 1, padding: '30px', minHeight: '100vh' }}>
        {children}
      </div>
    </div>
  );
}

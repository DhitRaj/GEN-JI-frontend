'use client';

import { useState } from 'react';

export default function AdminPanelLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [debugInfo, setDebugInfo] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setDebugInfo('Connecting to backend...');
    
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';
      console.log('API URL:', apiUrl); // Debug log
      setDebugInfo(`Trying: ${apiUrl}/api/auth/login`);
      
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      setDebugInfo(`Response status: ${response.status}`);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Login failed' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      setDebugInfo('Login successful! Redirecting...');
      
      localStorage.setItem('adminToken', data.token);
      localStorage.setItem('admin', JSON.stringify(data.admin));
      
      setTimeout(() => {
        window.location.href = '/admin-panel/dashboard';
      }, 500);
    } catch (err: any) {
      console.error('Login error:', err);
      setError(err.message || 'Login failed. Please try again.');
      setDebugInfo(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: '#f1f5f9',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        background: 'white',
        padding: '40px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '400px',
        width: '100%'
      }}>
        <h1 style={{ margin: '0 0 8px 0', fontSize: '24px', fontWeight: '600', color: '#1e293b' }}>
          Admin Login
        </h1>
        <p style={{ margin: '0 0 24px 0', fontSize: '14px', color: '#64748b' }}>
          Gen-Ji Admin Panel
        </p>

        {/* Debug Info */}
        {debugInfo && (
          <div style={{
            background: '#f0f9ff',
            border: '1px solid #bae6fd',
            color: '#0369a1',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '12px',
            fontFamily: 'monospace'
          }}>
            {debugInfo}
          </div>
        )}

        {error && (
          <div style={{
            background: '#fee2e2',
            border: '1px solid #fecaca',
            color: '#dc2626',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="admin@gen-ji.me"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px 12px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                fontSize: '14px',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              background: loading ? '#94a3b8' : '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div style={{ marginTop: '16px', padding: '12px', background: '#f8fafc', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
          <p style={{ margin: '0 0 4px 0', fontSize: '12px', fontWeight: '600', color: '#64748b' }}>
            Default Credentials:
          </p>
          <p style={{ margin: 0, fontSize: '12px', color: '#94a3b8', fontFamily: 'monospace' }}>
            admin@gen-ji.me<br/>
            AdminPass@2024!
          </p>
        </div>

        <div style={{ marginTop: '12px', padding: '12px', background: '#fffbeb', borderRadius: '4px', border: '1px solid #fde68a' }}>
          <p style={{ margin: 0, fontSize: '11px', color: '#92400e' }}>
            ⚠️ First request may take 30-60 seconds (Render cold start)
          </p>
        </div>
      </div>
    </div>
  );
}

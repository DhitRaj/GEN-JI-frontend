'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios, { AxiosError } from 'axios';

type LoginFormData = {
  email: string;
  password: string;
};

type LoginResponse = {
  token: string;
  admin: {
    id: string;
    email: string;
    role: string;
  };
};

type ApiErrorResponse = {
  error?: string;
};

export default function AdminLogin() {
  const [formData, setFormData] = useState<LoginFormData>({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post<LoginResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
        formData
      );

      // Store token
      localStorage.setItem('adminToken', response.data.token);
      localStorage.setItem('admin', JSON.stringify(response.data.admin));

      router.push('/admin/dashboard');
    } catch (err) {
      const axiosError = err as AxiosError<ApiErrorResponse>;
      setError(axiosError.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-6">
        <div className="card hidden lg:flex flex-col justify-between">
          <div>
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 text-xs font-semibold">
              Admin Workspace
            </span>
            <h2 className="text-4xl font-bold mt-5">Control your pipeline end-to-end.</h2>
            <p className="text-slate-600 mt-4 leading-relaxed">
              Track leads, update project status, and keep your service portfolio fresh from one clean dashboard.
            </p>
          </div>
          <div className="mt-10 rounded-2xl border border-white/70 bg-white/45 p-4 backdrop-blur-md">
            <p className="text-sm text-slate-500">Tip</p>
            <p className="text-sm mt-1 text-slate-700">Use strong credentials and rotate admin passwords regularly.</p>
          </div>
        </div>

        <div className="card w-full">
          <div className="text-center mb-6">
            <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 text-blue-700 px-4 py-1 text-xs font-semibold mb-4">
              Secure Admin Access
            </span>
            <h1 className="text-3xl font-bold">Admin Login</h1>
            <p className="text-slate-600 text-sm mt-2">Manage clients, services and projects.</p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-xl">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-white/70 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-white/70 rounded-xl bg-white/70 focus:outline-none focus:ring-2 focus:ring-blue-600 backdrop-blur-md"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <p className="text-center text-sm text-slate-600 mt-5">
            Default: admin@gen-ji.com / ChangeMe@123
          </p>
        </div>
      </div>
    </div>
  );
}

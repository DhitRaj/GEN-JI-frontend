import Link from 'next/link';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import PageHero from '../../components/PageHero';

interface DesignRequest {
  id: string;
  name: string;
  email: string;
  message: string;
  designSlug: string;
  designTitle: string;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  submittedAt: string;
  themeCustomization?: any;
}

async function getDesignRequests(): Promise<DesignRequest[]> {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/requests`, {
      cache: 'no-store', // Prevent caching for real-time data
    });
    
    if (!response.ok) return [];
    
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching design requests:', error);
    return [];
  }
}

const statusColors = {
  pending: 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
  reviewed: 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
  approved: 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400',
  rejected: 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400',
};

export default async function AdminPage() {
  const requests = await getDesignRequests();

  return (
    <main className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950">
      <Navbar />

      <PageHero
        eyebrow="Admin Dashboard"
        title="Manage Design Requests"
        description="View and manage all client design requests with their customization details."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Admin Dashboard' },
        ]}
      />

      <div className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {requests.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                No design requests yet.
              </p>
              <Link
                href="/designs"
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Browse Designs
              </Link>
            </div>
          ) : (
            <div className="card overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-100 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Client
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Design
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Customization
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-900 dark:text-white">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                    {requests.map((request) => (
                      <tr
                        key={request.id}
                        className="hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white font-medium">
                          {request.name}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {request.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900 dark:text-white">
                          {request.designTitle || request.designSlug}
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                          {new Date(request.submittedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              statusColors[request.status]
                            }`}
                          >
                            {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-center">
                          {request.themeCustomization ? (
                            <span className="inline-block px-2 py-1 rounded-md bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400 text-xs font-semibold">
                              ✓ Theme
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          <Link
                            href={`/admin/requests/${request.id}`}
                            className="inline-block px-3 py-1 rounded-md bg-blue-600 text-white text-xs font-semibold hover:bg-blue-700 transition-colors"
                          >
                            View Details
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  );
}

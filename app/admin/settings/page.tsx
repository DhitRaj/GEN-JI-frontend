'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

type Settings = {
  siteName: string;
  siteTagline: string;
  siteDescription: string;
  logo: string;
  favicon: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  socialLinks: {
    facebook: string;
    twitter: string;
    linkedin: string;
    instagram: string;
    github: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    metaKeywords: string;
    ogImage: string;
  };
  analytics: {
    googleAnalyticsId: string;
    facebookPixelId: string;
  };
  maintenance: {
    enabled: boolean;
    message: string;
  };
};

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [uploadingFavicon, setUploadingFavicon] = useState(false);
  const [uploadingOgImage, setUploadingOgImage] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  const fetchSettings = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/settings`);
      const data = await response.json();
      if (data.success) {
        setSettings(data.settings);
      }
    } catch (error) {
      console.error('Failed to fetch settings:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    field: 'logo' | 'favicon' | 'ogImage'
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    if (field === 'logo') setUploadingLogo(true);
    if (field === 'favicon') setUploadingFavicon(true);
    if (field === 'ogImage') setUploadingOgImage(true);

    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (settings) {
          if (field === 'ogImage') {
            setSettings({
              ...settings,
              seo: { ...settings.seo, ogImage: base64String },
            });
          } else {
            setSettings({ ...settings, [field]: base64String });
          }
        }
        if (field === 'logo') setUploadingLogo(false);
        if (field === 'favicon') setUploadingFavicon(false);
        if (field === 'ogImage') setUploadingOgImage(false);
      };
      reader.onerror = () => {
        alert('Failed to read image');
        if (field === 'logo') setUploadingLogo(false);
        if (field === 'favicon') setUploadingFavicon(false);
        if (field === 'ogImage') setUploadingOgImage(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to process image');
      if (field === 'logo') setUploadingLogo(false);
      if (field === 'favicon') setUploadingFavicon(false);
      if (field === 'ogImage') setUploadingOgImage(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/settings`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(settings),
      });

      const data = await response.json();

      if (data.success) {
        alert('Settings saved successfully!');
        fetchSettings();
      } else {
        alert(data.error || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !settings) {
    return (
      <AdminLayout>
        <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
            Site Settings
          </h1>
          <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
            Configure your website settings, branding, and integrations
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* General Settings */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              General Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Site Name
                </label>
                <input
                  type="text"
                  value={settings.siteName}
                  onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Site Tagline
                </label>
                <input
                  type="text"
                  value={settings.siteTagline}
                  onChange={(e) => setSettings({ ...settings, siteTagline: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Site Description
                </label>
                <textarea
                  value={settings.siteDescription}
                  onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Branding */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              Branding
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Logo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'logo')}
                  style={{ display: 'none' }}
                  id="logoUpload"
                  disabled={uploadingLogo}
                />
                <label
                  htmlFor="logoUpload"
                  style={{
                    display: 'block',
                    padding: '12px',
                    border: '2px dashed #d1d5db',
                    borderRadius: '6px',
                    textAlign: 'center',
                    cursor: uploadingLogo ? 'not-allowed' : 'pointer',
                    background: '#f8fafc',
                  }}
                >
                  {uploadingLogo ? 'Processing...' : 'Click to upload logo'}
                </label>
                {settings.logo && (
                  <div style={{ marginTop: '12px' }}>
                    <Image
                      src={settings.logo}
                      alt="Logo"
                      width={200}
                      height={100}
                      unoptimized
                      style={{ width: '100%', height: 'auto', maxHeight: '100px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', background: 'white' }}
                    />
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Favicon
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'favicon')}
                  style={{ display: 'none' }}
                  id="faviconUpload"
                  disabled={uploadingFavicon}
                />
                <label
                  htmlFor="faviconUpload"
                  style={{
                    display: 'block',
                    padding: '12px',
                    border: '2px dashed #d1d5db',
                    borderRadius: '6px',
                    textAlign: 'center',
                    cursor: uploadingFavicon ? 'not-allowed' : 'pointer',
                    background: '#f8fafc',
                  }}
                >
                  {uploadingFavicon ? 'Processing...' : 'Click to upload favicon'}
                </label>
                {settings.favicon && (
                  <div style={{ marginTop: '12px' }}>
                    <Image
                      src={settings.favicon}
                      alt="Favicon"
                      width={64}
                      height={64}
                      unoptimized
                      style={{ width: '64px', height: '64px', objectFit: 'contain', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '8px', background: 'white' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              Contact Information
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={settings.contactEmail}
                  onChange={(e) => setSettings({ ...settings, contactEmail: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Contact Phone
                </label>
                <input
                  type="tel"
                  value={settings.contactPhone}
                  onChange={(e) => setSettings({ ...settings, contactPhone: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Address
                </label>
                <textarea
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  rows={2}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              Social Media Links
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Facebook
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.facebook}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                    })
                  }
                  placeholder="https://facebook.com/yourpage"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Twitter
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.twitter}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                    })
                  }
                  placeholder="https://twitter.com/yourhandle"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  LinkedIn
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.linkedin}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                    })
                  }
                  placeholder="https://linkedin.com/company/yourcompany"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Instagram
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.instagram}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                    })
                  }
                  placeholder="https://instagram.com/yourhandle"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  GitHub
                </label>
                <input
                  type="url"
                  value={settings.socialLinks.github}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      socialLinks: { ...settings.socialLinks, github: e.target.value },
                    })
                  }
                  placeholder="https://github.com/yourorg"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              SEO Settings
            </h2>

            <div style={{ display: 'grid', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Meta Title
                </label>
                <input
                  type="text"
                  value={settings.seo.metaTitle}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaTitle: e.target.value },
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Meta Description
                </label>
                <textarea
                  value={settings.seo.metaDescription}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaDescription: e.target.value },
                    })
                  }
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Meta Keywords (comma separated)
                </label>
                <input
                  type="text"
                  value={settings.seo.metaKeywords}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      seo: { ...settings.seo, metaKeywords: e.target.value },
                    })
                  }
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  OG Image (for social sharing)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'ogImage')}
                  style={{ display: 'none' }}
                  id="ogImageUpload"
                  disabled={uploadingOgImage}
                />
                <label
                  htmlFor="ogImageUpload"
                  style={{
                    display: 'block',
                    padding: '12px',
                    border: '2px dashed #d1d5db',
                    borderRadius: '6px',
                    textAlign: 'center',
                    cursor: uploadingOgImage ? 'not-allowed' : 'pointer',
                    background: '#f8fafc',
                  }}
                >
                  {uploadingOgImage ? 'Processing...' : 'Click to upload OG image'}
                </label>
                {settings.seo.ogImage && (
                  <div style={{ marginTop: '12px' }}>
                    <Image
                      src={settings.seo.ogImage}
                      alt="OG Image"
                      width={400}
                      height={200}
                      unoptimized
                      style={{ width: '100%', height: 'auto', maxHeight: '200px', objectFit: 'cover', border: '1px solid #e2e8f0', borderRadius: '6px' }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Analytics */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              Analytics & Tracking
            </h2>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Google Analytics ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.googleAnalyticsId}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      analytics: { ...settings.analytics, googleAnalyticsId: e.target.value },
                    })
                  }
                  placeholder="G-XXXXXXXXXX"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Facebook Pixel ID
                </label>
                <input
                  type="text"
                  value={settings.analytics.facebookPixelId}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      analytics: { ...settings.analytics, facebookPixelId: e.target.value },
                    })
                  }
                  placeholder="XXXXXXXXXXXXXXX"
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '6px',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Maintenance Mode */}
          <div style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0', marginBottom: '20px' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: '18px', fontWeight: '600', color: '#0f172a' }}>
              Maintenance Mode
            </h2>

            <div style={{ marginBottom: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={settings.maintenance.enabled}
                  onChange={(e) =>
                    setSettings({
                      ...settings,
                      maintenance: { ...settings.maintenance, enabled: e.target.checked },
                    })
                  }
                  style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                  Enable Maintenance Mode
                </span>
              </label>
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                Maintenance Message
              </label>
              <textarea
                value={settings.maintenance.message}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    maintenance: { ...settings.maintenance, message: e.target.value },
                  })
                }
                rows={3}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  border: '1px solid #d1d5db',
                  borderRadius: '6px',
                  fontSize: '14px',
                  resize: 'vertical',
                }}
              />
            </div>
          </div>

          {/* Save Button */}
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                padding: '14px 32px',
                background: saving ? '#94a3b8' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '16px',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
              }}
            >
              {saving ? 'Saving...' : 'Save Settings'}
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}

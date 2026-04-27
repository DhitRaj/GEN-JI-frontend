'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

type Media = {
  _id: string;
  filename: string;
  originalName: string;
  mimeType: string;
  size: number;
  data: string;
  alt?: string;
  caption?: string;
  createdAt: string;
};

export default function MediaPage() {
  const [media, setMedia] = useState<Media[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(null);
  const [editData, setEditData] = useState({ alt: '', caption: '' });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  const fetchMedia = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/media`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setMedia(data.media);
      }
    } catch (error) {
      console.error('Failed to fetch media:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchMedia();
  }, [fetchMedia]);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      const token = localStorage.getItem('adminToken');

      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Check file size (max 2MB)
        if (file.size > 2 * 1024 * 1024) {
          alert(`${file.name} is too large. Max size is 2MB`);
          continue;
        }

        // Convert to base64
        const reader = new FileReader();
        reader.onloadend = async () => {
          const base64String = reader.result as string;

          const mediaData = {
            filename: `${Date.now()}-${file.name}`,
            originalName: file.name,
            mimeType: file.type,
            size: file.size,
            data: base64String,
            alt: '',
            caption: '',
          };

          const response = await fetch(`${API_URL}/api/media`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(mediaData),
          });

          const data = await response.json();

          if (data.success) {
            fetchMedia();
          } else {
            alert(`Failed to upload ${file.name}`);
          }
        };

        reader.readAsDataURL(file);
      }

      alert('Upload complete!');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload files');
    } finally {
      setUploading(false);
      e.target.value = '';
    }
  };

  const handleUpdateMedia = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedia) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/media/${selectedMedia._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editData),
      });

      const data = await response.json();

      if (data.success) {
        alert('Media updated successfully!');
        setSelectedMedia(null);
        setEditData({ alt: '', caption: '' });
        fetchMedia();
      } else {
        alert(data.error || 'Failed to update media');
      }
    } catch (error) {
      console.error('Error updating media:', error);
      alert('Failed to update media');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this media?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/media/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();

      if (data.success) {
        alert('Media deleted successfully!');
        fetchMedia();
      } else {
        alert(data.error || 'Failed to delete media');
      }
    } catch (error) {
      console.error('Error deleting media:', error);
      alert('Failed to delete media');
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  return (
    <AdminLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
              Media Library
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Upload and manage images (stored in MongoDB)
            </p>
          </div>
          <div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              style={{ display: 'none' }}
              id="mediaUpload"
              disabled={uploading}
            />
            <label
              htmlFor="mediaUpload"
              style={{
                display: 'inline-block',
                padding: '12px 24px',
                background: uploading ? '#94a3b8' : '#2563eb',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: uploading ? 'not-allowed' : 'pointer',
              }}
            >
              {uploading ? 'Uploading...' : '+ Upload Images'}
            </label>
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {media.length === 0 ? (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '60px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>🖼️</div>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>No media yet</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Click "Upload Images" to add your first media</p>
              </div>
            ) : (
              media.map((item) => (
                <div key={item._id} style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                  <div style={{ position: 'relative', width: '100%', height: '200px', background: '#f8fafc' }}>
                    <Image
                      src={item.data}
                      alt={item.alt || item.originalName}
                      fill
                      unoptimized
                      style={{ objectFit: 'cover' }}
                    />
                  </div>
                  <div style={{ padding: '16px' }}>
                    <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#0f172a', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.originalName}
                    </p>
                    <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#64748b' }}>
                      {formatFileSize(item.size)} • {new Date(item.createdAt).toLocaleDateString()}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => {
                          setSelectedMedia(item);
                          setEditData({ alt: item.alt || '', caption: item.caption || '' });
                        }}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          background: '#eff6ff',
                          color: '#2563eb',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => copyToClipboard(item.data)}
                        style={{
                          flex: 1,
                          padding: '6px 12px',
                          background: '#f0fdf4',
                          color: '#16a34a',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                      >
                        Copy
                      </button>
                      <button
                        onClick={() => handleDelete(item._id)}
                        style={{
                          padding: '6px 12px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '12px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Edit Modal */}
        {selectedMedia && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
          }}>
            <div style={{
              background: 'white',
              borderRadius: '8px',
              padding: '24px',
              width: '100%',
              maxWidth: '500px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                Edit Media Details
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <Image
                  src={selectedMedia.data}
                  alt={selectedMedia.originalName}
                  width={500}
                  height={300}
                  unoptimized
                  style={{ width: '100%', height: 'auto', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                />
              </div>

              <form onSubmit={handleUpdateMedia}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Alt Text
                  </label>
                  <input
                    type="text"
                    value={editData.alt}
                    onChange={(e) => setEditData({ ...editData, alt: e.target.value })}
                    placeholder="Describe the image"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Caption
                  </label>
                  <textarea
                    value={editData.caption}
                    onChange={(e) => setEditData({ ...editData, caption: e.target.value })}
                    rows={3}
                    placeholder="Add a caption"
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

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedMedia(null);
                      setEditData({ alt: '', caption: '' });
                    }}
                    style={{
                      padding: '10px 20px',
                      background: '#f3f4f6',
                      color: '#374151',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    style={{
                      padding: '10px 20px',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      fontSize: '14px',
                      fontWeight: '600',
                      cursor: 'pointer',
                    }}
                  >
                    Update Media
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

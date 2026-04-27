'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';

type Service = {
  _id: string;
  title: string;
  description: string;
  icon?: string;
  image?: string;
  features?: string[];
  price?: string;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    image: '',
    features: '',
    price: '',
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  const fetchServices = useCallback(async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/services`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.success) {
        setServices(data.services);
      }
    } catch (error) {
      console.error('Failed to fetch services:', error);
    } finally {
      setLoading(false);
    }
  }, [API_URL]);

  useEffect(() => {
    fetchServices();
  }, [fetchServices]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setUploading(true);
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({ ...formData, image: base64String });
        setUploading(false);
      };
      reader.onerror = () => {
        alert('Failed to read image');
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to process image');
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const token = localStorage.getItem('adminToken');
      const url = editingService
        ? `${API_URL}/api/services/${editingService._id}`
        : `${API_URL}/api/services`;
      
      const method = editingService ? 'PUT' : 'POST';
      
      const serviceData = {
        ...formData,
        features: formData.features.split('\n').map(f => f.trim()).filter(f => f),
      };

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(serviceData),
      });

      const data = await response.json();
      
      if (data.success) {
        alert(editingService ? 'Service updated successfully!' : 'Service created successfully!');
        setShowModal(false);
        setEditingService(null);
        setFormData({ title: '', description: '', icon: '', features: '', price: '' });
        fetchServices();
      } else {
        alert(data.error || 'Failed to save service');
      }
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service');
    }
  };

  const handleEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      icon: service.icon || '',
      image: service.image || '',
      features: service.features?.join('\n') || '',
      price: service.price || '',
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/services/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await response.json();
      
      if (data.success) {
        alert('Service deleted successfully!');
        fetchServices();
      } else {
        alert(data.error || 'Failed to delete service');
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service');
    }
  };

  return (
    <AdminLayout>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h1 style={{ margin: '0 0 4px 0', fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>
              Services Management
            </h1>
            <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>
              Manage services offered by Gen-Ji
            </p>
          </div>
          <button
            onClick={() => {
              setEditingService(null);
              setFormData({ title: '', description: '', icon: '', image: '', features: '', price: '' });
              setShowModal(true);
            }}
            style={{
              padding: '12px 24px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            + Add Service
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px' }}>Loading...</div>
        ) : (
          <div style={{ display: 'grid', gap: '16px' }}>
            {services.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>No services yet</p>
                <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Click "Add Service" to create your first service</p>
              </div>
            ) : (
              services.map((service) => (
                <div key={service._id} style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', gap: '20px' }}>
                    {service.image && (
                      <div style={{ flexShrink: 0 }}>
                        <Image
                          src={service.image}
                          alt={service.title}
                          width={120}
                          height={120}
                          unoptimized
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                        />
                      </div>
                    )}
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
                        {service.icon && <span style={{ fontSize: '32px' }}>{service.icon}</span>}
                        <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{service.title}</h3>
                      </div>
                      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>
                        {service.description}
                      </p>
                      {service.features && service.features.length > 0 && (
                        <div style={{ marginBottom: '12px' }}>
                          <p style={{ margin: '0 0 8px 0', fontSize: '13px', fontWeight: '600', color: '#374151' }}>Features:</p>
                          <ul style={{ margin: 0, paddingLeft: '20px' }}>
                            {service.features.map((feature, idx) => (
                              <li key={idx} style={{ fontSize: '13px', color: '#64748b', marginBottom: '4px' }}>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {service.price && (
                        <p style={{ margin: 0, fontSize: '16px', fontWeight: '700', color: '#2563eb' }}>
                          {service.price}
                        </p>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button
                        onClick={() => handleEdit(service)}
                        style={{
                          padding: '8px 16px',
                          background: '#eff6ff',
                          color: '#2563eb',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '13px',
                          fontWeight: '500',
                          cursor: 'pointer',
                        }}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(service._id)}
                        style={{
                          padding: '8px 16px',
                          background: '#fee2e2',
                          color: '#dc2626',
                          border: 'none',
                          borderRadius: '4px',
                          fontSize: '13px',
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

        {/* Modal */}
        {showModal && (
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
              maxWidth: '600px',
              maxHeight: '90vh',
              overflowY: 'auto',
            }}>
              <h2 style={{ margin: '0 0 20px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
                {editingService ? 'Edit Service' : 'Add New Service'}
              </h2>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Service Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
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

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="💻"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Service Image
                  </label>
                  <div style={{ border: '2px dashed #e2e8f0', borderRadius: '6px', padding: '20px', textAlign: 'center', background: '#f8fafc' }}>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                      id="imageUpload"
                      disabled={uploading}
                    />
                    <label htmlFor="imageUpload" style={{ cursor: uploading ? 'not-allowed' : 'pointer' }}>
                      <div style={{ fontSize: '40px', marginBottom: '8px' }}>📁</div>
                      <p style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#3b82f6' }}>
                        {uploading ? 'Processing...' : 'Click to upload image'}
                      </p>
                      <p style={{ margin: 0, fontSize: '12px', color: '#64748b' }}>
                        PNG, JPG up to 2MB (stored in MongoDB)
                      </p>
                    </label>
                  </div>
                  {formData.image && (
                    <div style={{ marginTop: '12px' }}>
                      <Image
                        src={formData.image}
                        alt="Preview"
                        width={200}
                        height={200}
                        unoptimized
                        style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #e2e8f0' }}
                      />
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, image: '' })}
                        style={{ marginTop: '8px', padding: '6px 12px', background: '#fee2e2', color: '#dc2626', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                      >
                        Remove Image
                      </button>
                    </div>
                  )}
                </div>

                <div style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Features (one per line)
                  </label>
                  <textarea
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    rows={6}
                    placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
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

                <div style={{ marginBottom: '24px' }}>
                  <label style={{ display: 'block', marginBottom: '6px', fontSize: '14px', fontWeight: '500', color: '#374151' }}>
                    Price
                  </label>
                  <input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Starting from ₹50,000"
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      border: '1px solid #d1d5db',
                      borderRadius: '6px',
                      fontSize: '14px',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false);
                      setEditingService(null);
                      setFormData({ title: '', description: '', icon: '', image: '', features: '', price: '' });
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
                    {editingService ? 'Update Service' : 'Create Service'}
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

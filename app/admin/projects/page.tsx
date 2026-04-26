'use client';

import { useEffect, useState } from 'react';

type Project = {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  image?: string;
  liveUrl?: string;
  featured?: boolean;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    image: '',
    liveUrl: '',
    featured: false
  });

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gen-ji-backend.onrender.com';

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      window.location.href = '/admin';
      return;
    }
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(`${API_URL}/api/projects`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setProjects(data.projects || []);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      alert('Image size should be less than 2MB');
      return;
    }

    setUploading(true);
    try {
      // Convert to base64
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
    const token = localStorage.getItem('adminToken');
    
    const projectData = {
      ...formData,
      techStack: formData.techStack.split(',').map(t => t.trim()).filter(t => t)
    };

    try {
      const url = editingId 
        ? `${API_URL}/api/projects/${editingId}`
        : `${API_URL}/api/projects`;
      
      const response = await fetch(url, {
        method: editingId ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        resetForm();
        fetchProjects();
        alert('Project saved successfully!');
      } else {
        alert('Failed to save project');
      }
    } catch (error) {
      console.error('Failed to save project:', error);
      alert('Failed to save project');
    }
  };

  const handleEdit = (project: Project) => {
    setFormData({
      title: project.title,
      description: project.description,
      techStack: project.techStack.join(', '),
      image: project.image || '',
      liveUrl: project.liveUrl || '',
      featured: project.featured || false
    });
    setEditingId(project._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    
    const token = localStorage.getItem('adminToken');
    try {
      const response = await fetch(`${API_URL}/api/projects/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (response.ok) {
        fetchProjects();
        alert('Project deleted successfully!');
      }
    } catch (error) {
      console.error('Failed to delete project:', error);
      alert('Failed to delete project');
    }
  };

  const resetForm = () => {
    setFormData({ title: '', description: '', techStack: '', image: '', liveUrl: '', featured: false });
    setEditingId(null);
    setShowForm(false);
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/admin';
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#ffffff', fontFamily: 'system-ui, sans-serif' }}>
      {/* Sidebar */}
      <div style={{ width: '250px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', padding: '20px' }}>
        <h2 style={{ margin: '0 0 30px 0', fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>
          Gen-Ji Admin
        </h2>
        
        <nav>
          <a href="/admin/dashboard" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Dashboard
          </a>
          <a href="/admin/projects" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', background: '#3b82f6', color: 'white', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Projects
          </a>
          <a href="/admin/clients" style={{ display: 'block', padding: '12px 16px', marginBottom: '4px', color: '#64748b', borderRadius: '6px', textDecoration: 'none', fontSize: '14px', fontWeight: '500' }}>
            Clients
          </a>
        </nav>

        <button onClick={handleLogout} style={{ width: '100%', marginTop: '30px', padding: '12px', background: 'white', color: '#dc2626', border: '1px solid #fecaca', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, padding: '30px', background: '#ffffff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700', color: '#0f172a' }}>Projects</h1>
          <button
            onClick={() => setShowForm(true)}
            style={{ padding: '10px 20px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}
          >
            + Add Project
          </button>
        </div>

        {/* Form Modal */}
        {showForm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50, padding: '20px' }}>
            <div style={{ background: 'white', borderRadius: '8px', maxWidth: '600px', width: '100%', maxHeight: '90vh', overflow: 'auto', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#f8fafc' }}>
                <h2 style={{ margin: 0, fontSize: '20px', fontWeight: '600', color: '#0f172a' }}>
                  {editingId ? 'Edit Project' : 'Add New Project'}
                </h2>
                <button onClick={resetForm} style={{ background: 'none', border: 'none', fontSize: '28px', cursor: 'pointer', color: '#64748b', lineHeight: 1 }}>×</button>
              </div>

              <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Project Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                    placeholder="Enter project title"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Description *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={4}
                    style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' }}
                    placeholder="Describe the project"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Project Image
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
                      <img src={formData.image} alt="Preview" style={{ width: '100%', maxHeight: '200px', objectFit: 'cover', borderRadius: '6px', border: '2px solid #e2e8f0' }} />
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

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Live URL
                  </label>
                  <input
                    type="url"
                    value={formData.liveUrl}
                    onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                    placeholder="https://example.com"
                  />
                </div>

                <div style={{ marginBottom: '20px' }}>
                  <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: '600', color: '#374151' }}>
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.techStack}
                    onChange={(e) => setFormData({ ...formData, techStack: e.target.value })}
                    style={{ width: '100%', padding: '10px 12px', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', boxSizing: 'border-box' }}
                    placeholder="React, Node.js, MongoDB"
                  />
                </div>

                <div style={{ marginBottom: '24px', padding: '16px', background: '#f8fafc', borderRadius: '6px', border: '2px solid #e2e8f0' }}>
                  <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      style={{ marginRight: '10px', width: '18px', height: '18px', cursor: 'pointer' }}
                    />
                    <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>⭐ Mark as Featured Project</span>
                  </label>
                </div>

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button type="submit" style={{ flex: 1, padding: '14px', background: '#3b82f6', color: 'white', border: 'none', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    {editingId ? '✓ Update Project' : '+ Create Project'}
                  </button>
                  <button type="button" onClick={resetForm} style={{ flex: 1, padding: '14px', background: 'white', color: '#64748b', border: '2px solid #e2e8f0', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Projects List */}
        <div style={{ display: 'grid', gap: '16px' }}>
          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px', color: '#64748b' }}>Loading projects...</div>
          ) : projects.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px', background: '#f8fafc', borderRadius: '8px', border: '2px dashed #e2e8f0' }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📁</div>
              <p style={{ margin: '0 0 8px 0', fontSize: '16px', fontWeight: '600', color: '#0f172a' }}>No projects yet</p>
              <p style={{ margin: 0, fontSize: '14px', color: '#64748b' }}>Click "Add Project" to create your first project</p>
            </div>
          ) : (
            projects.map((project) => (
              <div key={project._id} style={{ background: 'white', padding: '24px', borderRadius: '8px', border: '2px solid #e2e8f0' }}>
                <div style={{ display: 'flex', gap: '20px' }}>
                  {project.image && (
                    <img src={project.image} alt={project.title} style={{ width: '160px', height: '120px', objectFit: 'cover', borderRadius: '8px', border: '2px solid #e2e8f0' }} />
                  )}
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '700', color: '#0f172a' }}>{project.title}</h3>
                      {project.featured && (
                        <span style={{ padding: '4px 12px', background: '#fef3c7', color: '#92400e', fontSize: '12px', borderRadius: '6px', fontWeight: '600' }}>⭐ Featured</span>
                      )}
                    </div>
                    <p style={{ margin: '0 0 14px 0', fontSize: '14px', color: '#64748b', lineHeight: '1.6' }}>{project.description}</p>
                    {project.techStack.length > 0 && (
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                        {project.techStack.map((tech, idx) => (
                          <span key={idx} style={{ padding: '6px 12px', background: '#eff6ff', color: '#2563eb', fontSize: '13px', borderRadius: '6px', fontWeight: '500', border: '1px solid #bfdbfe' }}>
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.liveUrl && (
                      <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontSize: '14px', color: '#3b82f6', textDecoration: 'none', fontWeight: '600' }}>
                        🔗 View Live Project →
                      </a>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <button onClick={() => handleEdit(project)} style={{ padding: '10px 20px', background: '#eff6ff', color: '#2563eb', border: '2px solid #bfdbfe', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      ✏️ Edit
                    </button>
                    <button onClick={() => handleDelete(project._id)} style={{ padding: '10px 20px', background: '#fee2e2', color: '#dc2626', border: '2px solid #fecaca', borderRadius: '6px', fontSize: '14px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RatingsBar from '../../components/RatingsBar';
import TableBuilder from '../../components/TableBuilder';
import RichTextEditor from '../../components/RichTextEditor';
import { FaSearch } from 'react-icons/fa';

const API = process.env.NEXT_PUBLIC_API_URL || '/api';

const AppManager = () => {
  const [apps, setApps] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    category: '',
    icon: '',
    images: [],
    rating: '',
    votes: '',
    downloads: '',
    description1: '',
    description2: '',
    description3: '',
    playStoreUrl: '',
    appStoreUrl: ''
  });
  const [iconFile, setIconFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalApps, setTotalApps] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const appsPerPage = 20;

  useEffect(() => {
    fetchApps(1);
    fetchCategories();
  }, []);

  useEffect(() => {
    // Reset to page 1 when search changes, then fetch
    setCurrentPage(1);
    fetchApps(1, search);
  }, [search]);

  const fetchApps = async (page = 1, searchQuery = '') => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/apps?page=${page}&limit=${appsPerPage}&search=${encodeURIComponent(searchQuery)}`);
      setApps(res.data.apps || []);
      setTotalApps(res.data.total || 0);
      setTotalPages(res.data.totalPages || 0);
      setCurrentPage(page);
      setError('');
    } catch (err) {
      setError('Error fetching apps: ' + err.message);
    } finally {
      setLoading(false);
    }
  };
  const fetchCategories = async () => {
    const res = await axios.get(`${API}/categories`);
    setCategories(res.data);
  };

  const handleInput = e => {
    const { name, value } = e.target;
    setForm(prev => {
      let updated = { ...prev, [name]: value };
      // If category changes, update Description 1 table's Category row
      if (name === 'category') {
        // Parse table rows from description1
        let rows = [];
        if (prev.description1) {
          const doc = new window.DOMParser().parseFromString(prev.description1, 'text/html');
          rows = Array.from(doc.querySelectorAll('tr')).map(tr => {
            const tds = tr.querySelectorAll('td');
            return { key: tds[0]?.innerText || '', value: tds[1]?.innerText || '' };
          });
        } else {
          rows = [
            { key: 'Category', value: '' },
            { key: 'Latest Version', value: '' },
            { key: 'Publish Date', value: '' },
            { key: 'Developer', value: '' },
            { key: 'Security', value: '100% Safe' },
            { key: 'Price', value: 'Free' }
          ];
        }
        // Update Category row value
        rows = rows.map(row => row.key === 'Category' ? { ...row, value } : row);
        // Convert back to HTML table
        updated.description1 = `<table>${rows.map(r => `<tr><td>${r.key}</td><td>${r.value}</td></tr>`).join('')}</table>`;
      }
      return updated;
    });
  };

  const handleIconChange = e => {
    setIconFile(e.target.files[0]);
  };
  const handleImagesChange = e => {
    setImageFiles(prev => [...prev, ...Array.from(e.target.files)]);
  };

  const openEditModal = (app) => {
    setEditId(app._id);
    setForm({
      name: app.name || '',
      category: app.category || '',
      icon: app.icon || '',
      images: app.images || [],
      rating: app.rating || '',
      votes: app.votes || '',
      downloads: app.downloads || '',
      description1: app.description1 || '',
      description2: app.description2 || '',
      description3: app.description3 || '',
      playStoreUrl: app.playStoreUrl || '',
      appStoreUrl: app.appStoreUrl || ''
    });
    setIconFile(null);
    setImageFiles([]);
    setShowModal(true);
    setError('');
  };

  const handleAddApp = async e => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const isEdit = !!editId;
      // Upload icon
      let iconUrl = form.icon;
      if (iconFile) {
        try {
          // Upload icon to backend
          const fd = new FormData();
          fd.append('icon', iconFile);
          fd.append('appName', form.name);
          const token = localStorage.getItem('apkpac_admin_token');
          const res = await axios.post(`${API}/apps/upload-icon`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          iconUrl = res.data.url;
        } catch (err) {
          setError('Icon upload failed: ' + (err.response?.data?.error?.message || err.message));
          setLoading(false);
          return;
        }
      }
      // Upload images
      let imagesUrls = [];
      if (imageFiles.length) {
        try {
          const fd = new FormData();
          imageFiles.forEach((img) => fd.append('images', img));
          fd.append('appName', form.name);
          const token = localStorage.getItem('apkpac_admin_token');
          const res = await axios.post(`${API}/apps/upload-images`, fd, {
            headers: {
              'Content-Type': 'multipart/form-data',
              Authorization: `Bearer ${token}`,
            },
          });
          imagesUrls = res.data.urls;
        } catch (err) {
          setError('Screenshot upload failed: ' + (err.response?.data?.error?.message || err.message));
          setLoading(false);
          return;
        }
      }
      // Submit app (add or edit)
      const token = localStorage.getItem('apkpac_admin_token');
      if (isEdit) {
        await axios.put(`${API}/apps/${editId}`, {
          ...form,
          icon: iconUrl,
          images: imagesUrls.length ? imagesUrls : form.images,
          rating: parseFloat(form.rating),
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      } else {
        await axios.post(`${API}/apps`, {
          ...form,
          icon: iconUrl,
          images: imagesUrls,
          rating: parseFloat(form.rating),
        }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
      }
      setShowModal(false);
      setForm({ name: '', category: '', icon: '', images: [], rating: '', votes: '', downloads: '', description1: '', description2: '', description3: '', playStoreUrl: '', appStoreUrl: '' });
      setIconFile(null);
      setImageFiles([]);
      setEditId(null);
      fetchApps(1, search);
    } catch (err) {
      setError((editId ? 'Error updating app: ' : 'Error adding app: ') + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this app?')) return;
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('apkpac_admin_token');
      await axios.delete(`${API}/apps/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      // After deleting, refresh current page or go back if page is empty
      const newPage = apps.length === 1 && currentPage > 1 ? currentPage - 1 : currentPage;
      fetchApps(newPage, search);
    } catch (err) {
      setError('Error deleting app: ' + (err.response?.data?.message || err.message));
    }
    setLoading(false);
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchApps(page, search);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-indigo-900">Apps Management</h2>
        <span className="text-gray-600 font-semibold">Total Apps: {totalApps}</span>
        <button className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition" onClick={() => { setShowModal(true); setEditId(null); setForm({ name: '', category: '', icon: '', images: [], rating: '', votes: '', downloads: '', description1: '', description2: '', description3: '', playStoreUrl: '', appStoreUrl: '' }); setIconFile(null); setImageFiles([]); setError(''); }}>+ Add App</button>
      </div>
      <div className="flex items-center mb-4 gap-2">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search apps..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />
      </div>
      {loading && <div className="text-center py-4 text-gray-600">Loading apps...</div>}
      {!loading && (
        <>
          <div className="overflow-x-auto rounded-lg border">
            <table className="min-w-full text-sm text-gray-900">
              <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
                <tr>
                  <th className="p-3 text-left">Icon</th>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Category</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Votes</th>
                  <th className="p-3 text-left">Downloads</th>
                  <th className="p-3 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apps.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="p-4 text-center text-gray-500">No apps found</td>
                  </tr>
                ) : (
                  apps.map(app => (
                    <tr key={app._id} className="border-b hover:bg-indigo-50">
                      <td className="p-2"><img src={app.icon} alt="icon" className="w-10 h-10 rounded" /></td>
                      <td className="p-2 font-bold">{app.name}</td>
                      <td className="p-2">{app.category}</td>
                      <td className="p-2 text-lg font-semibold text-yellow-500">{app.rating}</td>
                      <td className="p-2">{app.votes}</td>
                      <td className="p-2">{app.downloads}</td>
                      <td className="p-2 flex flex-col gap-1 min-w-[110px]">
                        {app.playStoreUrl && (
                          <a href={app.playStoreUrl} target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs font-bold mb-1">Play Store</a>
                        )}
                        {app.appStoreUrl && (
                          <a href={app.appStoreUrl} target="_blank" rel="noopener noreferrer" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs font-bold">App Store</a>
                        )}
                        <div className="flex gap-1 mt-2">
                          <button
                            className="group flex items-center justify-center bg-white border border-gray-300 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 text-gray-700 px-2 py-1 rounded-full shadow text-xs font-bold transition min-w-[32px] min-h-[32px] cursor-pointer"
                            title="Edit"
                            aria-label="Edit"
                            onClick={() => openEditModal(app)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 00-4-4l-8 8v3zm0 0v3a2 2 0 002 2h3" /></svg>
                            <span className="hidden sm:inline ml-1">Edit</span>
                          </button>
                          <button
                            className="group flex items-center justify-center bg-white border border-red-400 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-300 text-red-500 px-2 py-1 rounded-full shadow text-xs font-bold transition min-w-[32px] min-h-[32px] cursor-pointer"
                            title="Delete"
                            aria-label="Delete"
                            onClick={() => handleDelete(app._id)}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                            <span className="hidden sm:inline ml-1">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-4">
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold disabled:opacity-50"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Prev
              </button>
              {(() => {
                const maxPages = 15;
                let start = 1;
                let end = Math.min(totalPages, maxPages);
                if (currentPage > maxPages) {
                  start = Math.floor((currentPage - 1) / maxPages) * maxPages + 1;
                  end = Math.min(start + maxPages - 1, totalPages);
                }
                const pageButtons = [];
                for (let i = start; i <= end; i++) {
                  pageButtons.push(
                    <button
                      key={i}
                      className={`px-3 py-1 rounded font-bold ${currentPage === i ? 'bg-indigo-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
                      onClick={() => handlePageChange(i)}
                    >
                      {i}
                    </button>
                  );
                }
                return (
                  <>
                    {pageButtons}
                    {end < totalPages && (
                      <>
                        <span className="px-2">...</span>
                        <button
                          className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold"
                          onClick={() => handlePageChange(end + 1)}
                        >
                          Next
                        </button>
                      </>
                    )}
                  </>
                );
              })()}
              <button
                className="px-3 py-1 rounded bg-gray-200 hover:bg-gray-300 font-bold disabled:opacity-50"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          )}

          </>
        )}
      

      {/* Add App Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <form onSubmit={handleAddApp} className="bg-white rounded-xl shadow-lg p-8 w-full max-w-2xl space-y-4 relative max-h-[90vh] overflow-y-auto">
            <button type="button" className="absolute top-2 right-2 text-2xl" onClick={() => setShowModal(false)}>&times;</button>
            <h3 className="text-xl font-bold mb-2">Add New App</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold mb-1">Name</label>
                <input name="name" value={form.name} onChange={handleInput} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Category</label>
                <select name="category" value={form.category} onChange={handleInput} className="border rounded px-3 py-2 w-full" required>
                  <option value="">Select</option>
                  {categories.map(cat => <option key={cat._id} value={cat.name}>{cat.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block font-semibold mb-1">Icon</label>
                <input type="file" accept="image/*" onChange={handleIconChange} className="w-full" />
                {/* Icon preview */}
                {iconFile ? (
                  <img src={URL.createObjectURL(iconFile)} alt="icon preview" className="mt-2 w-16 h-16 rounded border" />
                ) : (
                  form.icon && <img src={form.icon} alt="icon preview" className="mt-2 w-16 h-16 rounded border" />
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Screenshots <span className="text-xs text-gray-500">(multiple allowed)</span></label>
                <input type="file" accept="image/*" multiple onChange={handleImagesChange} className="w-full" />
                {/* Screenshots preview: always show all selected images while creating */}
                {(imageFiles.length > 0 || form.images.length > 0) && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Previews for selected files */}
                    {imageFiles.map((img, idx) => (
                      <img key={"selected-"+idx} src={URL.createObjectURL(img)} alt="screenshot preview" className="w-16 h-16 rounded border" />
                    ))}
                    {/* Previews for already uploaded images (edit mode) */}
                    {form.images.map((url, idx) => (
                      <img key={"uploaded-"+idx} src={url} alt="screenshot preview" className="w-16 h-16 rounded border" />
                    ))}
                  </div>
                )}
              </div>
              <div>
                <label className="block font-semibold mb-1">Rating</label>
                <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleInput} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Votes</label>
                <input name="votes" value={form.votes} onChange={handleInput} className="border rounded px-3 py-2 w-full" required />
              </div>
              <div>
                <label className="block font-semibold mb-1">Downloads</label>
                <input
                  type="text"
                  name="downloads"
                  value={form.downloads}
                  onChange={handleInput}
                  className="border rounded px-3 py-2 w-full"
                  placeholder="Enter total downloads (e.g. 1M, 500K, 1200)"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold mb-1">Play Store Link</label>
                <input name="playStoreUrl" value={form.playStoreUrl} onChange={handleInput} className="border rounded px-3 py-2 w-full" />
              </div>
              <div>
                <label className="block font-semibold mb-1">App Store Link</label>
                <input name="appStoreUrl" value={form.appStoreUrl} onChange={handleInput} className="border rounded px-3 py-2 w-full" />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Description 1 (Table)</label>
                <TableBuilder value={form.description1} onChange={val => setForm(f => ({ ...f, description1: val }))} />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Description 2 (Rich Text)</label>
                <RichTextEditor value={form.description2} onChange={val => setForm(f => ({ ...f, description2: val }))} placeholder="Enter description..." />
              </div>
              <div className="col-span-2">
                <label className="block font-semibold mb-1">Description 3 (Rich Text)</label>
                <RichTextEditor value={form.description3} onChange={val => setForm(f => ({ ...f, description3: val }))} placeholder="Enter description..." />
              </div>
            </div>
            {error && <div className="text-red-600 font-semibold mb-2">{error}</div>}
            <button type="submit" className="mt-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold shadow hover:scale-105 transition" disabled={loading}>{loading ? 'Saving...' : 'Save App'}</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppManager;


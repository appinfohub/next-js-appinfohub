import React, { useState } from 'react';
import { useGetCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation, useUpdateCategoryMutation } from '../../services/api';
import { FaSearch } from 'react-icons/fa';

const CategoryManager = () => {
  const [name, setName] = useState('');
  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState('');
  const [search, setSearch] = useState('');
  const { data: categories = [], isLoading } = useGetCategoriesQuery();
  const [addCategory, { isLoading: isAdding }] = useAddCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] = useUpdateCategoryMutation();

  const handleAdd = async e => {
    e.preventDefault();
    try {
      await addCategory({ name }).unwrap();
      setName('');
    } catch {
      alert('Error adding category');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this category?')) return;
    await deleteCategory(id);
  };

  const handleEdit = (cat) => {
    setEditId(cat._id);
    setEditName(cat.name);
  };

  const handleUpdate = async e => {
    e.preventDefault();
    try {
      await updateCategory({ id: editId, name: editName }).unwrap();
      setEditId(null);
      setEditName('');
    } catch {
      alert('Error updating category');
    }
  };

  const filteredCategories = categories.filter(cat =>
    cat.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-extrabold text-indigo-900">Categories Management</h2>
        <span className="text-gray-600 font-semibold">Total Categories: {categories.length}</span>
      </div>
      <div className="flex items-center mb-4 gap-2">
        <FaSearch className="text-gray-400" />
        <input
          type="text"
          placeholder="Search categories..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="border rounded px-3 py-2 w-full max-w-xs"
        />
      </div>
      <form onSubmit={handleAdd} className="flex gap-4 mb-6">
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Category Name" className="border rounded px-3 py-2" required />
        <button type="submit" className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-2 rounded-lg font-bold shadow" disabled={isAdding}>{isAdding ? 'Adding...' : 'Add Category'}</button>
      </form>
      <table className="min-w-full text-sm text-gray-900">
        <thead className="bg-gradient-to-r from-indigo-100 to-purple-100">
          <tr>
            <th className="p-3 text-left">Name</th>
            <th className="p-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoading ? (
            <tr><td colSpan={2}>Loading...</td></tr>
          ) : filteredCategories.map(cat => (
            <tr key={cat._id} className="border-b">
              <td className="p-2 font-bold">
                {editId === cat._id ? (
                  <form onSubmit={handleUpdate} className="flex gap-2">
                    <input value={editName} onChange={e => setEditName(e.target.value)} className="border rounded px-2 py-1" required />
                    <button type="submit" className="bg-gray-700 text-white px-3 py-1 rounded font-bold cursor-pointer">Save</button>
                    <button type="button" className="bg-gray-300 text-gray-700 px-3 py-1 rounded font-bold cursor-pointer" onClick={() => setEditId(null)}>Cancel</button>
                  </form>
                ) : cat.name}
              </td>
              <td className="p-2 flex gap-2">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-3 py-1 rounded font-bold cursor-pointer" onClick={() => handleEdit(cat)}>Edit</button>
                <button className="bg-white border border-red-400 hover:bg-red-500 hover:text-white text-red-500 px-3 py-1 rounded font-bold cursor-pointer" onClick={() => handleDelete(cat._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CategoryManager;


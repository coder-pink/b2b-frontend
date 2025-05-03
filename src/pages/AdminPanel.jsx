import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

// const API = '/api/admin/manufacturer';

const AdminPanel = () => {
  const [manufacturers, setManufacturers] = useState([]);
  const [form, setForm] = useState({ name: '', category: '', city: '', products: [{ name: '', price: '' }] });
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  
  const token = localStorage.getItem('token');


  const API = '/api/admin/manufacturer';
  useEffect(() => {
    fetchManufacturers();
  }, []);
  
  const fetchManufacturers = async () => {
    try {
      const res = await axios.get(API, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setManufacturers(res.data);
    } catch (err) {
      console.error('Failed to fetch manufacturers:', err);
      alert('Failed to load manufacturers');
    }
  };
  

  const handleProductChange = (index, field, value) => {
    const updatedProducts = [...form.products];
    updatedProducts[index][field] = value;
    setForm({ ...form, products: updatedProducts });
  };

  const addProductField = () => {
    setForm({ ...form, products: [...form.products, { name: '', price: '' }] });
  };

  const removeProductField = (index) => {
    const updated = form.products.filter((_, i) => i !== index);
    setForm({ ...form, products: updated });
  };

  const handleSubmit = async () => {
    try {
      if (isEdit) {
        await axios.put(`${API}/${editId}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post(API, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      setForm({ name: '', category: '', city: '', products: [{ name: '', price: '' }] });
      setIsEdit(false);
      setEditId(null);
      fetchManufacturers();
    } catch (err) {
      console.error(err);
      alert('Failed to save manufacturer');
    }
  };

  const handleEdit = (manu) => {
    setForm(manu);
    setIsEdit(true);
    setEditId(manu._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API}/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchManufacturers();
    } catch (err) {
      console.error(err);
      alert('Failed to delete manufacturer');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Admin Dashboard</h1>
          <div className="flex items-center text-2xl font-bold gap-14 ">
            <Link to="/" className="text-blue-600 hover:underline">
              Home
            </Link>
          
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-6">
        <section className="bg-white rounded-xl shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{isEdit ? 'Edit' : 'Add'} Manufacturer</h2>
          <div className="grid gap-4">
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Company Name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="Category"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            />
            <input
              className="w-full p-3 border border-gray-300 rounded-lg"
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({ ...form, city: e.target.value })}
            />

            <div>
              <h3 className="font-medium mb-2">Products</h3>
              {form.products.map((product, i) => (
                <div key={i} className="flex gap-3 mb-2">
                  <input
                    className="flex-1 p-2 border border-gray-300 rounded-lg"
                    placeholder="Product Name"
                    value={product.name}
                    onChange={(e) => handleProductChange(i, 'name', e.target.value)}
                  />
                  <input
                    className="w-32 p-2 border border-gray-300 rounded-lg"
                    placeholder="Price"
                    value={product.price}
                    onChange={(e) => handleProductChange(i, 'price', e.target.value)}
                  />
                  <button
                    onClick={() => removeProductField(i)}
                    className="text-red-600 hover:underline text-sm"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                onClick={addProductField}
                className="text-blue-600 hover:underline text-sm mt-2"
              >
                + Add Product
              </button>
            </div>

            <button
              onClick={handleSubmit}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              {isEdit ? 'Update' : 'Add'} Manufacturer
            </button>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6">
          <h2 className="text-xl font-semibold mb-4">All Manufacturers</h2>
          <div className="grid gap-4">
            {manufacturers.map((m) => (
              <div key={m._id} className="flex justify-between items-center p-4 border rounded-lg hover:shadow">
                <div>
                  <p className="font-semibold text-lg">{m.name}</p>
                  <p className="text-sm text-gray-500">{m.category} — {m.city}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => handleEdit(m)} className="text-blue-500 hover:underline">Edit</button>
                  <button onClick={() => handleDelete(m._id)} className="text-red-500 hover:underline">Delete</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminPanel;

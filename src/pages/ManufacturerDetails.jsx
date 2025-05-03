import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

export default function ManufacturerDetails() {
  const { id } = useParams();
  const { token } = useAuth();
  const [manufacturer, setManufacturer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchManufacturer = async () => {
      try {
        const res = await axios.get(`/api/manufacturer/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setManufacturer(res.data);
      } catch (err) {
        setError('Manufacturer Not Found');
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchManufacturer();
    }
  }, [id, token]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        Loading...
      </div>
    );
  }

  if (error || !manufacturer) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500 text-xl">
        {error || 'Manufacturer Not Found'}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{manufacturer.name}</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <p className="text-gray-600">
            <strong className="text-gray-800">Category:</strong> {manufacturer.category}
          </p>
          <p className="text-gray-600">
            <strong className="text-gray-800">City:</strong> {manufacturer.city}
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">Products</h2>
          <ul className="space-y-2">
            {manufacturer.products?.map((product, idx) => (
              <li
                key={idx}
                className="bg-blue-50 border border-blue-100 rounded-lg px-4 py-2 text-gray-700"
              >
                <span className="font-medium">{product.name}</span> — ${product.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = await login(form); 

    if (success) {
      setSuccessMessage('Login successful! Redirecting...');
      setTimeout(() => navigate('/'), 1500);
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        <h2 className="text-4xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 tracking-wide mb-6">
          B2B Market
        </h2>

        {successMessage && (
          <div className="mb-4 text-green-600 font-medium text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-7">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Username</label>
            <input
              type="text"
              value={form.username}
              onChange={(e) => setForm({ ...form, username: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your username : admin"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">Password</label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password : 1234"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Login
          </button>
        </form>

        
      </div>
    </div>
  );
}

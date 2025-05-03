import { useState, useEffect } from 'react';
import { manufacturers } from '../data/manufacturers';
import ManufacturerCard from '../components/ManufacturerCard';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';



export default function Home() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('');
  const [manufacturers, setManufacturers] = useState([]);
  const { logout, token } = useAuth();


  const API = '/api/manufacturers';
  useEffect(() => {
    // console.log('Token being sent:', token); 
    const fetchManufacturers = async () => {
      try {
        const res = await axios.get(API, {
          headers: { Authorization: `Bearer ${token}` }
        });

        // Normalize _id to id
      const normalized = res.data.map((m) => ({
        ...m,
        id: m.id || m._id
      }));

      setManufacturers(normalized);
        // setManufacturers(res.data);
      } catch (err) {
        console.error('Error fetching manufacturers:', err);
      }
    };

    fetchManufacturers();
  }, [token]);

  const filteredManufacturers = manufacturers.filter((m) =>
    m.name.toLowerCase().includes(search.toLowerCase()) &&
    (filter ? m.category === filter : true)
  );

  const uniqueCategories = [...new Set(manufacturers.map((m) => m.category))];

  return (
    <div className="bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">B2B Market</h1>
          <nav className="space-x-6 text-sm font-medium">
            <a href="#home" className="hover:text-blue-500">Home</a>
            <a href="#manufacturers" className="hover:text-blue-500">Manufacturers</a>
            <a href="/admin" className="hover:text-blue-500">Admin</a>
            <a href="#contact" className="hover:text-blue-500">Contact</a>
            <button
    onClick={logout}
    className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
  >
    Logout
  </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="bg-gradient-to-r from-blue-100 to-purple-200 py-16">
        <div className="max-w-6xl mx-auto text-center px-4">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">Discover Trusted Manufacturers</h2>
          <p className="text-lg text-gray-700 mb-6">Connect with reliable partners in every industry on B2B Market.</p>
          <a href="#manufacturers" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg text-lg shadow hover:bg-blue-700 transition">
            Browse Manufacturers
          </a>
        </div>
      </section>

      {/* Filter + Manufacturer Cards */}
      <section id="manufacturers" className="py-16 bg-gradient-to-br from-white to-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          {/* Section Heading */}
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800">Explore Manufacturers</h2>
            <p className="text-gray-600 mt-2">Search and filter top-rated manufacturers across multiple industries</p>
          </div>

          {/* Filters */}
          <div className="mb-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-6 justify-center">
            <div className="w-full md:w-1/2">
              <input
                type="text"
                placeholder="🔍 Search by company name..."
                className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-full md:w-1/3">
              <select
                onChange={(e) => setFilter(e.target.value)}
                className="w-full px-5 py-3 border border-gray-300 rounded-xl bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Categories</option>
                {uniqueCategories.map((c, idx) => (
                  <option key={idx} value={c}>{c}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Manufacturer Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredManufacturers.length > 0 ? (
              filteredManufacturers.map((m) => (
                <ManufacturerCard key={m.id} manufacturer={m} />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-500 text-lg">
                🚫 No manufacturers found matching your criteria.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="bg-gradient-to-br from-white to-blue-50 py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="text-center mb-10">
              <h3 className="text-3xl font-bold text-gray-800">Contact Us</h3>
              <p className="text-gray-500 mt-2">
                Have questions or partnership inquiries? Fill out the form and our team will get back to you shortly.
              </p>
            </div>
            <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <textarea
                placeholder="Your Message"
                rows="5"
                className="sm:col-span-2 px-5 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
              />
              <button
                type="submit"
                className="sm:col-span-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition duration-300"
              >
                ✉️ Send Message
              </button>
            </form>
          </div>
        </div>
      </section>



      {/* Footer */}
<footer className="bg-gray-900 text-gray-300 py-10 mt-16">
  <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
    
    {/* Branding */}
    <div>
      <h2 className="text-xl font-semibold text-white mb-2">B2B Market</h2>
      <p className="text-sm text-gray-400">Connecting businesses with trusted manufacturers worldwide.</p>
    </div>

    {/* Quick Links (optional) */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Quick Links</h3>
      <ul className="space-y-1 text-sm">
        <li><a href="#home" className="hover:text-white transition">Home</a></li>
        <li><a href="#manufacturers" className="hover:text-white transition">Manufacturers</a></li>
        <li><a href="/admin" className="hover:text-white transition">Admin</a></li>
        <li><a href="#contact" className="hover:text-white transition">Contact</a></li>
      </ul>
    </div>

    {/* Social / Contact Info (optional) */}
    <div>
      <h3 className="text-lg font-semibold text-white mb-2">Get in Touch</h3>
      <p className="text-sm">info@b2bmarket.com</p>
      <p className="text-sm">+1 (123) 456-7890</p>
    </div>
  </div>

  {/* Bottom note */}
  <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
    &copy; {new Date().getFullYear()} <span className="text-white font-semibold">B2B Market</span>. All rights reserved.
  </div>
</footer>

    </div>
  );
}

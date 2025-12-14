import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const { data } = await api.post('/auth/signin', formData);
      
      
      localStorage.setItem('user', JSON.stringify(data));
      
      
      if (data.role === 'trainer') {
        navigate('/trainer');
      } else {
        navigate('/');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full">
      {/* LEFT SIDE*/}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-center items-center text-white p-10 relative overflow-hidden">
        <div className="z-10 text-center animate-pulse">
          <h1 className="text-7xl font-bold mb-4 tracking-tighter">FOCUS.</h1>
          <p className="text-xl font-light text-gray-400">Your only limit is you.</p>
        </div>
        <div className="absolute top-10 right-10 w-40 h-40 border border-gray-800 rounded-full"></div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-2 text-black uppercase">Welcome Back</h2>
          <p className="text-gray-500 mb-8">Access your personalized fitness plans.</p>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                name="email"
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="john@example.com"
                onChange={handleChange}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                name="password"
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="••••••••"
                onChange={handleChange}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'Logging in...' : 'LOGIN'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/signup" className="font-bold text-black hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

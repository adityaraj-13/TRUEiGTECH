import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import api from '../utils/api';

const Signup = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name:"",
        email:"",
        password:"",
        role:"user"
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) =>{
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
        if (formData.password.length < 6) {
        setError('Password must be at least 6 characters long');
        setLoading(false);
        return;
        }
      await api.post('/auth/signup', formData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <div className="flex h-screen w-full">
      {/* LEFT SIDE*/}
      <div className="hidden md:flex w-1/2 bg-black flex-col justify-center items-center text-white p-10 relative overflow-hidden">
        <div className="z-10 text-center animate-fade-in-up">
          <h1 className="text-6xl font-bold mb-4 tracking-tighter uppercase">Fit Plan Hub</h1>
          <p className="text-xl font-light text-gray-400">Build. Train. Conquer.</p>
        </div>
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-gray-900 rounded-full blur-3xl opacity-50"></div>
      </div>

      {/* RIGHT SIDE*/}
      <div className="w-full md:w-1/2 bg-white flex justify-center items-center p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold mb-2 text-black uppercase">Create Account</h2>
          <p className="text-gray-500 mb-8">Join the community of elite trainers and athletes.</p>

          {error && <div className="mb-4 p-3 bg-red-100 text-red-600 text-sm rounded">{error}</div>}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                required
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black transition"
                placeholder="John Doe"
                onChange={handleChange}
              />
            </div>

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
            <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
            </label>

            <div className="relative">
                <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                required
                minLength={6}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-black transition pr-12"
                placeholder="••••••••"
                onChange={handleChange}
                />

                <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-black"
                onClick={() => setShowPassword(!showPassword)}
                >
                {showPassword ? 'Hide' : 'Show'}
                </button>
            </div>

            <p className="text-xs text-gray-500 mt-1">
                Password must be at least 6 characters long
            </p>
            </div>


            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">I am a...</label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  className={`p-3 border rounded text-center transition ${formData.role === 'user' ? 'bg-black text-white border-black' : 'text-gray-500 border-gray-300 hover:border-black'}`}
                  onClick={() => setFormData({...formData, role: 'user'})}
                >
                  User
                </button>
                <button
                  type="button"
                  className={`p-3 border rounded text-center transition ${formData.role === 'trainer' ? 'bg-black text-white border-black' : 'text-gray-500 border-gray-300 hover:border-black'}`}
                  onClick={() => setFormData({...formData, role: 'trainer'})}
                >
                  Trainer
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800 transition transform hover:scale-[1.02] disabled:opacity-50"
            >
              {loading ? 'Creating...' : 'SIGN UP'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="font-bold text-black hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Signup;

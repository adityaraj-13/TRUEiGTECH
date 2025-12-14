import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav className="bg-black text-white p-4 sticky top-0 z-50 border-b border-gray-800">
      <div className="container mx-auto flex justify-between items-center">
    
        <Link to="/" className="text-2xl font-bold uppercase tracking-tighter hover:text-gray-300 transition">
          FitPlan<span className="text-gray-500">Hub</span>
        </Link>

    
        <div className="flex items-center space-x-6 text-sm font-medium uppercase">
          <Link to="/" className="hover:text-gray-400 transition">Marketplace</Link>
          
          {user ? (
            <>
            
              {user.role === 'trainer' && (
                <Link to="/trainer" className="text-green-400 hover:text-green-300 transition">
                  Dashboard
                </Link>
              )}

              
              {user.role === 'user' && (
                <Link to="/feed" className="hover:text-gray-400 transition">
                  My Feed
                </Link>
              )}

              
              <div className="flex items-center space-x-4 border-l border-gray-700 pl-6">
                <span className="text-gray-500 hidden md:block">Hi, {user.name}</span>
                <button 
                  onClick={handleLogout} 
                  className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            
            <div className="flex items-center space-x-4">
              <Link to="/login" className="hover:text-gray-400">Login</Link>
              <Link to="/signup" className="bg-white text-black px-4 py-2 rounded font-bold hover:bg-gray-200 transition">
                Get Started
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
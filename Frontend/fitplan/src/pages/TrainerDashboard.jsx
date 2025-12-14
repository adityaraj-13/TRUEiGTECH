import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const TrainerDashboard = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', duration: '', content: ''
  });

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchMyPlans = async () => {
    try {
      const { data } = await api.get('/plans');
      const myPlans = data.filter(plan => 
        (plan.trainer?._id === user.id) || (plan.trainer === user.id)
      );
      setPlans(myPlans);
    } catch (err) {
      alert("Failed to load plans");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user || user.role !== 'trainer') { navigate('/'); }
    fetchMyPlans();
  }, []);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData({ title: '', description: '', price: '', duration: '', content: '' });
    setShowModal(true);
  };

  const openEditModal = async (planSummary) => {
    try {
      const { data } = await api.get(`/plans/${planSummary._id}`);
      setEditingId(data._id);
      setFormData({
        title: data.title,
        description: data.description,
        price: data.price,
        duration: data.duration,
        content: data.content
      });
      setShowModal(true);
    } catch (err) {
      alert("Error loading plan details for editing.");
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        await api.put(`/plans/${editingId}`, formData);
        alert("Plan updated successfully!");
      } else {
        await api.post('/plans', formData);
        alert("Plan created successfully!");
      }
      setShowModal(false);
      fetchMyPlans();
    } catch (err) {
      alert(err.response?.data?.message || "Error saving plan");
    }
  };

  const handleDelete = async (planId) => {
    if (!confirm("Are you sure?")) return;
    try {
      await api.delete(`/plans/${planId}`);
      setPlans(plans.filter(p => p._id !== planId));
      alert("Deleted");
    } catch (err) {
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="container mx-auto px-4 py-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold uppercase tracking-tighter">Trainer Dashboard</h1>
            <p className="text-gray-500">Manage your fitness protocols.</p>
          </div>
          <button 
            onClick={openCreateModal}
            className="bg-black text-white px-6 py-3 rounded font-bold hover:bg-gray-800 transition shadow-lg"
          >
            + CREATE NEW PLAN
          </button>
        </div>

        {loading ? <p>Loading...</p> : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <div key={plan._id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm relative group">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded uppercase">{plan.duration}</span>
                  <span className="text-xl font-bold text-green-600">${plan.price}</span>
                </div>
                <h3 className="text-xl font-bold uppercase mb-2">{plan.title}</h3>
                <p className="text-gray-500 text-sm mb-4 line-clamp-2">{plan.description}</p>
                
                <div className="flex justify-end items-center mt-4 border-t pt-4 space-x-3">
                  <button 
                    onClick={() => openEditModal(plan)}
                    className="text-blue-600 text-sm font-bold hover:underline"
                  >
                    EDIT
                  </button>
                  <button 
                    onClick={() => handleDelete(plan._id)}
                    className="text-red-500 text-sm font-bold hover:underline"
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white w-full max-w-lg rounded-lg p-8 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-black text-xl font-bold"
            >✕</button>
            
            <h2 className="text-2xl font-bold uppercase mb-6">
              {editingId ? 'Edit Protocol' : 'Create New Protocol'}
            </h2>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-bold mb-1">Title</label>
                <input
                  className="w-full border p-2 rounded"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1">Price ($)</label>
                  <input
                    type="number"
                    className="w-full border p-2 rounded"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1">Duration</label>
                  <input
                    className="w-full border p-2 rounded"
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1">Description</label>
                <textarea
                  className="w-full border p-2 rounded"
                  rows="3"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-green-600">Premium Content</label>
                <textarea
                  className="w-full border-2 border-green-100 p-2 rounded focus:border-green-500 outline-none"
                  rows="6"
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded font-bold hover:bg-gray-800"
              >
                {editingId ? 'UPDATE PLAN' : 'PUBLISH PLAN'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TrainerDashboard;


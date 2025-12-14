import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';

const PlanDetail = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false); 

  
  const fetchPlanDetails = async () => {
    try {
      const { data } = await api.get(`/plans/${id}`);
      setPlan(data);
    } catch (err) {
      alert("Failed to load plan details");
      navigate('/'); 
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlanDetails();
  }, [id]);

  
  const handleSubscribe = async () => {
    
    const user = localStorage.getItem('user');
    if (!user) {
      alert("You must be logged in to subscribe");
      navigate('/login');
      return;
    }

    if (!confirm(`Confirm purchase for $${plan.price}?`)) return;

    setPurchasing(true);
    try {
      
      await api.post('/subscriptions', { planId: plan._id });

      alert("Subscription Successful! Content Unlocked.");

      fetchPlanDetails(); 

    } catch (err) {
      alert(err.response?.data?.message || "Purchase failed");
    } finally {
      setPurchasing(false);
    }
  };

  if (loading) return <div className="text-center mt-20">Loading...</div>;
  if (!plan) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Header Section */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-black text-white text-xs font-bold px-2 py-1 rounded uppercase">
                {plan.duration}
              </span>
              <h1 className="text-4xl md:text-5xl font-bold uppercase mt-4 mb-2 tracking-tighter">
                {plan.title}
              </h1>
              <p className="text-gray-500">
                Created by: <span className="font-bold text-black">{plan.trainer?.name}</span>
              </p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-green-600">${plan.price}</div>
            </div>
          </div>

          <p className="mt-8 text-lg text-gray-700 leading-relaxed">
            {plan.description}
          </p>
        </div>

        
        {plan.isPreview ? (
          <div className="bg-black text-white p-10 rounded-lg text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
            
            <div className="relative z-10">
              <div className="text-5xl mb-4">🔒</div>
              <h2 className="text-3xl font-bold uppercase mb-2">Premium Content Locked</h2>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Subscribe to this plan to reveal the full workout routine, daily schedules, and trainer notes.
              </p>
              
              <button 
                onClick={handleSubscribe}
                disabled={purchasing}
                className="bg-white text-black text-lg px-8 py-4 rounded font-bold hover:bg-gray-200 transition transform hover:scale-105"
              >
                {purchasing ? "Processing..." : `UNLOCK ACCESS FOR $${plan.price}`}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-8 rounded-lg shadow-sm border border-green-200 relative">
            <div className="absolute top-4 right-4 text-green-600 flex items-center text-sm font-bold uppercase tracking-wide">
              <span className="text-xl mr-2">✓</span> Active Subscription
            </div>

            <h2 className="text-2xl font-bold uppercase mb-6 border-b pb-4">
              Workout Protocol
            </h2>

            <div className="prose max-w-none text-gray-800 whitespace-pre-line">
              {typeof plan.content === 'string'
                ? plan.content
                : JSON.stringify(plan.content, null, 2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PlanDetail;

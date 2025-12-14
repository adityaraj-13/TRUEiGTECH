import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';

const TrainerProfile = () => {
  const { trainerId } = useParams(); 
  const [trainer, setTrainer] = useState(null);
  const [plans, setPlans] = useState([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchTrainerData = async () => {
    try {
      
      const { data: allPlans } = await api.get('/plans');
      const trainerPlans = allPlans.filter(p => p.trainer?._id === trainerId);
      setPlans(trainerPlans);

      if (trainerPlans.length > 0) {
        setTrainer(trainerPlans[0].trainer);
      }

     
      const { data: myFollowing } = await api.get('/users/following');
      const isFound = myFollowing.some(t => t._id === trainerId);
      setIsFollowing(isFound);

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrainerData();
  }, [trainerId]);

  const handleToggleFollow = async () => {
    try {
      if (isFollowing) {
        await api.put(`/users/unfollow/${trainerId}`);
        setIsFollowing(false);
      } else {
        await api.put(`/users/follow/${trainerId}`);
        setIsFollowing(true);
      }
    } catch (err) {
      alert("Action failed");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        
        {/* Profile Header */}
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 mb-8 flex justify-between items-center">
            <div>
                <h1 className="text-4xl font-bold uppercase">{trainer?.name || "Trainer"}</h1>
                <p className="text-gray-500">Certified FitPlan Trainer</p>
                <p className="mt-2 text-sm text-gray-400">{plans.length} Active Plans</p>
            </div>
            <button 
                onClick={handleToggleFollow}
                className={`px-6 py-3 rounded font-bold transition ${
                    isFollowing ? 'bg-gray-200 text-black' : 'bg-black text-white'
                }`}
            >
                {isFollowing ? 'UNFOLLOW' : 'FOLLOW +'}
            </button>
        </div>

        {/* Their Plans */}
        <h2 className="text-2xl font-bold uppercase mb-6">Protocols by {trainer?.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
                <PlanCard key={plan._id} plan={plan} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default TrainerProfile;
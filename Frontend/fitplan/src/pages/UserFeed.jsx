import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';
import { Link } from 'react-router-dom';

const UserFeed = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [following, setFollowing] = useState([]); 

  const fetchData = async () => {
    try {
      const feedRes = await api.get('/users/feed');
      setPlans(feedRes.data);

      
      const followRes = await api.get('/users/following');
      setFollowing(followRes.data.map(t => t._id));

    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleToggleFollow = async (trainerId) => {
    try {
      await api.put(`/users/unfollow/${trainerId}`);
      setFollowing(prev => prev.filter(id => id !== trainerId));

      alert("Unfollowed trainer. Refresh to update feed.");
      setPlans(prev => prev.filter(p => p.trainer?._id !== trainerId));
    } catch (err) {
      alert("Failed to unfollow");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold uppercase mb-2">Your Personal Feed</h1>
        <p className="text-gray-500 mb-8">Latest protocols from trainers you follow.</p>

        {loading ? (
          <div>Loading feed...</div>
        ) : plans.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-lg border border-dashed border-gray-300">
            <h3 className="text-xl font-bold mb-2">Your feed is empty</h3>
            <p className="text-gray-500 mb-6">
              Start following trainers to see their content here.
            </p>
            <Link
              to="/"
              className="bg-black text-white px-6 py-3 rounded font-bold"
            >
              Go to Marketplace
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <PlanCard 
                key={plan._id} 
                plan={plan} 
                isFollowing={true}
                onToggleFollow={handleToggleFollow}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserFeed;

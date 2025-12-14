import React, { useEffect, useState } from 'react';
import api from '../utils/api';
import Navbar from '../components/Navbar';
import PlanCard from '../components/PlanCard';

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  
  const fetchData = async () => {
    try {
      
      const plansRes = await api.get('/plans');
      setPlans(plansRes.data);

      if (user && user.role === 'user') {
        
        const subRes = await api.get('/subscriptions');
        setSubscriptions(subRes.data);

        
        const followRes = await api.get('/users/following');
        setFollowing(followRes.data.map(t => t._id));
      }
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
      if (following.includes(trainerId)) {
        await api.put(`/users/unfollow/${trainerId}`);
        setFollowing(prev => prev.filter(id => id !== trainerId));
        alert("Unfollowed trainer");
      } else {
        await api.put(`/users/follow/${trainerId}`);
        setFollowing(prev => [...prev, trainerId]);
        alert("Following trainer!");
      }
    } catch (err) {
      alert("Action failed");
    }
  };

  const purchasedPlanIds = subscriptions.map(sub => sub.plan._id);
  
  const myPlans = plans.filter(p => purchasedPlanIds.includes(p._id));
  const marketplacePlans = plans.filter(p => !purchasedPlanIds.includes(p._id));

  if (loading) return <div className="text-center mt-20">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="bg-white border-b border-gray-200 py-16 text-center px-4">
        <h1 className="text-5xl font-bold uppercase mb-2 tracking-tighter">
          Fit Plan <span className="text-gray-400">Hub</span>
        </h1>
        <p className="text-gray-500">Train like a pro. Anywhere. Anytime.</p>
      </div>

      <div className="container mx-auto px-4 py-10">
        
        {user && myPlans.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold uppercase mb-6 flex items-center">
              <span className="bg-green-600 w-3 h-3 rounded-full mr-3"></span>
              Your Active Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myPlans.map((plan) => (
                <PlanCard 
                  key={plan._id} 
                  plan={plan} 
                  isPurchased={true}
                  isFollowing={following.includes(plan.trainer?._id)}
                  onToggleFollow={handleToggleFollow}
                />
              ))}
            </div>
          </div>
        )}

       
        <div>
          <h2 className="text-2xl font-bold uppercase mb-6 border-b pb-2">
            Explore Marketplace
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {marketplacePlans.map((plan) => (
              <PlanCard 
                key={plan._id} 
                plan={plan} 
                isPurchased={false}
                isFollowing={following.includes(plan.trainer?._id)}
                onToggleFollow={handleToggleFollow}
              />
            ))}
            {marketplacePlans.length === 0 && (
              <p className="text-gray-400">
                No new plans available in the marketplace.
              </p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;

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
        setFollowing(followRes.data.map(t => t?._id).filter(Boolean));
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 3500); 
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

  
  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight, 
      behavior: 'smooth'
    });
  };

  
  const purchasedPlanIds = subscriptions
    .map(sub => sub.plan?._id)
    .filter(id => id !== undefined);

  const myPlans = plans.filter(p => purchasedPlanIds.includes(p._id));
  const marketplacePlans = plans.filter(p => !purchasedPlanIds.includes(p._id));

  
  if (loading) {
    return (
      <div className="fixed inset-0 bg-black z-50 flex flex-col items-center justify-center overflow-hidden">
        <style>{`
          .text-stroke { -webkit-text-stroke: 2px #333; color: transparent; }
          @keyframes scroll-left { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
          @keyframes scroll-right { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
          .animate-scroll-left { animation: scroll-left 20s linear infinite; }
          .animate-scroll-right { animation: scroll-right 20s linear infinite; }
        `}</style>

        <div className="w-full flex whitespace-nowrap opacity-50 animate-scroll-left">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-8xl md:text-9xl font-black uppercase mr-12 text-stroke">Fit Plan Hub</span>
          ))}
        </div>
        
        <div className="relative z-10 py-8">
          <h1 className="text-6xl md:text-9xl font-black text-white uppercase tracking-tighter animate-pulse drop-shadow-2xl">
            Fit Plan Hub
          </h1>
          <p className="text-white text-center tracking-[0.5em] text-sm mt-4 text-gray-400">
            INITIALIZING PROTOCOLS...
          </p>
        </div>

        <div className="w-full flex whitespace-nowrap opacity-50 animate-scroll-right">
          {[...Array(10)].map((_, i) => (
            <span key={i} className="text-8xl md:text-9xl font-black uppercase mr-12 text-stroke">Fit Plan Hub</span>
          ))}
        </div>
      </div>
    );
  }

 
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />      
      <div className="relative w-full min-h-screen overflow-hidden bg-black flex flex-col items-center justify-center">
        
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-40 -right-40 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10 px-6 text-center">
          <h1 className="text-[80px] md:text-[120px] font-extrabold uppercase tracking-tight mb-6 text-white leading-none">
            Fit Plan{" "}
            <span className="bg-gradient-to-r from-indigo-400 to-pink-500 bg-clip-text text-transparent">
              Hub
            </span>
          </h1>

          <p className="max-w-xl mx-auto text-gray-400 text-2xl md:text-4xl mb-10 font-light">
            Train like a pro. Anywhere. Anytime.
          </p>

          <div className="flex justify-center">
            <button
              onClick={scrollToContent}
              className="group flex items-center gap-3 px-8 py-3 bg-white/90 backdrop-blur text-black rounded-full font-semibold 
                         hover:bg-white transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
            >
              <span className="tracking-wide">Start Training</span>
              <span className="text-2xl transition-transform duration-300 group-hover:translate-y-1" aria-hidden>
                ↓
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 flex-grow">
        
    
        {!loading && plans.length === 0 && (
          <div className="text-center py-20 opacity-75">
            <h2 className="text-4xl font-black text-gray-300 uppercase mb-4">No Protocols Found</h2>
            <p className="text-gray-500 max-w-md mx-auto">
              The marketplace is currently resetting. Trainers are uploading new protocols. Check back soon.
            </p>
          </div>
        )}

        
        {user && myPlans.length > 0 && (
          <div className="mb-20">
            <h2 className="text-2xl font-bold uppercase mb-8 flex items-center">
              <span className="bg-green-600 w-3 h-3 rounded-full mr-3 shadow-[0_0_10px_#16a34a]"></span>
              Your Active Protocols
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {myPlans.map((plan) => {
                if (!plan) return null;
                return (
                  <PlanCard 
                    key={plan._id} 
                    plan={plan} 
                    isPurchased={true}
                    isFollowing={following.includes(plan.trainer?._id)}
                    onToggleFollow={handleToggleFollow}
                  />
                );
              })}
            </div>
          </div>
        )}

        
        {plans.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold uppercase mb-8 border-b pb-4">
              Explore Marketplace
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {marketplacePlans.map((plan) => {
                if (!plan) return null;
                return (
                  <PlanCard 
                    key={plan._id} 
                    plan={plan} 
                    isPurchased={false}
                    isFollowing={following.includes(plan.trainer?._id)}
                    onToggleFollow={handleToggleFollow}
                  />
                );
              })}
              {marketplacePlans.length === 0 && (
                <p className="text-gray-400 col-span-3 text-center py-10 italic">
                  You have unlocked every available protocol. You are a beast! 💪
                </p>
              )}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Home;

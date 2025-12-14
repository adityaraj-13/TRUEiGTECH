import React from 'react';
import { Link } from 'react-router-dom';

const PlanCard = ({ plan, isFollowing, onToggleFollow, isPurchased }) => {
  const user = JSON.parse(localStorage.getItem('user'));
  const isTrainer = user?.role === 'trainer';
  const isMe = user?.id === plan.trainer?._id;

  return (
    <div className={`border rounded-lg overflow-hidden hover:shadow-xl transition duration-300 bg-white flex flex-col h-full group ${isPurchased ? 'border-green-500 ring-1 ring-green-500' : 'border-gray-200'}`}>
      
      <div className={`h-2 w-full transition ${isPurchased ? 'bg-green-500' : 'bg-black group-hover:bg-gray-800'}`}></div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <span className="bg-gray-100 text-xs font-bold px-2 py-1 rounded uppercase tracking-wide">
            {plan.duration}
          </span>
          <span className="text-xl font-bold font-oswald">${plan.price}</span>
        </div>

        <h3 className="text-2xl font-bold mb-2 uppercase leading-tight">{plan.title}</h3>
        
        {isPurchased && (
            <span className="inline-block bg-green-100 text-green-800 text-xs font-bold px-2 py-1 rounded mb-2 w-fit">
                ✓ PURCHASED
            </span>
        )}

        <p className="text-gray-500 text-sm mb-6 line-clamp-3 flex-grow">
          {plan.description}
        </p>

        <div className="mt-auto">
            <div className="flex items-center justify-between border-t border-gray-100 pt-4">
                <div className="flex flex-col">
                    <span className="text-xs text-gray-400">Trainer</span>
                    <Link 
                        to={`/trainers/${plan.trainer?._id}`} 
                        className="font-bold text-sm text-black leading-none hover:underline"
                    >
                        {plan.trainer?.name || 'Unknown'}
                    </Link>
                </div>

                {!isTrainer && !isMe && user && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            onToggleFollow(plan.trainer?._id);
                        }}
                        className={`text-xs font-bold px-2 py-1 rounded border transition ${
                            isFollowing 
                            ? 'bg-gray-200 text-black border-gray-300 hover:bg-gray-300' 
                            : 'bg-black text-white border-black hover:bg-gray-800'
                        }`}
                    >
                        {isFollowing ? 'UNFOLLOW' : 'FOLLOW +'}
                    </button>
                )}
            </div>

            <Link 
                to={`/plans/${plan._id}`}
                className="block text-center w-full mt-4 bg-gray-50 py-2 text-sm font-bold uppercase hover:bg-gray-100 transition rounded"
            >
                {isPurchased ? 'ACCESS CONTENT' : 'VIEW DETAILS'}
            </Link>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;
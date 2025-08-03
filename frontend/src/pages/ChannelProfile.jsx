import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchUserChannelProfile, clearChannelProfile } from '../store/features/userProfileSlice';
import { User, Mail, Users, ThumbsUp, History } from 'lucide-react';

const ChannelProfile = () => {
  const { username } = useParams();
  const dispatch = useDispatch();
  const { channelProfile, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(fetchUserChannelProfile(username));

    return () => {
      dispatch(clearChannelProfile());
    };
  }, [dispatch, username]);

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  );
  
  if (error) return (
    <div className="p-4 bg-red-100 text-red-700 rounded-lg max-w-md mx-auto mt-8">
      Error: {error}
    </div>
  );
  
  if (!channelProfile) return (
    <div className="p-4 bg-yellow-100 text-yellow-800 rounded-lg max-w-md mx-auto mt-8">
      Channel not found
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cover Image */}
      <div className="h-48 bg-gray-200 rounded-lg mb-6 overflow-hidden">
        {channelProfile.coverImage && (
          <img 
            src={channelProfile.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Channel Info */}
      <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
        {/* Avatar */}
        <div className="flex-shrink-0">
          {channelProfile.avatar ? (
            <img 
              src={channelProfile.avatar} 
              alt={channelProfile.username}
              className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
            />
          ) : (
            <div className="w-32 h-32 rounded-full bg-gray-300 flex items-center justify-center">
              <User size={64} className="text-gray-500" />
            </div>
          )}
        </div>

        {/* Channel Details */}
        <div className="flex-grow">
          <h1 className="text-3xl font-bold text-gray-900">{channelProfile.fullname}</h1>
          <p className="text-gray-600 flex items-center gap-1 mt-1">
            <span>@{channelProfile.username}</span>
            {channelProfile.email && (
              <span className="flex items-center gap-1 text-sm ml-4">
                <Mail size={16} />
                {channelProfile.email}
              </span>
            )}
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <Users size={18} />
              <span>{channelProfile.subscribersCount} Subscribers</span>
            </div>
            <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full">
              <ThumbsUp size={18} />
              <span>{channelProfile.channelsSubscribedToCount} Subscribed</span>
            </div>
          </div>

          <button 
            className={`mt-4 px-6 py-2 rounded-full font-medium flex items-center gap-2 ${
              channelProfile.isSubscribed 
                ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' 
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {channelProfile.isSubscribed ? (
              <>
                <ThumbsUp size={18} className="fill-current" />
                Subscribed
              </>
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </div>

      <div className="border-t border-gray-200 my-8"></div>

      {/* Channel Videos */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <History size={24} />
        Videos
      </h2>
      
      {/* Replace with your video grid implementation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Sample video cards - replace with your actual video data */}
        {[1, 2, 3].map((item) => (
          <div key={item} className="bg-white rounded-lg overflow-hidden shadow-md">
            <div className="bg-gray-200 h-40"></div>
            <div className="p-4">
              <h3 className="font-medium">Video Title {item}</h3>
              <p className="text-sm text-gray-600 mt-1">Channel Name</p>
              <p className="text-xs text-gray-500 mt-1">100K views • 1 day ago</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChannelProfile;
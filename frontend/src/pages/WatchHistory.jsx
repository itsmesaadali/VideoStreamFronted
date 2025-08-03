import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWatchHistory, clearWatchHistory } from '../store/features/userProfileSlice';
import { History, Clock, User } from 'lucide-react';

const WatchHistory = () => {
  const dispatch = useDispatch();
  const { watchHistory, loading, error } = useSelector((state) => state.userProfile);

  useEffect(() => {
    dispatch(fetchWatchHistory());

    return () => {
      dispatch(clearWatchHistory());
    };
  }, [dispatch]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">
        <History size={28} />
        Watch History
      </h1>

      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-100 text-red-700 rounded-lg mb-6">
          {error}
        </div>
      )}

      {watchHistory.length > 0 ? (
        <div className="space-y-4">
          {watchHistory.map((video) => (
            <div key={video._id} className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <div className="flex-shrink-0 w-full sm:w-48 h-32 bg-gray-200 rounded-lg overflow-hidden">
                {video.thumbnail && (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="flex-grow">
                <h3 className="font-medium text-lg">{video.title}</h3>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-600">
                  <User size={16} />
                  <span>{video.owner?.fullname || 'Unknown'}</span>
                </div>
                <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                  <Clock size={16} />
                  <span>Watched on {new Date(video.watchedAt).toLocaleDateString()}</span>
                </div>
                <p className="mt-2 text-gray-700 line-clamp-2">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        !loading && (
          <div className="text-center py-12">
            <History size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">Your watch history is empty</p>
            <p className="text-gray-500 text-sm mt-2">Videos you watch will appear here</p>
          </div>
        )
      )}
    </div>
  );
};

export default WatchHistory;
// components/Notifications.jsx
import { Bell, X } from "lucide-react";

export const Notifications = ({ isOpen, onClose }) => {
  const notifications = [
    {
      id: 1,
      title: "New video from your subscription",
      text: "User123 uploaded a new video",
      time: "2 hours ago",
      read: false,
    },
    {
      id: 2,
      title: "Trending video",
      text: "Your video is trending in the Gaming category",
      time: "5 hours ago",
      read: true,
    },
    {
      id: 3,
      title: "Weekly digest",
      text: "Check out this week's top videos in your subscriptions",
      time: "1 day ago",
      read: true,
    },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40"
          onClick={onClose}
        />
      )}
      
      {/* Notifications dropdown */}
      <div
        className={`fixed top-16 right-4 w-80 bg-white rounded-lg shadow-lg z-50 border border-gray-200 transition-all duration-200 ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none"
        }`}
      >
        <div className="p-3 border-b border-gray-200 flex justify-between items-center">
          <h3 className="font-semibold">Notifications</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100"
            aria-label="Close notifications"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer ${
                  !notification.read ? "bg-blue-50" : ""
                }`}
              >
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-gray-600">{notification.text}</p>
                <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
              </div>
            ))
          ) : (
            <div className="p-4 text-center text-gray-500">
              No new notifications
            </div>
          )}
        </div>
        
        <div className="p-3 border-t border-gray-200 text-center">
          <button className="text-sm text-blue-600 hover:text-blue-800 font-medium">
            View all notifications
          </button>
        </div>
      </div>
    </>
  );
};
// components/Sidebar.jsx
import { Link } from "react-router-dom";
import { Home, Compass, History, ThumbsUp, Clock, Settings, HelpCircle } from "lucide-react";

export const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 h-full overflow-y-auto">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Home className="h-5 w-5" />
              <span>Home</span>
            </Link>
            <Link
              to="/explore"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Compass className="h-5 w-5" />
              <span>Explore</span>
            </Link>
            <Link
              to="/history"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <History className="h-5 w-5" />
              <span>History</span>
            </Link>
            <Link
              to="/liked"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <ThumbsUp className="h-5 w-5" />
              <span>Liked Videos</span>
            </Link>
            <Link
              to="/watch-later"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Clock className="h-5 w-5" />
              <span>Watch Later</span>
            </Link>
          </div>
          
          <div className="border-t my-4"></div>
          
          <div className="flex flex-col gap-1">
            <Link
              to="/profile/edit"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <Settings className="h-5 w-5" />
              <span>Settings</span>
            </Link>
            <Link
              to="/help"
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100"
              onClick={onClose}
            >
              <HelpCircle className="h-5 w-5" />
              <span>Help</span>
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
};
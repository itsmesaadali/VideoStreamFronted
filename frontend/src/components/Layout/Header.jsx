import  { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Bell, User, ArrowLeft, X, Play, LogOut } from "lucide-react";
import { SearchResults } from "./SearchResults";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser, selectIsAuthenticated, selectCurrentUser } from '../../store/features/authSlice';
import { Avatar, AvatarImage } from "../UI/Avatar";

export const Header = () => {
  const [isMobSearch, setIsMobSearch] = useState(false);
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const currentUser = useSelector(selectCurrentUser);

  const handleMobSearch = () => {
    setIsMobSearch(!isMobSearch);
  };

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser()).unwrap();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="relative h-16 w-full flex items-center">
        {/* === Mobile Search === */}
        {isMobSearch ? (
          <div className="flex items-center gap-3 w-full md:hidden">
            <button
              className="rounded-full flex-shrink-0 p-2 hover:bg-gray-100 transition-colors"
              onClick={handleMobSearch}
              aria-label="Back"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Search videos..."
                className="rounded-l-full border border-gray-300 border-r-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 w-full"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                autoFocus
              />
              <SearchResults
                query={query}
                onClose={() => {
                  setQuery("");
                  setIsMobSearch(false);
                }}
              />
              <button
                className="rounded-r-full border border-gray-300 px-4 py-2 bg-gray-50 hover:bg-gray-100 transition-colors"
                aria-label="Search"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>
            <button
              className="rounded-full flex-shrink-0 p-2 hover:bg-gray-100 transition-colors"
              onClick={handleMobSearch}
              aria-label="Close search"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            {/* === Absolute Left: Logo + Menu === */}
            <div className="absolute left-0 flex items-center gap-2 pl-4">
              <button
                className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center gap-2 group">
                <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center group-hover:bg-red-700 transition-colors">
                  <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                </div>
                <span className="text-xl font-bold text-gray-900 hidden sm:block group-hover:text-red-600 transition-colors">
                  VidStream
                </span>
                <span className="text-lg font-bold text-gray-900 sm:hidden group-hover:text-red-600 transition-colors">
                  VS
                </span>
              </Link>
            </div>
            {/* === Center Section: Search (Desktop Only) === */}
            <div className="hidden md:flex justify-center flex-1 mx-auto px-4 ml-[200px]">
              <div className="w-full max-w-xl">
                <div className="flex relative w-full">
                  <input
                    type="text"
                    placeholder="Search videos..."
                    className="rounded-l-full border border-gray-300 border-r-0 px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500 transition-all pr-10"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                  {query.trim() !== "" && (
                    <button
                      className="absolute right-[70px] top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-black"
                      onClick={() => setQuery("")}
                      aria-label="Clear search"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    className="rounded-r-full border border-gray-300 px-6 py-2 bg-gray-50 hover:bg-gray-100 transition-colors border-l-0"
                    aria-label="Search"
                  >
                    <Search className="h-4 w-4" />
                  </button>
                </div>
                <SearchResults query={query} onClose={() => setQuery("")} />
              </div>
            </div>

            {/* === Right Section === */}
            <div className="flex items-center gap-1 md:gap-2 ml-auto pr-4">
              {/* Mobile Search Button */}
              <button
                className="rounded-full p-2 md:hidden hover:bg-gray-100 transition-colors"
                onClick={handleMobSearch}
                aria-label="Search"
              >
                <Search className="h-5 w-5" />
              </button>

              {/* Notifications */}
              <button
                className="rounded-full p-2 hover:bg-gray-100 transition-colors relative"
                aria-label="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>

              {/* User Avatar/Profile */}
              {isAuthenticated ? (
                <div className="flex items-center gap-2">
                  <Link to="/profile">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={currentUser?.avatar} />
                    </Avatar>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Logout"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login">
                  <button
                    className="rounded-full p-2 hover:bg-gray-100 transition-colors"
                    aria-label="Login"
                  >
                    <User className="h-5 w-5" />
                  </button>
                </Link>
              )}
            </div>
          </>
        )}
      </div>
    </header>
  );
};
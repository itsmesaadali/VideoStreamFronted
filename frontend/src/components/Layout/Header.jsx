import { useState } from "react"
import {Link } from 'react-router-dom'
// import {Button } from '../UI/button'
// import {Avatar, AvatarFallback, AvatarImage } from '../UI/avatar'
import { Play, Search, Menu, Bell, User, ArrowLeft, X } from 'lucide-react'
// import { Input } from '../UI/input'

export const Header = () => {
  const [isMobSearch, setIsMobSearch] = useState(false);

  const handleMobSearch = () => {
    setIsMobSearch(!isMobSearch);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="relative flex h-16 items-center px-4 max-w-screen-xl mx-auto w-full">
        {/* Mobile Search */}
        {isMobSearch ? (
          <div className="flex items-center gap-3 w-full md:hidden">
            <button
              className="rounded-full flex-shrink-0 p-2"
              onClick={handleMobSearch}
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex flex-1">
              <input
                type="text"
                placeholder="Search videos..."
                className="rounded-l-full border border-gray-300 border-r-0 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500 w-full"
                autoFocus
              />
              <button className="rounded-r-full border border-gray-300 px-4 py-2 bg-transparent">
                <Search className="h-4 w-4" />
              </button>
            </div>
            <button
              className="rounded-full flex-shrink-0 p-2"
              onClick={handleMobSearch}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        ) : (
          <>
            {/* Left - Logo & Menu */}
            <div className="flex items-center gap-2 md:gap-4 flex-shrink-0">
              <button className="rounded-full p-2">
                <Menu className="h-6 w-6" />
              </button>
              <Link to="/" className="flex items-center gap-2">
                <div className="h-8 w-8 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="h-5 w-5 text-white fill-white" />
                </div>
                <span className="text-xl font-bold hidden sm:block">VidStream</span>
                <span className="text-lg font-bold sm:hidden">VS</span>
              </Link>
            </div>

            {/* Center - Search (absolute center using absolute + translate) */}
            <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-full max-w-xl">
              <div className="flex w-full">
                <input
                  type="text"
                  placeholder="Search videos..."
                  className="rounded-l-full border border-gray-300 border-r-0 px-4 py-2 w-full"
                />
                <button className="rounded-r-full border border-gray-300 px-6 py-2 bg-transparent">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Right - Action buttons */}
            <div className="flex items-center gap-1 md:gap-2 flex-shrink-0 ml-auto">
              <button
                className="rounded-full p-2 md:hidden"
                onClick={handleMobSearch}
              >
                <Search className="h-5 w-5" />
              </button>
              <button className="rounded-full p-2">
                <Bell className="h-5 w-5" />
              </button>
              <Link to="/login">
                <button className="rounded-full p-2">
                  <User className="h-5 w-5" />
                </button>
              </Link>
            </div>
          </>
        )}
      </div>
    </header>
  );
};


import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LOGO_URL, USER_AVATAR } from '../data/moviesData';
import { useApp } from '../context/AppContext';

export const AppHeader = ({ title, showBack = false }) => {
  const navigate = useNavigate();
  const { setIsSearchOpen, setIsProfileOpen } = useApp();

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-surface/85 backdrop-blur-xl border-b border-surface-container-high/40 shadow-[0_1px_8px_rgba(0,0,0,0.4)] pt-safe">
      <div className="h-16 px-gutter-sm flex items-center justify-between max-w-7xl mx-auto">
        {/* Left: Back Button / Logo / Page Title */}
        <div className="flex items-center gap-space-xs">
          {showBack && (
            <button
              aria-label="Go back"
              onClick={() => navigate(-1)}
              className="w-10 h-10 flex items-center justify-center text-on-surface hover:text-primary hover:bg-surface-container/60 rounded-full transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[24px]">arrow_back</span>
            </button>
          )}

          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-primary-container to-[#ff4d5a] flex items-center justify-center shadow-lg shadow-primary-container/30 group-hover:scale-105 transition-transform">
              <span className="material-symbols-outlined text-[20px] text-white" style={{ fontVariationSettings: "'FILL' 1" }}>
                play_arrow
              </span>
            </div>
            <div className="flex items-baseline tracking-tight">
              <span className="font-extrabold text-base sm:text-lg text-white font-['Plus_Jakarta_Sans']">
                STREAM<span className="text-primary-container">MI</span>
              </span>
              <span className="text-[11px] text-primary-container font-black ml-0.5">
                +
              </span>
            </div>
          </Link>

          {title && (
            <h1 className="font-headline-sm text-headline-sm text-on-surface tracking-tight truncate max-w-[200px] pl-space-xs border-l border-surface-container-high ml-2 hidden sm:block">
              {title}
            </h1>
          )}
        </div>

        {/* Center / Navigation Links for Desktop */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/"
            className="font-label-md text-label-md text-secondary hover:text-on-surface uppercase tracking-wider transition-colors"
          >
            Home
          </Link>
          <Link
            to="/movies"
            className="font-label-md text-label-md text-secondary hover:text-on-surface uppercase tracking-wider transition-colors"
          >
            Movies
          </Link>
          <Link
            to="/series"
            className="font-label-md text-label-md text-secondary hover:text-on-surface uppercase tracking-wider transition-colors"
          >
            Series
          </Link>
          <Link
            to="/my-list"
            className="font-label-md text-label-md text-secondary hover:text-on-surface uppercase tracking-wider transition-colors"
          >
            My List
          </Link>
          <Link
            to="/premium"
            className="font-label-md text-label-md text-primary-fixed hover:text-on-surface uppercase tracking-wider transition-colors flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-[16px] text-primary-container">stars</span>
            Premium
          </Link>
        </nav>

        {/* Right Actions: Search / Direct Player / Profile */}
        <div className="flex items-center gap-space-xs">
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search Catalog"
            className="w-10 h-10 flex items-center justify-center text-secondary hover:text-on-surface hover:bg-surface-container/60 transition-colors rounded-full focus:outline-none"
          >
            <span className="material-symbols-outlined text-[22px]">search</span>
          </button>

          <Link
            to="/player"
            aria-label="Direct 4K Cinema Player"
            className="w-10 h-10 flex items-center justify-center text-secondary hover:text-primary-container hover:bg-surface-container/60 transition-colors rounded-full focus:outline-none"
            title="Now Playing in 4K"
          >
            <span className="material-symbols-outlined text-[22px]">smart_display</span>
          </Link>

          <button
            onClick={() => setIsProfileOpen(true)}
            aria-label="Profile and Settings"
            className="w-8 h-8 rounded-full bg-gradient-to-tr from-primary-container to-purple-600 flex items-center justify-center text-white text-xs font-bold font-meta-mono shadow-md hover:ring-2 hover:ring-primary-container transition-all ml-1"
            title="Profile & Settings"
          >
            MA
          </button>
        </div>
      </div>
    </header>
  );
};

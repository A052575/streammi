import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const AppNavBar = () => {
  const location = useLocation();
  const { watchlist } = useApp();
  const currentPath = location.pathname;

  const navItems = [
    { path: '/', label: 'Home', icon: 'home' },
    { path: '/movies', label: 'Movies', icon: 'movie' },
    { path: '/series', label: 'Series', icon: 'tv' },
    { path: '/my-list', label: 'My List', icon: 'bookmark', badge: watchlist.length },
    { path: '/premium', label: 'Premium', icon: 'stars' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 pb-safe bg-surface/92 backdrop-blur-xl border-t border-surface-container-high/50 shadow-[0_-2px_12px_rgba(0,0,0,0.45)] md:hidden">
      <div className="flex justify-around items-center h-16 px-gutter-sm max-w-md mx-auto">
        {navItems.map((item) => {
          const isActive =
            (item.path === '/' && currentPath === '/') ||
            (item.path !== '/' && currentPath.startsWith(item.path));

          return (
            <Link
              key={item.label}
              to={item.path}
              className={`relative flex flex-col items-center justify-center gap-1 min-w-[56px] h-full transition-colors active:scale-95 ${
                isActive
                  ? 'text-primary-container font-semibold'
                  : 'text-secondary hover:text-on-surface'
              }`}
            >
              <div className="relative">
                <span
                  className="material-symbols-outlined text-[22px]"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.badge > 0 && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-primary-container text-[10px] text-white flex items-center justify-center font-bold">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className="font-label-sm text-[10px] tracking-wider uppercase">
                {item.label}
              </span>
              {isActive && (
                <span className="absolute bottom-1 w-1.5 h-1.5 rounded-full bg-primary-container"></span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

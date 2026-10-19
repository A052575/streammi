import React, { createContext, useContext, useState, useEffect } from 'react';
import { ALL_ITEMS } from '../data/moviesData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Watchlist
  const [watchlist, setWatchlist] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_watchlist');
      return saved ? JSON.parse(saved) : ['the-obsidian-protocol', 'chronos-zero-hour'];
    } catch {
      return ['the-obsidian-protocol', 'chronos-zero-hour'];
    }
  });

  // Rated items
  const [ratings, setRatings] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_ratings');
      return saved ? JSON.parse(saved) : { 'chronos-zero-hour': 5 };
    } catch {
      return { 'chronos-zero-hour': 5 };
    }
  });

  // Current Subscription Plan
  const [activePlan, setActivePlan] = useState('Premium');

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Profile Modal
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Audio / Stream preferences
  const [spatialAudio, setSpatialAudio] = useState(true);
  const [streamQuality, setStreamQuality] = useState('4K HDR Max');

  useEffect(() => {
    localStorage.setItem('aether_watchlist', JSON.stringify(watchlist));
  }, [watchlist]);

  useEffect(() => {
    localStorage.setItem('aether_ratings', JSON.stringify(ratings));
  }, [ratings]);

  const toggleWatchlist = (id) => {
    setWatchlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const isInWatchlist = (id) => watchlist.includes(id);

  const toggleRating = (id) => {
    setRatings((prev) => {
      const copy = { ...prev };
      if (copy[id]) {
        delete copy[id];
      } else {
        copy[id] = 5;
      }
      return copy;
    });
  };

  const isRated = (id) => Boolean(ratings[id]);

  return (
    <AppContext.Provider
      value={{
        watchlist,
        toggleWatchlist,
        isInWatchlist,
        ratings,
        toggleRating,
        isRated,
        activePlan,
        setActivePlan,
        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,
        isProfileOpen,
        setIsProfileOpen,
        spatialAudio,
        setSpatialAudio,
        streamQuality,
        setStreamQuality,
        allItems: ALL_ITEMS
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);

import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';

export const SearchModal = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, allItems } = useApp();
  const navigate = useNavigate();
  const inputRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const filtered = searchQuery.trim() === ''
    ? allItems.slice(0, 4)
    : allItems.filter((item) => {
        const q = searchQuery.toLowerCase();
        return (
          item.title?.toLowerCase().includes(q) ||
          item.genre?.toLowerCase().includes(q) ||
          item.director?.toLowerCase().includes(q) ||
          item.starring?.toLowerCase().includes(q) ||
          item.synopsis?.toLowerCase().includes(q)
        );
      });

  const handleSelect = (item) => {
    setIsSearchOpen(false);
    navigate('/details');
  };

  const handlePlay = (e, item) => {
    e.stopPropagation();
    setIsSearchOpen(false);
    navigate('/player');
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex flex-col p-4 sm:p-8 animate-fadeIn"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl mx-auto flex flex-col bg-surface-container rounded-2xl border border-surface-container-high overflow-hidden shadow-2xl max-h-[85vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-surface-container-high/70 bg-surface-container-low">
          <span className="material-symbols-outlined text-secondary text-[24px] mr-3">search</span>
          <input
            ref={inputRef}
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search films, series, genres, directors..."
            className="flex-1 bg-transparent text-on-surface placeholder:text-secondary/70 font-body-md focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-secondary hover:text-on-surface mr-2"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs uppercase font-label-sm tracking-wider rounded bg-surface-container-high text-secondary hover:text-on-surface"
          >
            Esc
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="flex items-center gap-2 px-4 py-2.5 overflow-x-auto no-scrollbar border-b border-surface-container-high/40 text-xs">
          <span className="text-secondary/70 font-meta-mono uppercase">Suggestions:</span>
          {['4K HDR', 'Sci-Fi', 'Thriller', 'Denis Villeneuve', 'Florence Pugh'].map((tag) => (
            <button
              key={tag}
              onClick={() => setSearchQuery(tag)}
              className="px-2.5 py-1 rounded-full bg-surface-container-high/60 hover:bg-surface-container-high text-secondary hover:text-on-surface transition-colors whitespace-nowrap"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
          <div className="flex items-center justify-between text-xs text-secondary font-meta-mono uppercase">
            <span>{searchQuery ? `Results (${filtered.length})` : 'Popular Searches'}</span>
          </div>

          {filtered.length === 0 ? (
            <div className="py-12 text-center text-secondary">
              <span className="material-symbols-outlined text-4xl mb-2 text-secondary/40">movie_filter</span>
              <p className="font-body-md">No cinematic titles found matching "{searchQuery}"</p>
              <p className="font-meta-mono text-xs text-secondary/60 mt-1">Try searching for genres like Sci-Fi or directors like Denis Villeneuve</p>
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelect(item)}
                className="group flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-high/80 border border-transparent hover:border-surface-container-highest cursor-pointer transition-all"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="relative w-20 aspect-video rounded-lg overflow-hidden bg-surface-container shrink-0">
                    <img
                      src={item.image || item.backdrop}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <div className="flex flex-col min-w-0">
                    <h4 className="font-label-md text-on-surface group-hover:text-primary transition-colors truncate">
                      {item.title}
                    </h4>
                    <div className="flex items-center gap-2 text-xs font-meta-mono text-secondary">
                      <span>{item.year || '2025'}</span>
                      <span>•</span>
                      <span>{item.genre}</span>
                      {item.match && (
                        <>
                          <span>•</span>
                          <span className="text-primary font-semibold">{item.match}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={(e) => handlePlay(e, item)}
                  className="w-9 h-9 rounded-full bg-surface-container-high/80 hover:bg-primary-container text-on-surface hover:text-white flex items-center justify-center shrink-0 ml-2 transition-colors shadow-sm"
                  title="Play"
                >
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    play_arrow
                  </span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

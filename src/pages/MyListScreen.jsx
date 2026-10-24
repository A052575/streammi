import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { ShoppingLinks } from '../components/ShoppingLinks';
import { useApp } from '../context/AppContext';

export const MyListScreen = () => {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist, allItems } = useApp();
  const [filterType, setFilterType] = useState('all');

  const savedItems = allItems.filter((item) => watchlist.includes(item.id));

  const filteredItems = filterType === 'all'
    ? savedItems
    : savedItems.filter((item) => item.type === filterType);

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader title="My List" showBack={true} />

      <main className="flex-1 flex flex-col relative w-full pt-20 px-margin-mobile sm:px-margin max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-surface-container-high/40">
          <div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              My Watchlist
            </h1>
            <p className="font-meta-mono text-xs text-secondary mt-1">
              {savedItems.length} curated cinematic titles saved to your private library
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: 'All Titles' },
              { id: 'movie', label: 'Movies' },
              { id: 'series', label: 'Series' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilterType(f.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-meta-mono uppercase tracking-wider transition-colors ${
                  filterType === f.id
                    ? 'bg-primary-container text-white font-bold'
                    : 'bg-surface-container-high text-secondary hover:text-on-surface'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Watchlist Grid */}
        {filteredItems.length === 0 ? (
          <div className="py-20 flex flex-col items-center justify-center text-center text-secondary">
            <span className="material-symbols-outlined text-6xl mb-3 text-secondary/40">bookmark_border</span>
            <h3 className="font-headline-sm text-on-surface mb-1">Your Watchlist is Empty</h3>
            <p className="font-body-md text-sm text-secondary/70 max-w-sm mb-6">
              Explore films and series from the AETHER+ library and tap "My List" to bookmark them here.
            </p>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-2.5 rounded-xl bg-primary-container text-white font-label-md text-xs uppercase tracking-wider font-bold shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              Discover Cinema
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-6">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-surface-container-high/40 hover:border-primary-container/60 transition-all shadow-md"
              >
                <div
                  onClick={() => navigate('/details')}
                  className="relative aspect-[2/3] w-full bg-surface-container cursor-pointer overflow-hidden"
                >
                  <img
                    src={item.image || item.backdrop}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 bg-surface/85 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[10px] text-primary font-bold">
                    {item.match || '98%'}
                  </div>
                </div>

                <div className="p-3 flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="font-label-md text-sm text-on-surface font-semibold truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>
                    <p className="font-meta-mono text-[11px] text-secondary mt-0.5 truncate">
                      {item.year || '2025'} • {item.genre}
                    </p>
                    <ShoppingLinks
                      amazonUrl={item.amazonUrl}
                      flipkartUrl={item.flipkartUrl}
                      itemTitle={item.title}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-2 border-t border-surface-container-high/30">
                    <button
                      onClick={() => navigate('/player')}
                      className="px-2.5 py-1 rounded-lg bg-surface-container-high hover:bg-primary-container text-xs font-label-md text-on-surface hover:text-white flex items-center gap-1 transition-colors"
                    >
                      <span className="material-symbols-outlined text-[16px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                      <span>Play</span>
                    </button>

                    <button
                      onClick={() => toggleWatchlist(item.id)}
                      className="p-1.5 rounded-lg text-secondary hover:text-red-400 hover:bg-surface-container transition-colors"
                      title="Remove from My List"
                    >
                      <span className="material-symbols-outlined text-[18px]">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <AppNavBar />
    </div>
  );
};

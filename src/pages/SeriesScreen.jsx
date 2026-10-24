import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { ShoppingLinks } from '../components/ShoppingLinks';
import { ALL_ITEMS } from '../data/moviesData';

export const SeriesScreen = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = React.useState('All');

  const series = ALL_ITEMS.filter((item) => item.type === 'series' || item.episode);

  const filtered = activeFilter === 'All'
    ? series
    : series.filter((s) => s.genre?.toLowerCase().includes(activeFilter.toLowerCase()));

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader title="Prestige Series" showBack={true} />

      <main className="flex-1 flex flex-col relative w-full pt-20 px-margin-mobile sm:px-margin max-w-7xl mx-auto">
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-meta-mono uppercase font-bold tracking-wider bg-primary-container text-white">
                Episodic Cinema
              </span>
              <span className="text-xs font-meta-mono text-secondary">
                {filtered.length} Series Seasons
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Prestige Series
            </h1>
            <p className="font-body-md text-secondary text-sm mt-1">
              Episodic narratives crafted with the discipline and visual grandeur of cinema.
            </p>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All', 'Cyberpunk', 'Neo-Noir', 'Thriller'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-3 py-1.5 rounded-full text-xs font-meta-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  activeFilter === f
                    ? 'bg-primary-container text-white font-bold shadow-md'
                    : 'bg-surface-container-high text-secondary hover:text-on-surface'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/player')}
              className="group flex flex-col bg-surface-container-low rounded-2xl overflow-hidden border border-surface-container-high/40 hover:border-primary-container/60 transition-all cursor-pointer shadow-lg"
            >
              <div className="relative aspect-video w-full bg-surface-container overflow-hidden">
                <img
                  src={item.image || item.backdrop}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-surface-container-low via-transparent to-transparent"></div>
                <div className="absolute top-3 right-3 bg-surface/85 backdrop-blur-md px-2 py-0.5 rounded font-meta-mono text-xs text-primary font-bold">
                  {item.match} Match
                </div>
                <div className="absolute bottom-3 left-3 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-primary-container flex items-center justify-center text-white shadow-md">
                    <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                      play_arrow
                    </span>
                  </span>
                  <span className="font-label-sm text-xs uppercase font-bold tracking-wider text-white">
                    Resume Episode
                  </span>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between flex-1">
                <div>
                  <h3 className="font-headline-sm text-base text-on-surface font-bold group-hover:text-primary transition-colors">
                    {item.title}
                  </h3>
                  <p className="font-meta-mono text-xs text-primary-fixed mt-0.5">
                    {item.episode}
                  </p>
                  <ShoppingLinks
                    amazonUrl={item.amazonUrl}
                    flipkartUrl={item.flipkartUrl}
                    itemTitle={item.title}
                  />
                  <p className="font-body-md text-xs text-secondary line-clamp-2 mt-2 leading-relaxed">
                    {item.synopsis}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-4 mt-3 border-t border-surface-container-high/30 text-xs font-meta-mono text-secondary">
                  <span>{item.year}</span>
                  <span className="px-2 py-0.5 rounded bg-surface-container-high text-on-surface">
                    {item.quality}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <AppNavBar />
    </div>
  );
};

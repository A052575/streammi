import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { ShoppingLinks } from '../components/ShoppingLinks';
import { ALL_ITEMS, GENRES } from '../data/moviesData';

export const MoviesScreen = () => {
  const navigate = useNavigate();
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [searchFilter, setSearchFilter] = useState('');
  const [qualityFilter, setQualityFilter] = useState('All');

  const movies = ALL_ITEMS.filter((item) => item.type === 'movie' || !item.type);

  const filtered = movies.filter((m) => {
    const matchesGenre = selectedGenre === 'All' || m.genre?.toLowerCase().includes(selectedGenre.toLowerCase());
    const matchesSearch = searchFilter.trim() === '' || m.title?.toLowerCase().includes(searchFilter.toLowerCase()) || m.genre?.toLowerCase().includes(searchFilter.toLowerCase());
    const matchesQuality = qualityFilter === 'All' || (m.quality && m.quality.toLowerCase().includes(qualityFilter.toLowerCase()));
    return matchesGenre && matchesSearch && matchesQuality;
  });

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader title="Feature Films" showBack={true} />

      <main className="flex-1 flex flex-col relative w-full pt-20 px-margin-mobile sm:px-margin max-w-7xl mx-auto">
        {/* Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2 py-0.5 rounded text-[10px] font-meta-mono uppercase font-bold tracking-wider bg-primary-container text-white">
                Festival Archive
              </span>
              <span className="text-xs font-meta-mono text-secondary">
                {filtered.length} Titles Available
              </span>
            </div>
            <h1 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
              Feature Films
            </h1>
            <p className="font-body-md text-secondary text-sm mt-1 max-w-xl">
              Curated festival selections, uncompressed master presentations, and world cinema archives.
            </p>
          </div>

          {/* Quick Search */}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="Search films or genres..."
              className="w-full px-3.5 py-2 pl-9 rounded-xl bg-surface-container-low border border-surface-container-high text-xs text-on-surface placeholder:text-secondary focus:outline-none focus:border-primary-container transition-colors"
            />
            <span className="material-symbols-outlined text-[16px] text-secondary absolute left-3 top-2.5">
              search
            </span>
            {searchFilter && (
              <button
                onClick={() => setSearchFilter('')}
                className="absolute right-3 top-2.5 text-secondary hover:text-on-surface text-xs"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Bar: Genres + Quality */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high/40">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {['All', ...GENRES.map((g) => g.name)].map((genre) => (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-3 py-1.5 rounded-full text-xs font-meta-mono uppercase tracking-wider transition-colors whitespace-nowrap ${
                  selectedGenre === genre
                    ? 'bg-primary-container text-white font-bold shadow-md'
                    : 'bg-surface-container-high text-secondary hover:text-on-surface'
                }`}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-[11px] font-meta-mono text-secondary uppercase">Format:</span>
            {['All', '4K', 'Dolby'].map((q) => (
              <button
                key={q}
                onClick={() => setQualityFilter(q)}
                className={`px-2.5 py-1 rounded-lg text-[10px] font-meta-mono font-bold tracking-wider transition-colors ${
                  qualityFilter === q
                    ? 'bg-on-surface text-surface'
                    : 'bg-surface-container-high/80 text-secondary hover:text-on-surface'
                }`}
              >
                {q}
              </button>
            ))}
          </div>
        </div>

        {/* Movies Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 pt-2">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => navigate('/details')}
              className="group flex flex-col bg-surface-container-low rounded-xl overflow-hidden border border-surface-container-high/40 hover:border-primary-container/60 transition-all cursor-pointer shadow-md"
            >
              <div className="relative aspect-[2/3] w-full bg-surface-container overflow-hidden">
                <img
                  src={item.image || item.backdrop}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-2 right-2 bg-surface/85 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[10px] text-primary font-bold">
                  {item.match || '97%'}
                </div>
                <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-surface-lowest/80 text-[10px] font-meta-mono text-secondary">
                  {item.quality || '4K HDR'}
                </div>
              </div>
              <div className="p-3 flex flex-col">
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
            </div>
          ))}
        </div>
      </main>

      <AppNavBar />
    </div>
  );
};

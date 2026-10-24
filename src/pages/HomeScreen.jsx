import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { ShoppingLinks } from '../components/ShoppingLinks';
import {
  FEATURED_HERO,
  CONTINUE_WATCHING,
  TRENDING_MOVIES,
  GENRES
} from '../data/moviesData';
import { useApp } from '../context/AppContext';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist } = useApp();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeTabFilter, setActiveTabFilter] = useState('All');

  const heroInWatchlist = watchlist.includes(FEATURED_HERO.id);

  const displayedTrending = selectedGenre
    ? TRENDING_MOVIES.filter((m) => m.genre.toLowerCase().includes(selectedGenre.toLowerCase()))
    : TRENDING_MOVIES;

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader />

      <main className="flex-1 flex flex-col relative w-full pt-16">
        {/* 1. Cinematic Hero Section */}
        <section className="relative w-full min-h-[540px] sm:min-h-[500px] md:min-h-[540px] lg:max-h-[620px] lg:aspect-[21/9] overflow-hidden flex flex-col justify-end">
          {/* Visual Backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${FEATURED_HERO.backdrop}')` }}
          />

          {/* Directional Cinematic Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/40 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-surface/20 to-surface"></div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 px-margin-mobile sm:px-margin pb-6 max-w-3xl flex flex-col gap-space-xs">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-surface-container-highest/80 backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary-fixed">
                  {FEATURED_HERO.badge}
                </span>
              </span>
              <span className="hidden sm:inline-block font-meta-mono text-xs text-primary font-bold">
                {FEATURED_HERO.match} Match
              </span>
            </div>

            <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-display-hero text-on-primary-container font-extrabold tracking-tight drop-shadow-md uppercase leading-none">
              {FEATURED_HERO.title}
            </h1>

            {/* Shopping & Merch Links */}
            <ShoppingLinks
              amazonUrl={FEATURED_HERO.amazonUrl}
              flipkartUrl={FEATURED_HERO.flipkartUrl}
              itemTitle={FEATURED_HERO.title}
              variant="hero"
            />

            {/* Metadata Line */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-meta-mono text-meta-mono text-secondary pt-1">
              <span>{FEATURED_HERO.year}</span>
              <span className="text-surface-variant">•</span>
              <span>{FEATURED_HERO.genre}</span>
              <span className="text-surface-variant">•</span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container-high text-on-surface text-[10px]">
                {FEATURED_HERO.ageRating}
              </span>
              <span className="text-surface-variant">•</span>
              <span>{FEATURED_HERO.duration}</span>
              <span className="text-surface-variant">•</span>
              <span className="px-1.5 py-0.2 rounded bg-surface-container text-secondary text-[10px] tracking-wider font-semibold">
                {FEATURED_HERO.quality}
              </span>
              <span className="text-surface-variant">•</span>
              <span className="text-[10px] text-secondary font-semibold">{FEATURED_HERO.audio}</span>
            </div>

            {/* Synopsis */}
            <p className="font-body-md text-body-md text-secondary line-clamp-2 mt-1 leading-snug max-w-xl">
              {FEATURED_HERO.synopsis}
            </p>

            {/* Action Row */}
            <div className="flex items-center gap-space-sm mt-3 flex-wrap">
              <button
                onClick={() => navigate('/player')}
                className="h-11 px-6 rounded-xl bg-on-surface text-surface hover:bg-white font-label-md text-label-md flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-black/40 glow-card"
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                <span className="font-bold">Play Now</span>
              </button>

              <button
                onClick={() => toggleWatchlist(FEATURED_HERO.id)}
                className={`h-11 px-5 rounded-xl backdrop-blur-md font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all ${
                  heroInWatchlist
                    ? 'bg-primary-container text-white'
                    : 'bg-surface-container-high/70 hover:bg-surface-container-high text-on-surface'
                }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {heroInWatchlist ? 'check' : 'add'}
                </span>
                <span>{heroInWatchlist ? 'In My List' : 'My List'}</span>
              </button>

              <button
                onClick={() => setIsTrailerOpen(true)}
                className="h-11 px-4 rounded-xl bg-surface-container-high/80 hover:bg-surface-container-highest backdrop-blur-md text-on-surface font-label-md text-label-md flex items-center justify-center gap-1.5 active:scale-95 transition-all border border-surface-container-highest"
                title="Watch 4K Trailer"
              >
                <span className="material-symbols-outlined text-[20px]">movie</span>
                <span>Trailer</span>
              </button>

              <button
                onClick={() => navigate('/details')}
                aria-label="Movie Details"
                className="w-11 h-11 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-high backdrop-blur-md text-on-surface flex items-center justify-center active:scale-95 transition-all"
                title="View Full Details"
              >
                <span className="material-symbols-outlined text-[20px]">info</span>
              </button>
            </div>
          </div>
        </section>

        {/* 2. Continue Watching (Section A) */}
        <section className="mt-space-lg flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Continue Watching
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
              For Alex
            </span>
          </div>

          {/* Horizontal Snap Scroller */}
          <div className="flex gap-4 overflow-x-auto px-margin-mobile sm:px-margin no-scrollbar snap-x snap-mandatory py-1">
            {CONTINUE_WATCHING.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/player')}
                className="snap-start shrink-0 w-[240px] sm:w-[280px] flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container border border-surface-container-high/40 group-hover:border-primary-container/50 transition-all">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="absolute inset-0 bg-surface-lowest/30 flex items-center justify-center group-hover:bg-black/20 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center text-on-surface shadow-md group-hover:scale-110 group-hover:bg-primary-container transition-all">
                      <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        play_arrow
                      </span>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 px-1.5 py-0.5 rounded bg-surface-lowest/80 text-[10px] font-meta-mono text-on-surface">
                    {item.remaining}
                  </div>
                  {/* Progress Scrub Track */}
                  <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-surface-variant">
                    <div
                      className="h-full bg-primary-container"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors">
                      {item.title}
                    </h3>
                    <span className="text-[10px] font-meta-mono text-primary font-bold">
                      {item.match}
                    </span>
                  </div>
                  <p className="font-meta-mono text-[11px] text-secondary truncate">
                    {item.episode}
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
        </section>

        {/* 3. Trending Now (Section B) */}
        <section className="mt-space-lg flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
                Trending Now
              </h2>
              {selectedGenre && (
                <span className="text-xs font-meta-mono text-primary px-2 py-0.5 rounded bg-surface-container">
                  Filtered by {selectedGenre}
                </span>
              )}
            </div>
            <button
              onClick={() => navigate('/movies')}
              className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 hover:underline"
            >
              See All <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="flex gap-4 overflow-x-auto px-margin-mobile sm:px-margin no-scrollbar snap-x snap-mandatory py-1">
            {displayedTrending.map((movie) => (
              <div
                key={movie.id}
                onClick={() => navigate('/details')}
                className="snap-start shrink-0 w-[160px] sm:w-[200px] flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-container border border-surface-container-high/40 group-hover:border-primary-container/60 transition-all shadow-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={movie.image}
                    alt={movie.title}
                  />
                  <div className="absolute top-2 right-2 bg-surface/85 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[10px] text-primary font-bold">
                    {movie.match}
                  </div>
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-surface-lowest/80 text-[10px] font-meta-mono text-secondary">
                    {movie.duration}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors">
                    {movie.title}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] font-meta-mono text-secondary">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span className="truncate">{movie.genre}</span>
                  </div>
                  <ShoppingLinks
                    amazonUrl={movie.amazonUrl}
                    flipkartUrl={movie.flipkartUrl}
                    itemTitle={movie.title}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Genres Discovery Matrix */}
        <section className="mt-space-lg flex flex-col gap-space-sm max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight">
              Explore by Genre
            </h2>
            {selectedGenre && (
              <button
                onClick={() => setSelectedGenre(null)}
                className="text-xs text-secondary hover:text-on-surface underline font-meta-mono"
              >
                Clear Filter
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GENRES.map((g) => {
              const isSelected = selectedGenre === g.name;
              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGenre(isSelected ? null : g.name)}
                  className={`relative h-24 rounded-xl overflow-hidden bg-surface-container group cursor-pointer active:scale-98 transition-all border ${
                    isSelected ? 'border-primary-container ring-1 ring-primary-container' : 'border-surface-container-high/40'
                  }`}
                >
                  <img
                    className="w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-500"
                    src={g.image}
                    alt={g.name}
                  />
                  <div className="absolute inset-0 bg-surface/40 group-hover:bg-surface/20 transition-colors"></div>
                  <div className="absolute inset-0 p-3 flex flex-col justify-end">
                    <span className="font-headline-sm text-[16px] text-on-surface font-bold tracking-wide">
                      {g.name}
                    </span>
                    <span className="font-meta-mono text-[10px] text-secondary">
                      {g.titlesCount}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* 5. Editorial Archival Banner */}
        <section className="mt-space-xl max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div
            onClick={() => navigate('/premium')}
            className="relative rounded-2xl overflow-hidden border border-surface-container-high p-6 sm:p-10 bg-gradient-to-r from-surface-container via-surface-container-low to-surface cursor-pointer group shadow-2xl"
          >
            <div className="relative z-10 max-w-xl flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 font-label-sm text-xs uppercase tracking-widest text-primary-fixed font-bold">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                AETHER+ Archival Restoration
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                Experience Cinema as the Director Intended
              </h2>
              <p className="font-body-md text-secondary text-sm sm:text-base leading-relaxed">
                Stream in pristine 4K HDR at up to 60 Mbps with master uncompressed Dolby Atmos binaural spatial audio.
              </p>
              <div className="pt-2">
                <button className="px-5 py-2.5 rounded-xl bg-primary-container text-white font-label-md text-sm font-bold flex items-center gap-2 group-hover:brightness-110 transition-all shadow-lg">
                  <span>Explore Membership</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Editorial Footprint */}
        <footer className="mt-space-xl px-margin-mobile flex flex-col items-center justify-center text-center gap-1.5 py-8 border-t border-surface-container-high/40">
          <div className="w-8 h-1 rounded-full bg-surface-container-high mb-2"></div>
          <span className="font-label-sm text-[11px] text-secondary tracking-widest uppercase font-semibold">
            AETHER+ Cinematic Network
          </span>
          <p className="font-meta-mono text-[10px] text-secondary/60">
            Curated algorithmic streaming in uncompressed 4K Spatial Audio.
          </p>
        </footer>

        {/* 4K Cinematic Trailer Modal */}
        {isTrailerOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setIsTrailerOpen(false)}
          >
            <div
              className="relative w-full max-w-4xl bg-surface-container rounded-2xl overflow-hidden border border-surface-container-highest shadow-2xl flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-5 py-3.5 bg-surface-container-low border-b border-surface-container-highest">
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-primary-container text-white text-[10px] font-bold tracking-widest uppercase">
                    Official 4K Trailer
                  </span>
                  <span className="font-label-md text-sm font-semibold text-on-surface">
                    {FEATURED_HERO.title}
                  </span>
                </div>
                <button
                  onClick={() => setIsTrailerOpen(false)}
                  className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-container-highest flex items-center justify-center text-secondary hover:text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[20px]">close</span>
                </button>
              </div>

              {/* Video Player Container */}
              <div className="relative aspect-video w-full bg-black">
                <video
                  src={FEATURED_HERO.videoUrl}
                  controls
                  autoPlay
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Trailer Footer Info */}
              <div className="p-4 bg-surface-container-low flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div>
                  <h4 className="font-label-md text-sm font-semibold text-on-surface">
                    Chronos: Zero Hour - Cinema Teaser
                  </h4>
                  <p className="font-meta-mono text-xs text-secondary mt-0.5">
                    Dolby Vision • Dolby Atmos 7.1 • Directed by {FEATURED_HERO.director}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      setIsTrailerOpen(false);
                      navigate('/player');
                    }}
                    className="px-4 py-2 rounded-xl bg-on-surface text-surface hover:bg-white text-xs font-bold font-label-md flex items-center gap-1.5 transition-all shadow-md"
                  >
                    <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                    <span>Play Full Movie</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      <AppNavBar />
    </div>
  );
};

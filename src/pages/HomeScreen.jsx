import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { ShoppingLinks } from '../components/ShoppingLinks';
import {
  FEATURED_HERO,
  CONTINUE_WATCHING,
  TRENDING_MOVIES,
  TOP_10_MOVIES,
  STREAMMI_ORIGINALS,
  AWARD_WINNERS,
  BINGE_SERIES,
  STREAMING_FAQS,
  GENRES,
  SHOPPING_LINKS,
  FALLBACK_POSTER,
  SAMPLE_VIDEO_URL
} from '../data/moviesData';
import { useApp } from '../context/AppContext';

export const HomeScreen = () => {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist } = useApp();
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const [activeMoodFilter, setActiveMoodFilter] = useState('All');
  const [openFaq, setOpenFaq] = useState(null);

  // Home spotlight lightweight video player state
  const spotlightVideoRef = useRef(null);
  const [isSpotlightMuted, setIsSpotlightMuted] = useState(true);
  const [isSpotlightPlaying, setIsSpotlightPlaying] = useState(true);

  const heroInWatchlist = watchlist.includes(FEATURED_HERO.id);

  // Safe image fallback
  const handleImgError = (e) => {
    e.currentTarget.onerror = null;
    e.currentTarget.src = FALLBACK_POSTER;
  };

  const displayedTrending = selectedGenre
    ? TRENDING_MOVIES.filter((m) => m.genre.toLowerCase().includes(selectedGenre.toLowerCase()))
    : TRENDING_MOVIES;

  const toggleSpotlightPlay = () => {
    if (spotlightVideoRef.current) {
      if (spotlightVideoRef.current.paused) {
        spotlightVideoRef.current.play();
        setIsSpotlightPlaying(true);
      } else {
        spotlightVideoRef.current.pause();
        setIsSpotlightPlaying(false);
      }
    }
  };

  const toggleSpotlightMute = () => {
    if (spotlightVideoRef.current) {
      spotlightVideoRef.current.muted = !isSpotlightMuted;
      setIsSpotlightMuted(!isSpotlightMuted);
    }
  };

  const moods = [
    { id: 'All', label: 'All Recommendations' },
    { id: 'SciFi', label: '⚡ Mind-Bending Sci-Fi' },
    { id: 'Thrill', label: '🔥 High-Octane Thrillers' },
    { id: 'Award', label: '🏆 Award Winners' },
    { id: '4K', label: '✨ 4K Visual Spectacle' }
  ];

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-24 md:pb-12 selection:bg-primary-container selection:text-white">
      <AppHeader />

      <main className="flex-1 flex flex-col relative w-full pt-14 pb-12">
        {/* =========================================================================
            1. CINEMATIC HERO SECTION
        ========================================================================= */}
        <section className="relative w-full min-h-[580px] sm:min-h-[520px] md:min-h-[600px] lg:max-h-[660px] overflow-hidden flex flex-col justify-end pt-16 pb-8">
          {/* Visual Backdrop */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 hover:scale-105"
            style={{ backgroundImage: `url('${FEATURED_HERO.backdrop}')` }}
          />

          {/* Directional Cinematic Scrims */}
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/75 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-surface via-surface/60 to-transparent"></div>
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-surface/30 to-surface"></div>

          {/* Hero Content Overlay */}
          <div className="relative z-10 px-margin-mobile sm:px-margin max-w-4xl flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-highest/90 backdrop-blur-md border border-white/10 shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse"></span>
                <span className="font-label-sm text-[11px] uppercase tracking-widest text-primary-fixed font-bold">
                  {FEATURED_HERO.badge}
                </span>
              </span>
              <span className="inline-block font-meta-mono text-xs text-primary font-bold bg-surface-container-high/80 px-2 py-0.5 rounded">
                {FEATURED_HERO.match} Match
              </span>
              <span className="text-xs text-secondary hidden sm:inline-flex items-center gap-1 font-meta-mono">
                <span className="text-amber-400">★</span> {FEATURED_HERO.criterionRating}
              </span>
            </div>

            <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-display-hero text-on-primary-container font-extrabold tracking-tight drop-shadow-lg uppercase leading-tight">
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
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 font-meta-mono text-meta-mono text-secondary pt-0.5 text-xs">
              <span className="text-on-surface font-semibold">{FEATURED_HERO.year}</span>
              <span className="text-surface-variant">•</span>
              <span>{FEATURED_HERO.genre}</span>
              <span className="text-surface-variant">•</span>
              <span className="px-1.5 py-0.5 rounded bg-surface-container-high text-on-surface text-[10px] font-bold border border-surface-container-highest">
                {FEATURED_HERO.ageRating}
              </span>
              <span className="text-surface-variant">•</span>
              <span>{FEATURED_HERO.duration}</span>
              <span className="text-surface-variant">•</span>
              <span className="px-1.5 py-0.5 rounded bg-primary-container/20 text-primary-fixed text-[10px] tracking-wider font-bold border border-primary-container/30">
                {FEATURED_HERO.quality}
              </span>
              <span className="text-surface-variant hidden sm:inline">•</span>
              <span className="text-[10px] text-secondary font-semibold hidden sm:inline">
                {FEATURED_HERO.audio}
              </span>
            </div>

            {/* Synopsis */}
            <p className="font-body-md text-secondary line-clamp-2 mt-0.5 text-xs sm:text-sm leading-relaxed max-w-2xl">
              {FEATURED_HERO.synopsis}
            </p>

            {/* Action Row */}
            <div className="flex items-center gap-2.5 mt-2 flex-wrap">
              <button
                onClick={() => navigate('/player')}
                className="h-11 px-6 rounded-xl bg-on-surface text-surface hover:bg-white font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all shadow-xl shadow-black/50 glow-card"
              >
                <span className="material-symbols-outlined text-[22px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                  play_arrow
                </span>
                <span className="font-bold tracking-wide">Play Now</span>
              </button>

              <button
                onClick={() => setIsTrailerOpen(true)}
                className="h-11 px-4 rounded-xl bg-surface-container-high/90 hover:bg-surface-container-highest backdrop-blur-md text-on-surface font-label-md text-xs sm:text-sm flex items-center justify-center gap-2 active:scale-95 transition-all border border-surface-container-highest shadow-md"
                title="Watch 4K Trailer"
              >
                <span className="material-symbols-outlined text-[19px] text-primary-container">movie</span>
                <span className="font-semibold">Watch Trailer</span>
              </button>

              <button
                onClick={() => toggleWatchlist(FEATURED_HERO.id)}
                className={`h-11 px-4 rounded-xl backdrop-blur-md font-label-md text-xs sm:text-sm flex items-center justify-center gap-1.5 active:scale-95 transition-all border ${heroInWatchlist
                    ? 'bg-primary-container text-white border-primary-container'
                    : 'bg-surface-container-high/70 hover:bg-surface-container-high text-on-surface border-surface-container-highest'
                  }`}
              >
                <span className="material-symbols-outlined text-[18px]">
                  {heroInWatchlist ? 'check' : 'add'}
                </span>
                <span>{heroInWatchlist ? 'In My List' : 'My List'}</span>
              </button>

              <button
                onClick={() => navigate('/details')}
                aria-label="Movie Details"
                className="w-11 h-11 rounded-xl bg-surface-container-high/70 hover:bg-surface-container-high backdrop-blur-md text-on-surface flex items-center justify-center active:scale-95 transition-all border border-surface-container-highest"
                title="View Full Details"
              >
                <span className="material-symbols-outlined text-[19px]">info</span>
              </button>
            </div>
          </div>
        </section>

        {/* Quick Mood Filter Bar */}
        <section className="max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin mt-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
            {moods.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveMoodFilter(m.id)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${activeMoodFilter === m.id
                    ? 'bg-primary-container text-white border-primary-container shadow-md shadow-primary-container/20'
                    : 'bg-surface-container-high/50 hover:bg-surface-container-high text-secondary hover:text-on-surface border-surface-container-high'
                  }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </section>

        {/* =========================================================================
            2. CONTINUE WATCHING (Section A)
        ========================================================================= */}
        <section className="mt-space-lg flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Continue Watching
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            </div>
            <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider font-meta-mono text-xs">
              Alex's Queue
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto px-margin-mobile sm:px-margin no-scrollbar snap-x snap-mandatory py-1">
            {CONTINUE_WATCHING.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate('/player')}
                className="snap-start shrink-0 w-[240px] sm:w-[280px] flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-video rounded-xl overflow-hidden bg-surface-container border border-surface-container-high/40 group-hover:border-primary-container/50 transition-all shadow-md">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={item.image}
                    alt={item.title}
                    onError={handleImgError}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-surface-lowest/30 flex items-center justify-center group-hover:bg-black/30 transition-colors">
                    <div className="w-10 h-10 rounded-full bg-surface-container-lowest/80 backdrop-blur-sm flex items-center justify-center text-on-surface shadow-md group-hover:scale-110 group-hover:bg-primary-container group-hover:text-white transition-all">
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
                      className="h-full bg-primary-container shadow-[0_0_8px_rgba(229,9,20,0.8)]"
                      style={{ width: `${item.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors font-semibold">
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

        {/* =========================================================================
            3. 🔥 TOP 10 IN INDIA TODAY (Numbered Blockbuster Leaderboard)
        ========================================================================= */}
        <section className="mt-space-xl flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-md bg-gradient-to-tr from-primary-container to-amber-500 flex items-center justify-center shadow-md">
                <span className="material-symbols-outlined text-[16px] text-white">trending_up</span>
              </div>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-extrabold flex items-center gap-2">
                <span>Top 10 in India Today</span>
                <span className="text-xs px-2 py-0.5 rounded bg-surface-container-high text-primary-fixed font-meta-mono font-bold uppercase tracking-wider hidden sm:inline">
                  Live Ranking
                </span>
              </h2>
            </div>
            <span className="font-label-sm text-xs text-secondary font-meta-mono">
              Updated Hourly
            </span>
          </div>

          <div className="flex gap-6 overflow-x-auto px-margin-mobile sm:px-margin no-scrollbar snap-x snap-mandatory py-2">
            {TOP_10_MOVIES.map((movie) => (
              <div
                key={movie.id + movie.rank}
                onClick={() => navigate('/details')}
                className="snap-start shrink-0 flex items-end group cursor-pointer relative"
              >
                {/* Giant Stylized Number Backdrop */}
                <span className="text-7xl sm:text-8xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/60 via-white/20 to-transparent select-none -mr-4 sm:-mr-6 z-0 transform group-hover:scale-105 transition-transform duration-300">
                  {movie.rank}
                </span>

                {/* Overlapping Poster Card */}
                <div className="relative z-10 w-[140px] sm:w-[170px] flex flex-col gap-1.5">
                  <div className="relative aspect-[2/3] rounded-xl overflow-hidden bg-surface-container border border-surface-container-high/60 group-hover:border-primary-container transition-all shadow-xl group-hover:shadow-primary-container/20">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      src={movie.image}
                      alt={movie.title}
                      onError={handleImgError}
                      loading="lazy"
                    />
                    <div className="absolute top-2 left-2 bg-primary-container/90 backdrop-blur-md px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider text-white uppercase shadow">
                      TOP 10
                    </div>
                    <div className="absolute top-2 right-2 bg-black/80 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[9px] text-primary font-bold">
                      {movie.match}
                    </div>
                    <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-[9px] font-meta-mono bg-black/75 backdrop-blur-sm px-1.5 py-0.5 rounded text-secondary">
                      <span>{movie.duration}</span>
                      <span className="text-white font-semibold">{movie.quality}</span>
                    </div>
                  </div>

                  <div className="flex flex-col min-w-0 pt-0.5">
                    <h3 className="font-label-md text-xs sm:text-sm text-on-surface truncate group-hover:text-primary transition-colors font-bold">
                      {movie.title}
                    </h3>
                    <p className="text-[10px] font-meta-mono text-secondary truncate">
                      {movie.category}
                    </p>
                    <ShoppingLinks
                      amazonUrl={movie.amazonUrl}
                      flipkartUrl={movie.flipkartUrl}
                      itemTitle={movie.title}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. 🎬 ULTRA-LIGHTWEIGHT VIDEO SPOTLIGHT SHOWCASE (Fast Stream Demonstrator)
        ========================================================================= */}
        <section className="mt-space-xl max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div className="relative rounded-2xl overflow-hidden border border-surface-container-highest/80 bg-surface-container-low shadow-2xl">
            {/* Header / Sub-banner */}
            <div className="px-5 py-3 bg-surface-container-high/50 border-b border-surface-container-highest flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-xs font-bold uppercase tracking-wider text-primary-fixed">
                  Ultra-Fast Edge Streaming • 0s Latency
                </span>
                <span className="hidden sm:inline-block text-[11px] font-meta-mono text-secondary px-2 py-0.5 rounded bg-surface-container">
                  4.1 MB High Efficiency Stream
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={toggleSpotlightMute}
                  className="px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-highest text-xs font-meta-mono flex items-center gap-1.5 text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isSpotlightMuted ? 'volume_off' : 'volume_up'}
                  </span>
                  <span>{isSpotlightMuted ? 'Unmute' : 'Muted'}</span>
                </button>
                <button
                  onClick={toggleSpotlightPlay}
                  className="px-3 py-1 rounded-lg bg-surface-container hover:bg-surface-container-highest text-xs font-meta-mono flex items-center gap-1.5 text-on-surface transition-colors"
                >
                  <span className="material-symbols-outlined text-[16px]">
                    {isSpotlightPlaying ? 'pause' : 'play_arrow'}
                  </span>
                  <span>{isSpotlightPlaying ? 'Pause' : 'Play'}</span>
                </button>
              </div>
            </div>

            {/* Video Viewport */}
            <div className="relative aspect-video sm:aspect-[21/9] w-full bg-black overflow-hidden group">
              <video
                ref={spotlightVideoRef}
                src={SAMPLE_VIDEO_URL}
                poster={FEATURED_HERO.playerBackdrop}
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted={isSpotlightMuted}
                playsInline
                preload="metadata"
              />

              {/* Cinematic Vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent pointer-events-none"></div>

              {/* Floating Overlay Controls / Info */}
              <div className="absolute bottom-4 left-4 sm:left-8 right-4 flex items-end justify-between gap-4 pointer-events-auto">
                <div className="max-w-xl">
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-primary-container text-white text-[10px] font-bold uppercase tracking-wider mb-1">
                    Featured 4K Cinema Teaser
                  </div>
                  <h3 className="text-lg sm:text-2xl font-extrabold text-white uppercase drop-shadow-md tracking-tight">
                    Chronos: Fracture in Orbital Geneva
                  </h3>
                  <p className="text-xs text-white/80 line-clamp-1 sm:line-clamp-2 mt-1 drop-shadow">
                    Stream the official master teaser restored at 60 fps in Dolby Vision spatial audio.
                    <link rel="stylesheet" href="https://www.amazon.in/DEELMO-Stylish-Button-Down-Comfortable-Breathable/dp/B0FXRWCN5S/ref=sr_1_6?crid=39RVUF6WLD1AX&dib=eyJ2IjoiMSJ9.79yWFnOu7LWcG9ByspZtu0-6hMbvWGwGbeXHEjGdkWV9fKwiPfr2z0A6v_E7sD77KspBJrprUNti_IuO4tNWWYU-gdBSPUGLB_zYl_8a5lfU6bXaFIQQ8JkcZ7rwzB8dMgJzV6ptQc1eXfcPZWisSwUPIl9cFVTIjWgbe519Hu-FLp3TTuRcH8KQceNRFaY3zZdzWtg1L48hzAWOHahHWthwcrUu9nYopbOSxFqgAlxAPCkVD67n7HzaIqSvA3Ey7SA_4hZqZuxp_QnZMKyB84vAFwUInB_RypMKfE1sMTk.IBg_22VEBLOWNPkL4U5aEc3cnsThfgl7bX37rmLkonw&dib_tag=se&keywords=clothes%2Bfor%2Bmen&qid=1792844977&s=apparel&sprefix=cloth%2Cfashion%2C283&sr=1-6&th=1&psc=1" />
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => navigate('/player')}
                    className="h-10 sm:h-11 px-4 sm:px-5 rounded-xl bg-primary-container hover:brightness-110 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl active:scale-95 transition-all"
                  >
                    <span className="material-symbols-outlined text-[18px]">play_circle</span>
                    <span>Full Cinema Player</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            5. TRENDING NOW (Section B - with repaired Solaris Echo image)
        ========================================================================= */}
        <section className="mt-space-lg flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
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
                    onError={handleImgError}
                    loading="lazy"
                  />
                  <div className="absolute top-2 right-2 bg-surface/85 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[10px] text-primary font-bold">
                    {movie.match}
                  </div>
                  <div className="absolute bottom-2 left-2 px-1.5 py-0.5 rounded bg-surface-lowest/80 text-[10px] font-meta-mono text-secondary">
                    {movie.duration}
                  </div>
                </div>
                <div className="flex flex-col min-w-0">
                  <h3 className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary transition-colors font-semibold">
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

        {/* =========================================================================
            6. 🌟 STREAMMI+ ORIGINALS & PREMIERES (Wide 16:9 Cinema Showcase)
        ========================================================================= */}
        <section className="mt-space-xl flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-primary-container text-white text-[10px] font-bold uppercase tracking-widest">
                Exclusive
              </span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                AETHER+ Originals
              </h2>
            </div>
            <span className="text-xs font-meta-mono text-secondary">
              Master Quality 4K HDR
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-margin-mobile sm:px-margin">
            {STREAMMI_ORIGINALS.map((orig) => (
              <div
                key={orig.id}
                onClick={() => navigate('/player')}
                className="group relative rounded-2xl overflow-hidden bg-surface-container border border-surface-container-high/50 hover:border-primary-container/60 transition-all cursor-pointer shadow-xl flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-container-high">
                  <img
                    src={orig.backdrop}
                    alt={orig.title}
                    onError={handleImgError}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent"></div>
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-meta-mono text-primary-fixed uppercase tracking-wider font-bold">
                    {orig.badge}
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-primary-container text-white text-[10px] font-meta-mono font-bold">
                    {orig.match}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-1 justify-between gap-2 -mt-4 relative z-10">
                  <div>
                    <h3 className="text-base font-extrabold text-on-surface group-hover:text-primary transition-colors tracking-tight">
                      {orig.title}
                    </h3>
                    <p className="text-xs text-primary-fixed italic mt-0.5">
                      "{orig.tagline}"
                    </p>
                    <p className="text-xs text-secondary mt-1 font-meta-mono">
                      {orig.runtime} • Directed by {orig.director}
                    </p>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-surface-container-high/40 text-xs">
                    <span className="font-meta-mono text-secondary text-[11px]">
                      {orig.quality}
                    </span>
                    <button className="h-8 px-3 rounded-lg bg-surface-container-highest group-hover:bg-primary-container group-hover:text-white text-on-surface font-semibold text-xs flex items-center gap-1 transition-colors">
                      <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                      <span>Watch</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. 🏆 CRITICALLY ACCLAIMED & FESTIVAL WINNERS (Criterion Laurels)
        ========================================================================= */}
        <section className="mt-space-xl flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-amber-400 font-bold text-lg">★</span>
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Critically Acclaimed & Laurels
              </h2>
            </div>
            <span className="text-xs font-meta-mono text-secondary">
              Criterion Selection
            </span>
          </div>

          <div className="flex gap-4 overflow-x-auto px-margin-mobile sm:px-margin no-scrollbar snap-x snap-mandatory py-1">
            {AWARD_WINNERS.map((award) => (
              <div
                key={award.id}
                onClick={() => navigate('/details')}
                className="snap-start shrink-0 w-[220px] sm:w-[260px] flex flex-col gap-2 group cursor-pointer"
              >
                <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-surface-container border border-surface-container-high/40 group-hover:border-amber-400/60 transition-all shadow-lg">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    src={award.image}
                    alt={award.title}
                    onError={handleImgError}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md text-[9px] font-bold text-amber-300 border border-amber-400/30">
                      {award.criterionRating}
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-black/70 text-[9px] font-meta-mono text-secondary">
                      {award.year}
                    </span>
                  </div>

                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex flex-col gap-0.5">
                    <span className="text-[10px] text-amber-300 font-meta-mono font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[12px]">workspace_premium</span>
                      {award.award}
                    </span>
                    <h3 className="font-label-md text-sm text-white font-bold truncate">
                      {award.title}
                    </h3>
                  </div>
                </div>

                <div className="flex flex-col min-w-0">
                  <p className="text-[11px] font-meta-mono text-secondary truncate">
                    {award.score} • {award.duration}
                  </p>
                  <p className="text-[11px] text-secondary line-clamp-2 mt-0.5 leading-snug">
                    {award.synopsis}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. 📺 BINGE-WORTHY WEB SERIES
        ========================================================================= */}
        <section className="mt-space-xl flex flex-col gap-space-sm max-w-7xl mx-auto w-full">
          <div className="px-margin-mobile sm:px-margin flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                Binge-Worthy TV Series
              </h2>
              <span className="w-1.5 h-1.5 rounded-full bg-primary-container"></span>
            </div>
            <button
              onClick={() => navigate('/series')}
              className="font-label-sm text-label-sm text-primary flex items-center gap-0.5 hover:underline"
            >
              View Series Catalog <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 px-margin-mobile sm:px-margin">
            {BINGE_SERIES.map((s) => (
              <div
                key={s.id}
                onClick={() => navigate('/series')}
                className="group relative rounded-2xl overflow-hidden bg-surface-container border border-surface-container-high/40 hover:border-primary-container/60 transition-all cursor-pointer shadow-lg flex flex-col"
              >
                <div className="relative aspect-video w-full overflow-hidden bg-surface-container-high">
                  <img
                    src={s.image}
                    alt={s.title}
                    onError={handleImgError}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent"></div>
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded bg-surface-lowest/80 text-[10px] font-meta-mono text-primary font-bold">
                    {s.match} Match
                  </div>
                </div>
                <div className="p-4 flex flex-col justify-between flex-1 gap-2 -mt-2 relative z-10">
                  <div>
                    <h3 className="font-bold text-base text-on-surface group-hover:text-primary transition-colors">
                      {s.title}
                    </h3>
                    <p className="text-xs font-meta-mono text-secondary mt-0.5">
                      {s.seasons} • {s.genre}
                    </p>
                    <p className="text-xs text-secondary mt-1 line-clamp-2 leading-relaxed">
                      {s.synopsis}
                    </p>
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-surface-container-high/40 text-xs">
                    <span className="font-meta-mono text-primary-fixed text-[11px] font-semibold">
                      {s.quality}
                    </span>
                    <span className="text-secondary hover:text-on-surface font-semibold flex items-center gap-1">
                      Episodes <span className="material-symbols-outlined text-[14px]">chevron_right</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =========================================================================
            9. 🛍️ SCREEN STYLE: SHOP THE LOOK (Verified Clothes on Amazon & Flipkart)
        ========================================================================= */}
        <section className="mt-space-xl max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-surface-container-low via-surface-container to-surface-container-low border border-surface-container-high shadow-xl">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-surface-container-high/50">
              <div>
                <span className="text-xs uppercase tracking-widest font-bold text-primary-fixed flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px]">shopping_bag</span>
                  Wardrobe & Merch Hub
                </span>
                <h3 className="text-lg font-bold text-on-surface mt-0.5">
                  Shop the Screen: As Seen in Featured Blockbusters
                </h3>
              </div>
              <span className="text-xs text-secondary font-meta-mono">
                Verified Links on Amazon & Flipkart
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 pt-4">
              {SHOPPING_LINKS.map((link) => (
                <a
                  key={link.id}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-highest border border-surface-container-highest/60 hover:border-primary-container transition-all flex flex-col justify-between group text-left"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${link.store === 'Amazon'
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}
                    >
                      {link.store}
                    </span>
                    <span className="material-symbols-outlined text-[14px] text-secondary group-hover:text-primary transition-colors">
                      open_in_new
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-on-surface line-clamp-1 group-hover:text-primary">
                      {link.shortName}
                    </h4>
                    <p className="text-[10px] text-secondary truncate mt-0.5">
                      {link.category}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* =========================================================================
            10. EXPLORE BY GENRE (10-Category Discovery Matrix)
        ========================================================================= */}
        <section className="mt-space-xl flex flex-col gap-space-sm max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div className="flex items-center justify-between">
            <h2 className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
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
                  className={`relative h-24 rounded-xl overflow-hidden bg-surface-container group cursor-pointer active:scale-98 transition-all border ${isSelected ? 'border-primary-container ring-1 ring-primary-container' : 'border-surface-container-high/40'
                    }`}
                >
                  <img
                    className="w-full h-full object-cover brightness-50 group-hover:scale-110 transition-transform duration-500"
                    src={g.image}
                    alt={g.name}
                    onError={handleImgError}
                    loading="lazy"
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

        {/* =========================================================================
            11. VIP ARCHIVAL RESTORATION BANNER
        ========================================================================= */}
        <section className="mt-space-xl max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div
            onClick={() => navigate('/premium')}
            className="relative rounded-2xl overflow-hidden border border-surface-container-high p-6 sm:p-10 bg-gradient-to-r from-surface-container via-surface-container-low to-surface cursor-pointer group shadow-2xl"
          >
            <div className="relative z-10 max-w-2xl flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 font-label-sm text-xs uppercase tracking-widest text-primary-fixed font-bold">
                <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
                AETHER+ Archival Restoration
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
                Experience Cinema as the Director Intended
              </h2>
              <p className="font-body-md text-secondary text-sm sm:text-base leading-relaxed">
                Stream in pristine 4K HDR at up to 60 Mbps with master uncompressed Dolby Atmos binaural spatial audio on any screen.
              </p>

              {/* Perks Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 pb-1">
                <div className="p-2.5 rounded-xl bg-surface-container/70 border border-surface-container-high text-xs">
                  <div className="font-bold text-on-surface">60 Mbps Bitrate</div>
                  <div className="text-[10px] text-secondary">Zero Compression Loss</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container/70 border border-surface-container-high text-xs">
                  <div className="font-bold text-on-surface">Dolby Atmos 7.1</div>
                  <div className="text-[10px] text-secondary">Binaural Headphone Mix</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container/70 border border-surface-container-high text-xs">
                  <div className="font-bold text-on-surface">Offline Downloads</div>
                  <div className="text-[10px] text-secondary">Save in 4K HDR</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-container/70 border border-surface-container-high text-xs">
                  <div className="font-bold text-on-surface">4 Screens</div>
                  <div className="text-[10px] text-secondary">Simultaneous Streams</div>
                </div>
              </div>

              <div className="pt-2">
                <button className="px-6 py-3 rounded-xl bg-primary-container text-white font-label-md text-sm font-bold flex items-center gap-2 group-hover:brightness-110 transition-all shadow-lg shadow-primary-container/30">
                  <span>Explore AETHER+ Membership</span>
                  <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* =========================================================================
            12. ❓ FREQUENTLY ASKED QUESTIONS (Interactive Accordion)
        ========================================================================= */}
        <section className="mt-space-xl max-w-4xl mx-auto w-full px-margin-mobile sm:px-margin">
          <div className="text-center mb-6">
            <span className="text-xs font-meta-mono text-primary-fixed uppercase tracking-wider font-bold">
              Got Questions?
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface mt-1">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="flex flex-col gap-2.5">
            {STREAMING_FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-xl bg-surface-container-low border border-surface-container-high/60 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full p-4 text-left flex items-center justify-between gap-4 font-semibold text-sm sm:text-base text-on-surface hover:text-primary transition-colors"
                  >
                    <span>{faq.q}</span>
                    <span
                      className={`material-symbols-outlined text-[20px] transition-transform duration-300 text-secondary ${isOpen ? 'rotate-180 text-primary' : ''
                        }`}
                    >
                      keyboard_arrow_down
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs sm:text-sm text-secondary leading-relaxed border-t border-surface-container-high/40 animate-fadeIn">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* =========================================================================
            13. SUPPORTED DEVICES & PLATFORMS STRIP
        ========================================================================= */}
        <section className="mt-space-xl max-w-7xl mx-auto w-full px-margin-mobile sm:px-margin text-center">
          <p className="text-xs font-meta-mono text-secondary uppercase tracking-widest mb-4">
            Stream Anywhere • Available on All Platforms
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-secondary/70">
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">tv</span>
              <span>Smart TVs</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">smartphone</span>
              <span>iOS & Android</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">laptop_mac</span>
              <span>Mac & Windows</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">cast</span>
              <span>AirPlay & Chromecast</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold hover:text-on-surface transition-colors">
              <span className="material-symbols-outlined text-[22px]">sports_esports</span>
              <span>PlayStation & Xbox</span>
            </div>
          </div>
        </section>

        {/* =========================================================================
            14. EDITORIAL FOOTPRINT & SYSTEM STATUS
        ========================================================================= */}
        <footer className="mt-space-xl px-margin-mobile flex flex-col items-center justify-center text-center gap-2 py-8 border-t border-surface-container-high/40">
          <div className="w-10 h-1 rounded-full bg-surface-container-high mb-2"></div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-meta-mono text-[11px] text-emerald-400 font-semibold">
              Global 4K Streaming CDN: 100% Operational
            </span>
          </div>
          <span className="font-label-sm text-xs text-on-surface tracking-widest uppercase font-bold">
            STREAMMI+ Cinematic OTT Platform
          </span>
          <p className="font-meta-mono text-[10px] text-secondary/70 max-w-md">
            Ultra-lightweight edge deployment. Zero-buffer adaptive bitrate streaming. Dolby Atmos spatial acoustic restoration.
          </p>
        </footer>

        {/* =========================================================================
            15. 4K CINEMATIC TRAILER MODAL
        ========================================================================= */}
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
                  src={SAMPLE_VIDEO_URL}
                  poster={FEATURED_HERO.playerBackdrop}
                  controls
                  autoPlay
                  playsInline
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
                    className="px-4 py-2 rounded-xl bg-on-surface text-surface hover:bg-white text-xs font-bold font-label-md flex items-center gap-1.5 transition-all shadow-md active:scale-95"
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

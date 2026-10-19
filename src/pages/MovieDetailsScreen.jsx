import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppHeader } from '../components/AppHeader';
import { AppNavBar } from '../components/AppNavBar';
import { FEATURED_HERO } from '../data/moviesData';
import { useApp } from '../context/AppContext';

export const MovieDetailsScreen = () => {
  const navigate = useNavigate();
  const { watchlist, toggleWatchlist, isRated, toggleRating } = useApp();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMuted, setIsMuted] = useState(false);
  const [sharedToast, setSharedToast] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(null);

  const inWatchlist = watchlist.includes(FEATURED_HERO.id);
  const rated = isRated(FEATURED_HERO.id);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setSharedToast(true);
      setTimeout(() => setSharedToast(false), 2500);
    }
  };

  const handleDownload = () => {
    if (downloadProgress !== null) return;
    setDownloadProgress(10);
    const interval = setInterval(() => {
      setDownloadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setDownloadProgress(null), 2000);
          return 100;
        }
        return prev + 25;
      });
    }, 400);
  };

  return (
    <div className="bg-surface text-on-surface min-h-screen flex flex-col font-body-md pb-20 md:pb-8">
      <AppHeader title="Title Details" showBack={true} />

      <main className="flex-1 flex flex-col relative w-full pt-16 max-w-5xl mx-auto">
        {/* Toast */}
        {sharedToast && (
          <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full bg-surface-container-high border border-primary-container text-white text-xs font-meta-mono shadow-2xl flex items-center gap-2">
            <span className="material-symbols-outlined text-[16px] text-emerald-400">check_circle</span>
            Link copied to clipboard!
          </div>
        )}

        {/* Top Cinematic Hero / Backdrop */}
        <div className="relative w-full aspect-[4/5] sm:aspect-[16/9] max-h-[520px] overflow-hidden flex flex-col justify-between rounded-b-2xl sm:rounded-2xl sm:mt-4 shadow-2xl">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 hover:scale-105"
            style={{ backgroundImage: `url('${FEATURED_HERO.detailsBackdrop}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/60 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-surface/80 via-transparent to-transparent"></div>

          {/* Top Bar Actions on Poster */}
          <div className="relative z-10 px-margin-mobile sm:px-6 pt-space-md flex items-center justify-between">
            <div className="inline-flex items-center gap-space-xs bg-surface-container-high/60 backdrop-blur-md px-space-sm py-1 rounded-full">
              <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse"></span>
              <span className="font-meta-mono text-meta-mono text-on-surface tracking-wider uppercase">
                Editorial Spotlight
              </span>
            </div>
            <div className="flex items-center gap-space-xs">
              <button
                onClick={() => setIsMuted(!isMuted)}
                aria-label="Toggle Atmosphere Audio"
                className="w-10 h-10 rounded-full bg-surface-container-high/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">
                  {isMuted ? 'volume_off' : 'volume_up'}
                </span>
              </button>
              <button
                aria-label="Cast to TV"
                className="w-10 h-10 rounded-full bg-surface-container-high/70 backdrop-blur-md flex items-center justify-center text-on-surface hover:text-primary transition-colors focus:outline-none"
              >
                <span className="material-symbols-outlined text-[20px]">cast</span>
              </button>
            </div>
          </div>

          {/* Title & Badges */}
          <div className="relative z-10 px-margin-mobile sm:px-6 pb-space-sm flex flex-col gap-space-xs">
            <div className="flex items-center gap-space-xs">
              <span className="px-space-xs py-0.5 bg-surface-container-highest text-on-surface font-label-sm text-label-sm uppercase rounded">
                Aether Original
              </span>
              <span className="font-meta-mono text-meta-mono text-tertiary-fixed font-semibold">
                {FEATURED_HERO.criterionRating}
              </span>
            </div>
            <h1 className="font-display-hero-mobile sm:font-display-hero text-display-hero-mobile sm:text-headline-xl text-on-surface tracking-tight uppercase leading-none drop-shadow-md">
              CHRONOS:<br />
              <span className="text-secondary-fixed">ZERO HOUR</span>
            </h1>
            <div className="flex items-center flex-wrap gap-x-space-sm gap-y-1 font-meta-mono text-meta-mono text-secondary pt-space-xs">
              <span className="text-primary font-bold">{FEATURED_HERO.match} Match</span>
              <span>{FEATURED_HERO.year}</span>
              <span>{FEATURED_HERO.duration}</span>
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface rounded text-[10px] uppercase font-bold tracking-wider">
                UHD 4K
              </span>
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface rounded text-[10px] uppercase font-bold tracking-wider">
                Dolby Vision
              </span>
              <span className="px-1.5 py-0.5 bg-surface-container-high text-on-surface rounded text-[10px] uppercase font-bold tracking-wider">
                {FEATURED_HERO.ageRating}
              </span>
            </div>
          </div>
        </div>

        {/* Primary CTAs & Narrative Block */}
        <div className="px-margin-mobile sm:px-6 flex flex-col gap-space-md pt-4">
          {/* Play Action Button */}
          <button
            onClick={() => navigate('/player')}
            className="w-full h-12 bg-on-surface text-surface hover:bg-white font-label-md text-label-md flex items-center justify-center gap-space-sm rounded-xl active:scale-[0.98] transition-all shadow-xl font-bold"
          >
            <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
              play_arrow
            </span>
            <span>Play Movie (4K Spatial Audio)</span>
          </button>

          {/* Quick Utility Row */}
          <div className="grid grid-cols-4 gap-space-xs bg-surface-container-low p-space-xs rounded-xl border border-surface-container-high/40">
            <button
              onClick={() => toggleWatchlist(FEATURED_HERO.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors focus:outline-none ${
                inWatchlist
                  ? 'text-primary-container font-semibold'
                  : 'text-secondary hover:text-on-surface active:bg-surface-container-high'
              }`}
            >
              <span className="material-symbols-outlined text-[20px]">
                {inWatchlist ? 'check' : 'add'}
              </span>
              <span className="font-label-sm text-[11px] pt-1">
                {inWatchlist ? 'In List' : 'My List'}
              </span>
            </button>

            <button
              onClick={() => toggleRating(FEATURED_HERO.id)}
              className={`flex flex-col items-center justify-center py-2 px-1 rounded-lg transition-colors focus:outline-none ${
                rated ? 'text-primary' : 'text-secondary hover:text-on-surface active:bg-surface-container-high'
              }`}
            >
              <span
                className="material-symbols-outlined text-[20px]"
                style={{ fontVariationSettings: rated ? "'FILL' 1" : "'FILL' 0" }}
              >
                {rated ? 'star' : 'star_border'}
              </span>
              <span className="font-label-sm text-[11px] pt-1">{rated ? 'Rated' : 'Rate'}</span>
            </button>

            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-secondary hover:text-on-surface active:bg-surface-container-high transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">
                {downloadProgress === 100 ? 'download_done' : 'download'}
              </span>
              <span className="font-label-sm text-[11px] pt-1 truncate w-full text-center">
                {downloadProgress !== null ? `${downloadProgress}%` : '2.4 GB'}
              </span>
            </button>

            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center py-2 px-1 rounded-lg text-secondary hover:text-on-surface active:bg-surface-container-high transition-colors focus:outline-none"
            >
              <span className="material-symbols-outlined text-[20px]">share</span>
              <span className="font-label-sm text-[11px] pt-1">Share</span>
            </button>
          </div>

          {/* Editorial Synopsis */}
          <div className="flex flex-col gap-space-xs">
            <p className="font-body-md text-body-md text-secondary leading-relaxed">
              {FEATURED_HERO.synopsis}
            </p>
          </div>

          {/* Director, Cast & Accolades */}
          <div className="bg-surface-container-low p-space-md rounded-xl flex flex-col gap-space-sm border border-surface-container-high/40">
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-space-xs">
                <span className="font-meta-mono text-meta-mono text-secondary text-[12px] uppercase tracking-wider">
                  Director:
                </span>
                <span className="font-body-md text-body-md text-on-surface font-medium">
                  {FEATURED_HERO.director}
                </span>
              </div>
              <div className="flex items-baseline gap-space-xs">
                <span className="font-meta-mono text-meta-mono text-secondary text-[12px] uppercase tracking-wider">
                  Starring:
                </span>
                <span className="font-body-md text-body-md text-secondary truncate">
                  {FEATURED_HERO.starring}
                </span>
              </div>
            </div>
            <div className="pt-space-xs flex items-center gap-space-xs text-primary-fixed-dim">
              <span className="material-symbols-outlined text-[18px]">workspace_premium</span>
              <span className="font-meta-mono text-[11px] tracking-wide leading-tight">
                {FEATURED_HERO.accolade}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive Tabbed Content Section */}
        <div className="mt-space-lg w-full">
          <div className="flex items-center overflow-x-auto px-margin-mobile sm:px-6 gap-space-md border-b border-surface-container-high/50 no-scrollbar">
            {['overview', 'trailers', 'cast', 'recommended'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`tab-button relative pb-space-sm font-label-md text-label-md whitespace-nowrap focus:outline-none uppercase tracking-wider ${
                  activeTab === tab ? 'text-on-surface font-bold' : 'text-secondary hover:text-on-surface'
                }`}
              >
                {tab === 'overview' && 'Overview'}
                {tab === 'trailers' && 'Trailers & Teasers'}
                {tab === 'cast' && 'Cast & Crew'}
                {tab === 'recommended' && 'More Like This'}
                {activeTab === tab && (
                  <span className="indicator absolute bottom-0 left-0 right-0 h-0.5 bg-primary-container rounded-full"></span>
                )}
              </button>
            ))}
          </div>

          {/* Tab View: Overview */}
          {activeTab === 'overview' && (
            <div className="px-margin-mobile sm:px-6 pt-space-lg">
              <div className="flex items-center justify-between mb-space-sm">
                <h2 className="font-headline-sm text-headline-sm text-on-surface">Principal Cast</h2>
                <button
                  onClick={() => setActiveTab('cast')}
                  className="font-meta-mono text-meta-mono text-secondary hover:text-on-surface transition-colors"
                >
                  View All
                </button>
              </div>

              <div className="flex gap-4 overflow-x-auto pb-space-sm pt-space-xs no-scrollbar">
                {FEATURED_HERO.cast.map((actor) => (
                  <div key={actor.name} className="flex flex-col items-center text-center flex-shrink-0 w-24">
                    <div className="w-16 h-16 rounded-full overflow-hidden bg-surface-container shadow-md mb-2 border border-surface-container-high">
                      <img className="w-full h-full object-cover" src={actor.image} alt={actor.name} />
                    </div>
                    <span className="font-label-sm text-label-sm text-on-surface font-semibold truncate w-full">
                      {actor.name}
                    </span>
                    <span className="font-meta-mono text-[10px] text-secondary truncate w-full">
                      {actor.role}
                    </span>
                  </div>
                ))}
              </div>

              {/* Bonus Featurettes Preview */}
              <div className="mt-space-lg">
                <h2 className="font-headline-sm text-headline-sm text-on-surface mb-space-sm">
                  Trailers & Featurettes
                </h2>
                <div className="flex flex-col gap-space-sm">
                  {FEATURED_HERO.trailers.map((t) => (
                    <div
                      key={t.title}
                      onClick={() => navigate('/player')}
                      className="flex gap-space-sm items-center bg-surface-container-low p-space-xs rounded-xl cursor-pointer hover:bg-surface-container transition-colors border border-surface-container-high/30"
                    >
                      <div className="relative w-36 aspect-video rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                        <img className="w-full h-full object-cover" src={t.thumbnail} alt={t.title} />
                        <div className="absolute inset-0 bg-surface-container-lowest/40 flex items-center justify-center">
                          <div className="w-8 h-8 rounded-full bg-surface-container-high/80 backdrop-blur flex items-center justify-center text-on-surface">
                            <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                              play_arrow
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col min-w-0 pr-space-xs">
                        <span className="font-label-md text-label-md text-on-surface truncate">
                          {t.title}
                        </span>
                        <span className="font-meta-mono text-[11px] text-secondary pt-0.5">
                          {t.runtime} • {t.quality}
                        </span>
                        <span className="font-body-md text-[12px] text-secondary line-clamp-1 mt-1">
                          {t.desc}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab View: Trailers */}
          {activeTab === 'trailers' && (
            <div className="px-margin-mobile sm:px-6 pt-space-lg space-y-4">
              {FEATURED_HERO.trailers.map((t) => (
                <div
                  key={t.title}
                  className="bg-surface-container-low rounded-xl p-space-sm flex flex-col gap-space-sm border border-surface-container-high/40"
                >
                  <div
                    className="relative aspect-video w-full rounded-lg overflow-hidden bg-surface-container cursor-pointer"
                    onClick={() => navigate('/player')}
                  >
                    <img className="w-full h-full object-cover" src={t.thumbnail} alt={t.title} />
                    <div className="absolute inset-0 bg-surface/30 flex items-center justify-center hover:bg-black/20 transition-colors">
                      <div className="w-14 h-14 rounded-full bg-primary-container text-white flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                          play_arrow
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">{t.title}</h3>
                      <p className="font-meta-mono text-meta-mono text-secondary mt-0.5">
                        {t.runtime} • {t.quality} • {t.desc}
                      </p>
                    </div>
                    <button onClick={handleShare} className="p-2 text-secondary hover:text-on-surface">
                      <span className="material-symbols-outlined text-[20px]">share</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Tab View: Cast */}
          {activeTab === 'cast' && (
            <div className="px-margin-mobile sm:px-6 pt-space-lg space-y-space-md">
              <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high/40">
                <h3 className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider mb-space-sm">
                  Directing & Writing
                </h3>
                <div className="space-y-space-sm">
                  <div className="flex justify-between items-center py-1 border-b border-surface-container-high/30">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      {FEATURED_HERO.director}
                    </span>
                    <span className="font-meta-mono text-meta-mono text-secondary">
                      Director / Producer
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1">
                    <span className="font-body-md text-body-md text-on-surface font-medium">
                      {FEATURED_HERO.writer}
                    </span>
                    <span className="font-meta-mono text-meta-mono text-secondary">
                      Screenplay
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-surface-container-low rounded-xl p-space-md border border-surface-container-high/40">
                <h3 className="font-label-sm text-label-sm text-secondary-fixed uppercase tracking-wider mb-space-sm">
                  Cast Roster
                </h3>
                <div className="space-y-2">
                  {FEATURED_HERO.cast.map((c) => (
                    <div key={c.name} className="flex justify-between items-center py-1.5 border-b border-surface-container-high/20 last:border-none">
                      <div className="flex items-center gap-3">
                        <img src={c.image} alt={c.name} className="w-9 h-9 rounded-full object-cover" />
                        <span className="font-body-md text-on-surface font-medium">{c.name}</span>
                      </div>
                      <span className="font-meta-mono text-xs text-secondary">{c.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Tab View: Recommended */}
          {activeTab === 'recommended' && (
            <div className="px-margin-mobile sm:px-6 pt-space-lg pb-space-xl">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-space-sm">
                {[
                  {
                    title: "Solaris Echo",
                    year: "2023",
                    match: "96%",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDh29d7EyPruKLbrwzCkSlnigE3yHufZcrTCxwD_8Hcs6xbKb8260Crl6ZxQ_M0_Bskmh2utIb162Fxrj6EwqleVe_BBs9hu7QybOJcpjTAwbl-7DcjI_AFP5d_Ljy5sIu5MvspLvcGBH2W2Vss0J62a-3140UpDlj02BztMMXfx_JtxV_6OqGExjJ7tf3lqid0Qrr9S_ooL9BT7hieJwM5iWpgIRSnM9rgniV9D7tfR4C6mP4FT4nog"
                  },
                  {
                    title: "Causality",
                    year: "2024",
                    match: "94%",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDDffwE7e65RA2KcsqU7WuIiHuBs1wpx-gzw5SsIM_8OMJTACXsT4ddXp3zcz8QO1KDGNEIzmR1ltXHVFQ0HHbQrd5-X10N5nK5mCHQFCqc-B4oRGoTxPCKKK9BNhZ4HhNJURu-yk-a30Jc90cBFQqKL6WdI6pbfLVAhoDPpf9XMLbxNXKI7IgQ_oxSH3N_uDXSET1AlE9qiRcGOam-HUxh_Rd6M_iwE38wiF21bHFEg_iXK7bBwvP2mQ"
                  },
                  {
                    title: "Anomalous",
                    year: "2024",
                    match: "98%",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDeedGgu0YWgQpvJtNXHIXlv-zinMheY1G1Hwcvc_Dmv3IDfF64R5lutvzR3jW6dkbfsitoBoBQ9_85kWHWAuLPFcY6079Q6WMU_9K7ri52kyQzcL08yW76s2blcv9W4YcbliKebuvLUQuTy0MxboE8DIfJpxNKzoOe0L8h-eJpv-0ZAqPUxZYFoIAaqYMN_Blo1vsAiRvp600--Cyd9_AVWALpBL-EGgOz89fEMSv1g4PdN5j39hWivg"
                  },
                  {
                    title: "Station Geneva",
                    year: "2023",
                    match: "95%",
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAjUY_dT-hYneKkUcCpiLZfHwNFbBpW_ZAyUfGV5xgpvjVIHn9t69IK2WHSnpnAUB0Aq-0mqeq36eW_j4QHTKq1rqBKjyFybzJzQCIyLP00BMQk652xsRlGoNRY-MXyzP2P1pbrRZBZ5FXFNUgdwY5x3HmxruC1BwAmr2AEIwyneXVEH3Ch8tTToU11yR3GB6Ddpnn6Jd6xjikY5vxcJUbhvRfiOiW6bQhd30Y9mKQJGQc6m7lzojF5qQ"
                  }
                ].map((rec) => (
                  <div
                    key={rec.title}
                    onClick={() => navigate('/player')}
                    className="flex flex-col bg-surface-container-low rounded-xl overflow-hidden group cursor-pointer border border-surface-container-high/40 hover:border-primary-container/60 transition-all shadow-md"
                  >
                    <div className="relative aspect-[2/3] w-full bg-surface-container">
                      <img className="w-full h-full object-cover group-hover:scale-105 transition-transform" src={rec.img} alt={rec.title} />
                      <div className="absolute top-2 right-2 bg-surface/85 backdrop-blur-md px-1.5 py-0.5 rounded font-meta-mono text-[10px] text-primary font-bold">
                        {rec.match}
                      </div>
                    </div>
                    <div className="p-space-xs flex flex-col">
                      <span className="font-label-md text-label-md text-on-surface truncate group-hover:text-primary">
                        {rec.title}
                      </span>
                      <span className="font-meta-mono text-[11px] text-secondary">
                        {rec.year} • 4K HDR
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      <AppNavBar />
    </div>
  );
};

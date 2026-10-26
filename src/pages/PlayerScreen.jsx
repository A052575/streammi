import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FEATURED_HERO, SHOPPING_LINKS } from '../data/moviesData';
import { ShoppingLinks } from '../components/ShoppingLinks';

export const PlayerScreen = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [isLocked, setIsLocked] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [playbackSpeedIdx, setPlaybackSpeedIdx] = useState(0); // 1.0x
  const [progress, setProgress] = useState(51.4);
  const [currentTime, setCurrentTime] = useState('01:14:22');
  const [totalTime, setTotalTime] = useState('02:24:10');
  const [skipVisible, setSkipVisible] = useState(true);
  const [showAudioSubModal, setShowAudioSubModal] = useState(false);
  const [selectedAudio, setSelectedAudio] = useState('English [Original] - Dolby Atmos 7.1');
  const [selectedSub, setSelectedSub] = useState('English [CC]');
  const [activeChapter, setActiveChapter] = useState(4);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const speeds = ['1.0x', '1.25x', '1.5x', '0.75x'];
  const speedValues = [1.0, 1.25, 1.5, 0.75];

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = speedValues[playbackSpeedIdx];
    }
  }, [playbackSpeedIdx]);

  // Handle Play/Pause
  const togglePlay = () => {
    if (isLocked) return;
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  // Skip 10s forward/backward
  const skipSeconds = (sec) => {
    if (isLocked) return;
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime + sec);
    } else {
      const p = Math.max(0, Math.min(100, parseFloat(progress) + (sec > 0 ? 5 : -5)));
      setProgress(p.toFixed(1));
    }
  };

  // Handle Seek click
  const handleSeek = (e) => {
    if (isLocked) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const percentage = (ratio * 100).toFixed(1);
    setProgress(percentage);

    const totalSec = 8650;
    const currentSec = Math.floor(ratio * totalSec);
    const hrs = String(Math.floor(currentSec / 3600)).padStart(2, '0');
    const mins = String(Math.floor((currentSec % 3600) / 60)).padStart(2, '0');
    const secs = String(currentSec % 60).padStart(2, '0');
    setCurrentTime(`${hrs}:${mins}:${secs}`);

    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = ratio * videoRef.current.duration;
    }
  };

  const handleSkipPrologue = () => {
    setSkipVisible(false);
    setProgress(56);
    setCurrentTime('01:21:05');
    if (videoRef.current) {
      videoRef.current.currentTime = 45;
    }
  };

  const handleChapterClick = (chapter) => {
    if (isLocked) return;
    setActiveChapter(chapter.id);
    setProgress(chapter.percent);
    setCurrentTime(chapter.time);
    if (videoRef.current && videoRef.current.duration) {
      videoRef.current.currentTime = (chapter.percent / 100) * videoRef.current.duration;
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  return (
    <div className="bg-[#080A0F] text-[#F7F7F5] min-h-screen flex flex-col font-body-md select-none overflow-x-hidden">
      <main className="flex-1 flex flex-col relative w-full pt-safe pb-safe bg-[#080A0F]">
        <div className="flex flex-col w-full relative overflow-hidden">
          {/* Central Cinematic Viewport Layer */}
          <div className="relative w-full aspect-[9/16] sm:aspect-[21/9] max-h-[820px] overflow-hidden flex flex-col justify-between bg-black">
            {/* Actual Ultra-Lightweight Video Stream */}
            <video
              ref={videoRef}
              src={FEATURED_HERO.videoUrl}
              poster={FEATURED_HERO.playerBackdrop}
              className="absolute inset-0 w-full h-full object-cover z-0 transition-opacity duration-700"
              playsInline
              autoPlay
              muted={isMuted}
              loop
              onTimeUpdate={() => {
                if (videoRef.current && videoRef.current.duration) {
                  const curr = videoRef.current.currentTime;
                  const dur = videoRef.current.duration;
                  const pct = ((curr / dur) * 100).toFixed(1);
                  setProgress(pct);
                  const mins = String(Math.floor(curr / 60)).padStart(2, '0');
                  const secs = String(Math.floor(curr % 60)).padStart(2, '0');
                  setCurrentTime(`00:${mins}:${secs}`);
                }
              }}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
            
            {/* Directional Vignettes & Scrims */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/20 to-[#080A0F]/85 pointer-events-none z-10"></div>
            <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#080A0F]/10 to-[#080A0F]/80 pointer-events-none z-10"></div>

            {/* 1. TOP OVERLAY BAR */}
            <header className="relative z-30 flex items-center justify-between px-space-md pt-space-md pb-space-sm bg-gradient-to-b from-[#080A0F]/90 to-transparent">
              <div className="flex items-center gap-space-sm min-w-0">
                <button
                  onClick={() => navigate(-1)}
                  aria-label="Go Back"
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-surface-container-low/60 hover:bg-surface-container-high/80 text-[#F7F7F5] active:scale-95 transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-body-lg">arrow_back</span>
                </button>
                <div className="flex flex-col min-w-0">
                  <div className="flex items-center gap-space-xs">
                    <h1 className="font-headline-sm text-headline-sm text-[#F7F7F5] tracking-tight truncate max-w-[200px] sm:max-w-none">
                      {FEATURED_HERO.title}
                    </h1>
                    <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-label-sm tracking-wider uppercase bg-[#E50914] text-[#F7F7F5] font-semibold">
                      PREMIERE
                    </span>
                  </div>
                  <p className="font-meta-mono text-meta-mono text-[#A3A8B3] flex items-center gap-1.5 tracking-wider text-xs">
                    <span>{FEATURED_HERO.quality}</span>
                    <span className="w-1 h-1 rounded-full bg-[#A3A8B3]"></span>
                    <span>{FEATURED_HERO.audio}</span>
                    <span className="w-1 h-1 rounded-full bg-[#A3A8B3]"></span>
                    <span>{FEATURED_HERO.aspectRatio}</span>
                  </p>
                  <ShoppingLinks
                    amazonUrl={FEATURED_HERO.amazonUrl}
                    flipkartUrl={FEATURED_HERO.flipkartUrl}
                    itemTitle={FEATURED_HERO.title}
                  />
                </div>
              </div>

              {/* Right Context Actions */}
              <div className="flex items-center gap-space-xs shrink-0">
                <span className="hidden sm:inline-flex items-center px-2 py-1 rounded bg-[#191D26]/80 text-[#A3A8B3] font-label-sm text-xs uppercase font-semibold">
                  4K UHD
                </span>

                <button
                  onClick={() => setShowAudioSubModal(true)}
                  aria-label="Audio and Subtitles"
                  className="h-9 px-2.5 flex items-center gap-1.5 rounded-xl bg-surface-container-low/70 hover:bg-surface-container-high/90 text-[#F7F7F5] transition-colors"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[18px]">subtitles</span>
                  <span className="font-label-sm text-xs font-semibold">EN</span>
                </button>

                <button
                  onClick={() => setIsLocked(!isLocked)}
                  aria-label="Lock Player Interface"
                  className={`w-9 h-9 flex items-center justify-center rounded-xl bg-surface-container-low/70 hover:bg-surface-container-high/90 transition-colors ${
                    isLocked ? 'text-[#E50914] bg-[#E50914]/20 ring-1 ring-[#E50914]' : 'text-[#A3A8B3] hover:text-[#F7F7F5]'
                  }`}
                  type="button"
                  title={isLocked ? "Screen Locked (Click to Unlock)" : "Lock Screen"}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {isLocked ? 'lock' : 'lock_open'}
                  </span>
                </button>
              </div>
            </header>

            {/* 2. CENTRAL CINEMATIC PLAYBACK CORE */}
            <div className="relative z-20 flex-1 flex flex-col items-center justify-center px-space-md">
              {!isLocked ? (
                <div className="flex items-center justify-center gap-6 sm:gap-12">
                  {/* Rewind 10s */}
                  <button
                    onClick={() => skipSeconds(-10)}
                    aria-label="Rewind 10 seconds"
                    className="group flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#11141B]/70 hover:bg-[#191D26] text-[#F7F7F5] active:scale-90 transition-all shadow-lg backdrop-blur-md"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl group-hover:-rotate-45 transition-transform duration-200">
                      replay_10
                    </span>
                    <span className="font-meta-mono text-[9px] -mt-1 text-[#A3A8B3]">10s</span>
                  </button>

                  {/* Main Play/Pause Button */}
                  <button
                    onClick={togglePlay}
                    aria-label="Play or Pause"
                    className="group relative flex items-center justify-center w-20 h-20 rounded-full bg-[#191D26]/85 hover:bg-[#191D26] active:scale-95 transition-all shadow-2xl backdrop-blur-lg glow-accent"
                    type="button"
                  >
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-[#E50914]/50 to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
                    <span
                      className="material-symbols-outlined text-4xl text-[#F7F7F5] ml-1 transition-transform group-hover:scale-105"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {isPlaying ? 'pause' : 'play_arrow'}
                    </span>
                  </button>

                  {/* Forward 10s */}
                  <button
                    onClick={() => skipSeconds(10)}
                    aria-label="Forward 10 seconds"
                    className="group flex flex-col items-center justify-center w-14 h-14 rounded-full bg-[#11141B]/70 hover:bg-[#191D26] text-[#F7F7F5] active:scale-90 transition-all shadow-lg backdrop-blur-md"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-2xl group-hover:rotate-45 transition-transform duration-200">
                      forward_10
                    </span>
                    <span className="font-meta-mono text-[9px] -mt-1 text-[#A3A8B3]">10s</span>
                  </button>
                </div>
              ) : (
                <div className="px-4 py-2 rounded-full bg-[#191D26]/80 border border-[#E50914]/40 text-xs font-meta-mono text-[#F7F7F5] flex items-center gap-2 shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined text-[#E50914] text-[18px]">lock</span>
                  Controls are locked. Tap lock icon above to unlock.
                </div>
              )}

              {/* Skip Prologue Action */}
              {skipVisible && !isLocked && (
                <div className="w-full flex justify-end mt-12 pr-1 max-w-4xl">
                  <button
                    onClick={handleSkipPrologue}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#191D26]/90 hover:bg-[#282a30] text-[#F7F7F5] font-label-md text-sm shadow-xl active:scale-95 transition-all border border-surface-container-high"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-sm text-[#E50914]">fast_forward</span>
                    <span>Skip Prologue</span>
                    <span className="font-meta-mono text-xs text-[#A3A8B3] pl-1">0:45</span>
                  </button>
                </div>
              )}
            </div>

            {/* 3. BOTTOM CONTROL DOCK */}
            <div className="relative z-30 flex flex-col gap-2 px-space-md pb-space-md pt-4 bg-gradient-to-t from-[#080A0F] via-[#080A0F]/90 to-transparent">
              <div className="flex flex-col gap-1.5 w-full max-w-5xl mx-auto">
                {/* Floating Preview Pill */}
                <div className="relative w-full h-8 flex items-end">
                  <div
                    className="absolute -translate-x-1/2 bottom-1 flex flex-col items-center pointer-events-none transition-all duration-150"
                    style={{ left: `${progress}%` }}
                  >
                    <div className="px-2.5 py-1 rounded bg-[#191D26] shadow-2xl flex items-center gap-1.5 border border-surface-container-high">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E50914] animate-pulse"></span>
                      <span className="font-meta-mono text-xs text-[#F7F7F5] font-semibold">{currentTime}</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Seek Bar */}
                <div onClick={handleSeek} className="relative w-full h-7 flex items-center cursor-pointer group">
                  <div className="relative w-full h-1.5 rounded-full bg-[#272B34] overflow-visible group-hover:h-2 transition-all">
                    {/* Chapter Marker Ticks */}
                    <div className="absolute left-[17%] top-0 bottom-0 w-0.5 bg-[#080A0F] z-10"></div>
                    <div className="absolute left-[34%] top-0 bottom-0 w-0.5 bg-[#080A0F] z-10"></div>
                    <div className="absolute left-[51.4%] top-0 bottom-0 w-0.5 bg-[#080A0F] z-10"></div>
                    <div className="absolute left-[66%] top-0 bottom-0 w-0.5 bg-[#080A0F] z-10"></div>
                    <div className="absolute left-[87%] top-0 bottom-0 w-0.5 bg-[#080A0F] z-10"></div>

                    {/* Buffered track */}
                    <div className="absolute left-0 top-0 bottom-0 w-[72%] rounded-full bg-[#454953]"></div>

                    {/* Played head */}
                    <div className="absolute left-0 top-0 bottom-0 rounded-full bg-[#E50914]" style={{ width: `${progress}%` }}>
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-3.5 h-3.5 rounded-full bg-[#F7F7F5] shadow-[0_0_12px_rgba(229,9,20,0.8)] flex items-center justify-center scale-100 group-hover:scale-125 transition-transform">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E50914]"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Time Display */}
                <div className="flex items-center justify-between font-meta-mono text-meta-mono text-[#A3A8B3] text-xs">
                  <span className="text-[#F7F7F5] font-semibold">{currentTime}</span>
                  <span className="text-[11px] tracking-widest uppercase text-[#777E8A]">
                    Chapter {activeChapter} of {FEATURED_HERO.chapters.length}
                  </span>
                  <span>{totalTime}</span>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center justify-between pt-1 max-w-5xl mx-auto w-full">
                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setPlaybackSpeedIdx((playbackSpeedIdx + 1) % speeds.length)}
                    className="h-9 px-3 rounded-xl bg-surface-container-low/80 hover:bg-surface-container-high/90 text-[#F7F7F5] font-meta-mono text-xs flex items-center gap-1 active:scale-95 transition-all border border-surface-container-high/40"
                    type="button"
                    title="Playback Speed"
                  >
                    <span>{speeds[playbackSpeedIdx]}</span>
                  </button>

                  <div className="hidden sm:flex items-center gap-1 h-9 px-2.5 rounded-xl bg-surface-container-low/60 text-[#A3A8B3] border border-surface-container-high/40">
                    <span className="material-symbols-outlined text-[18px] text-[#a7c8ff]">spatial_audio</span>
                    <span className="font-meta-mono text-[10px]">ATMOS BINAURAL</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    aria-label="Toggle Volume"
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-surface-container-low/80 hover:bg-surface-container-high/90 text-[#F7F7F5] transition-colors border border-surface-container-high/40"
                    type="button"
                  >
                    <span className={`material-symbols-outlined text-[20px] ${isMuted ? 'text-[#E50914]' : ''}`}>
                      {isMuted ? 'volume_off' : 'volume_up'}
                    </span>
                  </button>

                  <button
                    onClick={toggleFullscreen}
                    aria-label="Toggle Fullscreen"
                    className="w-9 h-9 rounded-xl flex items-center justify-center bg-[#191D26] hover:bg-[#282a30] text-[#F7F7F5] active:scale-95 transition-all border border-surface-container-high/40"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {isFullscreen ? 'fullscreen_exit' : 'fullscreen'}
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 4. CHAPTER TIMELINE ACCORDION */}
          <section className="w-full bg-[#11141B] px-space-md py-6 flex flex-col gap-4 shadow-xl border-t border-surface-container-high/50 max-w-5xl mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#E50914] text-[20px]">bookmarks</span>
                <h2 className="font-headline-sm text-headline-sm text-[#F7F7F5]">Key Timeline Chapters</h2>
              </div>
              <span className="font-meta-mono text-label-sm text-[#A3A8B3] text-xs">Aether Scene Index</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {FEATURED_HERO.chapters.map((chap) => {
                const isCur = activeChapter === chap.id;
                return (
                  <div
                    key={chap.id}
                    onClick={() => handleChapterClick(chap)}
                    className={`group relative flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all border ${
                      isCur
                        ? 'bg-[#191D26] border-primary-container shadow-lg'
                        : 'bg-surface-container-low/80 hover:bg-[#191D26] border-surface-container-high/30'
                    }`}
                  >
                    {isCur && <div className="absolute left-0 top-3 bottom-3 w-1 rounded-r bg-[#E50914]"></div>}
                    <div className="relative w-24 h-14 rounded-lg overflow-hidden shrink-0 bg-[#080A0F]">
                      <img src={chap.thumbnail} alt={chap.name} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-1 right-1 px-1 rounded bg-black/80 font-meta-mono text-[10px] text-white">
                        {chap.time}
                      </div>
                    </div>
                    <div className="flex flex-col min-w-0 pr-1">
                      <div className="flex items-center gap-1.5">
                        <span className={`font-label-sm text-[10px] tracking-wider uppercase font-semibold ${isCur ? 'text-[#E50914]' : 'text-secondary'}`}>
                          {isCur ? 'PLAYING' : `CHAPTER ${chap.id}`}
                        </span>
                      </div>
                      <h3 className="font-label-md text-sm text-[#F7F7F5] truncate group-hover:text-primary transition-colors">
                        {chap.name}
                      </h3>
                      <p className="font-body-md text-[11px] text-[#A3A8B3] line-clamp-1">{chap.desc}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex flex-wrap items-center justify-between pt-4 border-t border-surface-container-high/30 gap-2">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-meta-mono uppercase bg-[#191D26] text-[#A3A8B3]">
                  IMAX Enhanced
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-meta-mono uppercase bg-[#191D26] text-[#A3A8B3]">
                  Vision 2.39:1
                </span>
              </div>
              <p className="font-meta-mono text-[11px] text-[#777E8A]">
                Streaming from AETHER Edge Server (Frankfurt • Latency: 14ms)
              </p>
            </div>
          </section>

          {/* 5. IN-STREAM SCENE MERCHANDISE & OUTFITS (Amazon & Flipkart) */}
          <section className="w-full bg-[#0E1118] px-space-md py-6 flex flex-col gap-4 border-t border-surface-container-high/40 max-w-5xl mx-auto">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <h3 className="font-headline-sm text-headline-sm text-[#F7F7F5]">
                  Scene Costumes & Outfits
                </h3>
                <p className="font-meta-mono text-xs text-[#A3A8B3] mt-0.5">
                  Direct shopping links for outfits worn in Chronos: Zero Hour
                </p>
              </div>
              <span className="font-meta-mono text-xs text-primary px-2.5 py-1 rounded bg-[#191D26] border border-primary-container/30">
                Live Store Links
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {SHOPPING_LINKS.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col justify-between p-3 rounded-xl bg-[#151922] border border-surface-container-high/40 hover:border-primary-container/60 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-meta-mono uppercase tracking-wider text-secondary">
                      {item.category}
                    </span>
                    <h4 className="font-label-md text-sm text-[#F7F7F5] font-semibold mt-0.5 line-clamp-1">
                      {item.title}
                    </h4>
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-2 border-t border-surface-container-high/30">
                    <span className="text-xs font-meta-mono text-secondary">
                      {item.store}
                    </span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-2.5 py-1 rounded text-xs font-bold underline transition-colors ${
                        item.store === 'Amazon'
                          ? 'text-[#FF9900] bg-[#FF9900]/10 hover:bg-[#FF9900] hover:text-black'
                          : 'text-[#60A5FA] bg-[#2874F0]/10 hover:bg-[#2874F0] hover:text-white'
                      }`}
                    >
                      {item.store} Link
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Audio and Subtitles Modal */}
      {showAudioSubModal && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
          onClick={() => setShowAudioSubModal(false)}
        >
          <div
            className="w-full max-w-lg bg-surface-container rounded-2xl border border-surface-container-high p-6 shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-surface-container-high">
              <h3 className="font-headline-sm text-on-surface font-bold">Audio & Subtitles</h3>
              <button
                onClick={() => setShowAudioSubModal(false)}
                className="w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-4">
              {/* Audio list */}
              <div>
                <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-semibold block mb-2">
                  Audio Track
                </span>
                <div className="space-y-1.5">
                  {[
                    'English [Original] - Dolby Atmos 7.1',
                    'English - Audio Description 5.1',
                    'French - 5.1 Surround',
                    'German - 5.1 Surround',
                    'Spanish - 5.1 Surround',
                    'Japanese - Dolby Atmos'
                  ].map((aud) => (
                    <button
                      key={aud}
                      onClick={() => setSelectedAudio(aud)}
                      className={`w-full text-left p-2 rounded-lg text-xs font-meta-mono transition-colors flex items-center justify-between ${
                        selectedAudio === aud
                          ? 'bg-primary-container text-white font-semibold'
                          : 'bg-surface-container-low text-secondary hover:text-on-surface'
                      }`}
                    >
                      <span className="truncate mr-1">{aud}</span>
                      {selectedAudio === aud && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Subtitles list */}
              <div>
                <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-semibold block mb-2">
                  Subtitles
                </span>
                <div className="space-y-1.5">
                  {['Off', 'English [CC]', 'French', 'German', 'Spanish', 'Japanese'].map((sub) => (
                    <button
                      key={sub}
                      onClick={() => setSelectedSub(sub)}
                      className={`w-full text-left p-2 rounded-lg text-xs font-meta-mono transition-colors flex items-center justify-between ${
                        selectedSub === sub
                          ? 'bg-primary-container text-white font-semibold'
                          : 'bg-surface-container-low text-secondary hover:text-on-surface'
                      }`}
                    >
                      <span>{sub}</span>
                      {selectedSub === sub && (
                        <span className="material-symbols-outlined text-[16px]">check</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setShowAudioSubModal(false)}
                className="px-5 py-2 rounded-xl bg-primary-container text-white font-label-md text-xs uppercase tracking-wider font-bold"
              >
                Apply Preferences
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

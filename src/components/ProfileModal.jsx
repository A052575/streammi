import React from 'react';
import { useNavigate } from 'react-router-dom';
import { USER_AVATAR } from '../data/moviesData';
import { useApp } from '../context/AppContext';

export const ProfileModal = () => {
  const {
    isProfileOpen,
    setIsProfileOpen,
    activePlan,
    spatialAudio,
    setSpatialAudio,
    streamQuality,
    setStreamQuality,
    watchlist
  } = useApp();
  const navigate = useNavigate();

  if (!isProfileOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4"
      onClick={() => setIsProfileOpen(false)}
    >
      <div
        className="w-full max-w-md bg-surface-container rounded-2xl border border-surface-container-high overflow-hidden shadow-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setIsProfileOpen(false)}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-surface-container-high flex items-center justify-center text-secondary hover:text-on-surface"
        >
          <span className="material-symbols-outlined text-[18px]">close</span>
        </button>

        {/* User Identity Header */}
        <div className="flex items-center gap-4 pb-5 border-b border-surface-container-high">
          <div className="relative">
            <img
              src={USER_AVATAR}
              alt="Alex"
              className="w-16 h-16 rounded-full object-cover border-2 border-primary-container shadow-lg"
            />
            <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-emerald-500 border-2 border-surface"></span>
          </div>
          <div>
            <h3 className="font-headline-sm text-on-surface font-bold">Alex walker</h3>
            <p className="font-meta-mono text-xs text-primary-fixed uppercase tracking-wider">
              Prestige Film Club • Member since 2024
            </p>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-primary-container text-white">
                {activePlan} Tier
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-meta-mono bg-surface-container-high text-secondary">
                {watchlist.length} in List
              </span>
            </div>
          </div>
        </div>

        {/* Streaming & Audio Preferences */}
        <div className="py-4 space-y-3 border-b border-surface-container-high">
          <span className="font-label-sm text-xs uppercase tracking-wider text-secondary font-semibold">
            Playback Preferences
          </span>

          {/* Spatial Audio Toggle */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px]">spatial_audio</span>
              <div>
                <p className="font-label-md text-on-surface text-sm">Dolby Atmos Spatial Audio</p>
                <p className="font-meta-mono text-[11px] text-secondary">Binaural 3D acoustics</p>
              </div>
            </div>
            <button
              onClick={() => setSpatialAudio(!spatialAudio)}
              className={`w-11 h-6 rounded-full transition-colors relative flex items-center p-0.5 ${
                spatialAudio ? 'bg-primary-container' : 'bg-surface-container-high'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow transition-transform ${
                  spatialAudio ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Video Stream Quality */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container-low">
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-primary text-[20px]">high_quality</span>
              <div>
                <p className="font-label-md text-on-surface text-sm">Streaming Quality</p>
                <p className="font-meta-mono text-[11px] text-secondary">Dynamic bitrate scaling</p>
              </div>
            </div>
            <select
              value={streamQuality}
              onChange={(e) => setStreamQuality(e.target.value)}
              className="bg-surface-container text-on-surface text-xs font-meta-mono rounded-lg px-2.5 py-1.5 border border-surface-container-high focus:outline-none"
            >
              <option value="4K HDR Max">4K HDR Max</option>
              <option value="1080p FHD">1080p FHD</option>
              <option value="Auto (Data Saver)">Auto</option>
            </select>
          </div>
        </div>

        {/* Quick Account Links */}
        <div className="pt-4 space-y-2">
          <button
            onClick={() => {
              setIsProfileOpen(false);
              navigate('/premium');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface font-label-md text-sm flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-container text-[20px]">stars</span>
              <span>Manage Subscription & Billing</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
          </button>

          <button
            onClick={() => {
              setIsProfileOpen(false);
              navigate('/my-list');
            }}
            className="w-full py-2.5 px-3 rounded-xl bg-surface-container-high/60 hover:bg-surface-container-high text-on-surface font-label-md text-sm flex items-center justify-between transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-secondary text-[20px]">bookmark</span>
              <span>My Watchlist ({watchlist.length})</span>
            </div>
            <span className="material-symbols-outlined text-secondary text-[18px]">chevron_right</span>
          </button>
        </div>
      </div>
    </div>
  );
};

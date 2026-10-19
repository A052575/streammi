import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomeScreen } from './pages/HomeScreen';
import { MovieDetailsScreen } from './pages/MovieDetailsScreen';
import { PlayerScreen } from './pages/PlayerScreen';
import { PremiumScreen } from './pages/PremiumScreen';
import { MyListScreen } from './pages/MyListScreen';
import { MoviesScreen } from './pages/MoviesScreen';
import { SeriesScreen } from './pages/SeriesScreen';
import { SearchModal } from './components/SearchModal';
import { ProfileModal } from './components/ProfileModal';

export const App = () => {
  return (
    <div className="w-full min-h-screen bg-surface text-on-surface">
      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/details" element={<MovieDetailsScreen />} />
        <Route path="/player" element={<PlayerScreen />} />
        <Route path="/premium" element={<PremiumScreen />} />
        <Route path="/my-list" element={<MyListScreen />} />
        <Route path="/movies" element={<MoviesScreen />} />
        <Route path="/series" element={<SeriesScreen />} />
        <Route path="*" element={<HomeScreen />} />
      </Routes>

      {/* Global Modals */}
      <SearchModal />
      <ProfileModal />
    </div>
  );
};

export default App;

import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import MainContent from './components/MainContent';
import Player from './components/Player';
import CreatePlaylistModal from './components/CreatePlaylistModal';
import ErrorBoundary from './components/ErrorBoundary';
import { PlayerProvider } from './context/PlayerContext';
import { getPlaylists, createPlaylist } from './services/db';
import './App.css';

function App() {
  const [currentView, setCurrentView] = useState('library'); // 'library', 'liked', or playlist ID
  const [playlists, setPlaylists] = useState([]);
  const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);

  useEffect(() => {
    loadPlaylists();
  }, []);

  const loadPlaylists = async () => {
    const loaded = await getPlaylists();
    setPlaylists(loaded);
  };

  const handleCreatePlaylist = async (name) => {
    await createPlaylist(name);
    await loadPlaylists();
  };

  return (
    <ErrorBoundary>
      <PlayerProvider>
        <div style={{ display: 'flex', height: '100vh', width: '100vw', overflow: 'hidden' }}>
          <Sidebar
            currentView={currentView}
            setCurrentView={setCurrentView}
            playlists={playlists}
            onCreatePlaylist={() => setIsCreatePlaylistModalOpen(true)}
          />
          <MainContent
            currentView={currentView}
            setCurrentView={setCurrentView} // For internal navigation if needed
            playlists={playlists}
            refreshPlaylists={loadPlaylists}
          />
          <Player />

          <CreatePlaylistModal
            isOpen={isCreatePlaylistModalOpen}
            onClose={() => setIsCreatePlaylistModalOpen(false)}
            onCreate={handleCreatePlaylist}
          />
        </div>
      </PlayerProvider>
    </ErrorBoundary>
  );
}

export default App;

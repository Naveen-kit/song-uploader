import React from 'react';
import { Home, Search, Library, PlusSquare, Heart } from 'lucide-react';

const Sidebar = ({ currentView, setCurrentView, playlists, onCreatePlaylist }) => {
  return (
    <div style={{
      width: '240px',
      backgroundColor: '#000000',
      padding: '24px',
      display: 'flex',
      flexDirection: 'column',
      gap: '24px',
      height: '100%'
    }}>
      <div style={{ color: 'white', fontSize: '24px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '32px' }}>◎</span> Spotify Clone
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <NavItem
          icon={<Home />}
          label="Home"
          active={currentView === 'home'}
          onClick={() => setCurrentView('home')}
        />
        <NavItem
          icon={<Search />}
          label="Search"
          active={currentView === 'search'}
          onClick={() => setCurrentView('search')}
        />
        <NavItem
          icon={<Library />}
          label="Your Library"
          active={currentView === 'library'}
          onClick={() => setCurrentView('library')}
        />
      </div>

      <div style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <NavItem
          icon={<PlusSquare />}
          label="Create Playlist"
          onClick={onCreatePlaylist}
        />
        <NavItem
          icon={<Heart />}
          label="Liked Songs"
          active={currentView === 'liked'}
          onClick={() => setCurrentView('liked')}
        />
      </div>

      <div style={{ borderTop: '1px solid #282828', marginTop: '16px', paddingTop: '16px', flex: 1, overflowY: 'auto' }}>
        {playlists.map(playlist => (
          <div
            key={playlist.id}
            onClick={() => setCurrentView(playlist.id)}
            style={{
              color: currentView === playlist.id ? 'white' : '#b3b3b3',
              fontSize: '14px',
              marginBottom: '12px',
              cursor: 'pointer',
              fontWeight: currentView === playlist.id ? 'bold' : 'normal'
            }}
          >
            {playlist.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const NavItem = ({ icon, label, active, onClick }) => (
  <div
    onClick={onClick}
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      color: active ? 'white' : '#b3b3b3',
      cursor: 'pointer',
      fontWeight: active ? 'bold' : 'normal',
      transition: 'color 0.2s'
    }}
    onMouseEnter={(e) => e.currentTarget.style.color = 'white'}
    onMouseLeave={(e) => e.currentTarget.style.color = active ? 'white' : '#b3b3b3'}
  >
    {React.cloneElement(icon, { size: 24 })}
    <span>{label}</span>
  </div>
);

export default Sidebar;

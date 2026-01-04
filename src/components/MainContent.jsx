import React, { useEffect, useState } from 'react';
import { Clock, Upload, PlusSquare, Heart, Search } from 'lucide-react';
import { addSong, getSongs, deleteSong, createPlaylist, getPlaylists, addSongToPlaylist, getPlaylist, getLikedSongs, toggleLike } from '../services/db';
import { usePlayer } from '../context/PlayerContext';
import ContextMenu from './ContextMenu';
import AddToPlaylistModal from './AddToPlaylistModal';
import CreatePlaylistModal from './CreatePlaylistModal';

const MainContent = ({ currentView, setCurrentView, playlists, refreshPlaylists }) => {
    const [songs, setSongs] = useState([]);
    const [viewTitle, setViewTitle] = useState('Your Songs');
    const { playSong, currentSong, isPlaying } = usePlayer();

    // Search state
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredSongs, setFilteredSongs] = useState([]);

    // Modal states
    const [isAddToPlaylistModalOpen, setIsAddToPlaylistModalOpen] = useState(false);
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
    const [selectedSongForPlaylist, setSelectedSongForPlaylist] = useState(null);

    useEffect(() => {
        loadData();
    }, [currentView]);

    useEffect(() => {
        if (currentView === 'search') {
            const lowerQuery = searchQuery.toLowerCase();
            const filtered = songs.filter(song =>
                song.title.toLowerCase().includes(lowerQuery) ||
                song.artist.toLowerCase().includes(lowerQuery)
            );
            setFilteredSongs(filtered);
        } else {
            setFilteredSongs(songs);
        }
    }, [searchQuery, songs, currentView]);

    const loadData = async () => {
        if (currentView === 'library' || currentView === 'home') {
            const loadedSongs = await getSongs();
            setSongs(loadedSongs);
            setViewTitle('Your Songs');
        } else if (currentView === 'liked') {
            const loadedSongs = await getLikedSongs();
            setSongs(loadedSongs);
            setViewTitle('Liked Songs');
        } else if (currentView === 'search') {
            const loadedSongs = await getSongs();
            setSongs(loadedSongs);
            setViewTitle('Search');
            setSearchQuery(''); // Reset search on enter
        } else {
            const playlist = await getPlaylist(currentView);
            if (playlist) {
                setSongs(playlist.songs);
                setViewTitle(playlist.name);
            }
        }
    };

    const handleUpload = async (e) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            for (let i = 0; i < files.length; i++) {
                await addSong(files[i]);
            }
            await loadData();
        }
    };

    const handleDelete = async (song) => {
        if (confirm(`Delete "${song.title}"?`)) {
            await deleteSong(song.id);
            await loadData();
        }
    };

    const openAddToPlaylistModal = (song) => {
        setSelectedSongForPlaylist(song);
        setIsAddToPlaylistModalOpen(true);
    };

    const handleAddToPlaylist = async (playlist) => {
        if (selectedSongForPlaylist) {
            await addSongToPlaylist(playlist.id, selectedSongForPlaylist.id);
            // Optional: Show success toast
        }
    };

    const handleCreatePlaylistAndAdd = async (name) => {
        if (selectedSongForPlaylist) {
            const id = await createPlaylist(name);
            await refreshPlaylists();
            await addSongToPlaylist(id, selectedSongForPlaylist.id);
        }
    };

    const handleCreatePlaylist = async (name) => {
        await createPlaylist(name);
        await refreshPlaylists();
    };

    const handleToggleLike = async (e, song) => {
        e.stopPropagation();
        await toggleLike(song.id);
        await loadData();
    };

    const displaySongs = currentView === 'search' ? filteredSongs : songs;

    return (
        <div style={{
            flex: 1,
            background: 'linear-gradient(180deg, #202020 0%, #121212 100%)',
            padding: '24px',
            overflowY: 'auto',
            paddingBottom: '100px'
        }}>
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
                    {currentView === 'search' ? (
                        <div style={{ position: 'relative', width: '100%', maxWidth: '400px' }}>
                            <Search size={20} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#121212' }} />
                            <input
                                type="text"
                                placeholder="What do you want to listen to?"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                autoFocus
                                style={{
                                    width: '100%',
                                    padding: '12px 12px 12px 40px',
                                    borderRadius: '24px',
                                    border: 'none',
                                    outline: 'none',
                                    fontSize: '14px',
                                    color: '#121212',
                                    backgroundColor: 'white'
                                }}
                            />
                        </div>
                    ) : (
                        <>
                            <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>{viewTitle}</h1>
                            {currentView === 'library' && (
                                <button
                                    onClick={() => setIsCreatePlaylistModalOpen(true)}
                                    style={{ backgroundColor: '#282828', padding: '8px', borderRadius: '50%' }}
                                    title="Create Playlist"
                                >
                                    <PlusSquare size={20} />
                                </button>
                            )}
                        </>
                    )}
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{
                        backgroundColor: '#1db954',
                        color: 'black',
                        padding: '12px 24px',
                        borderRadius: '24px',
                        fontWeight: 'bold',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        fontSize: '14px',
                        transition: 'transform 0.1s'
                    }}>
                        <Upload size={18} />
                        Upload Songs
                        <input
                            type="file"
                            accept="audio/*"
                            multiple
                            onChange={handleUpload}
                            style={{ display: 'none' }}
                        />
                    </label>
                </div>
            </div>

            {/* List Header */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: '50px 4fr 3fr 1fr 50px 50px',
                padding: '0 16px 8px',
                borderBottom: '1px solid #282828',
                color: '#b3b3b3',
                fontSize: '14px',
                marginBottom: '16px'
            }}>
                <div>#</div>
                <div>Title</div>
                <div>Date Added</div>
                <div style={{ textAlign: 'right' }}><Clock size={16} /></div>
                <div></div>
                <div></div>
            </div>

            {/* Songs */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {displaySongs.map((song, index) => (
                    <div
                        key={song.id}
                        onClick={() => playSong(song)}
                        style={{
                            display: 'grid',
                            gridTemplateColumns: '50px 4fr 3fr 1fr 50px 50px',
                            padding: '12px 16px',
                            borderRadius: '4px',
                            color: currentSong?.id === song.id ? '#1db954' : '#b3b3b3',
                            cursor: 'pointer',
                            alignItems: 'center',
                            fontSize: '14px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a2a2a'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <div style={{ color: currentSong?.id === song.id ? '#1db954' : 'inherit' }}>
                            {currentSong?.id === song.id && isPlaying ? (
                                <img src="https://open.spotifycdn.com/cdn/images/equaliser-animated-green.f93a2ef4.gif" alt="playing" height="14" />
                            ) : (
                                index + 1
                            )}
                        </div>
                        <div style={{ color: 'white', fontWeight: '500' }}>
                            {song.title}
                            <div style={{ fontSize: '12px', color: '#b3b3b3', marginTop: '4px' }}>{song.artist}</div>
                        </div>
                        <div>{song.dateAdded.toLocaleDateString()}</div>
                        <div style={{ textAlign: 'right' }}>--:--</div>
                        <div onClick={(e) => handleToggleLike(e, song)}>
                            <Heart size={16} fill={song.liked ? "#1db954" : "none"} color={song.liked ? "#1db954" : "#b3b3b3"} />
                        </div>
                        <div onClick={(e) => e.stopPropagation()}>
                            <ContextMenu
                                song={song}
                                onDelete={handleDelete}
                                onAddToPlaylist={openAddToPlaylistModal}
                            />
                        </div>
                    </div>
                ))}
                {displaySongs.length === 0 && (
                    <div style={{ textAlign: 'center', padding: '48px', color: '#b3b3b3' }}>
                        {currentView === 'search' ? (
                            searchQuery ? 'No songs found matching your search.' : 'Start typing to search...'
                        ) : (
                            currentView === 'library' ? 'No songs uploaded yet.' : 'This list is empty.'
                        )}
                    </div>
                )}
            </div>

            <AddToPlaylistModal
                isOpen={isAddToPlaylistModalOpen}
                onClose={() => setIsAddToPlaylistModalOpen(false)}
                playlists={playlists}
                onSelectPlaylist={handleAddToPlaylist}
                onCreateNew={handleCreatePlaylistAndAdd}
            />

            <CreatePlaylistModal
                isOpen={isCreatePlaylistModalOpen}
                onClose={() => setIsCreatePlaylistModalOpen(false)}
                onCreate={handleCreatePlaylist}
            />
        </div>
    );
};

export default MainContent;

import React, { useState } from 'react';
import Modal from './Modal';
import { Plus } from 'lucide-react';

const AddToPlaylistModal = ({ isOpen, onClose, playlists, onSelectPlaylist, onCreateNew }) => {
    const [showCreateInput, setShowCreateInput] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

    const handleCreateSubmit = (e) => {
        e.preventDefault();
        if (newPlaylistName.trim()) {
            onCreateNew(newPlaylistName);
            setNewPlaylistName('');
            setShowCreateInput(false);
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Add to Playlist">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '400px', overflowY: 'auto' }}>

                {!showCreateInput ? (
                    <button
                        onClick={() => setShowCreateInput(true)}
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '16px',
                            padding: '12px',
                            backgroundColor: 'transparent',
                            border: '1px solid #3e3e3e',
                            borderRadius: '4px',
                            color: 'white',
                            cursor: 'pointer',
                            width: '100%',
                            textAlign: 'left'
                        }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3e3e3e'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#282828',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: '4px'
                        }}>
                            <Plus size={24} color="#b3b3b3" />
                        </div>
                        <span style={{ fontWeight: 'bold' }}>New Playlist</span>
                    </button>
                ) : (
                    <form onSubmit={handleCreateSubmit} style={{ display: 'flex', gap: '8px' }}>
                        <input
                            type="text"
                            value={newPlaylistName}
                            onChange={(e) => setNewPlaylistName(e.target.value)}
                            placeholder="Playlist Name"
                            autoFocus
                            style={{
                                flex: 1,
                                backgroundColor: '#3e3e3e',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '12px',
                                color: 'white',
                                outline: 'none'
                            }}
                        />
                        <button
                            type="submit"
                            disabled={!newPlaylistName.trim()}
                            style={{
                                backgroundColor: '#1db954',
                                border: 'none',
                                borderRadius: '4px',
                                padding: '0 24px',
                                fontWeight: 'bold',
                                cursor: newPlaylistName.trim() ? 'pointer' : 'not-allowed',
                                opacity: newPlaylistName.trim() ? 1 : 0.5
                            }}
                        >
                            Create
                        </button>
                    </form>
                )}

                <div style={{ height: '1px', backgroundColor: '#3e3e3e', margin: '8px 0' }} />

                {playlists.length === 0 ? (
                    <div style={{ textAlign: 'center', color: '#b3b3b3', padding: '24px' }}>
                        No playlists yet
                    </div>
                ) : (
                    playlists.map(playlist => (
                        <button
                            key={playlist.id}
                            onClick={() => { onSelectPlaylist(playlist); onClose(); }}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '8px',
                                backgroundColor: 'transparent',
                                border: 'none',
                                borderRadius: '4px',
                                color: 'white',
                                cursor: 'pointer',
                                width: '100%',
                                textAlign: 'left'
                            }}
                            onMouseEnter={e => e.currentTarget.style.backgroundColor = '#3e3e3e'}
                            onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            <div style={{
                                width: '40px',
                                height: '40px',
                                backgroundColor: '#282828',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderRadius: '4px',
                                fontSize: '20px'
                            }}>
                                🎵
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                <span style={{ fontWeight: 'bold' }}>{playlist.name}</span>
                                <span style={{ fontSize: '12px', color: '#b3b3b3' }}>{playlist.songs?.length || 0} songs</span>
                            </div>
                        </button>
                    ))
                )}
            </div>
        </Modal>
    );
};

export default AddToPlaylistModal;

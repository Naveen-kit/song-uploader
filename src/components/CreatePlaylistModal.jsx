import React, { useState } from 'react';
import Modal from './Modal';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
    const [name, setName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim()) {
            onCreate(name);
            setName('');
            onClose();
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Create Playlist">
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 'bold', color: 'white' }}>Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="My Playlist"
                        autoFocus
                        style={{
                            backgroundColor: '#3e3e3e',
                            border: '1px solid transparent',
                            borderRadius: '4px',
                            padding: '12px',
                            color: 'white',
                            fontSize: '14px',
                            outline: 'none'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                    <button
                        type="button"
                        onClick={onClose}
                        style={{
                            backgroundColor: 'transparent',
                            border: 'none',
                            color: 'white',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            padding: '12px 24px',
                            fontSize: '14px'
                        }}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={!name.trim()}
                        style={{
                            backgroundColor: '#1db954',
                            border: 'none',
                            borderRadius: '24px',
                            color: 'black',
                            fontWeight: 'bold',
                            padding: '12px 32px',
                            cursor: name.trim() ? 'pointer' : 'not-allowed',
                            fontSize: '14px',
                            opacity: name.trim() ? 1 : 0.5,
                            transform: 'scale(1)',
                            transition: 'transform 0.1s'
                        }}
                        onMouseDown={e => !e.currentTarget.disabled && (e.currentTarget.style.transform = 'scale(0.95)')}
                        onMouseUp={e => !e.currentTarget.disabled && (e.currentTarget.style.transform = 'scale(1)')}
                    >
                        Create
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default CreatePlaylistModal;

import React, { useState, useRef, useEffect } from 'react';
import { MoreHorizontal, Trash2, PlusCircle } from 'lucide-react';

const ContextMenu = ({ song, onDelete, onAddToPlaylist }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div style={{ position: 'relative' }} ref={menuRef}>
            <button
                onClick={(e) => { e.stopPropagation(); setIsOpen(!isOpen); }}
                style={{ padding: '8px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
                <MoreHorizontal size={16} color="#b3b3b3" />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    right: 0,
                    top: '100%',
                    backgroundColor: '#282828',
                    borderRadius: '4px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    zIndex: 100,
                    minWidth: '160px',
                    padding: '4px 0'
                }}>
                    <div
                        onClick={(e) => { e.stopPropagation(); onAddToPlaylist(song); setIsOpen(false); }}
                        style={{
                            padding: '10px 16px',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            hover: { backgroundColor: '#3e3e3e' }
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e3e3e'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <PlusCircle size={14} /> Add to Playlist
                    </div>
                    <div
                        onClick={(e) => { e.stopPropagation(); onDelete(song); setIsOpen(false); }}
                        style={{
                            padding: '10px 16px',
                            color: '#fff',
                            fontSize: '14px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e3e3e'}
                        onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                    >
                        <Trash2 size={14} /> Delete
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContextMenu;

import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Repeat, Shuffle } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';
import SleepTimer from './SleepTimer';

const Player = () => {
    const { currentSong, isPlaying, togglePlay, volume, setVolume, progress, duration, seek } = usePlayer();

    const formatTime = (time) => {
        if (!time) return '0:00';
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div style={{
            height: '90px',
            backgroundColor: '#181818',
            borderTop: '1px solid #282828',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0 16px',
            position: 'fixed',
            bottom: 0,
            width: '100%',
            zIndex: 100
        }}>
            {/* Song Info */}
            <div style={{ width: '30%', display: 'flex', alignItems: 'center', gap: '14px' }}>
                {currentSong ? (
                    <>
                        <div style={{ width: '56px', height: '56px', backgroundColor: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            🎵
                        </div>
                        <div>
                            <div style={{ color: 'white', fontSize: '14px', fontWeight: '500' }}>{currentSong.title}</div>
                            <div style={{ color: '#b3b3b3', fontSize: '11px' }}>{currentSong.artist}</div>
                        </div>
                    </>
                ) : (
                    <div style={{ color: '#b3b3b3', fontSize: '12px' }}>No song playing</div>
                )}
            </div>

            {/* Controls */}
            <div style={{ width: '40%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <Shuffle size={16} color="#b3b3b3" />
                    <SkipBack size={20} color="#b3b3b3" fill="#b3b3b3" />
                    <button
                        onClick={togglePlay}
                        style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            backgroundColor: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'transform 0.1s'
                        }}
                    >
                        {isPlaying ? <Pause size={20} color="black" fill="black" /> : <Play size={20} color="black" fill="black" style={{ marginLeft: '2px' }} />}
                    </button>
                    <SkipForward size={20} color="#b3b3b3" fill="#b3b3b3" />
                    <Repeat size={16} color="#b3b3b3" />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', width: '100%' }}>
                    <span style={{ color: '#b3b3b3', fontSize: '11px', minWidth: '35px', textAlign: 'right' }}>{formatTime(progress)}</span>
                    <input
                        type="range"
                        min="0"
                        max={duration || 100}
                        value={progress}
                        onChange={(e) => seek(Number(e.target.value))}
                        style={{ width: '100%' }}
                    />
                    <span style={{ color: '#b3b3b3', fontSize: '11px', minWidth: '35px' }}>{formatTime(duration)}</span>
                </div>
            </div>

            {/* Volume & Extras */}
            <div style={{ width: '30%', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '16px' }}>
                <SleepTimer />
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Volume2 size={20} color="#b3b3b3" />
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"
                        value={volume}
                        onChange={(e) => setVolume(Number(e.target.value))}
                        style={{ width: '100px' }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Player;

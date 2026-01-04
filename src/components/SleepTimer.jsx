import React, { useState } from 'react';
import { Moon } from 'lucide-react';
import { usePlayer } from '../context/PlayerContext';

const SleepTimer = () => {
    const { sleepTimer, setSleepTimer } = usePlayer();
    const [isOpen, setIsOpen] = useState(false);

    const options = [15, 30, 45, 60];

    return (
        <div style={{ position: 'relative' }}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                title="Sleep Timer"
                style={{ color: sleepTimer ? '#1db954' : '#b3b3b3' }}
            >
                <Moon size={20} />
            </button>

            {isOpen && (
                <div style={{
                    position: 'absolute',
                    bottom: '100%',
                    right: 0,
                    backgroundColor: '#282828',
                    borderRadius: '4px',
                    padding: '8px',
                    marginBottom: '8px',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                    zIndex: 101,
                    minWidth: '120px'
                }}>
                    <div style={{ color: 'white', fontSize: '12px', marginBottom: '8px', padding: '0 8px' }}>
                        Stop audio in...
                    </div>
                    {options.map(min => (
                        <div
                            key={min}
                            onClick={() => { setSleepTimer(min); setIsOpen(false); }}
                            style={{
                                padding: '8px',
                                color: sleepTimer === min ? '#1db954' : '#b3b3b3',
                                cursor: 'pointer',
                                fontSize: '14px',
                                borderRadius: '2px'
                            }}
                            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#3e3e3e'}
                            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                        >
                            {min} minutes
                        </div>
                    ))}
                    {sleepTimer && (
                        <div
                            onClick={() => { setSleepTimer(null); setIsOpen(false); }}
                            style={{
                                padding: '8px',
                                color: '#f15e6c',
                                cursor: 'pointer',
                                fontSize: '14px',
                                borderTop: '1px solid #3e3e3e',
                                marginTop: '4px'
                            }}
                        >
                            Turn off timer
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default SleepTimer;

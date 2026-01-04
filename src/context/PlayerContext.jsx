import React, { createContext, useContext, useState, useRef, useEffect } from 'react';

const PlayerContext = createContext();

export const usePlayer = () => useContext(PlayerContext);

export const PlayerProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(1);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const audioRef = useRef(new Audio());

    const [sleepTimer, setSleepTimer] = useState(null);
    const timerRef = useRef(null);

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => setProgress(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => setIsPlaying(false);

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, []);

    // Sleep Timer Effect
    useEffect(() => {
        if (sleepTimer) {
            clearTimeout(timerRef.current);
            timerRef.current = setTimeout(() => {
                setIsPlaying(false);
                setSleepTimer(null);
                alert("Sleep timer ended. Music paused.");
            }, sleepTimer * 60 * 1000);
        } else {
            clearTimeout(timerRef.current);
        }
        return () => clearTimeout(timerRef.current);
    }, [sleepTimer]);

    useEffect(() => {
        if (currentSong) {
            const url = URL.createObjectURL(currentSong.file);
            audioRef.current.src = url;
            audioRef.current.play().then(() => setIsPlaying(true)).catch(e => console.error("Play failed", e));

            return () => {
                URL.revokeObjectURL(url);
            };
        }
    }, [currentSong]);

    useEffect(() => {
        if (isPlaying) {
            audioRef.current.play().catch(e => console.error("Play failed", e));
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying]);

    useEffect(() => {
        audioRef.current.volume = volume;
    }, [volume]);

    const playSong = (song) => {
        if (currentSong?.id === song.id) {
            togglePlay();
        } else {
            setCurrentSong(song);
            setIsPlaying(true);
        }
    };

    const togglePlay = () => setIsPlaying(!isPlaying);

    const seek = (time) => {
        audioRef.current.currentTime = time;
        setProgress(time);
    };

    return (
        <PlayerContext.Provider value={{
            currentSong,
            isPlaying,
            volume,
            progress,
            duration,
            playSong,
            togglePlay,
            setVolume,
            seek,
            sleepTimer,
            setSleepTimer
        }}>
            {children}
        </PlayerContext.Provider>
    );
};

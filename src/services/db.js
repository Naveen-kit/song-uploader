import { openDB } from 'idb';

const DB_NAME = 'spotify-clone-db';
const STORE_SONGS = 'songs';
const STORE_PLAYLISTS = 'playlists';

export const initDB = async () => {
    return openDB(DB_NAME, 2, {
        upgrade(db, oldVersion, newVersion, transaction) {
            if (!db.objectStoreNames.contains(STORE_SONGS)) {
                const store = db.createObjectStore(STORE_SONGS, { keyPath: 'id', autoIncrement: true });
                store.createIndex('dateAdded', 'dateAdded');
            }
            if (!db.objectStoreNames.contains(STORE_PLAYLISTS)) {
                const store = db.createObjectStore(STORE_PLAYLISTS, { keyPath: 'id', autoIncrement: true });
                store.createIndex('name', 'name');
            }
        },
    });
};

export const addSong = async (file) => {
    const db = await initDB();
    const song = {
        title: file.name.replace(/\.[^/.]+$/, ""),
        artist: 'Unknown Artist',
        file: file,
        type: file.type,
        dateAdded: new Date(),
        duration: 0,
        liked: false
    };
    return db.add(STORE_SONGS, song);
};

export const getSongs = async () => {
    const db = await initDB();
    return db.getAllFromIndex(STORE_SONGS, 'dateAdded');
};

export const getLikedSongs = async () => {
    const db = await initDB();
    const allSongs = await db.getAllFromIndex(STORE_SONGS, 'dateAdded');
    return allSongs.filter(song => song.liked);
};

export const toggleLike = async (id) => {
    const db = await initDB();
    const song = await db.get(STORE_SONGS, id);
    if (song) {
        song.liked = !song.liked;
        await db.put(STORE_SONGS, song);
        return song.liked;
    }
    return false;
};

export const deleteSong = async (id) => {
    const db = await initDB();
    return db.delete(STORE_SONGS, id);
};

export const createPlaylist = async (name) => {
    const db = await initDB();
    return db.add(STORE_PLAYLISTS, { name, songs: [], dateCreated: new Date() });
};

export const getPlaylists = async () => {
    const db = await initDB();
    return db.getAll(STORE_PLAYLISTS);
};

export const addSongToPlaylist = async (playlistId, songId) => {
    const db = await initDB();
    const playlist = await db.get(STORE_PLAYLISTS, playlistId);
    if (playlist && !playlist.songs.includes(songId)) {
        playlist.songs.push(songId);
        await db.put(STORE_PLAYLISTS, playlist);
    }
};

export const getPlaylist = async (id) => {
    const db = await initDB();
    const playlist = await db.get(STORE_PLAYLISTS, id);
    if (!playlist) return null;

    // Fetch actual song objects
    const songs = [];
    for (const songId of playlist.songs) {
        const song = await db.get(STORE_SONGS, songId);
        if (song) songs.push(song);
    }
    return { ...playlist, songs };
};

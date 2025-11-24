import { createContext, useContext, useState, useEffect } from 'react';

const PlayerContext = createContext();

const STORAGE_KEY = 'taprify_current_track';

export function PlayerProvider({ children }) {
    // Inicializa com track do localStorage se existir
    const [currentTrack, setCurrentTrack] = useState(() => {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved ? JSON.parse(saved) : null;
        } catch (error) {
            console.error('Error loading track from localStorage:', error);
            return null;
        }
    });

    useEffect(() => {
        try {
            if (currentTrack) {
                localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTrack));
            } else {
                localStorage.removeItem(STORAGE_KEY);
            }
        } catch (error) {
            console.error('Error saving track to localStorage:', error);
        }
    }, [currentTrack]);

    const playTrack = (track) => {
        setCurrentTrack(track);
    };

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                playTrack,
            }}
        >
            {children}
        </PlayerContext.Provider>
    );
}

export function usePlayer() {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error('usePlayer must be used within a PlayerProvider');
    }
    return context;
}

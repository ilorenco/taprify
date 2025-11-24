import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { SearchBar } from '../../components/ui/SearchBar';
import { SlidersHorizontalIcon, CircleUserIcon, EllipsisIcon, ShuffleIcon, CirclePlayIcon } from 'lucide-react';
import { TrackCard } from './components/TrackCard';
import spotifyService from '../../services/spotifyService';
import playlistService from '../../services/playlistService';

export function PlaylistDetails() {
    const { albumId, playlistId } = useParams();
    const location = useLocation();
    const [playlist, setPlaylist] = useState(null);
    const [loading, setLoading] = useState(true);

    const isUserPlaylist = location.pathname.startsWith('/my-playlist');

    useEffect(() => {
        async function loadPlaylistDetails() {
            try {
                if (isUserPlaylist && playlistId) {
                    // Load user playlist
                    const result = await playlistService.getPlaylistDetails(playlistId);
                    if (result.success) {
                        // Transform to match expected format
                        setPlaylist({
                            id: result.playlist.id,
                            name: result.playlist.name,
                            artist: result.playlist.creatorName,
                            totalTracks: result.playlist.trackCount,
                            totalDurationMs: result.playlist.tracks.reduce((sum, track) => sum + (track.durationMs || 0), 0),
                            tracks: result.playlist.tracks.map(track => ({
                                id: track.spotifyTrackId,  // Usar o Spotify ID, não o ID do banco
                                trackNumber: null,
                                name: track.trackName,
                                artist: track.artistName,
                                durationMs: track.durationMs,
                                imageUrl: track.imageUrl
                            }))
                        });
                    } else {
                        console.error('Failed to load playlist details:', result.error);
                    }
                } else if (albumId) {
                    // Load Spotify album
                    const result = await spotifyService.getAlbumDetails(albumId);
                    if (result.success) {
                        setPlaylist(result.album);
                    } else {
                        console.error('Failed to load album details:', result.error);
                    }
                }
            } catch (error) {
                console.error('Error loading playlist details:', error);
            } finally {
                setLoading(false);
            }
        }

        if (albumId || playlistId) {
            loadPlaylistDetails();
        }
    }, [albumId, playlistId, isUserPlaylist]);

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        return hours > 0
            ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
            : `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-base-card">Carregando detalhes...</p>
            </div>
        );
    }

    if (!playlist) {
        return (
            <div className="flex items-center justify-center h-full">
                <p className="text-base-card">Playlist não encontrada</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full">
            {/* Seção fixa do cabeçalho - sticky para ficar fixo ao scrollar */}
            <div className="sticky top-0 z-40 bg-background px-4 md:px-6 lg:px-8 pt-4">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center justify-between gap-3 md:gap-4">
                        <SearchBar placeholder="Pesquisar músicas" />
                        <SlidersHorizontalIcon
                            size={32}
                            color="var(--color-base-input)"
                            strokeWidth={2}
                            className="cursor-pointer shrink-0 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-light">
                            {playlist.name}
                        </h1>
                        <div className="flex items-center gap-2">
                            <CircleUserIcon
                                size={32}
                                color="var(--color-base-card)"
                                strokeWidth={1.5}
                                className="sm:w-9 sm:h-9 md:w-10 md:h-10"
                            />
                            <h2 className="font-medium text-base-card text-base sm:text-lg md:text-xl">
                                {playlist.artist}
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <span className="font-medium text-base-card text-sm sm:text-base md:text-lg">
                                {playlist.totalTracks} músicas
                            </span>
                            <span className="font-medium text-base-card text-sm sm:text-base md:text-lg">
                                {formatDuration(playlist.totalDurationMs)}
                            </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                            <EllipsisIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                            <ShuffleIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                            <CirclePlayIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                        </div>
                    </div>

                    <hr className="border-blue-light border-t-2 py-2" />
                </div>
            </div>

            {/* Área de rolagem dos tracks */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-3 md:gap-4 py-4 md:py-6">
                    {playlist.tracks && playlist.tracks.length > 0 ? (
                        playlist.tracks.map((track, index) => (
                            <TrackCard key={track.id} track={{...track, trackNumber: track.trackNumber || index + 1}} />
                        ))
                    ) : (
                        <p className="text-base-card">Nenhuma música disponível</p>
                    )}
                </div>
            </div>
        </div>
    )
}

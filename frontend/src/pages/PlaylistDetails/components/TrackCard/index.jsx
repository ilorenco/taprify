import { useState, useRef, useEffect } from 'react';
import { CirclePlayIcon, CirclePlusIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { usePlayer } from "../../../../contexts/PlayerContext"
import { OverflowMenu } from '../../../../components/commons/OverflowMenu';
import playlistService from '../../../../services/playlistService';

export function TrackCard({ track }) {
    const navigate = useNavigate();
    const { playTrack } = usePlayer();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const [playlists, setPlaylists] = useState([]);
    const buttonRef = useRef(null);

    useEffect(() => {
        loadPlaylists();
    }, []);

    const loadPlaylists = async () => {
        const result = await playlistService.getMyPlaylists();
        if (result.success) {
            setPlaylists(result.playlists);
        }
    };

    const formatDuration = (ms) => {
        const totalSeconds = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const handlePlayClick = (e) => {
        e.stopPropagation();
        playTrack(track);
        navigate('/player');
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.top,
                right: window.innerWidth - rect.right,
            });
        }

        setIsMenuOpen(!isMenuOpen);
    };

    const handleAddToPlaylist = async (playlistId) => {
        setIsMenuOpen(false);

        const result = await playlistService.addTrackToPlaylist(playlistId, track);

        if (result.success) {
            alert('Música adicionada à playlist com sucesso!');
        } else {
            alert(result.error);
        }
    };

    const menuOptions = playlists.map(playlist => ({
        label: playlist.name,
        onClick: () => handleAddToPlaylist(playlist.id),
        className: "text-white"
    }));

    return (
        <div className="flex items-center justify-between gap-4 relative">
            <div className="flex items-center gap-3 flex-1 min-w-0">
                <span className="text-base-card font-medium text-sm md:text-base shrink-0">
                    {track?.trackNumber || '-'}
                </span>
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h1 className="font-semibold text-purple-royalty text-base md:text-lg truncate">
                        {track?.name || 'Nome da música'}
                    </h1>
                    <h2 className="font-medium text-base-card text-sm md:text-base truncate">
                        {track?.artist || 'Artista'}
                    </h2>
                </div>
            </div>
            <div className="flex items-center gap-3 shrink-0">
                <span className="text-base-card font-medium text-sm md:text-base">
                    {track?.durationMs ? formatDuration(track.durationMs) : '-:--'}
                </span>
                <CirclePlayIcon
                    size={30}
                    color="var(--color-base-input)"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform"
                    onClick={handlePlayClick}
                />
                <div ref={buttonRef}>
                    <CirclePlusIcon
                        size={30}
                        color="var(--color-base-input)"
                        strokeWidth={2}
                        className="cursor-pointer hover:scale-110 transition-transform"
                        onClick={handleMenuClick}
                    />
                </div>
            </div>

            <OverflowMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                options={menuOptions.length > 0 ? menuOptions : [{ label: 'Nenhuma playlist disponível', onClick: () => {}, className: 'text-gray-400' }]}
                position={menuPosition}
            />
        </div>
    )
}
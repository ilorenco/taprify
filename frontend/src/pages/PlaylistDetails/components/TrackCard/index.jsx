import { EllipsisVerticalIcon, CirclePlayIcon } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { usePlayer } from "../../../../contexts/PlayerContext"

export function TrackCard({ track }) {
    const navigate = useNavigate();
    const { playTrack } = usePlayer();

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

    return (
        <div className="flex items-center justify-between gap-4">
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
                <EllipsisVerticalIcon
                    size={30}
                    color="var(--color-base-input)"
                    strokeWidth={2}
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}
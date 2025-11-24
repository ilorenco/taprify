import { useState, useRef, useEffect } from 'react';
import { CircleUserIcon, EllipsisIcon, CirclePlayIcon, CirclePlusIcon } from 'lucide-react';
import { OverflowMenu } from '../../../../components/commons/OverflowMenu';
import playlistService from '../../../../services/playlistService';

export function TrackPlayerCard({ track }) {
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
        <div className="flex flex-col gap-2 relative">
            <header className="flex items-center gap-2">
                <CircleUserIcon size={42} color="var(--color-blue-sky)" strokeWidth={1.5} />
                <h1 className="font-semibold font-inter text-base text-base-input">{track?.artist || 'Nome do autor'}</h1>
            </header>
            <main className="w-full h-[80px] md:h-[90px] bg-purple-night rounded-2xl flex items-center gap-2 relative overflow-hidden">
                {track?.imageUrl ? (
                    <img
                        src={track.imageUrl}
                        alt={track.name}
                        className="w-[80px] md:w-[90px] h-full object-cover rounded-2xl shrink-0"
                    />
                ) : (
                    <div className="w-[80px] md:w-[90px] h-full bg-purple-ultra-violet rounded-2xl flex items-start justify-center pt-2 shrink-0">
                        <div className="text-xs font-semibold text-base-card"></div>
                    </div>
                )}

                <div className="flex flex-col gap-1 flex-1 pr-20 md:pr-24 min-w-0">
                    <h1 className="font-semibold font-inter text-base text-base-input truncate">{track?.name || 'Nome da Música'}</h1>
                    <div className="flex gap-2 flex-wrap">
                        {track?.genres && track.genres.length > 0 ? (
                            track.genres.map((genre, index) => (
                                <span key={index} className="bg-purple-darker px-2 py-0.5 rounded-lg text-xs font-semibold text-base-card whitespace-nowrap uppercase">
                                    {genre}
                                </span>
                            ))
                        ) : (
                            <>
                                <span className="bg-purple-darker px-2 py-0.5 rounded-lg text-xs font-semibold text-base-card whitespace-nowrap">ROCK</span>
                                <span className="bg-purple-darker px-2 py-0.5 rounded-lg text-xs font-semibold text-base-card whitespace-nowrap">CLASSIC</span>
                            </>
                        )}
                    </div>
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <div ref={buttonRef}>
                        <CirclePlusIcon
                            size={36}
                            color="var(--color-base-input)"
                            strokeWidth={1.5}
                            className="cursor-pointer hover:scale-110 transition-transform"
                            onClick={handleMenuClick}
                        />
                    </div>
                    <CirclePlayIcon size={36} color="var(--color-base-input)" strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                </div>

            </main>

            <OverflowMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                options={menuOptions.length > 0 ? menuOptions : [{ label: 'Nenhuma playlist disponível', onClick: () => {}, className: 'text-gray-400' }]}
                position={menuPosition}
            />
        </div>
    )
}
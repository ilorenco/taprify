import { CirclePlusIcon } from 'lucide-react';
import { usePlayer } from '../../contexts/PlayerContext';

export function Player() {
    const { currentTrack } = usePlayer();

    if (!currentTrack) {
        return (
            <div className="flex flex-col gap-4 w-full h-full items-center justify-center px-4">
                <p className="text-base-card text-xl">Nenhuma música selecionada</p>
                <p className="text-base-input text-sm">Selecione uma música para começar a tocar</p>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full h-full items-center justify-center px-4 md:px-6 py-6">
            {/* Informações da música */}
            <div className="flex items-center justify-between w-full max-w-md md:max-w-lg gap-4">
                <div className="flex flex-col gap-1 flex-1 min-w-0">
                    <h1 className="text-base-card font-bold text-center text-xl md:text-2xl truncate">
                        {currentTrack.name}
                    </h1>
                    <h2 className="text-base-input font-medium text-center text-sm md:text-base truncate">
                        {currentTrack.artist}
                    </h2>
                </div>
            </div>

            {/* Spotify Player */}
            <div className="w-full max-w-md md:max-w-lg">
                <iframe
                    src={`https://open.spotify.com/embed/track/${currentTrack.id}`}
                    width="100%"
                    height="380"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Spotify Player"
                    className="rounded-xl"
                />
            </div>
        </div>
    )
}
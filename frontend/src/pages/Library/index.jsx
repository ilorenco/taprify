import { useState, useEffect } from 'react';
import { CirclePlusIcon } from 'lucide-react';
import { PlaylistCard } from './components/PlaylistCard';
import { CreatePlaylistModal } from './components/CreatePlaylistModal';
import { EditPlaylistModal } from './components/EditPlaylistModal';
import playlistService from '../../services/playlistService';

export function Library() {
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [selectedPlaylist, setSelectedPlaylist] = useState(null);
    const [playlists, setPlaylists] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const loadPlaylists = async () => {
        setLoading(true);
        setError('');

        const result = await playlistService.getMyPlaylists();

        if (result.success) {
            setPlaylists(result.playlists);
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    useEffect(() => {
        loadPlaylists();
    }, []);

    const handleEdit = (playlist) => {
        setSelectedPlaylist(playlist);
        setIsEditOpen(true);
    };

    const handleDelete = async (playlist) => {
        const result = await playlistService.deletePlaylist(playlist.id);

        if (result.success) {
            loadPlaylists();
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            {/* Seção fixa do cabeçalho - sticky para ficar fixo ao scrollar */}
            <div className="sticky top-0 z-40 bg-background px-4 md:px-6 lg:px-8 pt-4">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 bg-purple-light rounded-lg shrink-0"></div>
                            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-light">Sua biblioteca</h1>
                        </div>
                        <button className="shrink-0" onClick={() => setIsCreateOpen(true)}>
                            <CirclePlusIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                        </button>
                    </div>
                    <hr className="border-blue-light border-t-2 py-2" />
                </div>
            </div>

            {/* Área de rolagem dos cards */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-3 md:gap-4 py-4 md:py-6 pb-20">
                    {loading && (
                        <p className="text-white text-center py-8">Carregando playlists...</p>
                    )}

                    {error && (
                        <p className="text-red-500 text-center py-8">{error}</p>
                    )}

                    {!loading && !error && playlists.length === 0 && (
                        <p className="text-white text-center py-8">
                            Você ainda não tem playlists.
                        </p>
                    )}

                    {!loading && !error && playlists.length > 0 && playlists.map((playlist) => (
                        <PlaylistCard
                            key={playlist.id}
                            playlist={playlist}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    ))}
                </div>
            </div>

            <CreatePlaylistModal
                isOpen={isCreateOpen}
                onClose={() => setIsCreateOpen(false)}
                onPlaylistCreated={loadPlaylists}
            />

            <EditPlaylistModal
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}
                onPlaylistUpdated={loadPlaylists}
                playlist={selectedPlaylist}
            />
        </div>
    )
}
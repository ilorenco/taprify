import { useEffect, useState } from 'react';
import { Modal } from '../../../../components/commons/Modal';
import playlistService from '../../../../services/playlistService';

export function EditPlaylistModal({ isOpen, onClose, onPlaylistUpdated, playlist }) {
    const [playlistName, setPlaylistName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && playlist) {
            setPlaylistName(playlist.name);
            setError('');
        } else if (!isOpen) {
            setPlaylistName('');
            setError('');
        }
    }, [isOpen, playlist]);

    const handleUpdate = async () => {
        if (!playlistName.trim() || !playlist) return;

        setLoading(true);
        setError('');

        const result = await playlistService.updatePlaylist(playlist.id, playlistName);

        if (result.success) {
            onPlaylistUpdated?.();
            onClose();
        } else {
            setError(result.error);
        }

        setLoading(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar playlist"
            actions={
                <>
                    <button
                        className="font-bold text-white hover:text-gray-300 hover:cursor-pointer transition-colors text-sm sm:text-base disabled:opacity-50"
                        onClick={onClose}
                        disabled={loading}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-sky text-white font-bold px-4 sm:px-5 md:px-6 py-2 rounded-lg hover:bg-purple-light/80 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        onClick={handleUpdate}
                        disabled={!playlistName.trim() || loading}
                    >
                        {loading ? 'Salvando...' : 'Salvar'}
                    </button>
                </>
            }
        >
            <div className="flex flex-col gap-2">
                <label className="text-white font-bold text-sm sm:text-base font-inter">
                    Nome da playlist
                </label>
                <input
                    type="text"
                    placeholder="Digite o nome da playlist"
                    value={playlistName}
                    onChange={(e) => {
                        setPlaylistName(e.target.value);
                        setError('');
                    }}
                    onKeyDown={(e) => e.key === 'Enter' && !loading && handleUpdate()}
                    className="bg-base-input rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 outline-none focus:ring-3 focus:ring-purple-dark text-sm sm:text-base placeholder:font-medium font-medium w-full"
                    autoFocus
                    disabled={loading}
                />
                {error && (
                    <span className="text-red-500 text-xs sm:text-sm">{error}</span>
                )}
            </div>
        </Modal>
    );
}

import { useEffect, useRef, useState } from 'react';

export function CreatePlaylistModal({ isOpen, onClose }) {
    const modalRef = useRef(null);
    const [playlistName, setPlaylistName] = useState('');

    useEffect(() => {
        if (!isOpen) {
            setPlaylistName('');
            return;
        }

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    const handleCreate = () => {
        if (playlistName.trim()) {
            console.log('Criar playlist:', playlistName);
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-md z-50 px-4">
            <div ref={modalRef} className="bg-background p-6 sm:p-7 md:p-8 rounded-[20px] flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-[514px]">
                <h2 className="text-purple-light font-bold text-lg sm:text-xl md:text-2xl font-inter">
                    Criar nova playlist
                </h2>

                <div className="flex flex-col gap-3 sm:gap-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-white font-bold text-sm sm:text-base font-inter">
                            Digite o nome da playlist
                        </label>
                        <input
                            type="text"
                            placeholder="Digite o nome da playlist"
                            value={playlistName}
                            onChange={(e) => setPlaylistName(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleCreate()}
                            className="bg-base-input rounded-lg px-3 sm:px-4 py-2 sm:py-2.5 outline-none focus:ring-3 focus:ring-purple-dark text-sm sm:text-base placeholder:font-medium font-medium w-full"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex gap-3 sm:gap-4 justify-end">
                    <button
                        className="font-bold text-white hover:text-gray-300 hover:cursor-pointer transition-colors text-sm sm:text-base"
                        onClick={onClose}
                    >
                        Cancelar
                    </button>
                    <button
                        className="bg-blue-sky text-white font-bold px-4 sm:px-5 md:px-6 py-2 rounded-lg hover:bg-purple-light/80 hover:cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                        onClick={handleCreate}
                        disabled={!playlistName.trim()}
                    >
                        Criar
                    </button>
                </div>
            </div>
        </div>
    );
}

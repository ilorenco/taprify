import { useNavigate } from 'react-router-dom';

export function AlbumCard({ album }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (album?.id) {
            navigate(`/playlist/${album.id}`);
        }
    };

    return (
        <div
            onClick={handleClick}
            className="min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px] md:min-w-[160px] md:w-[160px] h-[160px] sm:h-[180px] md:h-[200px] rounded-lg flex flex-col items-center justify-between p-2 shrink-0 transition-transform hover:scale-105 cursor-pointer relative overflow-hidden group">
            {album?.imageUrl ? (
                <>
                    <img
                        src={album.imageUrl}
                        alt={album.name}
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="relative z-10 w-full mt-auto">
                        <h3 className="text-white font-semibold text-sm truncate text-center">
                            {album.name}
                        </h3>
                        {album.artist && (
                            <p className="text-gray-300 text-xs truncate text-center">
                                {album.artist}
                            </p>
                        )}
                    </div>
                </>
            ) : (
                <div className="w-full h-full bg-purple-ultra-violet flex items-center justify-center">
                    <span className="text-base-card text-xs">Sem imagem</span>
                </div>
            )}
        </div>
    )
}
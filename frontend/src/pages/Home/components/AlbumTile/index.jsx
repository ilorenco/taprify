export function AlbumTile({ album }) {
    return (
        <div className="w-full min-w-[140px] h-[55px] bg-purple-night rounded-sm flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer overflow-hidden">
            {album?.imageUrl ? (
                <img
                    src={album.imageUrl}
                    alt={album.name}
                    className="w-[55px] h-full object-cover rounded-sm shrink-0"
                />
            ) : (
                <div className="w-[55px] h-full bg-purple-ultra-violet rounded-sm shrink-0"></div>
            )}
            <h1 className="font-semibold text-base-card text-sm truncate">
                {album?.name || 'Album Title'}
            </h1>
        </div>
    )
}
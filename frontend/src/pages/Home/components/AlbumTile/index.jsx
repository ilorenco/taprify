export function AlbumTile() {
    return (
        <div className="w-full min-w-[140px] h-[55px] bg-purple-night rounded-sm flex items-center gap-2 transition-transform hover:scale-105 cursor-pointer overflow-hidden">
            <div className="w-[55px] h-full bg-purple-ultra-violet rounded-sm shrink-0"></div>
            <h1 className="font-semibold text-base-card text-sm truncate">
                Album Title
            </h1>
        </div>
    )
}
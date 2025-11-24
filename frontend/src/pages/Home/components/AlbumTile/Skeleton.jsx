export function AlbumTileSkeleton() {
    return (
        <div className="w-full min-w-[140px] h-[55px] bg-purple-night rounded-sm flex items-center gap-2 overflow-hidden animate-pulse">
            {/* Image skeleton */}
            <div className="w-[55px] h-full bg-purple-ultra-violet rounded-sm shrink-0"></div>

            {/* Text skeleton */}
            <div className="h-3.5 bg-purple-ultra-violet rounded w-24"></div>
        </div>
    );
}

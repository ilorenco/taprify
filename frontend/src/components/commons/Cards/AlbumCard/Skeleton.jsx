export function AlbumCardSkeleton() {
    return (
        <div className="min-w-[120px] w-[120px] sm:min-w-[140px] sm:w-[140px] md:min-w-[160px] md:w-[160px] h-[160px] sm:h-[180px] md:h-[200px] rounded-lg flex flex-col items-center justify-between p-2 shrink-0 overflow-hidden animate-pulse relative">
            {/* Background skeleton */}
            <div className="absolute inset-0 bg-purple-ultra-violet"></div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Text skeleton */}
            <div className="relative z-10 w-full mt-auto flex flex-col gap-1">
                {/* Title */}
                <div className="h-3.5 bg-gray-700 rounded mx-auto w-3/4"></div>
                {/* Artist */}
                <div className="h-3 bg-gray-600 rounded mx-auto w-1/2"></div>
            </div>
        </div>
    );
}

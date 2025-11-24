export function TrackPlayerCardSkeleton() {
    return (
        <div className="flex flex-col gap-2 animate-pulse">
            {/* Header skeleton */}
            <header className="flex items-center gap-2">
                <div className="w-[42px] h-[42px] bg-purple-ultra-violet rounded-full shrink-0"></div>
                <div className="h-4 bg-purple-ultra-violet rounded w-32"></div>
            </header>

            {/* Main card skeleton */}
            <main className="w-full h-[80px] md:h-[90px] bg-purple-night rounded-2xl flex items-center gap-2 relative overflow-hidden">
                {/* Image skeleton */}
                <div className="w-[80px] md:w-[90px] h-full bg-purple-ultra-violet rounded-2xl shrink-0"></div>

                {/* Content skeleton */}
                <div className="flex flex-col gap-1 flex-1 pr-20 md:pr-24 min-w-0">
                    {/* Title */}
                    <div className="h-4 bg-purple-ultra-violet rounded w-2/3"></div>

                    {/* Genres */}
                    <div className="flex gap-2 flex-wrap">
                        <div className="h-5 w-14 bg-purple-darker rounded-lg"></div>
                        <div className="h-5 w-16 bg-purple-darker rounded-lg"></div>
                    </div>
                </div>

                {/* Icons skeleton */}
                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <div className="w-9 h-9 bg-purple-ultra-violet rounded-full"></div>
                    <div className="w-9 h-9 bg-purple-ultra-violet rounded-full"></div>
                </div>
            </main>
        </div>
    );
}

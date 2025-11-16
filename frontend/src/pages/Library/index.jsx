import { CirclePlusIcon, SlidersHorizontalIcon, SearchIcon, ArrowDownUpIcon } from 'lucide-react';
import { PlaylistCard } from './components/PlaylistCard';

export function Library() {
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
                        <button className="shrink-0">
                            <CirclePlusIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                        </button>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <SlidersHorizontalIcon
                            size={28}
                            color="var(--color-base-input)"
                            strokeWidth={2}
                            className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                        />
                        <div className="flex items-center gap-4 md:gap-6">
                            <SearchIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                            <ArrowDownUpIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                        </div>
                    </div>

                    <hr className="border-blue-light border-t-2 py-2" />
                </div>
            </div>

            {/* Área de rolagem dos cards */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-3 md:gap-4 py-4 md:py-6">
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                    <PlaylistCard />
                </div>
            </div>
        </div>
    )
}
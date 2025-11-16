import { SearchBar } from '../../components/ui/SearchBar';
import { SlidersHorizontalIcon, CircleUserIcon, EllipsisIcon, ShuffleIcon, CirclePlayIcon } from 'lucide-react';
import { TrackCard } from './components/TrackCard';

export function PlaylistDetails() {
    return (
        <div className="flex flex-col h-full w-full">
            {/* Seção fixa do cabeçalho - sticky para ficar fixo ao scrollar */}
            <div className="sticky top-0 z-40 bg-background px-4 md:px-6 lg:px-8 pt-4">
                <div className="flex flex-col gap-4 md:gap-6">
                    <div className="flex items-center justify-between gap-3 md:gap-4">
                        <SearchBar placeholder="Pesquisar músicas" />
                        <SlidersHorizontalIcon
                            size={32}
                            color="var(--color-base-input)"
                            strokeWidth={2}
                            className="cursor-pointer shrink-0 sm:w-9 sm:h-9 md:w-10 md:h-10 lg:w-12 lg:h-12"
                        />
                    </div>

                    <div className="flex flex-col gap-2 md:gap-3">
                        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-blue-light">
                            Nome Playlist
                        </h1>
                        <div className="flex items-center gap-2">
                            <CircleUserIcon
                                size={32}
                                color="var(--color-base-card)"
                                strokeWidth={1.5}
                                className="sm:w-9 sm:h-9 md:w-10 md:h-10"
                            />
                            <h2 className="font-medium text-base-card text-base sm:text-lg md:text-xl">
                                Nome do autor
                            </h2>
                        </div>
                    </div>

                    <div className="flex items-center justify-between w-full">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
                            <span className="font-medium text-base-card text-sm sm:text-base md:text-lg">
                                000 músicas
                            </span>
                            <span className="font-medium text-base-card text-sm sm:text-base md:text-lg">
                                00:00:00 min
                            </span>
                        </div>
                        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
                            <EllipsisIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                            <ShuffleIcon
                                size={28}
                                color="var(--color-base-input)"
                                strokeWidth={2}
                                className="cursor-pointer sm:w-8 sm:h-8 md:w-9 md:h-9"
                            />
                            <CirclePlayIcon
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

            {/* Área de rolagem dos tracks */}
            <div className="flex-1 overflow-y-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-3 md:gap-4 py-4 md:py-6">
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                    <TrackCard />
                </div>
            </div>
        </div>
    )
}
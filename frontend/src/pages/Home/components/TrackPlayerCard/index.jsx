import { CircleUserIcon, EllipsisIcon, CirclePlayIcon, CirclePlusIcon } from 'lucide-react';

export function TrackPlayerCard() {
    return (
        <div className="flex flex-col gap-2">
            <header className="flex items-center gap-2">
                <CircleUserIcon size={42} color="var(--color-blue-sky)" strokeWidth={1.5} />
                <h1 className="font-semibold font-inter text-base text-base-input">Nome do autor</h1>
            </header>
            <main className="w-full h-[80px] md:h-[90px] bg-purple-night rounded-2xl flex items-center gap-2 relative overflow-hidden">
                <div className="w-[80px] md:w-[90px] h-full bg-purple-ultra-violet rounded-2xl flex items-start justify-center pt-2 shrink-0">
                    <div className="text-xs font-semibold text-base-card"></div>
                </div>

                <div className="flex flex-col gap-1 flex-1 pr-20 md:pr-24 min-w-0">
                    <h1 className="font-semibold font-inter text-base text-base-input truncate">Nome da Música</h1>
                    <div className="flex gap-2 flex-wrap">
                        <span className="bg-purple-darker px-2 py-0.5 rounded-lg text-xs font-semibold text-base-card whitespace-nowrap">ESTILO</span>
                        <span className="bg-purple-darker px-2 py-0.5 rounded-lg text-xs font-semibold text-base-card whitespace-nowrap">ESTILO</span>
                    </div>
                </div>

                <div className="absolute top-2 right-2 flex items-center gap-1">
                    <EllipsisIcon size={27} color="var(--color-base-input)" strokeWidth={1.5} className="cursor-pointer" />
                </div>

                <div className="absolute bottom-2 right-2 flex items-center gap-2">
                    <CirclePlusIcon size={36} color="var(--color-base-input)" strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                    <CirclePlayIcon size={36} color="var(--color-base-input)" strokeWidth={1.5} className="cursor-pointer hover:scale-110 transition-transform" />
                </div>

            </main>
        </div>
    )
}
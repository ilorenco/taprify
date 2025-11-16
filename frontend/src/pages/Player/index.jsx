import { CirclePlusIcon } from 'lucide-react';
import { PlayerControls } from './components/PlayerControls';
import { ProgressBar } from './components/ProgressBar';

export function Player() {
    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full h-full items-center justify-center px-4 md:px-6 py-6">
            {/* Capa do álbum */}
            <div className="w-[250px] h-[250px] md:w-[290px] md:h-[290px] lg:w-[350px] lg:h-[350px] bg-purple-ultra-violet rounded-2xl shadow-lg"></div>

            {/* Informações da música */}
            <div className="flex items-center justify-between w-full max-w-md md:max-w-lg">
                <div className="flex flex-col gap-1 flex-1">
                    <h1 className="font-bold text-base-card text-xl md:text-2xl truncate">Nome da música</h1>
                    <h2 className="font-medium text-base-input text-sm md:text-base truncate">Nome do autor</h2>
                </div>
                <CirclePlusIcon
                    size={36}
                    color="var(--color-base-input)"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform shrink-0 ml-4"
                />
            </div>

            {/* Barra de progresso */}
            <div className="w-full max-w-md md:max-w-lg">
                <ProgressBar />
            </div>

            {/* Controles do player */}
            <PlayerControls />
        </div>
    )
}
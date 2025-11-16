export function ProgressBar() {
    return (
        <div className="flex flex-col gap-2 w-full">
            {/* Barra de progresso */}
            <div className="relative w-full h-2 bg-base-input rounded-full">
                {/* Progresso preenchido - por enquanto fixo em 30% */}
                <div
                    className="absolute top-0 left-0 h-full bg-purple-ultra-violet rounded-full"
                    style={{ width: '30%' }}
                />
            </div>

            {/* Tempo atual e duração total */}
            <div className="flex justify-between items-center text-sm text-base-input font-medium">
                <span>0:00</span>
                <span>3:45</span>
            </div>
        </div>
    );
}

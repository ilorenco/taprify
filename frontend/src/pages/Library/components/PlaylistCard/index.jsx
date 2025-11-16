export function PlaylistCard() {
    return (
        <div>
            <div className="w-full h-[72px] rounded-lg flex items-center gap-2">
                <div className="w-[72px] h-[72px] bg-purple-ultra-violet rounded-lg"></div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-purple-royalty text-lg truncate">Nome da playlist</h1>
                    <div className="flex items-center gap-2">
                        <h2 className="font-medium text-base-card text-base">Autor</h2>
                        <span className="text-base-card text-base"> - </span>
                        <h2 className="font-medium text-base-card text-base">000 músicas</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}
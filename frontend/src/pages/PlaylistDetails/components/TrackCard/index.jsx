import { EllipsisVerticalIcon } from "lucide-react"

export function TrackCard() {
    return (
        <div className="flex items-center justify-between">
            <div className="w-full h-[72px] rounded-lg flex items-center gap-2">
                <div className="w-[72px] h-[72px] bg-purple-ultra-violet rounded-lg"></div>
                <div className="flex flex-col gap-1">
                    <h1 className="font-semibold text-purple-royalty text-lg truncate">Nome da música</h1>
                    <h2 className="font-medium text-base-card text-base">Autor</h2>
                </div>
            </div>
            <div>
                <EllipsisVerticalIcon size={30} color="var(--color-base-input)" strokeWidth={2} className="cursor-pointer" />
            </div>
        </div>
    )
}
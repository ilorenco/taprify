import { RepeatIcon, SkipBackIcon, CirclePlayIcon, SkipForwardIcon, ShuffleIcon  } from "lucide-react"

export function PlayerControls() {
    return (
        <div className="flex items-center gap-4 md:gap-6">
            <RepeatIcon
                size={28}
                color="var(--color-base-input)"
                strokeWidth={2}
                className="cursor-pointer hover:scale-110 transition-transform md:w-8 md:h-8"
            />
            <SkipBackIcon
                size={36}
                color="var(--color-base-input)"
                strokeWidth={2}
                className="cursor-pointer hover:scale-110 transition-transform md:w-[42px] md:h-[42px]"
            />
            <CirclePlayIcon
                size={60}
                color="var(--color-base-input)"
                strokeWidth={2}
                className="cursor-pointer hover:scale-110 transition-transform md:w-[70px] md:h-[70px]"
            />
            <SkipForwardIcon
                size={36}
                color="var(--color-base-input)"
                strokeWidth={2}
                className="cursor-pointer hover:scale-110 transition-transform md:w-[42px] md:h-[42px]"
            />
            <ShuffleIcon
                size={28}
                color="var(--color-base-input)"
                strokeWidth={2}
                className="cursor-pointer hover:scale-110 transition-transform md:w-8 md:h-8"
            />
        </div>
    )
}
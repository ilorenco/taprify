import { RepeatIcon, SkipBackIcon, CirclePlayIcon, CirclePauseIcon, SkipForwardIcon, ShuffleIcon  } from "lucide-react"
import { usePlayer } from "../../../../contexts/PlayerContext"

export function PlayerControls() {
    const { isPlaying, togglePlayPause } = usePlayer();

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
            {isPlaying ? (
                <CirclePauseIcon
                    size={60}
                    color="var(--color-base-input)"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform md:w-[70px] md:h-[70px]"
                    onClick={togglePlayPause}
                />
            ) : (
                <CirclePlayIcon
                    size={60}
                    color="var(--color-base-input)"
                    strokeWidth={2}
                    className="cursor-pointer hover:scale-110 transition-transform md:w-[70px] md:h-[70px]"
                    onClick={togglePlayPause}
                />
            )}
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
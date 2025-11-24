import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { EllipsisVerticalIcon, Pencil, Trash2 } from "lucide-react";
import { OverflowMenu } from "../../../../components/commons/OverflowMenu";

export function PlaylistCard({ playlist, onEdit, onDelete }) {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
    const buttonRef = useRef(null);

    const handleCardClick = () => {
        if (playlist?.id) {
            navigate(`/my-playlist/${playlist.id}`);
        }
    };

    const handleMenuClick = (e) => {
        e.stopPropagation();

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setMenuPosition({
                top: rect.top,
                right: window.innerWidth - rect.right,
            });
        }

        setIsMenuOpen(!isMenuOpen);
    };

    const menuOptions = [
        {
            icon: <Pencil size={16} />,
            label: "Editar",
            onClick: () => {
                setIsMenuOpen(false);
                onEdit(playlist);
            },
            className: "text-white"
        },
        {
            icon: <Trash2 size={16} />,
            label: "Excluir",
            onClick: () => {
                setIsMenuOpen(false);
                onDelete(playlist);
            },
            className: "text-red-500"
        }
    ];

    return (
        <div className="relative">
            <div
                onClick={handleCardClick}
                className="w-full h-[72px] rounded-lg flex items-center gap-2 cursor-pointer hover:bg-purple-ultra-violet/10 transition-colors p-2"
            >
                <div className="w-[72px] h-[72px] bg-purple-ultra-violet rounded-lg shrink-0"></div>
                <div className="flex items-center justify-between w-full">
                    <div className="flex flex-col gap-1 min-w-0">
                        <h1 className="font-semibold text-purple-royalty text-lg truncate">{playlist.name}</h1>
                        <div className="flex items-center gap-2">
                            <h2 className="font-medium text-base-card text-base">{playlist.creatorName}</h2>
                            <span className="text-base-card text-base"> - </span>
                            <h2 className="font-medium text-base-card text-base">{playlist.trackCount} {playlist.trackCount === 1 ? 'música' : 'músicas'}</h2>
                        </div>
                    </div>
                    <div ref={buttonRef}>
                        <EllipsisVerticalIcon
                            size={30}
                            color="var(--color-base-input)"
                            strokeWidth={2}
                            className="cursor-pointer"
                            onClick={handleMenuClick}
                        />
                    </div>
                </div>
            </div>

            <OverflowMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                options={menuOptions}
                position={menuPosition}
            />
        </div>
    );
}
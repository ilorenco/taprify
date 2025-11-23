import { useEffect, useRef } from 'react';

export function OverflowMenu({ isOpen, onClose, options, position }) {
    const menuRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            ref={menuRef}
            className="fixed bg-background rounded-lg shadow-lg border border-purple-ultra-violet/20 z-50 py-2 w-40"
            style={{
                top: position.top,
                right: position.right,
            }}
        >
            {options.map((option, index) => (
                <button
                    key={index}
                    onClick={option.onClick}
                    className={`w-full px-4 py-2 text-left hover:bg-purple-ultra-violet/20 transition-colors flex items-center gap-3 ${option.className || 'text-white'}`}
                >
                    {option.icon}
                    <span>{option.label}</span>
                </button>
            ))}
        </div>
    );
}

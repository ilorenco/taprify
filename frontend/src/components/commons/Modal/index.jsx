import { useEffect, useRef } from 'react';

export function Modal({ isOpen, onClose, title, children, actions }) {
    const modalRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
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
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-md z-50 px-4">
            <div ref={modalRef} className="bg-background p-6 sm:p-7 md:p-8 rounded-[20px] flex flex-col gap-4 sm:gap-5 md:gap-6 w-full max-w-[514px]">
                <h2 className="text-purple-light font-bold text-lg sm:text-xl md:text-2xl font-inter">
                    {title}
                </h2>

                <div className="flex flex-col gap-3 sm:gap-4">
                    {children}
                </div>

                {actions && (
                    <div className="flex gap-3 sm:gap-4 justify-end">
                        {actions}
                    </div>
                )}
            </div>
        </div>
    );
}

export function FilterTabs({ children, isActive }) {
    return (
        <button
            className={`rounded-xl font-inter font-bold text-sm px-3 py-1 text-base-button hover:cursor-pointer ${isActive ? 'bg-blue-light' : 'bg-purple-royalty'}`}
            style={isActive ? { backgroundColor: 'var(--color-blue-sky)' } : {}}
        >
            {children}
        </button>
    );
}
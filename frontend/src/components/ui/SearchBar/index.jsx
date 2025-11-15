import { SearchIcon } from 'lucide-react';

export function SearchBar({ placeholder }) {
    return (
        <div className="relative w-full">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-base-card" size={26} strokeWidth={2} />
            <input
                type="text"
                className="bg-purple-ultra-violet rounded-lg p-3 pl-12 outline-none focus:ring-3 text-base text-base-card focus:ring-purple-dark placeholder:text-base placeholder:text-base-card placeholder:font-medium w-full font-medium"
                placeholder={placeholder}
            />
        </div>
    )
}
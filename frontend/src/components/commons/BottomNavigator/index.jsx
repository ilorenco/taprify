import { HomeIcon, SearchIcon, LibraryBigIcon, CirclePlusIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function BottomNavigator() {
    return (
        <div className="fixed bottom-0 left-0 right-0 bg-purple-darker w-full h-16 flex items-center justify-center gap-12">
            <Link to="/">
                <HomeIcon size={32} color="white" strokeWidth={2} />
            </Link>
            <Link to="/search">
                <SearchIcon size={32} color="white" strokeWidth={2} />
            </Link>
            <Link to="/library">
                <LibraryBigIcon size={32} color="white" strokeWidth={2} />
            </Link>

            <CirclePlusIcon size={32} color="white" strokeWidth={2} />
        </div>
    )
}
import { useLocation, useNavigate } from 'react-router-dom';
import { CircleUserIcon, ArrowLeftIcon, LogOutIcon } from 'lucide-react';
import { FilterTabs } from './components/FilterTabs';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

export function Header() {
    const location = useLocation();
    const navigate = useNavigate();
    const { logout } = useAuth();
    const isSearchPage = location.pathname === '/search';
    const isLibraryOrPlaylistDetailsPage =
        location.pathname === '/library' ||
        location.pathname.startsWith('/playlist/') ||
        location.pathname.startsWith('/my-playlist/') ||
        location.pathname === '/player';
    const isProfilePage = location.pathname === '/profile';

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <div className="flex items-center justify-between py-6 px-6 bg-background">
            {isSearchPage ? (
                <h1 className="text-2xl font-bold text-blue-light">Pesquisar</h1>
            ) : isLibraryOrPlaylistDetailsPage || isProfilePage ? (
                <button onClick={handleGoBack} className="flex items-center gap-2">
                    <ArrowLeftIcon size={24} color="var(--color-base-input)" strokeWidth={1.5} className="cursor-pointer" />
                    <h1 className="text-lg font-bold text-base-input hover:cursor-pointer">Voltar</h1>
                </button>
            ) : (
                <div className="flex gap-4">
                    <FilterTabs isActive={location.pathname === '/'}>Tudo</FilterTabs>
                </div>
            )}

            {isProfilePage ? (
                <LogOutIcon 
                    size={42} 
                    color="var(--color-purple-royalty)" 
                    strokeWidth={2} 
                    className="cursor-pointer" 
                    onClick={logout}
                />
            ) : (
                <Link to="/profile">
                    <CircleUserIcon size={42} color="var(--color-purple-royalty)" strokeWidth={1.5} className="cursor-pointer" />
                </Link>
            )}
        </div>
    )
}
import { useLocation } from 'react-router-dom';
import { CircleUserIcon } from 'lucide-react';
import { FilterTabs } from './components/FilterTabs';

export function Header() {
    const location = useLocation();
    const isSearchPage = location.pathname === '/search';

    return (
        <div className="flex items-center justify-between py-6 px-6">
            {isSearchPage ? (
                <h1 className="text-2xl font-bold text-blue-light">Pesquisar</h1>
            ) : (
                <div className="flex gap-4">
                    <FilterTabs>Artistas</FilterTabs>
                    <FilterTabs>Álbuns</FilterTabs>
                    <FilterTabs>Tudo</FilterTabs>
                </div>
            )}

            <CircleUserIcon size={42} color="var(--color-purple-royalty)" strokeWidth={1.5} />
        </div>
    )
}
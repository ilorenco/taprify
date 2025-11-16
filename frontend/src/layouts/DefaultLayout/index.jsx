import { Outlet } from 'react-router-dom';
import { BottomNavigator } from '../../components/commons/BottomNavigator';
import { Header } from '../../components/commons/Header';

export function DefaultLayout() {
    return (
        <div className="flex flex-col h-screen">
            {/* Header fixo no topo */}
            <div className="sticky top-0 z-50 bg-background">
                <Header />
            </div>

            {/* Conteúdo scrollable com padding no final para não ficar escondido atrás do BottomNavigator */}
            <div className="flex-1 overflow-y-auto pb-16">
                <Outlet />
            </div>

            {/* Bottom Navigator fixo no rodapé */}
            <BottomNavigator />
        </div>
    );
}
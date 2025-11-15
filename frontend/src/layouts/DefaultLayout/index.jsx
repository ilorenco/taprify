import { Outlet } from 'react-router-dom';
import { BottomNavigator } from '../../components/commons/BottomNavigator';
import { Header } from '../../components/commons/Header';

export function DefaultLayout() {
    return (
        <div className="min-h-screen pb-16">
            <Header />
            <Outlet />
            <BottomNavigator />
        </div>
    );
}
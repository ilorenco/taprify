import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';

export function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PlayerProvider>
                    <Router />
                </PlayerProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}
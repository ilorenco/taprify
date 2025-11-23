import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export function PrivateRoute({ children }) {
    const { isAuthenticated, loading } = useAuth();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-base-input text-xl">Carregando...</p>
            </div>
        );
    }

    return isAuthenticated() ? children : <Navigate to="/login" replace />;
}
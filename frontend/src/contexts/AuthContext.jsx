/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import { decodeToken } from '../utils/jwtDecode';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const getUserFromToken = (token) => {
        const decoded = decodeToken(token);
        if (decoded) {
            return {
                token,
                name: decoded.name,
                email: decoded.email,
                id: decoded.sub,
            };
        }
        return null;
    };

    useEffect(() => {
        const token = authService.getToken();
        if (token) {
            const userData = getUserFromToken(token);
            setUser(userData);
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        setLoading(true);
        const result = await authService.login(email, password);
        setLoading(false);

        if (result.success) {
            const userData = getUserFromToken(result.token);
            setUser(userData);
            navigate('/');
            return { success: true };
        }

        return { success: false, error: result.error };
    };

    const register = async (name, email, password) => {
        setLoading(true);
        const result = await authService.register(name, email, password);
        setLoading(false);

        if (result.success) {
            return { success: true };
        }

        return { success: false, error: result.error };
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        navigate('/login');
    };

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                register,
                logout,
                isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

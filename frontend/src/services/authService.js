import api from './api';

export const authService = {
    async login(email, password) {
        try {
            const response = await api.post('/auth/login', {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);

            return { success: true, token };
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.';
            return { success: false, error: message };
        }
    },

    async register(name, email, password) {
        try {
            const response = await api.post('/auth/register', {
                name,
                email,
                password,
            });

            return { success: true, user: response.data };
        } catch (error) {
            const message = error.response?.data?.message || 'Erro ao criar conta. Tente novamente.';
            return { success: false, error: message };
        }
    },

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    },

    getToken() {
        return localStorage.getItem('token');
    },

    isAuthenticated() {
        return !!this.getToken();
    },
};

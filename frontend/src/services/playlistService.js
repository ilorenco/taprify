import axios from 'axios';

const playlistApi = axios.create({
    baseURL: import.meta.env.VITE_PLAYLIST_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

playlistApi.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

playlistApi.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

const playlistService = {
    async getMyPlaylists() {
        try {
            const response = await playlistApi.get('/playlists');
            return { success: true, playlists: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar playlists'
            };
        }
    },

    async getPlaylistById(id) {
        try {
            const response = await playlistApi.get(`/playlists/${id}`);
            return { success: true, playlist: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar playlist'
            };
        }
    },

    async createPlaylist(name) {
        try {
            const response = await playlistApi.post('/playlists', { name });
            return { success: true, playlist: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao criar playlist'
            };
        }
    },

    async updatePlaylist(id, name) {
        try {
            const response = await playlistApi.put(`/playlists/${id}`, { name });
            return { success: true, playlist: response.data };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao atualizar playlist'
            };
        }
    },

    async deletePlaylist(id) {
        try {
            await playlistApi.delete(`/playlists/${id}`);
            return { success: true };
        } catch (error) {
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao deletar playlist'
            };
        }
    }
};

export default playlistService;

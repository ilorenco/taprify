import axios from 'axios';

const spotifyApi = axios.create({
    baseURL: import.meta.env.VITE_SPOTIFY_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

const spotifyService = {
    async getAlbums() {
        try {
            const response = await spotifyApi.get('/albums');
            return { success: true, albums: response.data };
        } catch (error) {
            console.error('Error fetching albums from Spotify:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar álbuns do Spotify'
            };
        }
    },

    async getTracks() {
        try {
            const response = await spotifyApi.get('/tracks');
            return { success: true, tracks: response.data };
        } catch (error) {
            console.error('Error fetching tracks from Spotify:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar músicas do Spotify'
            };
        }
    },

    async getAlbumRecommendations() {
        try {
            const response = await spotifyApi.get('/albums/recommendations');
            return { success: true, albums: response.data };
        } catch (error) {
            console.error('Error fetching album recommendations from Spotify:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar recomendações de álbuns'
            };
        }
    },

    async getNewReleases() {
        try {
            const response = await spotifyApi.get('/albums/new-releases');
            return { success: true, albums: response.data };
        } catch (error) {
            console.error('Error fetching new releases from Spotify:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar novos lançamentos'
            };
        }
    },

    async getAlbumDetails(albumId) {
        try {
            const response = await spotifyApi.get(`/albums/${albumId}`);
            return { success: true, album: response.data };
        } catch (error) {
            console.error('Error fetching album details from Spotify:', error);
            return {
                success: false,
                error: error.response?.data?.message || 'Erro ao carregar detalhes do álbum'
            };
        }
    }
};

export default spotifyService;

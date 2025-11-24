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
    }
};

export default spotifyService;

import { useState, useEffect } from 'react';
import { SearchBar } from '../../components/ui/SearchBar';
import { AlbumCard } from '../../components/commons/Cards/AlbumCard';
import { GenreCard } from '../../components/commons/Cards/GenreCard';
import spotifyService from '../../services/spotifyService';

export function Search() {
    const [albums, setAlbums] = useState([]);
    const [loadingAlbums, setLoadingAlbums] = useState(true);

    useEffect(() => {
        async function loadRecommendations() {
            try {
                const result = await spotifyService.getAlbumRecommendations();
                if (result.success) {
                    setAlbums(result.albums);
                } else {
                    console.error('Failed to load album recommendations:', result.error);
                }
            } catch (error) {
                console.error('Error loading album recommendations:', error);
            } finally {
                setLoadingAlbums(false);
            }
        }

        loadRecommendations();
    }, []);

    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4">
            <SearchBar placeholder="Pesquisar música ou artista" />

            { /* TODO: Implementar biblioteca de carrosel para essa seção */ }
            <section className="flex flex-col gap-4">
                <h2 className="font-semibold text-base-card text-lg md:text-xl">Recomendações para você</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {loadingAlbums ? (
                        <p className="text-base-card">Carregando álbuns...</p>
                    ) : albums.length > 0 ? (
                        albums.map((album) => (
                            <AlbumCard key={album.id} album={album} />
                        ))
                    ) : (
                        <p className="text-base-card">Nenhum álbum disponível</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-4">
                <h2 className="font-semibold text-base-card text-lg md:text-xl">Procure por gêneros musicais</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    <GenreCard />
                    <GenreCard />
                    <GenreCard />
                    <GenreCard />
                    <GenreCard />
                    <GenreCard />
                </div>
            </section>
        </div>
    )
}
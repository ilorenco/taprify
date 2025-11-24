import { useState, useEffect } from 'react';
import { SearchBar } from '../../components/ui/SearchBar';
import { AlbumCard } from '../../components/commons/Cards/AlbumCard';
import { AlbumCardSkeleton } from '../../components/commons/Cards/AlbumCard/Skeleton';
import spotifyService from '../../services/spotifyService';

export function Search() {
    const [albums, setAlbums] = useState([]);
    const [loadingAlbums, setLoadingAlbums] = useState(true);
    const [newReleases, setNewReleases] = useState([]);
    const [loadingNewReleases, setLoadingNewReleases] = useState(true);

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

    useEffect(() => {
        async function loadNewReleases() {
            try {
                const result = await spotifyService.getNewReleases();
                if (result.success) {
                    setNewReleases(result.albums);
                } else {
                    console.error('Failed to load new releases:', result.error);
                }
            } catch (error) {
                console.error('Error loading new releases:', error);
            } finally {
                setLoadingNewReleases(false);
            }
        }

        loadNewReleases();
    }, []);

    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4 pb-28">
            { /* TODO: Implementar biblioteca de carrosel para essa seção */ }
            <section className="flex flex-col gap-4">
                <h2 className="font-semibold text-base-card text-lg md:text-xl">Recomendações para você</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    {loadingAlbums ? (
                        // Mostra 8 skeletons durante o carregamento
                        Array.from({ length: 8 }).map((_, index) => (
                            <AlbumCardSkeleton key={`album-skeleton-${index}`} />
                        ))
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
                <h2 className="font-semibold text-base-card text-lg md:text-xl">Novos Lançamentos</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {loadingNewReleases ? (
                        // Mostra 12 skeletons durante o carregamento
                        Array.from({ length: 12 }).map((_, index) => (
                            <AlbumCardSkeleton key={`new-release-skeleton-${index}`} variant="grid" />
                        ))
                    ) : newReleases.length > 0 ? (
                        newReleases.map((album) => (
                            <AlbumCard key={album.id} album={album} variant="grid" />
                        ))
                    ) : (
                        <p className="text-base-card">Nenhum lançamento disponível</p>
                    )}
                </div>
            </section>
        </div>
    )
}
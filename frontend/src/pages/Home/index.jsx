import { useEffect, useState } from 'react';
import { AlbumTile } from './components/AlbumTile';
import { AlbumTileSkeleton } from './components/AlbumTile/Skeleton';
import { TrackPlayerCard } from './components/TrackPlayerCard';
import { TrackPlayerCardSkeleton } from './components/TrackPlayerCard/Skeleton';
import spotifyService from '../../services/spotifyService';

export function Home() {
    const [albums, setAlbums] = useState([]);
    const [tracks, setTracks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadData() {
            try {
                const [albumsResult, tracksResult] = await Promise.all([
                    spotifyService.getAlbums(),
                    spotifyService.getTracks()
                ]);

                if (albumsResult.success) {
                    setAlbums(albumsResult.albums);
                } else {
                    console.error('Erro ao carregar álbuns:', albumsResult.error);
                }

                if (tracksResult.success) {
                    setTracks(tracksResult.tracks);
                } else {
                    console.error('Erro ao carregar tracks:', tracksResult.error);
                }
            } catch (error) {
                console.error('Erro ao carregar dados:', error);
            } finally {
                setLoading(false);
            }
        }

        loadData();
    }, []);

    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4 pb-20 max-w-7xl mx-auto">
            <section className="flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    {loading ? (
                        // Mostra 12 skeletons durante o carregamento
                        Array.from({ length: 12 }).map((_, index) => (
                            <AlbumTileSkeleton key={`album-skeleton-${index}`} />
                        ))
                    ) : albums.length > 0 ? (
                        albums.map((album) => (
                            <AlbumTile key={album.id} album={album} />
                        ))
                    ) : (
                        <p className="text-base-card">Nenhum álbum encontrado</p>
                    )}
                </div>
            </section>

            <section className="flex flex-col gap-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    {loading ? (
                        // Mostra 6 skeletons durante o carregamento
                        Array.from({ length: 6 }).map((_, index) => (
                            <TrackPlayerCardSkeleton key={`track-skeleton-${index}`} />
                        ))
                    ) : tracks.length > 0 ? (
                        tracks.map((track) => (
                            <TrackPlayerCard key={track.id} track={track} />
                        ))
                    ) : (
                        <p className="text-base-card">Nenhuma música encontrada</p>
                    )}
                </div>
            </section>
        </div>
    )
}
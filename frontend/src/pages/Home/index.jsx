import { AlbumTile } from './components/AlbumTile';
import { TrackPlayerCard } from './components/TrackPlayerCard';

export function Home() {
    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4 max-w-7xl mx-auto ">
            <section className="flex flex-col gap-4">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 md:gap-4">
                    <AlbumTile />
                    <AlbumTile />
                    <AlbumTile />
                    <AlbumTile />
                    <AlbumTile />
                    <AlbumTile />
                </div>
            </section>

            <section className="flex flex-col gap-4 ">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                    <TrackPlayerCard />
                </div>
            </section>
        </div>
    )
}
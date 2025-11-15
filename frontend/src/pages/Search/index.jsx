import { SearchBar } from '../../components/ui/SearchBar';
import { AlbumCard } from '../../components/commons/Cards/AlbumCard';
import { GenreCard } from '../../components/commons/Cards/GenreCard';

export function Search() {
    return (
        <div className="flex flex-col gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4">
            <SearchBar placeholder="Pesquisar música ou artista" />

            { /* TODO: Implementar biblioteca de carrosel para essa seção */ }
            <section className="flex flex-col gap-4">
                <h2 className="font-semibold text-base-card text-lg md:text-xl">Recomendações para você</h2>
                <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-2">
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
                    <AlbumCard />
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
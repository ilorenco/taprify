import NotFoundImage from '../../assets/404.svg'
import { Link } from 'react-router-dom';

export function NotFound() {
    return (
        <div className="flex flex-col text-center items-center justify-center h-screen gap-6 md:gap-8 px-4 md:px-6 lg:px-8 max-w-3xl mx-auto">
            <img
                src={NotFoundImage}
                alt="Página não encontrada"
                className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56"
            />
            <h1 className="text-2xl font-bold text-blue-light">Página não encontrada</h1>
            <p className="text-lg sm:text-xl md:text-2xl font-bold text-blue-light leading-relaxed">
                Parece que você se perdeu… essa página não existe mais (ou nunca existiu).
            </p>
            <Link
                to="/"
                className="bg-purple font-bold text-lg sm:text-xl md:text-2xl text-base-input rounded-lg p-3 my-4 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg"
            >
                Voltar para a página inicial
            </Link>
        </div>
    )
}
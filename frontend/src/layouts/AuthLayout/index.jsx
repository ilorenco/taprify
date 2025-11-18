import TaprifyLogo from '../../assets/taprify-logo.svg';

export function AuthLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-6 md:gap-10 px-4 md:px-6 py-8">
            <img src={TaprifyLogo} className="w-32 md:w-40 lg:w-48" />
            <div className="w-full max-w-md">
                {children}
            </div>
        </div>
    );
}
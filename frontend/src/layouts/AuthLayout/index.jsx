import TaprifyLogo from '../../assets/taprify-logo.svg';

export function AuthLayout({ children }) {
    return (
        <div className="flex flex-col items-center justify-center h-screen gap-10">
            <img src={TaprifyLogo} />
            {children}
        </div>
    );
}
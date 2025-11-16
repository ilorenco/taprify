import { CircleUserIcon, ChartColumnBigIcon, SettingsIcon, ShieldUserIcon, InfoIcon, FileTextIcon } from 'lucide-react';
import { SettingsItem } from './components/SettingsItem';
import { Link } from 'react-router-dom';

export function Profile() {
    return (
        <div className="flex flex-col items-center justify-center gap-6 md:gap-8 w-full px-4 md:px-6 lg:px-8 py-4 md:py-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center justify-center gap-4 md:gap-6">
                <CircleUserIcon
                    size={100}
                    color="var(--color-purple-royalty)"
                    strokeWidth={1.5}
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36"
                />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-base-card">Nome Completo</h1>
            </div>
            <Link to="/not-found" className="flex flex-col gap-3 md:gap-4 py-4 md:py-6 w-full max-w-md">
                <SettingsItem label="Configurações da conta" icon={SettingsIcon} />
                <SettingsItem label="Estatísticas" icon={ChartColumnBigIcon} />
                <SettingsItem label="Privacidade" icon={ShieldUserIcon} />
                <SettingsItem label="Sobre" icon={InfoIcon} />
                <SettingsItem label="Termos de uso" icon={FileTextIcon} />
            </Link>
        </div>
    );
}
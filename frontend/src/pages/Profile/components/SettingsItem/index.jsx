import { ChevronRightIcon } from 'lucide-react';

export function SettingsItem({ label, icon: Icon }) {
    return (
        <div className="flex items-center gap-6 justify-between">
            {Icon && (
                <Icon size={55} color="black" strokeWidth={2} className="bg-purple-light rounded-full p-2" />
            )}
            <h1 className="text-lg font-bold text-base-input">{label}</h1>
            <ChevronRightIcon size={45} color="var(--color-purple)" strokeWidth={1.5} />
        </div>
    )
}
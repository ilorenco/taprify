import { TextInput } from '../../../../components/ui/TextInput';
import { MailIcon, LockKeyholeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export function LoginForm() {
    return (
        <div className="flex flex-col gap-4 w-full px-6">
            <h1 className="text-2xl font-bold text-base-input">Faça seu login</h1>
            <form className="flex flex-col items-center justify-center gap-4">
                <TextInput placeholder="Email" icon={MailIcon} />
                <TextInput placeholder="Senha" icon={LockKeyholeIcon} />
                <button type="submit" className="bg-purple font-bold text-2xl text-base-input rounded-lg p-3 my-4 w-56">
                    ENTRAR
                </button>
            </form>
            <hr className="w-full border-base-input border-t-2" />
            <p className="text-base-input text-center text-lg">
                Não possui conta? <Link to="/register" className="underline">Cadastre-se!</Link>
            </p>
        </div>
    );
}
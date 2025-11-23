import { useState } from 'react';
import { TextInput } from '../../../../components/ui/TextInput';
import { MailIcon, LockKeyholeIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

export function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, loading } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!email || !password) {
            setError('Preencha todos os campos');
            return;
        }

        const result = await login(email, password);

        if (!result.success) {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-xl md:text-2xl font-bold text-base-input">Faça seu login</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <TextInput
                    placeholder="Email"
                    icon={MailIcon}
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError('');
                    }}
                />
                <TextInput
                    placeholder="Senha"
                    icon={LockKeyholeIcon}
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        setError('');
                    }}
                />
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-purple font-bold text-lg md:text-2xl text-base-input rounded-lg p-3 my-4 w-full max-w-xs disabled:opacity-50 hover:cursor-pointer"
                >
                    {loading ? 'ENTRANDO...' : 'ENTRAR'}
                </button>
            </form>
            <hr className="w-full border-base-input border-t-2" />
            <p className="text-base-input text-center text-base md:text-lg">
                Não possui conta? <Link to="/register" className="underline">Cadastre-se!</Link>
            </p>
        </div>
    );
}
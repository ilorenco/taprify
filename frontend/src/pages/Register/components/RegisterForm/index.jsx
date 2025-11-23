import { useState } from 'react';
import { TextInput } from '../../../../components/ui/TextInput';
import { MailIcon, LockKeyholeIcon, UserIcon } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../../../contexts/AuthContext';

export function RegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const { register, loading } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!name || !email || !password || !confirmPassword) {
            setError('Preencha todos os campos');
            return;
        }

        if (password.length < 8) {
            setError('A senha deve ter no mínimo 8 caracteres');
            return;
        }

        if (password !== confirmPassword) {
            setError('As senhas não coincidem');
            return;
        }

        const result = await register(name, email, password);

        if (result.success) {
            navigate('/login');
        } else {
            setError(result.error);
        }
    };

    return (
        <div className="flex flex-col gap-4 w-full">
            <h1 className="text-xl md:text-2xl font-bold text-base-input">Faça seu cadastro</h1>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <TextInput
                    placeholder="Nome"
                    icon={UserIcon}
                    type="text"
                    name="name"
                    value={name}
                    onChange={(e) => {
                        setName(e.target.value);
                        setError('');
                    }}
                />
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
                <TextInput
                    placeholder="Confirmar Senha"
                    icon={LockKeyholeIcon}
                    type="password"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                        setConfirmPassword(e.target.value);
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
                    {loading ? 'CADASTRANDO...' : 'CADASTRAR'}
                </button>
            </form>
            <hr className="w-full border-base-input border-t-2" />
            <p className="text-base-input text-center text-base md:text-lg">
                Já possui conta? <Link to="/login" className="underline">Faça login!</Link>
            </p>
        </div>
    );
}
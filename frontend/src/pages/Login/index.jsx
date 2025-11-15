import { AuthLayout } from '../../layouts/AuthLayout';
import { LoginForm } from './components/LoginForm';

export function Login() {
    return (
        <AuthLayout>
            <LoginForm />
        </AuthLayout>
    );
}
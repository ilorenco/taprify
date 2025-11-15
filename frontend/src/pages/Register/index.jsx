import { AuthLayout } from '../../layouts/AuthLayout';
import { RegisterForm } from './components/RegisterForm';

export function Register() {
    return (
        <AuthLayout>
            <RegisterForm />
        </AuthLayout>
    );
}
import { jwtDecode } from 'jwt-decode';

export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch (error) {
        console.error('Erro ao decodificar token:', error);
        return null;
    }
}
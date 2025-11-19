import {apiClient} from '@/lib/apiClient';

export interface LoginPayload {
    email: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: number;
        email: string;
        full_name: string;
        role: string;
    };
    tokens: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: LoginResponse;
    errors?: unknown;
}

export const authService = {
    async login(payload: LoginPayload): Promise<LoginResponse> {
        try {
            const {data} = await apiClient.post<LoginResponse>('/auth/login', payload);
            return data;
        } catch (err: any) {
            // Ambil message dari response.data jika ada
            console.error(err.message);
            if (err?.message) {
                throw new Error(err?.message);
            }
            throw err; // fallback
        }
    },
    async logout(): Promise<void> {
        if (typeof document !== 'undefined') {
            document.cookie = 'DAMANICH_AUTH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
            document.cookie = 'DAMANICH_REFRESH_TOKEN=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        }
    },
};
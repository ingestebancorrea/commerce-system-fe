import { ApiResponse } from "../api/api.interfaces";

export interface AuthState {
    status: 'checking' | 'authenticated' | 'not-authenticated';
    id: string | null;
    name: string | null;
    token: string | null;
    rol: string | null;
    errorMessage: string | null;
}

export interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface LoginResponse extends ApiResponse {
    message: string;
    token: string;
    user: User;
}

export interface RenewTokenResponse {
    message: string;
    token: string;
    user: User;
    role: string;
}
import type { AppRole } from 'commun/securite/mapRole';

export interface IAccount {
    id: string;
    username: string;
    role: AppRole;
    activated: boolean;
}

export interface ICreateAccountRequest {
    username: string;
    password: string;
    role: AppRole;
}

export interface IUpdateAccountRequest {
    role: AppRole;
    activated: boolean;
}

export interface IResetPasswordRequest {
    password: string;
}

export interface IRoleReference {
    id: string;
    code: string;
    libelle: string;
}

export interface IAccount {
    id: string;
    username: string;
    role: IRoleReference;
    activated: boolean;
}

export interface ICreateAccountRequest {
    username: string;
    password: string;
    role: string;
}

export interface IUpdateAccountRequest {
    role: string;
    activated: boolean;
}

export interface IResetPasswordRequest {
    password: string;
}

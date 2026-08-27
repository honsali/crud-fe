import { IReference } from 'modele/commun/reference/DomaineReference';

export interface IAccount {
    id: string;
    idAccount: string;
    username: string;
    role: IReference;
    activated: boolean;
}

export interface ICreateAccountRequest {
    username: string;
    password: string;
    role: IReference;
}

export interface IUpdateAccountRequest {
    role: IReference;
    activated: boolean;
}

export interface IResetPasswordRequest {
    password: string;
}

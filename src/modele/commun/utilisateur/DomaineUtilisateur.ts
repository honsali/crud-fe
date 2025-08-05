import { IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IUtilisateur {
    idUtilisateur?: string;
    id?: number;
    login?: string;
    etat?: boolean;
}

export interface IRequeteUtilisateur extends IUtilisateur, IPagination { }
export interface IListePagineeUtilisateur {
    liste: IUtilisateur[];
    pagination: IPagination;
}

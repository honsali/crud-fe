import { IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IDepartement {
    id?: string;
    idDepartement?: string;
    version?: number;
    nom?: string;
    description?: string;
}

export interface ICreateDepartementForm {
    nom: string;
    description?: string;
}

export interface ICreateDepartementRequest {
    nom: string;
    description?: string;
}

export interface IRequeteDepartement extends IDepartement, IPagination { }
export interface IListePagineeDepartement {
    liste?: IDepartement[];
    pagination?: IPagination;
}

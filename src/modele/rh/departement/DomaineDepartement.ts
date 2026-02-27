import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IDepartement {
    id?: string;
    idDepartement?: string;
    nom?: string;
    description?: string;
}

export interface IRequeteDepartement extends IDepartement, IPagination { }
export interface IListePagineeDepartement {
    liste?: IDepartement[];
    pagination?: IPagination;
}
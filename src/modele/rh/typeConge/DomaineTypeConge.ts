import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface ITypeConge {
    id?: string;
    idTypeConge?: string;
    libelle?: string;
    code?: string;
}

export interface IRequeteTypeConge extends ITypeConge, IPagination { }
export interface IListePagineeTypeConge {
    liste?: ITypeConge[];
    pagination?: IPagination;
}
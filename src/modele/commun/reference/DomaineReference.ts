import { IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IReference {
    id?: string;
    idReference?: string;
    libelle?: string;
    code?: string;
    reference?: string;
    arg?: string;
}

export interface IRequeteReference extends IReference, IPagination { }
export interface IListePagineeReference {
    liste?: IReference[];
    pagination?: IPagination;
}
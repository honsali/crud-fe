import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IReference } from 'modele/commun/reference/DomaineReference';

export interface IConge {
    id?: string;
    idConge?: string;
    version?: number;
    code?: string;
    typeConge?: IReference;
    dateDebutConge?: string;
    dateFinConge?: string;
    commentaire?: string;
    employe?: IReference;
}

export interface IRequeteConge extends IConge, IPagination { }
export interface IListePagineeConge {
    liste?: IConge[];
    pagination?: IPagination;
}

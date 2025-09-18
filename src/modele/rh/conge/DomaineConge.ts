import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { ITypeConge } from 'modele/rh/typeConge/DomaineTypeConge';

export interface IConge {
    id?: string;
    idConge?: string;
    code?: string;
    typeConge?: ITypeConge;
    dateDebutConge?: string;
    dateFinConge?: string;
    commentaire?: string;
    employe?: IEmploye;
}

export interface IRequeteConge extends IConge, IPagination { }
export interface IListePagineeConge {
    liste?: IConge[];
    pagination?: IPagination;
}
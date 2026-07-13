import { IPagination } from 'modele/commun/pagination/DomainePagination';

export interface ISexe {
    id?: string;
    idSexe?: string;
    libelle?: string;
    code?: string;
}

export interface IRequeteSexe extends ISexe, IPagination { }
export interface IListePagineeSexe {
    liste?: ISexe[];
    pagination?: IPagination;
}
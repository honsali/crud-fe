import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IFieldType {
    id?: string;
    idFieldType?: string;
    libelle?: string;
    code?: string;
}

export interface IRequeteFieldType extends IFieldType, IPagination { }
export interface IListePagineeFieldType {
    liste?: IFieldType[];
    pagination?: IPagination;
}
import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IActionPage {
    id?: string;
    idActionPage?: string;
    libelle?: string;
    code?: string;
}

export interface IRequeteActionPage extends IActionPage, IPagination { }
export interface IListePagineeActionPage {
    liste?: IActionPage[];
    pagination?: IPagination;
}
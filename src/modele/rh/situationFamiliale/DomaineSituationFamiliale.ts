import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface ISituationFamiliale {
    id?: string;
    idSituationFamiliale?: string;
    libelle?: string;
    code?: string;
}

export interface IRequeteSituationFamiliale extends ISituationFamiliale, IPagination { }
export interface IListePagineeSituationFamiliale {
    liste?: ISituationFamiliale[];
    pagination?: IPagination;
}
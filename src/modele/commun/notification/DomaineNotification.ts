import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IReference } from 'modele/commun/reference/DomaineReference';

export interface INotification {
    id?: string;
    idNotification?: string;
    message?: string;
    utilisateur?: string;
    active?: boolean;
    typeNotification?: IReference;
    dateCreation?: string;
    emetteur?: string;
}

export interface IRequeteNotification extends INotification, IPagination { }
export interface IListePagineeNotification {
    liste?: INotification[];
    pagination?: IPagination;
}

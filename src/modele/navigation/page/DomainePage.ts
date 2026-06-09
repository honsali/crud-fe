import { type IPagination } from 'modele/commun/pagination/DomainePagination';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IActionPage } from 'modele/navigation/actionPage/DomaineActionPage';

export interface IPage {
    id?: string;
    idPage?: string;
    name?: string;
    uc?: string;
    action?: IActionPage;
    path?: string;
    entity?: IEntity;
}

export interface IRequetePage extends IPage, IPagination { }
export interface IListePagineePage {
    liste?: IPage[];
    pagination?: IPagination;
}
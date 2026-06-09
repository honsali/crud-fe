import { type IPagination } from 'modele/commun/pagination/DomainePagination';
import { type IModule } from 'modele/modelisation/module/DomaineModule';

export interface IEntity {
    id?: string;
    idEntity?: string;
    name?: string;
    reference?: boolean;
    module?: IModule;
}

export interface IRequeteEntity extends IEntity, IPagination { }
export interface IListePagineeEntity {
    liste?: IEntity[];
    pagination?: IPagination;
}
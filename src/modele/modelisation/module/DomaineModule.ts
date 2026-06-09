import { type IPagination } from 'modele/commun/pagination/DomainePagination';

export interface IModule {
    id?: string;
    idModule?: string;
    name?: string;
    module?: IModule;
}

export interface IRequeteModule extends IModule, IPagination { }
export interface IListePagineeModule {
    liste?: IModule[];
    pagination?: IPagination;
}
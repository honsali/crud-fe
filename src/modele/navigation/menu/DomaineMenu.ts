import { type IPagination } from 'modele/commun/pagination/DomainePagination';
import { type IPage } from 'modele/navigation/page/DomainePage';

export interface IMenu {
    id?: string;
    idMenu?: string;
    name?: string;
    label?: string;
    icon?: string;
    page?: IPage;
    menu?: IMenu;
}

export interface IRequeteMenu extends IMenu, IPagination { }
export interface IListePagineeMenu {
    liste?: IMenu[];
    pagination?: IPagination;
}
import { IPagination, Pageable } from './DomainePagination';

const NOMBRE_LIGNE_PAR_PAGE_PAR_DEFAUT = 10;


const creerPageable = function (pagination: IPagination): Pageable {
    const pageable = {} as Pageable;
    pageable.currentPage = pagination?.pageCourante;
    pageable.sizePage = NOMBRE_LIGNE_PAR_PAGE_PAR_DEFAUT;

    return pageable;
};


const MapperPagination = {
    creerPageable,
};

export default MapperPagination;

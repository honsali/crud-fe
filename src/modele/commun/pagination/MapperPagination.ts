import { type IPagination, PageResponse, Pageable } from './DomainePagination';

const NOMBRE_LIGNE_PAR_PAGE_PAR_DEFAUT = 10;

const creerPageable = (pageCourante: number): Pageable => {
    return {
        page: Math.max(0, pageCourante ? pageCourante - 1 : 0),
        size: NOMBRE_LIGNE_PAR_PAGE_PAR_DEFAUT
    };
};

const creerPagination = <T>(page: PageResponse<T>): IPagination => {
    return {
        pageCourante: page?.page + 1,
        nombreLigneParPage: page?.size,
        nombreTotalDeLigne: page?.totalElements
    };
};

const MapperPagination = {
    creerPageable,
    creerPagination,
};

export default MapperPagination;

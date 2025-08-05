export interface ISort {
    unsorted?: boolean;
    sorted?: boolean;
    empty?: boolean;
}

export interface IPagination {
    pageCourante?: number;
    nombreLigneParPage?: number;
    nombreTotalDeLigne?: number;
}

export interface Pageable {
    page?: number;
    size?: number;
    currentPage?: number;
    sizePage?: number;
}
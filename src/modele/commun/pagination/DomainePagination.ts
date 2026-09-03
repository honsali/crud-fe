export interface IPagination {
    pageCourante?: number;
    nombreLigneParPage?: number;
    nombreTotalDeLigne?: number;
}

export interface PageResponse<T> {
    items: T[];
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    first: boolean;
    last: boolean;
}

export interface Pageable {
    page: number; // zero-based page index
    size: number; // number of elements per page
}

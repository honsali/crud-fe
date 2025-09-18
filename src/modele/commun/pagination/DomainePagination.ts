export interface IPagination {
    pageCourante?: number;
    nombreLigneParPage?: number;
    nombreTotalDeLigne?: number;
}

export interface Page<T> {
    content: T[];
    totalElements: number;
    totalPages: number;
    size: number;
    number: number;              // current page index (0-based)
    numberOfElements: number;
    first: boolean;
    last: boolean;
}

export interface Pageable {
    page: number; // zero-based page index
    size: number; // number of elements per page
}
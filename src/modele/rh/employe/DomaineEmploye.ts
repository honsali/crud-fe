import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IReference } from 'modele/commun/reference/DomaineReference';

export interface IEmploye {
    id?: string;
    idEmploye?: string;
    version?: number;
    matricule?: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    debutDateNaissance?: string;
    finDateNaissance?: string;
    sexe?: IReference;
    situationFamiliale?: IReference;
    dateEntree?: string;
    debutDateEntree?: string;
    finDateEntree?: string;
    email?: string;
    telephone?: string;
    ville?: string;
    adresse?: string;
    fonction?: string;
    description?: string;
    departement?: IReference;
}

export interface IRequeteEmploye extends IEmploye, IPagination { }
export interface IListePagineeEmploye {
    liste?: IEmploye[];
    pagination?: IPagination;
}

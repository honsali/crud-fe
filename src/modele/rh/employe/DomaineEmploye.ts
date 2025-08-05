import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';

export interface IEmploye {
    id?: string;
    idEmploye?: string;
    matricule?: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    dateEntree?: string;
    email?: string;
    telephone?: string;
    ville?: string;
    adresse?: string;
    fonction?: string;
    description?: string;
    departement?: IDepartement;
}

export interface IRequeteEmploye extends IEmploye, IPagination { }
export interface IListePagineeEmploye {
    liste?: IEmploye[];
    pagination?: IPagination;
}
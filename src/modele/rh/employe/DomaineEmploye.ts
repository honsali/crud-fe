import { IPagination } from 'modele/commun/pagination/DomainePagination';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { ISexe } from 'modele/rh/sexe/DomaineSexe';
import { ISituationFamiliale } from 'modele/rh/situationFamiliale/DomaineSituationFamiliale';

export interface IEmploye {
    id?: string;
    idEmploye?: string;
    matricule?: string;
    nom?: string;
    prenom?: string;
    dateNaissance?: string;
    debutDateNaissance?: string;
    finDateNaissance?: string;
    sexe?: ISexe;
    situationFamiliale?: ISituationFamiliale;
    dateEntree?: string;
    debutDateEntree?: string;
    finDateEntree?: string;
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
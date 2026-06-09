import { type IPagination } from 'modele/commun/pagination/DomainePagination';
import { type IEntity } from 'modele/modelisation/entity/DomaineEntity';
import { type IFieldType } from 'modele/modelisation/fieldType/DomaineFieldType';

export interface IField {
    id?: string;
    idField?: string;
    name?: string;
    required?: boolean;
    uniq?: boolean;
    isIdField?: boolean;
    refEntity?: IEntity;
    fieldType?: IFieldType;
    entity?: IEntity;
}

export interface IRequeteField extends IField, IPagination { }
export interface IListePagineeField {
    liste?: IField[];
    pagination?: IPagination;
}
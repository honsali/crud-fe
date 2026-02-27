import axios from 'axios';
import { API_URL } from 'commun';
import { Page } from 'modele/commun/pagination/DomainePagination';
import MapperPagination from 'modele/commun/pagination/MapperPagination';
import { type IEmploye, type IListePagineeEmploye } from './DomaineEmploye';


const creer = async (employe: IEmploye) => {
    const { data } = await axios.post(`${API_URL}/employe`, employe);
    return data;
};

const filtrer = async (employe: IEmploye, pageCourante = 0): Promise<IListePagineeEmploye> => {
    const pageable = MapperPagination.creerPageable(pageCourante);
    const { data } = await axios.post<Page<IEmploye>>(`${API_URL}/employe/filtrer`, employe, { params: { page: pageable.page, size: pageable.size } });
    return {
        liste: data.content,
        pagination: MapperPagination.creerPagination<IEmploye>(data),
    };
};

const maj = async (employe: IEmploye) => {
    const { data } = await axios.put(`${API_URL}/employe/${employe.id}`, employe);
    return data;
};

const recupererParId = async (idEmploye: string) => {
    const { data } = await axios.get<IEmploye>(`${API_URL}/employe/${idEmploye}`);
    return data;
};

const supprimer = async (idEmploye: string) => {
    await axios.delete(`${API_URL}/employe/${idEmploye}`);
};

const ServiceEmploye = {
    creer,
    filtrer,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceEmploye;
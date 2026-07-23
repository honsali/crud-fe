import axios from 'axios';
import { API_URL } from 'commun';
import { Page } from 'modele/commun/pagination/DomainePagination';
import MapperPagination from 'modele/commun/pagination/MapperPagination';
import { IEmploye } from './DomaineEmploye';


const creer = async (employe: IEmploye) => {
    const { data } = await axios.post<IEmploye>(`${API_URL}/rh/employe`, employe);
    return data;
};

const filtrer = async (employe: IEmploye, pageCourante = 0) => {
    const pageable = MapperPagination.creerPageable(pageCourante);
    const { data } = await axios.post<Page<IEmploye>>(`${API_URL}/rh/employe/filtrer`, employe, { params: { page: pageable.page, size: pageable.size } });
    return {
        liste: data.content,
        pagination: MapperPagination.creerPagination<IEmploye>(data),
    };
};

const maj = async (employe: IEmploye) => {
    const { data } = await axios.put<IEmploye>(`${API_URL}/rh/employe/${employe.id}`, employe);
    return data;
};

const recupererParId = async (idEmploye: string) => {
    const { data } = await axios.get<IEmploye>(`${API_URL}/rh/employe/${idEmploye}`);
    return data;
};

const supprimer = async (idEmploye: string) => {
    await axios.delete(`${API_URL}/rh/employe/${idEmploye}`);
};

const ServiceEmploye = {
    creer,
    filtrer,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceEmploye;

import axios from 'axios';
import { API_URL } from 'commun';
import { PageResponse } from 'modele/commun/pagination/DomainePagination';
import MapperPagination from 'modele/commun/pagination/MapperPagination';
import { IEmploye } from './DomaineEmploye';


const creer = async (employe: IEmploye) => {
    const { data } = await axios.post<IEmploye>(`${API_URL}/rh/employes`, employe);
    return data;
};

const filtrer = async (employe: IEmploye, pageCourante = 0) => {
    const pageable = MapperPagination.creerPageable(pageCourante);
    const { data } = await axios.post<PageResponse<IEmploye>>(`${API_URL}/rh/employes/filtrer`, employe, { params: { page: pageable.page, size: pageable.size } });
    return {
        liste: data.items,
        pagination: MapperPagination.creerPagination<IEmploye>(data),
    };
};

const maj = async (employe: IEmploye) => {
    const { data } = await axios.put<IEmploye>(`${API_URL}/rh/employes/${employe.id}`, employe);
    return data;
};

const recupererParId = async (idEmploye: string) => {
    const { data } = await axios.get<IEmploye>(`${API_URL}/rh/employes/${idEmploye}`);
    return data;
};

const supprimer = async (idEmploye: string) => {
    await axios.delete(`${API_URL}/rh/employes/${idEmploye}`);
};

const ServiceEmploye = {
    creer,
    filtrer,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceEmploye;

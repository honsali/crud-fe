import axios from 'axios';
import { API_URL } from 'commun';
import { IDepartement } from './DomaineDepartement';


const creer = async (departement: IDepartement) => {
    const { data } = await axios.post(`${API_URL}/departement`, departement);
    return data;
};

const lister = async () => {
    const listeDepartement: IDepartement[] = (await axios.get<IDepartement[]>(`${API_URL}/departement`)).data;
    return listeDepartement;
};

const maj = async (departement: IDepartement) => {
    const { data } = await axios.put(`${API_URL}/departement/${departement.id}`, departement);
    return data;
};

const recupererParId = async (idDepartement: string) => {
    const { data } = await axios.get<IDepartement>(`${API_URL}/departement/${idDepartement}`);
    return data;
};

const supprimer = async (idDepartement: string) => {
    await axios.delete(`${API_URL}/departement/${idDepartement}`);
};

const ServiceDepartement = {
    creer,
    lister,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceDepartement;
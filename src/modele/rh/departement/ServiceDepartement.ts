import axios from 'axios';
import { API_URL } from 'commun';
import { IDepartement } from './DomaineDepartement';


const creer = async (departement: IDepartement) => {
    const { data } = await axios.post<IDepartement>(`${API_URL}/rh/departements`, departement);
    return data;
};

const lister = async () => {
    const { data } = await axios.get<IDepartement[]>(`${API_URL}/rh/departements`);
    return data;
};

const maj = async (departement: IDepartement) => {
    const { data } = await axios.put<IDepartement>(`${API_URL}/rh/departements/${departement.id}`, departement);
    return data;
};

const recupererParId = async (idDepartement: string) => {
    const { data } = await axios.get<IDepartement>(`${API_URL}/rh/departements/${idDepartement}`);
    return data;
};

const supprimer = async (idDepartement: string) => {
    await axios.delete(`${API_URL}/rh/departements/${idDepartement}`);
};

const ServiceDepartement = {
    creer,
    lister,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceDepartement;

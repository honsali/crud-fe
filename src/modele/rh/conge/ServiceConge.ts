import axios from 'axios';
import { API_URL } from 'commun';
import { type IConge } from './DomaineConge';


const creer = async (idEmploye: string, conge: IConge) => {
    const { data } = await axios.post(`${API_URL}/employe/${idEmploye}/conge`, conge);
    return data;
};

const listerParIdEmploye = async (idEmploye: string) => {
    const listeConge: IConge[] = (await axios.get<IConge[]>(`${API_URL}/employe/${idEmploye}/conge`)).data;
    return listeConge;
};

const maj = async (conge: IConge) => {
    const { data } = await axios.put(`${API_URL}/conge/${conge.id}`, conge);
    return data;
};

const recupererParId = async (idConge: string) => {
    const { data } = await axios.get<IConge>(`${API_URL}/conge/${idConge}`);
    return data;
};

const supprimer = async (idConge: string) => {
    await axios.delete(`${API_URL}/conge/${idConge}`);
};

const ServiceConge = {
    creer,
    listerParIdEmploye,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceConge;
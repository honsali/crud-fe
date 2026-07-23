import axios from 'axios';
import { API_URL } from 'commun';
import { IConge } from './DomaineConge';


const creer = async (idEmploye: string, conge: IConge) => {
    conge.code = `${idEmploye}-${conge.typeConge?.id}-${conge.dateDebutConge}`; // Temporary until leave-code ownership is decided.
    const { data } = await axios.post<IConge>(`${API_URL}/rh/employe/${idEmploye}/conge`, conge);
    return data;
};

const listerParIdEmploye = async (idEmploye: string) => {
    const { data } = await axios.get<IConge[]>(`${API_URL}/rh/conge/employe/${idEmploye}`);
    return data;
};

const maj = async (conge: IConge) => {
    conge.code = `${conge.employe?.id}-${conge.typeConge?.id}-${conge.dateDebutConge}`; // Temporary until leave-code ownership is decided.
    const { data } = await axios.put<IConge>(`${API_URL}/rh/conge/${conge.id}`, conge);
    return data;
};

const recupererParId = async (idConge: string) => {
    const { data } = await axios.get<IConge>(`${API_URL}/rh/conge/${idConge}`);
    return data;
};

const supprimer = async (idConge: string) => {
    await axios.delete(`${API_URL}/rh/conge/${idConge}`);
};

const ServiceConge = {
    creer,
    listerParIdEmploye,
    maj,
    recupererParId,
    supprimer,
};

export default ServiceConge;
import axios from 'axios';
import { API_URL } from 'commun';
import { IConge } from './DomaineConge';


const listerParIdEmploye = async (idEmploye: string, ) => {
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

const ServiceConge = {
    listerParIdEmploye,
    maj,
    recupererParId,
};

export default ServiceConge;
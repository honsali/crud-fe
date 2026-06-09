import axios from 'axios';
import { API_URL } from 'commun';
import { type IPage } from './DomainePage';


const creer = async (page: IPage) => {
    const { data } = await axios.post(`${API_URL}/page`, page);
    return data;
};

const lister = async () => {
    const listePage: IPage[] = (await axios.get<IPage[]>(`${API_URL}/page`)).data;
    return listePage;
};

const maj = async (page: IPage) => {
    const { data } = await axios.put(`${API_URL}/page/${page.id}`, page);
    return data;
};

const recupererParId = async (idPage: string) => {
    const { data } = await axios.get<IPage>(`${API_URL}/page/${idPage}`);
    return data;
};

const supprimer = async (idPage: string) => {
    await axios.delete(`${API_URL}/page/${idPage}`);
};

const ServicePage = {
    creer,
    lister,
    maj,
    recupererParId,
    supprimer,
};

export default ServicePage;
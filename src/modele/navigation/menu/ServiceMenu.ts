import axios from 'axios';
import { API_URL } from 'commun';
import { type IMenu } from './DomaineMenu';


const creer = async (idMenu: string, menu: IMenu) => {
    const { data } = await axios.post(`${API_URL}/menu/${idMenu}/menu`, menu);
    return data;
};

const lister = async () => {
    const listeMenu: IMenu[] = (await axios.get<IMenu[]>(`${API_URL}/menu`)).data;
    return listeMenu;
};

const maj = async (menu: IMenu) => {
    const { data } = await axios.put(`${API_URL}/menu/${menu.id}`, menu);
    return data;
};

const supprimer = async (idMenu: string) => {
    await axios.delete(`${API_URL}/menu/${idMenu}`);
};

const ServiceMenu = {
    creer,
    lister,
    maj,
    supprimer,
};

export default ServiceMenu;
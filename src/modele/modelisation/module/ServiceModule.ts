import axios from 'axios';
import { API_URL } from 'commun';
import { type IModule } from './DomaineModule';


const creer = async (idModule: string, module: IModule) => {
    const { data } = await axios.post(`${API_URL}/module/${idModule}/module`, module);
    return data;
};

const lister = async () => {
    const listeModule: IModule[] = (await axios.get<IModule[]>(`${API_URL}/module`)).data;
    return listeModule;
};

const maj = async (module: IModule) => {
    const { data } = await axios.put(`${API_URL}/module/${module.id}`, module);
    return data;
};

const supprimer = async (idModule: string) => {
    await axios.delete(`${API_URL}/module/${idModule}`);
};

const ServiceModule = {
    creer,
    lister,
    maj,
    supprimer,
};

export default ServiceModule;
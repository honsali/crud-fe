import axios from 'axios';
import { API_URL } from 'commun';
import { type IEntity } from './DomaineEntity';


const creer = async (entity: IEntity) => {
    const { data } = await axios.post(`${API_URL}/entity`, entity);
    return data;
};

const lister = async () => {
    const listeEntity: IEntity[] = (await axios.get<IEntity[]>(`${API_URL}/entity`)).data;
    return listeEntity;
};

const maj = async (entity: IEntity) => {
    const { data } = await axios.put(`${API_URL}/entity/${entity.id}`, entity);
    return data;
};

const supprimer = async (idEntity: string) => {
    await axios.delete(`${API_URL}/entity/${idEntity}`);
};

const ServiceEntity = {
    creer,
    lister,
    maj,
    supprimer,
};

export default ServiceEntity;
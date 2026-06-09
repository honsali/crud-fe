import axios from 'axios';
import { API_URL } from 'commun';
import { type IField } from './DomaineField';


const creer = async (idEntity: string, field: IField) => {
    const { data } = await axios.post(`${API_URL}/entity/${idEntity}/field`, field);
    return data;
};

const listerParIdEntity = async (idEntity: string) => {
    const listeField: IField[] = (await axios.get<IField[]>(`${API_URL}/entity/${idEntity}/field`)).data;
    return listeField;
};

const maj = async (field: IField) => {
    const { data } = await axios.put(`${API_URL}/field/${field.id}`, field);
    return data;
};

const supprimer = async (idField: string) => {
    await axios.delete(`${API_URL}/field/${idField}`);
};

const ServiceField = {
    creer,
    listerParIdEntity,
    maj,
    supprimer,
};

export default ServiceField;
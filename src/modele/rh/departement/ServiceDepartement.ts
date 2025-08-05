import axios from 'axios';
import { API_URL } from 'commun';
import { IDepartement } from './DomaineDepartement';

const resourceUri = API_URL + '/departement';

const creer = async (departement: IDepartement) => {
    return (await axios.post(`${resourceUri}`, departement)).data.id;
};

const enregistrer = async (departement: IDepartement) => {
    return (await axios.put(`${resourceUri}`, departement)).data;
};

const lister = async () => {
    const listeDepartement: IDepartement[] = (await axios.get<IDepartement[]>(`${resourceUri}/lister`)).data;
    return listeDepartement;
};

const recupererParId = async (idDepartement: string) => {
    const departement: IDepartement = (await axios.get<IDepartement>(`${resourceUri}/${idDepartement}`)).data;
    return departement;
};

const ServiceDepartement = {
    creer,
    enregistrer,
    lister,
    recupererParId,
};

export default ServiceDepartement;
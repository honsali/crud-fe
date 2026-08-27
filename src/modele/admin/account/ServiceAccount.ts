import axios from 'axios';
import { API_URL } from 'commun';
import { IAccount, ICreateAccountRequest, IResetPasswordRequest, IUpdateAccountRequest } from './DomaineAccount';

const resourceUri = `${API_URL}/admin/accounts`;

const creer = async (request: ICreateAccountRequest) => {
    const { data } = await axios.post<IAccount>(resourceUri, request);
    return data;
};

const lister = async () => {
    const { data } = await axios.get<IAccount[]>(resourceUri);
    return data;
};

const maj = async (id: string, request: IUpdateAccountRequest) => {
    const { data } = await axios.put<IAccount>(`${resourceUri}/${id}`, request);
    return data;
};

const recupererParId = async (id: string) => {
    const { data } = await axios.get<IAccount>(`${resourceUri}/${id}`);
    return data;
};

const reinitialiserMotDePasse = async (id: string, request: IResetPasswordRequest) => {
    await axios.put(`${resourceUri}/${id}/password`, request);
};

const ServiceAccount = {
    creer,
    lister,
    maj,
    recupererParId,
    reinitialiserMotDePasse,
};

export default ServiceAccount;

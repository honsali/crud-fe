import axios from 'axios';
import { API_URL } from 'commun';
import type { IAccount, ICreateAccountRequest, IResetPasswordRequest, IUpdateAccountRequest } from './DomaineAccount';

const resourceUri = `${API_URL}/admin/accounts`;

const lister = async (): Promise<IAccount[]> => {
    return (await axios.get<IAccount[]>(resourceUri)).data;
};

const creer = async (request: ICreateAccountRequest): Promise<IAccount> => {
    return (await axios.post<IAccount>(resourceUri, request)).data;
};

const maj = async (id: string, request: IUpdateAccountRequest): Promise<IAccount> => {
    return (await axios.put<IAccount>(`${resourceUri}/${id}`, request)).data;
};

const reinitialiserMotDePasse = async (id: string, request: IResetPasswordRequest): Promise<void> => {
    await axios.put(`${resourceUri}/${id}/password`, request);
};

const ServiceAccount = {
    lister,
    creer,
    maj,
    reinitialiserMotDePasse,
};

export default ServiceAccount;

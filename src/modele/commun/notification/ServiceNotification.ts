import { API_URL } from 'commun';
import { IListePagineeNotification } from './DomaineNotification';

const resourceUri = API_URL + '/notification';


const listerEnPage = async (utilisateur: string, pageCourante: number) => {
    const listePagineeNotification: IListePagineeNotification = {} as IListePagineeNotification;
    listePagineeNotification.liste = [];
    listePagineeNotification.pagination = { pageCourante: 0, nombreLigneParPage: 10 };
    return listePagineeNotification;
};


const ServiceNotification = {
    listerEnPage,
};

export default ServiceNotification;

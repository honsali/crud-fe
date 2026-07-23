import axios from 'axios';
import { API_URL } from 'commun';

const resourceUri = `${API_URL}/rh/reference`;

const lister = async (params: any) => {
    if (params?.arg && params?.argValue?.id != null) {
        return (await axios.get(`${resourceUri}/${params.reference}/${params.arg}.id/${params.argValue.id}`)).data;
    }
    return (await axios.get(`${resourceUri}/${params.reference}`)).data;
};

const ServiceReference = {
    lister,
};

export default ServiceReference;

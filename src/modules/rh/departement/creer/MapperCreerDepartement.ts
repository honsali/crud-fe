import { ICreateDepartementForm, ICreateDepartementRequest } from 'modele/rh/departement/DomaineDepartement';

const creerRequest = (form: ICreateDepartementForm): ICreateDepartementRequest => ({
    nom: form.nom,
    description: form.description,
});

const MapperCreerDepartement = {
    creerRequest,
};

export default MapperCreerDepartement;

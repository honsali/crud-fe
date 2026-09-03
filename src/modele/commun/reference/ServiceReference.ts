import axios from 'axios';
import { API_URL } from 'commun';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { IReference } from './DomaineReference';

interface ReferenceParams {
    reference?: string;
}

const referencesLocales: Record<string, IReference[]> = {
    sexe: [
        { id: '1', libelle: 'Masculin' },
        { id: '2', libelle: 'Féminin' },
    ],
    situationFamiliale: [
        { id: '1', libelle: 'Célibataire' },
        { id: '2', libelle: 'Marié' },
        { id: '3', libelle: 'Divorcé' },
        { id: '4', libelle: 'Veuf' },
    ],
    typeConge: [
        { id: '1', libelle: 'Maladie' },
        { id: '2', libelle: 'Payé' },
    ],
};

const lister = async ({ reference }: ReferenceParams): Promise<IReference[]> => {
    if (reference === 'departement') {
        const { data } = await axios.get<IDepartement[]>(`${API_URL}/rh/departements`);
        return data
            .filter((departement): departement is IDepartement & { id: string } => !!departement.id)
            .map((departement) => ({ id: departement.id, libelle: departement.nom }));
    }
    return reference ? [...(referencesLocales[reference] ?? [])] : [];
};

const ServiceReference = {
    lister,
};

export default ServiceReference;

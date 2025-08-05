import { IReference } from './DomaineReference';

const creerReference = (referentielRep: any): IReference => {
    const reference: IReference = {} as IReference;
    reference.id = referentielRep.id;
    reference.code = referentielRep.code;
    reference.libelle = referentielRep.libelle;
    return reference;
};

const creerListeReference = (listeReferentielRep: any[]): IReference[] => {
    const liste = [] as IReference[];
    listeReferentielRep.forEach((r) => {
        liste.push(creerReference(r));
    });
    return liste;
};


const MapperReference = {
    creerReference,
    creerListeReference,
};

export default MapperReference;

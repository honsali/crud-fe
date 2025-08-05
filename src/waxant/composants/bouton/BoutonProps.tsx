import { PageDefinition } from 'waxant/noyau/routes/PageDefinition';

export type BoutonProps = {
    nom?: string | null;
    contexte?: string;
    action?: (event?) => void | null;
    entite?: string | null;
    page?: PageDefinition | null;
    modele?: any | null;
    libelle?: string | null;
    icone?: React.ReactNode | null;
    inactif?: string | null;
    visible?: boolean;
    rid?: string | null;
    toolTip?: string | null;
    width?: number | string | null;
    couleur?: 'fort' | 'normal' | 'danger';
    forme?: 'contour' | 'plein' | 'lien' | 'simple';
    taille?: 'mini' | 'moyen' | 'large';
};

export default BoutonProps;

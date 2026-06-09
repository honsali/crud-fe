import { CSSProperties, ReactNode } from 'react';
import { IModele } from '../../noyau/domaine/modele';
import { PageDefinition } from '../../noyau/routes/PageDefinition';

export interface BoutonProps {
    nom?: string;
    contexte?: string;
    action?: (any?) => any | null;
    entite?: string | null;
    page?: PageDefinition | null;
    modele?: IModele | null;
    libelle?: string | null;
    icone?: ReactNode | undefined;
    inactif?: string | null;
    visible?: boolean;
    rid?: string | null;
    toolTip?: string | null;
    width?: number | string | null;
    forme?: 'icone' | 'texte';
    type?: 'fort' | 'normal' | 'danger' | 'alerte' | 'lien' | 'menuItem';
    taille?: 'mini' | 'moyen' | 'large';
    style?: CSSProperties;
    cote?: 'gauche' | 'droit';
};

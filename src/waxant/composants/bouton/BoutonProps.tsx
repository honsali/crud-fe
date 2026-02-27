import type { CSSProperties, ReactNode } from 'react';
import type { IModele } from 'waxant/noyau/domaine/modele';
import type { PageDefinition } from 'waxant/noyau/routes/PageDefinition';

export interface BoutonProps {
    nom?: string;
    contexte?: string;
    action?: (any?) => any | null;
    entite?: string | null;
    page?: PageDefinition | null;
    modele?: IModele | null;
    libelle?: string | null;
    icone?: ReactNode | null;
    inactif?: string | null;
    visible?: boolean;
    rid?: string | null;
    toolTip?: string | null;
    width?: number | string | null;
    forme?: 'icone' | 'texte';
    type?: 'fort' | 'normal' | 'danger' | 'alerte' | 'lien';
    taille?: 'mini' | 'moyen' | 'large';
    style?: CSSProperties;
    cote?: 'gauche' | 'droit';
};

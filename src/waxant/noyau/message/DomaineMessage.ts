export interface IInfoActionEchouee {
    code?: string;
    erreur?: string;
    status?: number;
    params?: any[];
    listeErreurServeur?: IErreurServeur[];
    listeErreurDirecte?: string[];
}

export interface IErreurServeur {
    code?: string;
    severity?: string;
    params?: any[];
    arguments?: string[];
    data?: any;
    libelle?: string;
}

export interface IMessageErreur {
    titre?: string;
    sousTitre?: string;
    listeErreur?: string[];
}

export interface IInfoActionReussie {
    key: string;
    id?: number;
    name?: string;
    data?: any;
    type?: string;
}

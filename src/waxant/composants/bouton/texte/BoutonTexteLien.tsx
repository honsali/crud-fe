import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonTexte from './BoutonTexte';

const BoutonTexteLien: React.FC<BoutonProps> = (props) => {

    return <BoutonTexte {...props} type='lien' />;
};

export default BoutonTexteLien;

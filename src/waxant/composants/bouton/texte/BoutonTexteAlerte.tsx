import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonTexte from './BoutonTexte';

const BoutonTexteAlerte: React.FC<BoutonProps> = (props) => {

    return <BoutonTexte {...props} type='alerte' />;
};

export default BoutonTexteAlerte;

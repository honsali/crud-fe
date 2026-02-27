import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonIcone from './BoutonIcone';

const BoutonIconeAlerte: React.FC<BoutonProps> = (props) => {

    return <BoutonIcone {...props} type='alerte' />;
};

export default BoutonIconeAlerte;

import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonTexte from './BoutonTexte';

const BoutonTexteDanger: React.FC<BoutonProps> = (props) => {

    return <BoutonTexte {...props} type='danger' />;
};

export default BoutonTexteDanger;

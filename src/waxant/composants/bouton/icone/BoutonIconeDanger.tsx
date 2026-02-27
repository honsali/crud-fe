import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonIcone from './BoutonIcone';

const BoutonIconeDanger: React.FC<BoutonProps> = (props) => {

    return <BoutonIcone {...props} type='danger' />;
};

export default BoutonIconeDanger;

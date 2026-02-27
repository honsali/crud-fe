import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonIcone from './BoutonIcone';

const BoutonIconeFort: React.FC<BoutonProps> = (props) => {

    return <BoutonIcone {...props} type='fort' />;
};

export default BoutonIconeFort;

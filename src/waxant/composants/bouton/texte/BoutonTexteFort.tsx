import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonTexte from './BoutonTexte';

const BoutonFort: React.FC<BoutonProps> = (props) => {

    return <BoutonTexte {...props} type='fort' />;
};

export default BoutonFort;

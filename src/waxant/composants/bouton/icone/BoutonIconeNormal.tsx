import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonIcone from './BoutonIcone';

const BoutonIconeNormal: React.FC<BoutonProps> = (props) => {

    return <BoutonIcone {...props} type='normal' />;
};

export default BoutonIconeNormal;

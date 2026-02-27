import React from 'react';
import type { BoutonProps } from '../BoutonProps';
import BoutonTexte from './BoutonTexte';

const BoutonTexteNormal: React.FC<BoutonProps> = (props) => {

    return <BoutonTexte {...props} type='normal' />;
};

export default BoutonTexteNormal;

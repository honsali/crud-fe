import useHasRight from '../../noyau/auth/useHasRight';
import { BoutonProps } from '../bouton/BoutonProps';
import BoutonTexteNormal from '../bouton/texte/BoutonTexteNormal';

const ActionUcNormale = (props: BoutonProps) => {
    const hasRight = useHasRight(props.nom);

    return <BoutonTexteNormal {...props} visible={hasRight} />;
};

export default ActionUcNormale;

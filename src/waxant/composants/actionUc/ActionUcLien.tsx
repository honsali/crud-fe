import useHasRight from '../../noyau/auth/useHasRight';
import { BoutonProps } from '../bouton/BoutonProps';
import BoutonTexteLien from '../bouton/texte/BoutonTexteLien';

const ActionUcLien = (props: BoutonProps) => {
    const hasRight = useHasRight(props.nom);

    return <BoutonTexteLien {...props} visible={hasRight} />;
};

export default ActionUcLien;

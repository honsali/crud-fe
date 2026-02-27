import useHasRight from 'waxant/noyau/auth/useHasRight';
import type { BoutonProps } from '../bouton/BoutonProps';
import BoutonTexteLien from '../bouton/texte/BoutonTexteLien';

const ActionUcLien = (props: BoutonProps) => {
    const hasRight = useHasRight(props.nom);

    return <BoutonTexteLien {...props} visible={hasRight} />;
};

export default ActionUcLien;

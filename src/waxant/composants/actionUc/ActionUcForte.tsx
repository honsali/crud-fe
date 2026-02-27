import useHasRight from 'waxant/noyau/auth/useHasRight';
import type { BoutonProps } from '../bouton/BoutonProps';
import BoutonFort from '../bouton/texte/BoutonTexteFort';

const ActionUcForte = (props: BoutonProps) => {
    const hasRight = useHasRight(props.nom);

    return <BoutonFort {...props} visible={hasRight} />;
};

export default ActionUcForte;

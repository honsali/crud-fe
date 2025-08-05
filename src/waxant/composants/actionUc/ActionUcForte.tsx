import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import BoutonSelonContexte from '../bouton/BoutonSelonContexte';
import { BoutonProps } from '../bouton/BoutonProps';

const ActionUcForte = (props: BoutonProps) => {
    const { uc } = useContexteView();
    const nomAction = `${uc}.action.${props.nom}${props.entite || ''}`;
    const nom = props.nom?.startsWith('Uc') ? props.nom : nomAction;
    const hasRight = useHasRight(nom);

    return <BoutonSelonContexte couleur="fort" {...props} nom={nom} visible={hasRight} />;
};

export default ActionUcForte;

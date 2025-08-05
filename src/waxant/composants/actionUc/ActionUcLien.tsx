import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import BoutonLien from '../bouton/BoutonLien';
import { BoutonProps } from '../bouton/BoutonProps';

const ActionUcLien = (props: BoutonProps) => {
    const { uc } = useContexteView();
    const nomAction = uc + '.action.' + (props.nom ? props.nom : props.page ? 'goto' + props.page.key : '') + (props.entite ? props.entite : '');
    const nom = props.nom?.startsWith('Uc') ? props.nom : nomAction;

    const hasRight = useHasRight(nom);

    return <BoutonLien {...props} nom={nom} visible={hasRight} />;
};

export default ActionUcLien;

import { EditFilled } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/BoutonIcone';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

const ActionTableauModifier = ({ typeEntite, action = null }) => {

    const { uc } = useContexteView();
    const nomAction = uc + '.action.modifier' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<EditFilled />} action={action} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauModifier;

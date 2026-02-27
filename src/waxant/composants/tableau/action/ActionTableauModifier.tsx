import { EditFilled } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/icone/BoutonIconeNormal';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

type ActionTableauModifierProps = {
    typeEntite: string;
    action?: ((event?: any) => void) | null;
};

const ActionTableauModifier = ({ typeEntite, action = null }: ActionTableauModifierProps) => {

    const { uc } = useContexteView();
    const nomAction = uc + '.action.modifier' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<EditFilled />} action={action ?? undefined} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauModifier;

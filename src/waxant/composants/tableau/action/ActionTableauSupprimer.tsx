import { DeleteOutlined } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/icone/BoutonIconeNormal';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

type ActionTableauSupprimerProps = {
    typeEntite: string;
    action?: ((event?: any) => void) | null;
};

const ActionTableauSupprimer = ({ typeEntite, action = null }: ActionTableauSupprimerProps) => {

    const { uc } = useContexteView();
    const nomAction = uc + '.action.supprimer' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<DeleteOutlined />} action={action ?? undefined} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauSupprimer;

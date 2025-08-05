import { DeleteOutlined } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/BoutonIcone';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

const ActionTableauSupprimer = ({ typeEntite, action = null }) => {

    const { uc } = useContexteView();
    const nomAction = uc + '.action.supprimer' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<DeleteOutlined />} action={action} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauSupprimer;

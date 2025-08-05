import { EyeFilled } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/BoutonIcone';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

const ActionTableauConsulter = ({ typeEntite, action = null }) => {
    const { uc } = useContexteView();
    const nomAction = uc + '.action.consulter' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<EyeFilled />} action={action} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauConsulter;

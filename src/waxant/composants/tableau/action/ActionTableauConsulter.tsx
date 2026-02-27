import { EyeFilled } from '@ant-design/icons';
import BoutonIcone from 'waxant/composants/bouton/icone/BoutonIconeNormal';
import useHasRight from 'waxant/noyau/auth/useHasRight';
import useContexteView from 'waxant/noyau/contexte/ContexteView';

type ActionTableauConsulterProps = {
    typeEntite: string;
    action?: ((event?: any) => void) | null;
};

const ActionTableauConsulter = ({ typeEntite, action = null }: ActionTableauConsulterProps) => {
    const { uc } = useContexteView();
    const nomAction = uc + '.action.consulter' + typeEntite;
    const hasRight = useHasRight(nomAction);
    return <BoutonIcone nom={nomAction} icone={<EyeFilled />} action={action ?? undefined} taille="mini" forme="simple" visible={hasRight} />;
};

export default ActionTableauConsulter;

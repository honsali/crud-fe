import useHasRight from '../../noyau/auth/useHasRight';
import BoutonNormal from './BoutonNormal';

const ActionNormale = (props) => {
    const hasRight = useHasRight(props.nom);
    return <BoutonNormal {...props} visible={hasRight} />;
};

export default ActionNormale;

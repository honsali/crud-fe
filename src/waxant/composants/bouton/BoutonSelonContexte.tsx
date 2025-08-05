import useContexteBouton from '../../noyau/contexte/ContexteBouton';
import Bouton from './Bouton';
import BoutonIcone from './BoutonIcone';
import BoutonIconeCadre from './BoutonIconeCadre';
import BoutonIconePanneau from './BoutonIconePanneau';
import BoutonIconePanneauFort from './BoutonIconePanneauFort';
import BoutonProps from './BoutonProps';

const BoutonSelonContexte = (props: BoutonProps) => {
    const { type, couleur, taille } = useContexteBouton();
    let newProps = { ...props, couleur, taille };
    if (type === 'tableau') {
        newProps = { ...newProps, width: '100%' };
    }
    if (type === 'IconeCadre') {
        return <BoutonIconeCadre {...props} />;
    } else if (type === 'IconePanneau') {
        return <BoutonIconePanneau {...props} />;
    } else if (type === 'IconePanneauFort') {
        return <BoutonIconePanneauFort {...props} />;
    } else if (type && type.indexOf('cone') > 0) {
        return <BoutonIcone {...newProps} />;
    } else {
        return <Bouton  {...newProps} />;
    }
};

export default BoutonSelonContexte;

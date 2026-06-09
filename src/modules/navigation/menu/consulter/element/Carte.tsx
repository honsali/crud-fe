import { Card, type CardProps } from 'antd';
import pageChercher from 'assets/images/pageChercher.png';
import pageConsulter from 'assets/images/pageConsulter.png';
import pageLister from 'assets/images/pageLister.png';
import pageOnglet from 'assets/images/pageOnglet.png';
import pageVide from 'assets/images/pageVide.png';
import { useI18n } from 'waxant';
import { useContextConsulterMenu } from '../ContextConsulterMenu';
import '../StyleConsulterMenu.css';
const imageMap = {
    'pageChercher': pageChercher,
    'pageConsulter': pageConsulter,
    'pageCreer': pageConsulter,
    'pageModifier': pageConsulter,
    'pageLister': pageLister,
    'pageOnglet': pageOnglet,
    'pageVide': pageVide

};
const Carte = ({ type }) => {
    const { i18n } = useI18n();
    const { carteCourante, setCarteCourante } = useContextConsulterMenu();
    const semanticClassNames: CardProps['classNames'] = {
        root: `carte${carteCourante === type ? '' : '-hoverable'}`,
        body: 'carte-body',
        title: 'carte-title'
    };

    const handleClick = () => {
        setCarteCourante(type);
    };



    if (carteCourante !== null && carteCourante !== type) return null;

    if (carteCourante === type) {
        <Card title={i18n(type)} variant="borderless" size="small" classNames={semanticClassNames}   >
            <img src={imageMap[type]} />
        </Card>
    }
    return (
        <Card title={i18n(type)} variant="borderless" hoverable size="small" classNames={semanticClassNames} onClick={handleClick} >
            <img src={imageMap[type]} />
        </Card>
    );
};

export default Carte;

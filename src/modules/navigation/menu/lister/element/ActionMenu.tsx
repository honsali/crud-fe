import { faFolderPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space } from 'antd';
import { BoutonIconeAlerte, BoutonIconeDanger, BoutonIconeNormal } from 'waxant';
import useListerMenu from '../useListerMenu';

const ActionMenu = ({ menu, onEdit }) => {
    const { creerMenu, supprimerMenu } = useListerMenu();

    const onClickEdit = (e) => {
        e.stopPropagation();
        onEdit?.();
    };

    const onAddMenu = (e, menu) => {
        e.stopPropagation();
        creerMenu({ menu: { name: 'nouveauMenu', label: 'Nouveau Menu', menu } });
    };


    const onRemove = (e, menu) => {
        e.stopPropagation();
        supprimerMenu({ idMenu: menu.id });
    };
    //
    return (
        <Space style={{ marginLeft: 16 }}>
            {menu.menu && <BoutonIconeAlerte nom="modifierMenu" action={onClickEdit} icone={<FontAwesomeIcon icon={faPen} />} taille="mini" />}
            <BoutonIconeNormal nom="ajouterSousMenu" action={(e) => onAddMenu(e, menu)} icone={<FontAwesomeIcon icon={faFolderPlus} />} taille="mini" />
            {menu.menu && <BoutonIconeDanger nom="supprimerMenu" action={(e) => onRemove(e, menu)} icone={<FontAwesomeIcon icon={faMinus} />} taille="mini" />}
        </Space>
    );
};

export default ActionMenu;
//
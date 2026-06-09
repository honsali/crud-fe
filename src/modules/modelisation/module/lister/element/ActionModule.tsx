import { faFileCirclePlus, faFolderPlus, faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space } from 'antd';
import { BoutonIconeAlerte, BoutonIconeDanger, BoutonIconeNormal } from 'waxant';
import useListerModule from '../useListerModule';

const ActionModule = ({ node, endChange, onEdit }) => {
    const { creerModule, creerEntity, supprimerModule } = useListerModule();

    const onClickEdit = (e) => {
        e.stopPropagation();
        onEdit?.();
    };

    const onAddModule = (e, node) => {
        e.stopPropagation();
        creerModule({ module: { name: 'Nouveau Module', module: { id: node.key.substring(7) } } });
        endChange();
    };

    const onAddEntity = (e, node) => {
        e.stopPropagation();
        creerEntity({ entity: { name: 'Nouvelle Entité', module: { id: node.key.substring(7) } } });
        endChange();
    };

    const onRemove = (e, node) => {
        e.stopPropagation();
        supprimerModule({ idModule: node.key?.substring(7) });
        endChange();
    };
    //
    return (
        <Space style={{ marginLeft: 16 }}>
            <BoutonIconeAlerte nom="modifierModule" action={onClickEdit} icone={<FontAwesomeIcon icon={faPen} />} taille="mini" />
            <BoutonIconeNormal nom="ajouterSousModule" action={(e) => onAddModule(e, node)} icone={<FontAwesomeIcon icon={faFolderPlus} />} taille="mini" />
            <BoutonIconeNormal nom="ajouterEntity" action={(e) => onAddEntity(e, node)} icone={<FontAwesomeIcon icon={faFileCirclePlus} />} taille="mini" />
            <BoutonIconeDanger nom="supprimerModule" action={(e) => onRemove(e, node)} icone={<FontAwesomeIcon icon={faMinus} />} taille="mini" inactif={node.children.length > 0 ? 'Module Non Vide' : null} />
        </Space>
    );
};

export default ActionModule;
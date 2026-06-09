import { faMinus, faPen } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Space } from 'antd';
import { BoutonIconeAlerte, BoutonIconeDanger } from 'waxant';
import useListerModule from '../useListerModule';

const ActionEntity = ({ node, endChange, onEdit }) => {
    const { supprimerEntity } = useListerModule();

    const onRemove = (e, node) => {
        e.stopPropagation();
        supprimerEntity({ idEntity: node.key.substring(7) });
        endChange();
    };

    //
    return (
        <Space style={{ marginLeft: 16 }}>
            <BoutonIconeAlerte nom="modifierEntity" action={onEdit} icone={<FontAwesomeIcon icon={faPen} />} taille="mini" type="alerte" />
            <BoutonIconeDanger nom="supprimerEntity" action={(e) => onRemove(e, node)} icone={<FontAwesomeIcon icon={faMinus} />} taille="mini" />
        </Space>
    );
};

export default ActionEntity;
import { DeleteOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcSupprimer = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="supprimer" icone={<DeleteOutlined />} {...props} />;
};

export default ActionUcSupprimer;

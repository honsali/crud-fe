import { DeleteOutlined } from '@ant-design/icons';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcSupprimer = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="supprimer" icone={<DeleteOutlined />} type="danger" cote='droit'  {...props} />;
};

export default ActionUcSupprimer;

import { CheckCircleOutlined } from '@ant-design/icons';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcAccepter = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="accepter" icone={<CheckCircleOutlined />} {...props} />;
};

export default ActionUcAccepter;

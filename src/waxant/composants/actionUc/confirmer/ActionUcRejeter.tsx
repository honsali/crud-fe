import { CloseCircleOutlined } from '@ant-design/icons';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcRejeter = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="rejeter" icone={<CloseCircleOutlined />} {...props} />;
};

export default ActionUcRejeter;

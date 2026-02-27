import { SaveOutlined } from '@ant-design/icons';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcCreer = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="creer" icone={<SaveOutlined />} {...props} />;
};

export default ActionUcCreer;

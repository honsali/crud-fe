import { LockOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcVerrouiller = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="verrouiller" icone={<LockOutlined />} {...props} />;
};

export default ActionUcVerrouiller;

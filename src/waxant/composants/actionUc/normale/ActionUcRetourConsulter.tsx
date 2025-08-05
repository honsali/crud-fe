import { RollbackOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcNormale from '../ActionUcNormale';

const ActionUcRetourConsulter = (props: BoutonProps) => {
    return <ActionUcNormale nom="retourConsulter" icone={<RollbackOutlined />} {...props} />;
};

export default ActionUcRetourConsulter;

import { EyeOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcForte from '../ActionUcForte';

const ActionUcConsulter = (props: BoutonProps) => {
    return <ActionUcForte nom="consulter" icone={<EyeOutlined />} {...props} />;
};

export default ActionUcConsulter;

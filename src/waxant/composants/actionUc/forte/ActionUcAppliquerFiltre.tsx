import { FilterOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcForte from '../ActionUcForte';

const ActionUcAppliquerFiltre = (props: BoutonProps) => {
    return <ActionUcForte nom="appliquerFiltre" icone={<FilterOutlined />} {...props} />;
};

export default ActionUcAppliquerFiltre;

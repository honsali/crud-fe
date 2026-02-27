import { FilterOutlined } from '@ant-design/icons';
import type { BoutonProps } from '../../bouton/BoutonProps';

import ActionUcForte from '../ActionUcForte';

const ActionUcModifierFiltre = (props: BoutonProps) => {
    return <ActionUcForte nom="modifierFiltre" icone={<FilterOutlined />} {...props} />;
};

export default ActionUcModifierFiltre;

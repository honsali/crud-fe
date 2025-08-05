import { PlusCircleFilled } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcForte from '../ActionUcForte';

const ActionUcAjouter = (props: BoutonProps) => {
    return <ActionUcForte nom="ajouter" icone={<PlusCircleFilled />} {...props} />;
};

export default ActionUcAjouter;

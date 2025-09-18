import { SaveOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcConfirmer from '../ActionUcConfirmer';

const ActionUcMaj = (props: BoutonProps) => {
    return <ActionUcConfirmer nom="enregistrer" icone={<SaveOutlined />} {...props} />;
};

export default ActionUcMaj;

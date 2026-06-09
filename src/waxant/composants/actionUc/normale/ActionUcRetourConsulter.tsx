import { RollbackOutlined } from '@ant-design/icons';
import BoutonTexteLien from '../../bouton/texte/BoutonTexteLien';
import { BoutonProps } from '../../bouton/BoutonProps';

const ActionUcRetourConsulter = (props: BoutonProps) => {
    return <BoutonTexteLien nom="retourConsulter" icone={<RollbackOutlined />} {...props} />;
};

export default ActionUcRetourConsulter;

import { RollbackOutlined } from '@ant-design/icons';
import BoutonTexteLien from 'waxant/composants/bouton/texte/BoutonTexteLien';
import type { BoutonProps } from '../../bouton/BoutonProps';


const ActionUcRetourConsulter = (props: BoutonProps) => {
    return <BoutonTexteLien nom="retourConsulter" icone={<RollbackOutlined />} {...props} />;
};

export default ActionUcRetourConsulter;

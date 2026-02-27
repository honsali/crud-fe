import { TableOutlined } from '@ant-design/icons';
import BoutonTexteLien from 'waxant/composants/bouton/texte/BoutonTexteLien';
import type { BoutonProps } from '../../bouton/BoutonProps';


const ActionUcRetourListe = (props: BoutonProps) => {
    return <BoutonTexteLien nom="retourListe" icone={<TableOutlined />} {...props} />;
};

export default ActionUcRetourListe;

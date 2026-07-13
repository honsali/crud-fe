import { TableOutlined } from '@ant-design/icons';
import BoutonTexteLien from '../../bouton/texte/BoutonTexteLien';
import { BoutonProps } from '../../bouton/BoutonProps';

const ActionUcRetourListe = (props: BoutonProps) => {
    return <BoutonTexteLien nom="retourListe" icone={<TableOutlined />} {...props} />;
};

export default ActionUcRetourListe;

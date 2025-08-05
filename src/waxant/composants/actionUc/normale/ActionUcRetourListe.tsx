import { TableOutlined } from '@ant-design/icons';
import { BoutonProps } from '../../bouton/BoutonProps';
import ActionUcNormale from '../ActionUcNormale';

const ActionUcRetourListe = (props: BoutonProps) => {
    return <ActionUcNormale nom={props.nom ? props.nom : 'retourListe'} icone={<TableOutlined />} {...props} />;
};

export default ActionUcRetourListe;

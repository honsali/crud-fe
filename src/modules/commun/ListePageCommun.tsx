import { SafetyCertificateOutlined } from '@ant-design/icons';
import { PageDefinition } from 'waxant';

export const PageCommun: PageDefinition = {
    key: 'PageCommun',
    path: '/commun',
    toPath: (args) => '/commun',
    icone: <SafetyCertificateOutlined />,
    view: (
        <div></div>
    ),
};


const ListePageCommun = [PageCommun];
export default ListePageCommun;

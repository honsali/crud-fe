import { faDiagramProject, faSitemap } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Layout, Space } from 'antd';
import { BoutonIconeAlerte } from 'waxant';
import useLayoutContext from './LayoutContext';
import BoutonLogout from './element/BoutonLogout';

const LayoutRightBar = () => {
    const { setEntiteOuvert, setModuleOuvert } = useLayoutContext();

    return (
        <Layout.Sider width={50} trigger={null} style={{ position: 'relative', minHeight: '100%', backgroundColor: '#fff', borderLeft: '1px solid #aaa', cursor: 'pointer' }}>
            <div style={{ margin: '10px' }}>
                <Space size="middle" orientation="vertical" >
                    <BoutonLogout />
                    <div style={{ marginTop: '5px', paddingTop: '5px', borderTop: '1px solid #aaa ' }} />
                    <BoutonIconeAlerte nom="modules" action={() => { setModuleOuvert(true) }} icone={<FontAwesomeIcon icon={faSitemap} />} />
                    <BoutonIconeAlerte nom="entites" action={() => { setEntiteOuvert(true) }} icone={<FontAwesomeIcon icon={faDiagramProject} />} />
                </Space>
            </div>
        </Layout.Sider>
    );
};

export default LayoutRightBar;

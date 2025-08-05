import { Layout, Space } from 'antd';
import BoutonLogout from './element/BoutonLogout';


const LayoutHeader = () => {
    return (
        <Layout.Header style={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: '#cccccc11', height: '54px' }}>
            <Space size="middle">
                <BoutonLogout />
            </Space>
        </Layout.Header>
    );
};

export default LayoutHeader; 

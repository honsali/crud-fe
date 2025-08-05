import { Layout } from 'antd';
import { BlocMenu } from 'waxant';
import BlocAvatar from './element/BlocAvatar';
import BoutonCollapse from './element/BoutonCollapse';
import Brand from './element/Brand';
import useLayoutContext from './LayoutContext';

const LayoutSidebar = () => {
    const { menuOuvert } = useLayoutContext();

    return (
        <Layout.Sider collapsible collapsed={!menuOuvert} width={270} trigger={null} style={{ position: 'relative', minHeight: '100%' }}>
            <Brand />
            <BlocAvatar />
            <BlocMenu ouvert={menuOuvert} />
            <BoutonCollapse />
        </Layout.Sider>
    );
};

export default LayoutSidebar;

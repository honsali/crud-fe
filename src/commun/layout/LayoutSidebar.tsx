import { Layout } from 'antd';
import ViewListerMenu from 'modules/navigation/menu/lister/ViewListerMenu';
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
            <ViewListerMenu />
            <BoutonCollapse />
        </Layout.Sider>
    );
};

export default LayoutSidebar;

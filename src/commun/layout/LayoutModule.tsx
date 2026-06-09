import { Drawer } from 'antd';
import ViewListerModule from 'modules/modelisation/module/lister/ViewListerModule';
import useLayoutContext from './LayoutContext';

const LayoutModule = () => {
    const { moduleOuvert, setModuleOuvert } = useLayoutContext();

    return (

        <Drawer
            title="Modules"
            closable={false}
            open={moduleOuvert}
            onClose={() => { setModuleOuvert(false) }}
            size={600}
            style={{ color: '#555' }}
        >
            <div><ViewListerModule /></div>
        </Drawer>
    );
};

export default LayoutModule;

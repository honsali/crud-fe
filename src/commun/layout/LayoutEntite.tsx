import { Drawer } from 'antd';
import useLayoutContext from './LayoutContext';

const LayoutEntite = () => {
    const { entiteOuvert, setEntiteOuvert } = useLayoutContext();

    return (

        <Drawer
            title="Entitées"
            closable={false}
            open={entiteOuvert}
            onClose={() => { setEntiteOuvert(false) }}
            size={600}
            style={{ color: '#555' }}
        >
            <div> </div>
        </Drawer>
    );
};

export default LayoutEntite;

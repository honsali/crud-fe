import { Form, Select } from 'antd';
import Definition from './Definition';

const DefinitionPageOnglet = () => {
    return (
        <Definition type="pageOnglet">
            <Form.Item label="Onglets" name="onglets">
                <Select mode="multiple" placeholder="Sélectionner les onglets" />
            </Form.Item>
        </Definition>
    );
};

export default DefinitionPageOnglet;

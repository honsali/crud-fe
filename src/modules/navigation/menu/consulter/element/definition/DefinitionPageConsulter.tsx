import { Form, Select } from 'antd';
import Definition from './Definition';

const DefinitionPageConsulter = () => {
    return (
        <Definition type="pageConsulter">
            <Form.Item label="Champs à afficher" name="champsAfficher">
                <Select mode="multiple" placeholder="Sélectionner les champs" />
            </Form.Item>
        </Definition>
    );
};

export default DefinitionPageConsulter;

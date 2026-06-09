import { Form, Select } from 'antd';
import Definition from './Definition';

const DefinitionPageChercher = () => {
    return (
        <Definition type="pageChercher">
            <Form.Item label="Champs de recherche" name="champsRecherche">
                <Select mode="multiple" placeholder="Sélectionner les champs" />
            </Form.Item>
        </Definition>
    );
};

export default DefinitionPageChercher;

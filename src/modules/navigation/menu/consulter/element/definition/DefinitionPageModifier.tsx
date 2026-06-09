import { Form, Select } from 'antd';
import Definition from './Definition';

const DefinitionPageModifier = () => {
    return (
        <Definition type="pageModifier">
            <Form.Item label="Champs modifiables" name="champsModifiables">
                <Select mode="multiple" placeholder="Sélectionner les champs" />
            </Form.Item>
        </Definition>
    );
};

export default DefinitionPageModifier;

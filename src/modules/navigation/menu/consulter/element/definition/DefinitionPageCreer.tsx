import { Form, Select } from 'antd';
import Definition from './Definition';

const DefinitionPageCreer = () => {
    return (
        <Definition type="pageCreer">
            <Form.Item label="Champs du formulaire" name="champsFormulaire">
                <Select mode="multiple" placeholder="Sélectionner les champs" />
            </Form.Item>
        </Definition>
    );
};

export default DefinitionPageCreer;

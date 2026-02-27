import { UploadOutlined } from '@ant-design/icons';
import { Form, Input, Upload, type UploadProps } from 'antd';
import { encode } from 'base-64';
import _ from 'lodash';
import { useContext, useEffect, useState } from 'react';
import BoutonTexteNormal from 'waxant/composants/bouton/texte/BoutonTexteNormal';
import FormulaireValidateur from '../FormulaireValidateur';

const ChampFichier = (props) => {
    const { form, attributes } = props;
    const [actionVisible, setActionVisible] = useState(true);
    const validateur = useContext(FormulaireValidateur);

    const newValue = Form.useWatch(attributes.name, form);

    useEffect(() => {
        if (!newValue) {
            setActionVisible(true);
        }
    }, [newValue]);

    const uprops: UploadProps = {
        beforeUpload(file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const result = e.target?.result;
                if (result == null) {
                    return;
                }
                if (_.isArray(attributes.name)) {
                    const v = {};
                    const d = {};
                    d[attributes.name[1]] = encode(result as string);
                    d[attributes.sname[1]] = file.name;
                    v[attributes.name[0]] = d;
                    form.setFieldsValue(v);
                } else {
                    const d = {};
                    d[attributes.sname] = file.name;
                    d[attributes.name] = encode(result as string);
                    form.setFieldsValue(d);
                }
            };
            reader.readAsBinaryString(file);
            return false;
        },
        onChange(info) {
            if (info.fileList.length < 1) {
                setActionVisible(true);
                if (_.isArray(attributes.name)) {
                    const v = {};
                    const d = {};
                    d[attributes.name[1]] = null;
                    d[attributes.sname[1]] = null;
                    v[attributes.name[0]] = d;
                    form.setFieldsValue(v);
                } else {
                    const d = {};
                    d[attributes.sname] = null;
                    d[attributes.name] = null;
                    form.setFieldsValue(d);
                }
            } else {
                setActionVisible(false);
            }
        },
        showUploadList: {
            showRemoveIcon: true,
        },
    };

    const getRules = () => {
        const n = _.isArray(props.attributes.name) ? _.join(props.attributes.sname, '.') : props.attributes.sname;
        if (props.attributes.requis || (validateur && validateur[n] && validateur[n].requis)) {
            return { required: true, message: props.attributes.label + ' est requis.', whitespace: true };
        }
        return { required: false };
    };

    return (
        <div>
            <Form.Item label={attributes.label} name={attributes.name} style={{ ...(props.attributes.style ?? {}) }}>
                <Upload {...uprops}>{actionVisible && <BoutonTexteNormal icone={<UploadOutlined />} libelle="Selectionner Document" />}</Upload>
            </Form.Item>
            <Form.Item name={attributes.sname} rules={[getRules]} noStyle>
                <Input style={{ display: 'none' }} />
            </Form.Item>
        </div>
    );
};

export default ChampFichier;

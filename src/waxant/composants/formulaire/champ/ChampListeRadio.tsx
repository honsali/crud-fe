import { Form, Radio, Space } from 'antd';
import type { FormInstance, FormItemProps } from 'antd';
import { useEffect } from 'react';

interface OptionListeRadio {
    code: string;
    libelle: string;
}

interface ChampListeRadioAttributes extends FormItemProps {
    arg?: unknown;
    cls?: string;
    cname?: string;
    entite?: unknown;
    fallBackLabel?: string;
    lname?: string;
    onChange?: (value: string | undefined) => void;
    requis?: boolean | string;
    siChange?: unknown;
    slabel?: string;
    sname?: string;
}

interface ChampListeRadioProps {
    attributes?: ChampListeRadioAttributes;
    defaultValue?: string;
    direction?: 'horizontal' | 'vertical';
    form?: FormInstance;
    libelle?: string;
    liste: OptionListeRadio[];
    nom?: string;
    requis?: boolean | string;
}

const ChampListeRadio = ({ attributes, defaultValue, direction = 'horizontal', form, libelle, liste, nom, requis }: ChampListeRadioProps) => {
    const resolvedAttributes = attributes ?? {
        label: libelle,
        name: nom,
        requis,
    };

    useEffect(() => {
        if (defaultValue) {
            form?.setFieldValue(resolvedAttributes.name, defaultValue);
        }
    }, [defaultValue, form, resolvedAttributes.name]);

    const valueChanged = (event: { target?: { value?: string } }) => {
        resolvedAttributes.onChange?.(event.target?.value);
    };

    const label = resolvedAttributes.label ?? resolvedAttributes.fallBackLabel ?? '';
    const rules = resolvedAttributes.requis ? [{ required: true, message: `${label} est requis.` }] : [];
    const formItemProps = { ...resolvedAttributes };
    for (const key of ['arg', 'cls', 'cname', 'entite', 'fallBackLabel', 'lname', 'onChange', 'requis', 'siChange', 'slabel', 'sname'] as const) {
        delete formItemProps[key];
    }

    return (
        <Form.Item {...formItemProps} rules={rules}>
            <Radio.Group onChange={valueChanged}>
                <Space orientation={direction}>
                    {liste.map((option) => (
                        <Radio value={option.code} key={option.code}>
                            {option.libelle}
                        </Radio>
                    ))}
                </Space>
            </Radio.Group>
        </Form.Item>
    );
};

export default ChampListeRadio;

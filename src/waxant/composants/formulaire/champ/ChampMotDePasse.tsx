import { Form, Input } from 'antd';
import type { FormItemProps } from 'antd';

interface ChampMotDePasseAttributes extends FormItemProps {
    arg?: unknown;
    cls?: string;
    cname?: string;
    disabled?: boolean;
    entite?: unknown;
    fallBackLabel?: string;
    lname?: string;
    placeholder?: string;
    requis?: boolean | string;
    siChange?: unknown;
    slabel?: string;
    sname?: string;
}

interface ChampMotDePasseProps {
    attributes?: ChampMotDePasseAttributes;
    autoComplete?: string;
    disabled?: boolean;
    libelle?: string;
    maxLength?: number;
    minLength?: number;
    nom?: string;
    placeholder?: string;
    requis?: boolean | string;
}

const ChampMotDePasse = ({ attributes, autoComplete = 'new-password', disabled, libelle, maxLength, minLength, nom, placeholder, requis: requisProp }: ChampMotDePasseProps) => {
    const resolvedAttributes = attributes ?? {
        disabled,
        label: libelle,
        name: nom,
        placeholder,
        requis: requisProp,
    };
    const { cls, disabled: champDisabled, fallBackLabel, placeholder: champPlaceholder, requis } = resolvedAttributes;
    const formItemProps = { ...resolvedAttributes };
    for (const key of ['arg', 'cls', 'cname', 'disabled', 'entite', 'fallBackLabel', 'lname', 'placeholder', 'requis', 'siChange', 'slabel', 'sname'] as const) {
        delete formItemProps[key];
    }
    const label = resolvedAttributes.label ?? fallBackLabel ?? 'Mot de passe';
    const rules = [
        ...(requis ? [{ required: true, whitespace: true, message: `${label} est requis.` }] : []),
        ...(minLength ? [{ min: minLength, message: `${minLength} caractères minimum.` }] : []),
        ...(maxLength ? [{ max: maxLength, message: `${maxLength} caractères maximum.` }] : []),
    ];

    return (
        <Form.Item {...formItemProps} rules={rules}>
            <Input.Password
                autoComplete={autoComplete}
                className={`champ-${cls ?? 'mot-de-passe'}`}
                disabled={champDisabled}
                maxLength={maxLength}
                placeholder={champPlaceholder}
            />
        </Form.Item>
    );
};

export default ChampMotDePasse;

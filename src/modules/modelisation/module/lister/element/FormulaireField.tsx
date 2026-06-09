import { SaveOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcNormale, ActionUcSupprimer, BlocAction, BoutonTexteLien, CadreSimple, ChampCache, ChampOuiNon, ChampReference, ChampTexte, Formulaire } from 'waxant';
import { ActionModule } from '../../ActionModule';
import useListerModule from '../useListerModule';

const FormulaireField = ({ field, stopEdition }) => {
    const { etatMajField, etatSupprimerField, majField, supprimerField } = useListerModule();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue(field);
    }, [field]);

    const maj = () => {
        majField({ form, idEntity: field.entity.id });
    };

    const supprimer = () => {
        supprimerField({ idField: field.id, idEntity: field.entity.id });
    };
    //
    return (
        <CadreSimple titre="modifierField">
            <Formulaire form={form} nombreColonne={2}>
                <ChampTexte nom="name" requis="true" />
                <ChampReference nom="fieldType" />
                <ChampOuiNon nom="required" />
                <ChampOuiNon nom="uniq" />
                <ChampCache nom="id" />
                <ChampCache nom="entity" />
            </Formulaire>
            <BlocAction marge="0">
                <ActionUcNormale icone={<SaveOutlined />} nom={ActionModule.UcListerModule.MAJ_FIELD} action={maj} rid={etatMajField.rid} />
                <BoutonTexteLien nom="annuler" action={stopEdition} />
                <ActionUcSupprimer nom={ActionModule.UcListerModule.SUPPRIMER_FIELD} action={supprimer} rid={etatSupprimerField.rid} />
            </BlocAction>
        </CadreSimple>
    );
};

export default FormulaireField;
import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampDate, ChampReference, Formulaire } from 'waxant';
import { ActionEmploye } from '../../../ActionEmploye';
import { PageConsulterConge } from '../../../ListePageEmploye';
import useModifierConge from '../useModifierConge';
import ActionMajConge from './ActionMajConge';

const FormulaireConge = () => {
    const { conge, etatInitModificationConge, initModificationConge } = useModifierConge();
    const [form] = Form.useForm();

    useEffect(() => {
        initModificationConge();
    }, []);

    useEffect(() => {
        if (etatInitModificationConge.succes) {
            form.setFieldsValue(conge);
        }
    }, [etatInitModificationConge.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form} nombreColonne={1}>
                <ChampReference nom="typeConge" />
                <ChampDate nom="dateDebutConge" />
                <ChampDate nom="dateFinConge" />
                <ChampCache nom="id" />
                <ChampCache nom="employe" />
            </Formulaire>
            <BlocAction>
                <ActionMajConge form={form} />
                <ActionUcRetourConsulter nom={ActionEmploye.UcModifierConge.RETOUR_CONSULTER_CONGE} page={PageConsulterConge} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireConge;
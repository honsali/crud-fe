import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, ChampCache, ChampDate, ChampReference, Formulaire } from 'waxant';
import { PageConsulterDepartement } from '../../../../departement/ListePageDepartement';
import { ActionEmploye } from '../../../ActionEmploye';
import useModifierConge from '../useModifierConge';
import ActionMajConge from './ActionMajConge';

const FormulaireConge = () => {
    const { conge, etatRecupererCongeParId, recupererCongeParId } = useModifierConge();
    const [form] = Form.useForm();

    useEffect(() => {
        recupererCongeParId();
    }, []);

    useEffect(() => {
        if (etatRecupererCongeParId.succes) {
            form.setFieldsValue(conge);
        }
    }, [etatRecupererCongeParId.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <Formulaire form={form}>
                <ChampReference nom="typeConge" />
                <ChampDate nom="dateDebutConge" />
                <ChampDate nom="dateFinConge" />
                <ChampCache nom="id" />
            </Formulaire>
            <BlocAction>
                <ActionMajConge form={form} />
                <ActionUcRetourConsulter nom={ActionEmploye.UcModifierConge.RETOUR_CONSULTER_CONGE} page={PageConsulterDepartement} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireConge;
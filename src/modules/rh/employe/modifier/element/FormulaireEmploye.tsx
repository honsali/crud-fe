import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, CadreBas, ChampCache, ChampDate, ChampReference, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import useModifierEmploye from '../useModifierEmploye';
import ActionMajEmploye from './ActionMajEmploye';

const FormulaireEmploye = () => {
    const { employe, etatRecupererEmployeParId, recupererEmployeParId } = useModifierEmploye();
    const [form] = Form.useForm();

    useEffect(() => {
        recupererEmployeParId();
    }, []);

    useEffect(() => {
        if (etatRecupererEmployeParId.succes) {
            form.setFieldsValue(employe);
        }
    }, [etatRecupererEmployeParId.succes]);
    //
    return (
        <Bloc largeur="600px" marge="20px" fond="blanc">
            <CadreBas titre="employe">
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="matricule" />
                    <ChampDate nom="dateEntree" />
                    <ChampReference nom="departement" />
                    <ChampTexte nom="fonction" />
                    <ChampTexteLong nom="description" surTouteLaLigne />
                    <ChampCache nom="id" />
                </Formulaire>
            </CadreBas>
            <CadreBas titre="personnelle">
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="nom" />
                    <ChampTexte nom="prenom" />
                    <ChampDate nom="dateNaissance" />
                    <ChampReference nom="sexe" />
                    <ChampReference nom="situationFamiliale" />
                </Formulaire>
            </CadreBas>
            <CadreBas titre="contact">
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="email" />
                    <ChampTexte nom="telephone" />
                    <ChampTexte nom="ville" seulDansLaLigne />
                    <ChampTexte nom="adresse" surTouteLaLigne />
                </Formulaire>
            </CadreBas>
            <BlocAction>
                <ActionMajEmploye form={form} />
                <ActionUcRetourConsulter nom={ActionEmploye.UcModifierEmploye.RETOUR_CONSULTER_EMPLOYE} page={PageConsulterEmploye} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireEmploye;
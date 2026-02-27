import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcRetourConsulter, Bloc, BlocAction, CadreSimple, ChampCache, ChampDate, ChampReference, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageConsulterEmploye } from '../../ListePageEmploye';
import useModifierEmploye from '../useModifierEmploye';
import ActionMajEmploye from './ActionMajEmploye';

const FormulaireEmploye = () => {
    const { employe, etatInitModificationEmploye, initModificationEmploye } = useModifierEmploye();
    const [form] = Form.useForm();

    useEffect(() => {
        initModificationEmploye();
    }, []);

    useEffect(() => {
        if (etatInitModificationEmploye.succes) {
            form.setFieldsValue(employe);
        }
    }, [etatInitModificationEmploye.succes]);
    //
    return (
        <Bloc marge="40px" fond="blanc">
            <Bloc largeur="1000px">
                <CadreSimple titre="employe">
                    <Bloc largeur="400px">
                        <Formulaire form={form}>
                            <ChampTexte nom="matricule" />
                            <ChampDate nom="dateEntree" />
                            <ChampReference nom="departement" />
                            <ChampTexte nom="fonction" />
                            <ChampTexteLong nom="description" surTouteLaLigne />
                            <ChampCache nom="id" />
                        </Formulaire>
                    </Bloc>
                </CadreSimple>
                <CadreSimple titre="personnelle">
                    <Bloc largeur="400px">
                        <Formulaire form={form}>
                            <ChampTexte nom="nom" />
                            <ChampTexte nom="prenom" />
                            <ChampDate nom="dateNaissance" />
                            <ChampReference nom="sexe" />
                            <ChampReference nom="situationFamiliale" />
                        </Formulaire>
                    </Bloc>
                </CadreSimple>
                <CadreSimple titre="contact">
                    <Bloc largeur="400px">
                        <Formulaire form={form}>
                            <ChampTexte nom="email" />
                            <ChampTexte nom="telephone" />
                            <ChampTexte nom="ville" seulDansLaLigne />
                            <ChampTexte nom="adresse" surTouteLaLigne />
                        </Formulaire>
                    </Bloc>
                </CadreSimple>
                <BlocAction>
                    <ActionMajEmploye form={form} />
                    <ActionUcRetourConsulter nom={ActionEmploye.UcModifierEmploye.RETOUR_CONSULTER_EMPLOYE} page={PageConsulterEmploye} />
                </BlocAction>
            </Bloc>
        </Bloc>
    );
};

export default FormulaireEmploye;
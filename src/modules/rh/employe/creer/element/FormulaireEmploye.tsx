import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, CadreSimple, ChampDate, ChampReference, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageFiltrerEmploye } from '../../ListePageEmploye';
import ActionCreerEmploye from './ActionCreerEmploye';

const FormulaireEmploye = () => {
    const [form] = Form.useForm();
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
                    <ActionCreerEmploye form={form} />
                    <ActionUcRetourListe nom={ActionEmploye.UcCreerEmploye.RETOUR_LISTE_EMPLOYE} page={PageFiltrerEmploye} />
                </BlocAction>
            </Bloc>
        </Bloc>
    );
};

export default FormulaireEmploye;
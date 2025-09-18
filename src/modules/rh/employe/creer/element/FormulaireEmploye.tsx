import { Form } from 'antd';
import { ActionUcRetourListe, Bloc, BlocAction, CadreBas, ChampDate, ChampReference, ChampTexte, ChampTexteLong, Formulaire } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import { PageFiltrerEmploye } from '../../ListePageEmploye';
import ActionCreerEmploye from './ActionCreerEmploye';

const FormulaireEmploye = () => {
    const [form] = Form.useForm();
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
                <ActionCreerEmploye form={form} />
                <ActionUcRetourListe nom={ActionEmploye.UcCreerEmploye.RETOUR_LISTE_EMPLOYE} page={PageFiltrerEmploye} />
            </BlocAction>
        </Bloc>
    );
};

export default FormulaireEmploye;
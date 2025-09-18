import { Form } from 'antd';
import { useEffect } from 'react';
import { ActionUcAppliquerFiltre, ActionUcInitialiserFiltre, BlocAction, ChampDate, ChampReference, ChampTexte, Filtre, Formulaire, PanneauEtendable, Separateur } from 'waxant';
import { ActionEmploye } from '../../ActionEmploye';
import useFiltrerEmploye from '../useFiltrerEmploye';

const FiltreEmploye = () => {
    const { filtrerEmploye, initialiserFiltrerEmploye } = useFiltrerEmploye();
    const [form] = Form.useForm();

    const appliquerFiltreEmploye = () => {
        filtrerEmploye({ form });
    };

    useEffect(() => {
        initialiserFiltreEmploye();
    }, []);

    const initialiserFiltreEmploye = () => {
        form.resetFields();
        initialiserFiltrerEmploye();
    };
    //
    return (
        <Filtre titre="filtreEmploye">
            <PanneauEtendable titre="employe" open={true}>
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="matricule" seulDansLaLigne />
                    <ChampDate nom="debutDateEntree" />
                    <ChampDate nom="finDateEntree" />
                    <ChampReference nom="departement" />
                    <ChampTexte nom="fonction" />
                </Formulaire>
            </PanneauEtendable>
            <PanneauEtendable titre="personnelle">
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="nom" />
                    <ChampTexte nom="prenom" />
                    <ChampDate nom="debutDateNaissance" />
                    <ChampDate nom="finDateNaissance" />
                    <ChampReference nom="sexe" />
                    <ChampReference nom="situationFamiliale" />
                </Formulaire>
            </PanneauEtendable>
            <PanneauEtendable titre="contact">
                <Formulaire form={form} nombreColonne={2}>
                    <ChampTexte nom="email" />
                    <ChampTexte nom="telephone" />
                    <ChampTexte nom="ville" />
                    <ChampTexte nom="adresse" />
                </Formulaire>
            </PanneauEtendable>
            <Separateur top="20" />
            <BlocAction>
                <ActionUcAppliquerFiltre nom={ActionEmploye.UcFiltrerEmploye.APPLIQUER_FILTRE_EMPLOYE} action={appliquerFiltreEmploye} />
                <ActionUcInitialiserFiltre nom={ActionEmploye.UcFiltrerEmploye.INITIALISER_FILTRE_EMPLOYE} action={initialiserFiltreEmploye} />
            </BlocAction>
        </Filtre>
    );
};

export default FiltreEmploye;
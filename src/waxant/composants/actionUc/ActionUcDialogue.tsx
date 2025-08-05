import { useEffect, useState } from 'react';
import { DialogueConfirmation, enteteConfirmation, titreConfirmation, useContexteView, useHasRight, useI18n } from 'waxant';
import BoutonSelonContexte from '../bouton/BoutonSelonContexte';
import EnteteDialogue from '../dialogue/EnteteDialogue';

const ActionUcDialogue = ({ nom, icone = null, titre = null, action = null, args = null, getArgs = null, form = null, etat = null, pret = true, siInit = null, siAnnuler = null, siSucces = null, siErreur = null, siErreurAnnuler = null, inactif = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const nomAction = nom.startsWith('Uc') ? nom : `${uc}.action.${nom}`;
    const entete = i18n(enteteConfirmation(nom), false);
    const hasRight = useHasRight(nomAction);
    const [visible, setVisible] = useState(false);
    const [pretVisible, setPretVisible] = useState(false);

    const attributes = {
        nom: nomAction,
        titre: titre ?? i18n(titreConfirmation(nomAction)),
        nomActionConfirmer: nomAction,
        actionConfirmer: () => confirmer(),
        actionAnnuler: () => annuler(),
        icone,
    };

    const ouvrir = () => {
        if (siInit) {
            siInit();
        }
        setPretVisible(true);
    };
    const confirmer = () => {
        if (action) {
            action({ form, ...args, ...(getArgs ? getArgs() : {}) });
        }
    };

    const annuler = () => {
        if (siAnnuler) {
            siAnnuler();
        }
        if (form) {
            form.resetFields();
        }
        setVisible(false);
        setPretVisible(false);
    };

    useEffect(() => {
        setVisible(pretVisible && pret);
    }, [pretVisible, pret]);

    useEffect(() => {
        if (etat.succes) {
            if (siSucces) {
                siSucces(true);
            }
            annuler();
        }
    }, [etat.succes]);

    useEffect(() => {
        if (etat.erreur) {
            if (siErreur) {
                siErreur();
            }
            if (siErreurAnnuler) {
                annuler();
            }
        }
    }, [etat.erreur]);

    return (
        <span>
            <BoutonSelonContexte nom={nomAction} icone={icone} action={ouvrir} rid={visible ? '1' : null} visible={hasRight} inactif={inactif} />
            <DialogueConfirmation visible={visible} {...attributes} rid={etat.rid}>
                {entete && <EnteteDialogue texte={entete} />}
                {children}
            </DialogueConfirmation>
        </span>
    );
};

export default ActionUcDialogue;

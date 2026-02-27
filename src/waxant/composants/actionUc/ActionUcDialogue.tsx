import type { CSSProperties, ReactNode } from 'react';
import { useEffect, useState } from 'react';
import { DialogueConfirmation, enteteConfirmation, titreConfirmation, useHasRight, useI18n } from 'waxant';
import type { ExecuteResponse } from 'waxant/noyau/redux/useExecute';
import BoutonTexte from '../bouton/texte/BoutonTexte';
import EnteteDialogue from '../dialogue/EnteteDialogue';
import type style from 'antd/es/affix/style';

type ActionUcDialogueProps = {
    nom: string;
    icone?: ReactNode;
    titre?: string;
    action?: ((args: Record<string, unknown>) => void);
    args?: Record<string, unknown>;
    getArgs?: (() => Record<string, unknown>);
    form?: { resetFields: () => void };
    etat?: ExecuteResponse;
    pret?: boolean;
    siInit?: (() => void);
    siAnnuler?: (() => void);
    siSucces?: ((ok?: boolean) => void);
    siErreur?: (() => void);
    siErreurAnnuler?: (() => void);
    inactif?: string;
    style?: CSSProperties;
    children?: ReactNode;
};

const ActionUcDialogue = (props: ActionUcDialogueProps) => {
    const { nom, icone, action, args, getArgs, form, etat, pret = true, siInit, siAnnuler, siSucces, siErreur, siErreurAnnuler, inactif, style, children } = props;
    const { i18n } = useI18n();
    const hasRight = useHasRight(nom);
    const [visible, setVisible] = useState(false);
    const [pretVisible, setPretVisible] = useState(false);
    const etatValue = etat ?? {};

    const attributes = {
        nom: nom,
        titre: i18n(titreConfirmation(nom)),
        entete: i18n(enteteConfirmation(nom), false),
        nomActionConfirmer: nom,
        actionConfirmer: () => confirmer(),
        actionAnnuler: () => annuler(),
        icone,
    };

    useEffect(() => {
        setVisible(pretVisible && pret);
    }, [pretVisible, pret]);

    const ouvrir = () => {
        if (siInit) {
            siInit();
        }
        setPretVisible(true);
    };

    const confirmer = () => {
        action?.({ form, ...(args ?? {}), ...(getArgs ? getArgs() : {}) });
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
        if (etatValue.succes) {
            if (siSucces) {
                siSucces(true);
            }
            annuler();
        }
    }, [etatValue.succes]);

    useEffect(() => {
        if (etatValue.erreur) {
            if (siErreur) {
                siErreur();
            }
            if (siErreurAnnuler) {
                annuler();
            }
        }
    }, [etatValue.erreur]);

    return (
        <div style={{ display: 'flex', ...style }}>
            <BoutonTexte nom={nom} icone={icone} action={ouvrir} rid={visible ? '1' : null} visible={hasRight} inactif={inactif} />
            <DialogueConfirmation visible={visible} {...attributes} rid={etatValue.rid}>
                <EnteteDialogue texte={attributes.entete} />
                {children}
            </DialogueConfirmation>
        </div>
    );
};

export default ActionUcDialogue;

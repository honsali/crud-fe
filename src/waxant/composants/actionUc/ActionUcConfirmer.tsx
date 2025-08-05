import { Popconfirm } from 'antd';
import { useState } from 'react';
import { enteteConfirmation, titreConfirmation } from 'waxant/noyau/util/libelleUtil';
import useHasRight from '../../noyau/auth/useHasRight';
import useContexteView from '../../noyau/contexte/ContexteView';
import useI18n from '../../noyau/i18n/useI18n';
import { BoutonProps } from '../bouton/BoutonProps';
import BoutonSelonContexte from '../bouton/BoutonSelonContexte';


const ActionUcConfirmer = (props: BoutonProps) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const nom = props.nom?.startsWith('Uc') ? props.nom : `${uc}.action.${props.nom}${props.entite || ''}`;
    const hasRight = useHasRight(nom);
    const [visible, setVisible] = useState(false);

    const executer = () => {
        setVisible(false);
        props.action();

    };
    const confirmer = () => {
        setVisible(true);
    };

    const annuler = () => {
        setVisible(false);
    };

    return (
        <Popconfirm open={visible} title={i18n(titreConfirmation(nom))} description={i18n(enteteConfirmation(nom))} icon={props.icone} onConfirm={executer} onCancel={annuler} okText={i18n('confirmer')} cancelText={i18n('annuler')}>
            <div> <BoutonSelonContexte {...props} nom={nom} rid={visible ? '1' : null} action={confirmer} visible={hasRight} /></div>
        </Popconfirm>
    );
};

export default ActionUcConfirmer;

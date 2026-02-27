import { Popconfirm } from 'antd';
import { useState } from 'react';
import { enteteConfirmation, titreConfirmation } from 'waxant/noyau/util/libelleUtil';
import useHasRight from '../../noyau/auth/useHasRight';
import useI18n from '../../noyau/i18n/useI18n';
import type { BoutonProps } from '../bouton/BoutonProps';
import BoutonTexte from '../bouton/texte/BoutonTexte';


const ActionUcConfirmer = (props: BoutonProps) => {
    const { i18n } = useI18n();
    const hasRight = useHasRight(props.nom);
    const [visible, setVisible] = useState(false);
    const style = { display: 'flex', marginLeft: props.cote === 'droit' ? 'auto' : '' };

    const attributes = {
        nom: props.nom,
        title: i18n(titreConfirmation(props.nom)),
        description: i18n(enteteConfirmation(props.nom)),
        okText: i18n('confirmer'),
        cancelText: i18n('annuler'),
        onConfirm: () => confirmer(),
        onCancel: () => annuler(),
        icon: props.icone,
    };

    const ouvrir = () => {
        setVisible(true);
    };

    const confirmer = () => {
        setVisible(false);
        props.action?.();
    };

    const annuler = () => {
        setVisible(false);
    };

    return (
        <Popconfirm open={visible} {...attributes} >
            <div style={style}>
                <BoutonTexte type="fort" {...props} rid={visible ? '1' : props.rid} action={ouvrir} visible={hasRight} />
            </div>
        </Popconfirm>
    );
};

export default ActionUcConfirmer;

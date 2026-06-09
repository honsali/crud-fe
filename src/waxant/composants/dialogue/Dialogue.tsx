import { Avatar, Modal, type ModalProps } from 'antd';
import type { ReactNode } from 'react';
import styled from 'styled-components';
import useI18n from 'waxant/noyau/i18n/useI18n';
import './Dialogue.css';


export interface DialogueProps {
    visible: boolean;
    nom: string;
    titre?: string | undefined;
    entete?: ReactNode | undefined;
    footer?: ReactNode | undefined;
    icone?: ReactNode | undefined;
    actionAnnuler?: (() => void) | undefined;
    largeur?: number;
    children?: ReactNode;
};



const SAvatar = styled(Avatar)`
    background-color: #fefefe;
    border: 1px solid #ddd;
    margin: 0 5px 5px 0;
    svg {
        margin-top: 1px;
        fill: ${(props) => props.theme.token.colorPrimary};
        width: 22px;
    }
`;


const Dialogue = (props: DialogueProps) => {
    const { i18n } = useI18n();
    const { visible, nom, titre, entete, footer, icone, actionAnnuler, largeur = 1000, children } = props;
    const semanticClassNames: ModalProps['classNames'] = {
        root: 'waxant-dialogue',
        container: 'waxant-dialogue-container',
        header: 'waxant-dialogue-header',
        title: 'waxant-dialogue-title',
        body: 'waxant-dialogue-body',
        footer: 'waxant-dialogue-footer',
    };

    const getTitre = () => {
        return (
            <span>
                {icone && <SAvatar shape="circle" src={icone} size={32} />}
                {titre || i18n(nom)}
            </span>
        );
    };

    return (
        <Modal//
            open={visible}//
            title={getTitre()}//
            footer={footer}//
            width={largeur}//
            onCancel={actionAnnuler}//
            closable={false}//
            classNames={semanticClassNames}//
            mask={{ closable: false }}>
            {props.children}
        </Modal>
    );
};

export default Dialogue;

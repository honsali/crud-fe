import { Row } from 'antd';
import styled from 'styled-components';
import { useContexteView, useI18n } from 'waxant';

const Composant = styled.div``;

const Entete = styled(Row)`
    color: #555;
    background-color: #e9e5e0;
    padding: 0 10px;
    border-bottom: 2px solid #ccc;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Corps = styled.div`
    background-color: #fff;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
`;

const Titre = styled.div`
    flex: none;
    padding-top: 8px;
    font-weight: 400;
    font-size: 20px;
`;

const Action = styled.div`
    flex: auto;
    display: flex;
    justify-content: end;
    align-items: center;
`;

const TagEtat = styled.span`
    margin-left: 10px;
    padding: 3px 6px;
    font-weight: bold;
    font-size: 10px;
    color: #fff;
    background-color: ${(props) => props.theme.token.colorWarning};
    border-radius: 4px;
`;

interface PanneauProps {
    titre?: string | null;
    libelle?: string | null;
    etat?: string | null;
    blocAction?: React.ReactNode;
    children: React.ReactNode;
}

const PanneauSecondaire: React.FC<PanneauProps> = ({ titre = null, libelle = null, etat = null, blocAction = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();

    return (
        <Composant>
            <Entete>
                <Titre>{libelle || (titre && i18n(`${uc}.${titre}`)) || i18n(`${uc}.titre`)}</Titre>
                {etat && <TagEtat>{etat}</TagEtat>}
                <Action>{blocAction}</Action>
            </Entete>
            <Corps>{children}</Corps>
        </Composant>
    );
};

export default PanneauSecondaire;

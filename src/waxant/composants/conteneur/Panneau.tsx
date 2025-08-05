import { Row } from 'antd';
import styled from 'styled-components';
import { ContexteTableauProvider } from 'waxant/noyau/contexte/ContexteTabeau';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from '../../noyau/i18n/useI18n';

const Composant = styled.div``;

const Entete = styled(Row)`
    color: #ddd;
    background-color: #555;
    padding: 0 10px;
    border-bottom: 2px solid ${(props) => props.theme.token.colorPrimary};
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
`;

const Titre = styled.div`
    flex: none;
    padding-top: 8px;
    font-weight: 400;
    font-size: 20px;
    font-family: 'Roboto Condensed';
`;

const Action = styled.div`
    flex: auto;
    display: flex;
    justify-content: end;
    align-items: center;
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

const TagEtat = styled.div`
    flex: none;
    padding: 4px 0 0 6px;
    span {
        padding: 2px 5px;
        font-weight: 500;
        font-size: 12px;
        color: #fff;
        background-color: ${(props) => props.theme.token.colorWarning};
        border-radius: 4px;
    }
`;

interface PanneauProps {
    titre?: string | null;
    libelle?: string | React.ReactNode | null;
    etat?: string | null;
    blocAction?: React.ReactNode;
    children: React.ReactNode;
}

const Panneau: React.FC<PanneauProps> = ({ titre = null, libelle = null, etat = null, blocAction = null, children }) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const titrePanneau = titre ? i18n(`${uc}.${titre}`) : i18n(`${uc}.titre`);

    return (
        <Composant>
            <Entete>
                <Titre>{libelle || titrePanneau}</Titre>
                {etat && (
                    <TagEtat>
                        <span>{etat}</span>
                    </TagEtat>
                )}
                <Action>{blocAction}</Action>
            </Entete>
            <Corps>
                <ContexteTableauProvider type="normal">{children}</ContexteTableauProvider>
            </Corps>
        </Composant>
    );
};

export default Panneau;

import { Row } from 'antd';
import styled, { type CSSProperties } from 'styled-components';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useContexteApp from '../../noyau/contexte/ContexteApp';
import useI18n from '../../noyau/i18n/useI18n';


const Titre = styled.div`
    flex: none;
    font-size: 30px;
    font-weight: 300;
    text-transform: capitalize;
    color: #777;
    padding: 5px 5px 10px 0;
    white-space: nowrap;
`;

const Action = styled.div`
    flex: auto;
    display: flex;
    justify-content: end;
    align-items: baseline;
    padding:12px 0 0 0 ;
`;

const Corps = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

interface SectionProps {
    style?: CSSProperties;
    marge?: string;
    titre?: string | null;
    libelle?: string | React.ReactNode | null;
    blocAction?: React.ReactNode;
    children: React.ReactNode;
}

const Section: React.FC<SectionProps> = (props: SectionProps) => {
    const { style, marge = '20px 40px', titre = null, libelle = null, blocAction = null, children } = props;
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const { appName } = useContexteApp();
    const titreSection = titre ? i18n(`${uc}.${titre}`) : i18n(`${uc}.titre`);
    document.title = appName + ' ' + titreSection;

    return (
        <div style={{ ...(style ?? {}), padding: marge }}>
            <Row>
                <Titre>{libelle || titreSection}</Titre>
                <Action>{blocAction}</Action>
            </Row>
            <Corps>{children}</Corps>
        </div>
    );
};

export default Section;

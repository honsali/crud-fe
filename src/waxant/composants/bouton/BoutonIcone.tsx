import { Button, theme, Tooltip } from 'antd';
import styled from 'styled-components';
import useGoToPage from 'waxant/noyau/routes/useGoToPage';
import useI18n from '../../noyau/i18n/useI18n';
import { BoutonProps } from './BoutonProps';

const StyledBouton = styled(Button) <{ $couleurActive?: string, $couleurHover?: string }>`
    ${({ $couleurActive, $couleurHover }) => {
        return `
                color: ${$couleurHover};
                background-color: ${$couleurActive};
                border: 2px solid ${$couleurHover};
                border-radius: 4px;
                &:hover{
                    background-color:  ${$couleurHover} !important;
                    color: ${$couleurActive}!important;
                    border: 2px solid ${$couleurHover}!important;
                }
                span{
                cursor: pointer  !important;}
    `;
    }}
`;

const BoutonIcone: React.FC<BoutonProps> = (props) => {
    const { nom, contexte, action, page, modele, libelle, icone, couleur = 'fort', inactif, visible = true, rid, taille = 'moyen' } = props;
    const { i18n } = useI18n();
    const gtp = useGoToPage();
    const tailleMap = { mini: 'small', moyen: 'middle', grand: 'large' };
    const { token } = theme.useToken();
    const { colorPrimary, colorError } = token;
    const mapCouleurActive = { 'fort': colorPrimary, 'danger': '#fff', 'normal': '#fff' };
    const mapCouleurHover = { 'fort': '#fff', 'danger': colorError, 'normal': '#999' };

    const executeOnClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        if (!inactif && action) {
            action(event);
        } else if (!inactif && page) {
            gtp(page, modele);
        }
    };

    const onKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
        if (event.key === ' ' || event.code === 'Space' || event.key === 'Enter' || event.code === 'Enter') {
            event.preventDefault();
        }
    };

    if (!visible) {
        return null;
    }

    return (
        <Tooltip placement="top" title={libelle ? libelle : i18n(nom)}>
            <StyledBouton //
                id={`bouton${contexte ? '_' + contexte : ''}_${nom}`}
                onClick={executeOnClick}
                onKeyDown={onKeyDown}
                icon={icone}
                loading={!!rid}
                disabled={!!inactif}
                size={tailleMap[taille]}
                $couleurActive={mapCouleurActive[couleur]}
                $couleurHover={mapCouleurHover[couleur]}
            ></StyledBouton>
        </Tooltip>
    );
};

export default BoutonIcone;

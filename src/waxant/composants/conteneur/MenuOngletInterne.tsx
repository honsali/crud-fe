import { Tabs } from 'antd';
import { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import useContexteMenuOnglet from 'waxant/noyau/contexte/ContexteMenuOnglet';
import { ContexteTableauProvider } from 'waxant/noyau/contexte/ContexteTabeau';
import useI18n from '../../noyau/i18n/useI18n';
import Bloc from './Bloc';
import { MenuOngletProps, OngletProps } from './MenuOnglet';

const Composant = styled(Tabs)`
    .ant-tabs-nav {
        margin: 0;
        font-weight: bold;
        &:before {
            border-bottom: 1px solid #ccc;
        }
        .ant-tabs-ink-bar {
            height: 3px;
        }
            .ant-tabs-tab.ant-tabs-tab-disabled  {
        color: #ccc ;
        }
    }
    
    .ant-tabs-content-holder {
        padding: 0px;
    }
`;

const Wrapper = styled.div` 
    border-radius: 6px;
    padding-top: 5px;
`;



const MenuOngletInterne: FC<MenuOngletProps> = ({ ongletActif = null, siOngletChange = null, fond = 'clair', marge = null, children }) => {
    const { i18n } = useI18n();
    const { ongletCourant, setOngletCourant } = useContexteMenuOnglet();

    const tabs = useMemo(() => {
        const array = Array.isArray(children) ? children : [children];
        return array.map((c: React.ReactElement<OngletProps>) => {
            const { entete, badge, children } = c.props;
            const label = entete || badge || i18n(`onglet.${c.key}`);
            const content = marge ? <Bloc marge={marge}>{children}</Bloc> : children;
            return { label, key: c.key as string, children: content, disabled: c.props.disabled || false };
        });
    }, [children, marge, i18n]);

    useEffect(() => {
        if (ongletActif !== null && ongletActif !== ongletCourant) {
            setOngletCourant(ongletActif);
        } else if (!ongletCourant && !ongletActif) {
            const firstKey = tabs[0]?.key;
            if (firstKey) {
                setOngletCourant(firstKey);
                siOngletChange?.(firstKey);
            }
        }
    }, [ongletActif, tabs]);

    const handleChange = (selectedKey: string) => {
        if (selectedKey !== ongletCourant) {
            setOngletCourant(selectedKey);
            siOngletChange?.(selectedKey);
        }
    };

    const toBg = { 'transparent': 'transparent', 'blanc': '#FFFFFFcc', 'clair': '#faf9f7', 'fonce': '#e9e5e0' };

    return (
        <ContexteTableauProvider type="fonce">
            <Wrapper style={{ background: toBg[fond] }}>
                <Composant activeKey={ongletCourant} animated={{ inkBar: false }} onChange={handleChange} items={tabs} />
            </Wrapper>
        </ContexteTableauProvider>
    );
};

export default MenuOngletInterne;
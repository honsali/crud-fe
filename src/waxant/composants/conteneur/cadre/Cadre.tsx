import { Card, Space, Tag, type CardProps } from 'antd';
import type { ReactNode } from 'react';
import { useContexteView, useI18n } from 'waxant';
import './Cadre.css';

export interface CadreProps {
    type?: 'fort' | 'normal' | 'simple';
    titre?: string | null;
    libelle?: string | ReactNode | null;
    etat?: string | null;
    blocAction?: ReactNode;
    children: ReactNode;
    marge?: string;
    largeur?: string;
}

const Cadre = (props: CadreProps) => {
    const { type = 'normal', titre = null, libelle = null, etat = null, blocAction = null, marge = '0', largeur = '100%', children } = props;
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const titreCadre = titre ? i18n(`${uc}.${titre}`) : i18n(`${uc}.titre`);
    const semanticClassNames: CardProps['classNames'] = {
        root: `waxant-cadre-${type}`,
        header: `waxant-cadre-${type}__header`,
        body: 'waxant-cadre__body',
        title: `waxant-cadre-${type}__title`,
        extra: 'waxant-cadre__extra',
    };
    const elementTitre = (
        <Space align="start">
            <div className="cadre-texte">{libelle || titreCadre}</div>
            {etat && <Tag color="gold" variant="solid" className="cadre-etat">{etat}</Tag>}
        </Space >
    );

    return (
        <Card //
            variant="outlined"
            title={elementTitre}
            extra={blocAction ?? undefined}
            classNames={semanticClassNames}
            style={{ padding: marge, width: largeur }}
        >
            {children}
        </Card>
    );
};

export default Cadre;

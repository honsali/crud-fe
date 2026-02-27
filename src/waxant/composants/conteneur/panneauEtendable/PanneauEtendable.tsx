import { DownOutlined, RightOutlined } from '@ant-design/icons';
import { Col, Row } from 'antd';
import type { ReactNode } from 'react';
import { useState } from 'react';
import useContexteView from 'waxant/noyau/contexte/ContexteView';
import useI18n from 'waxant/noyau/i18n/useI18n';
import './PanneauEtendable.css';

interface PanneauEtendableProps {
    titre?: string | null;
    libelle?: string | ReactNode | null;
    open?: boolean;
    children: ReactNode;
}

const PanneauEtendable = ({ titre = null, libelle = null, open = false, children }: PanneauEtendableProps) => {
    const { i18n } = useI18n();
    const { uc } = useContexteView();
    const [opened, setOpened] = useState(open === true);

    const toggle = () => {
        setOpened(!opened);
    };

    const headerClassName = `waxant-panneau-etendable__header${opened ? '' : ' waxant-panneau-etendable__header--collapsed'}`;

    return (
        <div className="waxant-panneau-etendable">
            <div className={headerClassName} onClick={toggle}>
                <div className="waxant-panneau-etendable__title">{libelle || i18n(`${uc}.${titre}`)}</div>
                {!open && (
                    <div className="waxant-panneau-etendable__toggle">
                        {opened ? <DownOutlined /> : <RightOutlined />}
                    </div>
                )}
            </div>
            <Row className="waxant-panneau-etendable__body" style={{ display: opened ? 'block' : 'none' }}>
                <Col span={24}>{children}</Col>
            </Row>
        </div>
    );
};

export default PanneauEtendable;

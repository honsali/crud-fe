import { Spin } from 'antd';
import _ from 'lodash';
import type { ReactNode } from 'react';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { selectActionEnCours, useI18n } from 'waxant';


const Composant = styled(Spin)`
    cursor: pointer;

    .wrap_spinner {
        position: relative;
        margin-top: 200px;
        background-color: #eee;
        border: 2px solid #ddd;
        border-radius: 8px;
    }

    .sablier_msg {
        font-size: 14px;
        font-weight: bold;
        fill: #777;
    }
     
`;

type SablierProps = {
    children?: ReactNode;
};

const Sablier = ({ children }: SablierProps) => {
    const { journalI18n } = useI18n();
    const actionEnCours = useSelector(selectActionEnCours);

    const getListeMessage = () => {
        const array = _.flatten(_.values(actionEnCours)) as string[];
        const liste: ReactNode[] = array.map((actionName: string, i) => {
            return (
                <text x="0" y={30 * (i + 1)} className="sablier_msg" key={i}>
                    {journalI18n(actionName)} ...
                </text>
            );
        });
        return liste;
    };

    const enAction = useCallback(() => {
        let test = false;

        for (const label of _.values(actionEnCours)) {
            if (!_.isNil(label)) {
                test = true;
                window.scrollTo(0, 0);
                break;
            }
        }

        return test;
    }, [actionEnCours]);

    const spinner = () => (
        <div style={{ zIndex: 9999 }}>
            {getListeMessage()}
        </div>
    );
    return (
        <Composant spinning={enAction()} indicator={spinner()}>
            {children}
        </Composant>
    );
};

export default Sablier;

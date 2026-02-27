import { Row } from 'antd';
import _ from 'lodash';
import React, { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import useI18n from '../../noyau/i18n/useI18n';
import util from '../../noyau/util/util';
import OptionNon from '../widget/OptionNon';
import OptionOui from '../widget/OptionOui';
import { SLibelle, SValeur } from './styles';

const labelWidthList: Record<1 | 2 | 3, number> = { 1: 10, 2: 5, 3: 3 };
const textWidthList: Record<1 | 2 | 3, number> = { 1: 14, 2: 7, 3: 5 };

type EtatProps = {
    modele?: any;
    nombreColonne?: 1 | 2 | 3;
    children?: ReactNode;
};

const Etat = ({ modele = null, nombreColonne = 2, children }: EtatProps) => {
    const { i18n } = useI18n();
    const [listeElement, setListeElement] = useState<ReactNode[]>([]);

    const getLibelle = (cprops, propNom): any => {
        if (cprops.libelle) {
            return cprops.libelle;
        }
        if (cprops[propNom]) {
            const names = cprops[propNom].split('.');
            const entityName = names[names.length - 2];
            const fieldName = names[names.length - 1];
            if (['code', 'libelle'].includes(fieldName)) {
                return i18n(entityName);
            }
            return i18n(fieldName);
        }
        return 'ND';
    };

    const getTexte = (m, cprops, propNom) => {
        if (cprops[propNom] && util.nonVide(m)) {
            const value = _.get(m, cprops[propNom]);
            return util.nonNul(value) ? value : '-';
        }
    };

    useEffect(() => {
        if (util.nonVide(modele)) {
            let rowliste: ReactNode[] = [];
            let rowIndex = 0;
            const allliste: ReactNode[] = [];
            React.Children.forEach(children, (c) => {
                if (!React.isValidElement(c)) {
                    return;
                }
                const element = c as React.ReactElement<any>;
                const { props } = element;
                let key = props.nom;
                let libelle = getLibelle(props, 'nom');
                let text = getTexte(modele, props, 'nom');

                if (props.reference) {
                    key = props.reference;
                    libelle = getLibelle(props, 'reference');
                    const referenceText = getTexte(modele, props, 'reference');
                    text = util.nonNul(referenceText?.libelle) ? referenceText.libelle : '-';
                } else if (props.ouiNon) {
                    key = props.ouiNon;
                    libelle = getLibelle(props, 'ouiNon');
                    const estOui = ['TRUE', 'OUI'].includes(getTexte(modele, props, 'ouiNon').toString().toUpperCase());
                    text = estOui ? <OptionOui /> : <OptionNon />;
                } else if (props.numerique) {
                    key = props.numerique;
                    libelle = getLibelle(props, 'numerique');
                    text = (getTexte(modele, props, 'numerique') || 0).toFixed(2);
                } else if (props.vide) {
                    key = 'vide' + _.uniqueId();
                    libelle = <span>&nbsp;</span>;
                    text = <span>&nbsp;</span>;
                }
                if (util.estNul(props.invisible) || !(props.invisible)) {
                    const labelWidth = labelWidthList[nombreColonne];
                    const textWidth = props.surTouteLaLigne ? 24 - labelWidth : textWidthList[nombreColonne];
                    rowliste.push(
                        <SLibelle span={labelWidth} key={'lib' + key}>
                            {libelle}
                        </SLibelle>
                    );

                    rowliste.push(
                        <SValeur span={textWidth} key={'val' + key}>
                            <span>{text}</span>
                            {props.action && <span>&nbsp;{props.action}</span>}
                        </SValeur>
                    );

                    if (props.seulDansLaLigne) {
                        for (let j = 0; j < nombreColonne - 1; j++) {
                            rowliste.push(
                                <SLibelle span={labelWidth} key={'libVid' + key}>
                                    &nbsp;
                                </SLibelle>
                            );
                            rowliste.push(
                                <SValeur span={textWidth} key={'valVid' + key}>
                                    &nbsp;
                                </SValeur>
                            );
                        }
                    }
                }
                if (rowliste.length > 0 && (rowliste.length / 2) % nombreColonne === 0) {
                    allliste.push(<Row key={rowIndex++}>{rowliste}</Row>);
                    rowliste = [];
                }
            });
            if (rowliste.length > 0) {
                allliste.push(<Row key={'etat_0'}>{rowliste}</Row>);
            }
            setListeElement(allliste);
        }
    }, [children, modele, nombreColonne]);

    return <div key="wrapper_div">{listeElement}</div>;
};

export default Etat;

import { Tag } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import useContexteTableau from 'waxant/noyau/contexte/ContexteTabeau';
import useContexteApp from '../../noyau/contexte/ContexteApp';
import { ContexteBoutonProvider } from '../../noyau/contexte/ContexteBouton';
import useI18n from '../../noyau/i18n/useI18n';
import util from '../../noyau/util/util';
import OptionNon from '../widget/OptionNon';
import OptionOui from '../widget/OptionOui';
import ActionTableauConsulter from './action/ActionTableauConsulter';
import ActionTableauModifier from './action/ActionTableauModifier';
import ActionTableauSupprimer from './action/ActionTableauSupprimer';
import { STable, STag } from './styles';

const Tableau = ({
    listeDonnee, //
    id = null,
    champIdentification = 'id',
    texteAucunResultat = 'aucun.resultat',
    pagination = null,
    initialiser = 0,
    listeIndexElementSelectionne = [],
    indexElementSelectionne = null,
    siSelectionChange = null,
    siClicLigne = null,
    siChangementPage = null,
    sansEntete = false,
    scroll = null,
    children,
    expandable = null,
}) => {
    const { i18n } = useI18n();
    const { formatDate, formatDateTime } = useContexteApp();
    const [tablePagination, setTablePagination] = useState({} as any);
    const [clesSelectionnees, setClesSelectionnees] = useState([]);
    dayjs.extend(duration);
    dayjs.extend(relativeTime);
    const { type } = useContexteTableau();

    const formaterDate = (text) => {
        if (_.isEmpty(text)) {
            return '';
        } else if (dayjs.isDayjs(text)) {
            return text.format(formatDate);
        } else {
            const m = dayjs(text, formatDate);
            return m.format(formatDate);
        }
    };

    const formaterDateTime = (text) => {
        if (_.isEmpty(text)) {
            return '';
        } else if (dayjs.isDayjs(text)) {
            return text.format(formatDateTime);
        } else {
            const m = dayjs(text);
            return m.isValid() ? m.format(formatDateTime) : '';
        }
    };

    const formaterDuree = (text) => {
        if (_.isEmpty(text)) {
            return '';
        } else {
            return dayjs.duration(text).humanize();
        }
    };

    const formaterNombre = (text) => {
        if (_.isNull(text) || !_.isNumber(text)) {
            return '';
        } else {
            return _.toString(text.toFixed(2)).replace('.', ',');
        }
    };

    const getColonnes = useCallback(() => {
        const colonnes = [];
        React.Children.forEach(children, (c, index) => {
            if (util.nonNul(c)) {
                const c_attributs = {} as any;
                c_attributs.dataIndex = 'c' + index;
                if (c.props.nom) {
                    const i = c.props.nom.indexOf('.');
                    if (i > 0) {
                        const names = c.props.nom.split('.');
                        const entityName = names[names.length - 2];
                        const fieldName = names[names.length - 1];
                        c_attributs.dataIndex = [entityName, fieldName];
                        c_attributs.title = fieldName === 'code' || fieldName === 'libelle' ? i18n(entityName) : i18n(fieldName);
                    } else {
                        c_attributs.dataIndex = c.props.nom;
                        c_attributs.title = i18n(c.props.nom);
                    }
                    c_attributs.title = c.props.libelle ? c.props.libelle : c_attributs.title;
                    c_attributs.onCell = clicLigne;
                    c_attributs.width = c.props.largeur;
                }
                if (c.props.width) {
                    c_attributs.width = c.props.width;
                }
                if (c.props.fixed) {
                    c_attributs.fixed = c.props.fixed;
                }
                if (c.props.tc === 'date') {
                    c_attributs.render = (text) => {
                        return formaterDate(text);
                    };
                } else if (c.props.tc === 'dateTime') {
                    c_attributs.render = (text) => {
                        return formaterDateTime(text);
                    };
                } else if (c.props.tc === 'reference') {
                    c_attributs.render = (text) => {
                        return text?.libelle ? text.libelle : text?.code ? '[' + text.code + ']' : '';
                    };
                } else if (c.props.tc === 'numerique') {
                    c_attributs.align = 'right';
                    c_attributs.render = (text) => {
                        return formaterNombre(text);
                    };
                } else if (c.props.tc === 'duree') {
                    c_attributs.render = (text) => {
                        return formaterDuree(text);
                    };
                } else if (c.props.tc === 'ouiNon') {
                    c_attributs.render = (text) => {
                        return util.nonNul(text) && text ? <OptionOui /> : <OptionNon />;
                    };
                } else if (c.props.tc === 'code') {
                    c_attributs.render = (text) => {
                        return i18n(text);
                    };
                } else if (c.props.tc === 'tag') {
                    c_attributs.render = (text) => <Tag color="#2277BB">{text}</Tag>;
                } else if (c.props.tc === 'textArray') {
                    c_attributs.render = (text) => {
                        return text?.map((t, i) => {
                            return (
                                <div style={{ whiteSpace: 'nowrap', marginBottom: '4px' }} key={i}>
                                    <STag>{t}</STag>
                                </div>
                            );
                        });
                    };
                } else if (c.props.tc === 'rendu') {
                    c_attributs.render = c.props.content;
                } else if (c.props.tc === 'custom') {
                    c_attributs.onCell = (value, idx) => {
                        const a = (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            c.props.siClic(value);
                        };
                        return {
                            onClick: c.props.siClic ? a : null,
                            colSpan: c.props.colSpan ? c.props.colSpan(idx) : 1,
                            rowSpan: c.props.rowSpan ? c.props.rowSpan(idx) : 1,
                        };
                    };

                    c_attributs.render = c.props.content;
                } else if (c.props.tc === 'actionModifier') {
                    c_attributs.onCell = (value, idx) => {
                        return {
                            onClick: (evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                if (c.props.action && idx !== indexElementSelectionne) {
                                    c.props.action(value, idx);
                                }
                            },
                        };
                    };
                    c_attributs.render = () => {
                        return <ActionTableauModifier typeEntite={c.props.typeEntite} />;
                    };
                    c_attributs.title = '';
                    c_attributs.width = 42;
                    c_attributs.className = 'colonneAction';
                } else if (c.props.tc === 'actionConsulter') {
                    c_attributs.onCell = (value, idx) => {
                        return {
                            onClick: (evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                if (c.props.action && idx !== indexElementSelectionne) {
                                    c.props.action(value, idx);
                                }
                            },
                        };
                    };
                    c_attributs.render = () => {
                        return <ActionTableauConsulter typeEntite={c.props.typeEntite} />;
                    };
                    c_attributs.title = '';
                    c_attributs.width = 42;
                    c_attributs.className = 'colonneAction';
                } else if (c.props.tc === 'actionSupprimer') {
                    c_attributs.onCell = (value, idx) => {
                        return {
                            onClick: (evt) => {
                                evt.preventDefault();
                                evt.stopPropagation();
                                if (c.props.action) {
                                    c.props.action(value, idx);
                                }
                            },
                        };
                    };
                    c_attributs.render = () => {
                        return <ActionTableauSupprimer typeEntite={c.props.typeEntite} />;
                    };
                    c_attributs.title = '';
                    c_attributs.width = 42;
                    c_attributs.className = 'colonneAction';
                } else {
                    c_attributs.render = (text) => {
                        return util.nonNul(text) ? text : '';
                    };
                }
                if (c.props.trier) {
                    c_attributs.sorter = c.props.trier;
                }
                colonnes.push(c_attributs);
            }
        });
        return colonnes;
    }, [children]);

    const handleTableChange = (pagination) => {
        if (siChangementPage) {
            siChangementPage(pagination.current);
        }
    };

    useEffect(() => {
        setClesSelectionnees([]);
    }, [listeDonnee]);

    useEffect(() => {
        if (pagination) {
            setTablePagination({ current: pagination.pageCourante, pageSize: pagination.nombreLigneParPage, total: pagination.nombreTotalDeLigne, showSizeChanger: false });
        } else {
            setTablePagination(false);
        }
    }, [pagination]);

    const clicLigne = (record, index) => {
        return {
            onClick: () => {
                if (siClicLigne) {
                    siClicLigne(record, index);
                }
            },
        };
    };

    const getRowClassName = (record, index) => {
        return indexElementSelectionne === index ? 'selectionne' : null;
    };

    useEffect(() => {
        if (siSelectionChange) {
            setClesSelectionnees([]);
        }
    }, [initialiser]);

    useEffect(() => {
        if (siSelectionChange) {
            setClesSelectionnees(listeIndexElementSelectionne);
        }
    }, [listeIndexElementSelectionne.length]);

    const getRowSelection = () => {
        if (siSelectionChange) {
            const a = {
                type: 'checkbox',
                selectedRowKeys: clesSelectionnees,
                onChange: (selectedRowKeys: React.Key[], selectedRows: []) => {
                    siSelectionChange(selectedRows);
                    setClesSelectionnees(selectedRowKeys);
                },
            } as any;
            return a;
        }
        return null;
    };

    const getTexteAucunResultat = useCallback(() => {
        const t = i18n(texteAucunResultat, false);
        if (t) {
            return t;
        } else {
            return texteAucunResultat;
        }
    }, []);

    return (
        <ContexteBoutonProvider type="tableau">
            <STable
                id={id} //
                columns={getColonnes()}
                showHeader={!sansEntete}
                size="small"
                dataSource={listeDonnee}
                rowKey={champIdentification}
                onChange={handleTableChange}
                locale={{ emptyText: getTexteAucunResultat() }}
                pagination={tablePagination}
                rowClassName={getRowClassName}
                rowSelection={getRowSelection()}
                scroll={scroll}
                expandable={expandable}
                $type={type}
                bordered
            ></STable>
        </ContexteBoutonProvider>
    );
};

export default Tableau;

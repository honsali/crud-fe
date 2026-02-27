import { Tag, type TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import relativeTime from 'dayjs/plugin/relativeTime';
import _ from 'lodash';
import type { ReactNode } from 'react';
import React, { useCallback, useEffect, useState } from 'react';
import useContexteTableau from 'waxant/noyau/contexte/ContexteTabeau';
import useContexteApp from '../../noyau/contexte/ContexteApp';
import useI18n from '../../noyau/i18n/useI18n';
import util from '../../noyau/util/util';
import OptionNon from '../widget/OptionNon';
import OptionOui from '../widget/OptionOui';
import ActionTableauConsulter from './action/ActionTableauConsulter';
import ActionTableauModifier from './action/ActionTableauModifier';
import ActionTableauSupprimer from './action/ActionTableauSupprimer';
import { STable, STag } from './styles';

type TableauPagination = {
    pageCourante?: number;
    nombreLigneParPage?: number;
    nombreTotalDeLigne?: number;
};

type TableauProps = {
    listeDonnee?: any[];
    id?: string | null;
    champIdentification?: string;
    texteAucunResultat?: string;
    pagination?: TableauPagination | null;
    initialiser?: number;
    listeIndexElementSelectionne?: React.Key[];
    indexElementSelectionne?: number | null;
    siSelectionChange?: ((rows: any[]) => void) | null;
    siClicLigne?: ((record: any, index?: number) => void) | null;
    siChangementPage?: ((page?: number) => void) | null;
    sansEntete?: boolean;
    scroll?: any;
    children?: ReactNode;
    expandable?: any;
};

const Tableau = ({
    listeDonnee = [], //
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
}: TableauProps) => {
    const { i18n } = useI18n();
    const { formatDate, formatDateTime } = useContexteApp();
    const [tablePagination, setTablePagination] = useState<TablePaginationConfig | false>(false);
    const [clesSelectionnees, setClesSelectionnees] = useState<React.Key[]>([]);
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
        const colonnes: any[] = [];
        React.Children.forEach(children, (c, index) => {
            if (!React.isValidElement(c)) {
                return;
            }
            const element = c as React.ReactElement<any>;
            const { props } = element;
            const c_attributs = {} as any;
            c_attributs.dataIndex = 'c' + index;
            if (props.nom) {
                const i = props.nom.indexOf('.');
                if (i > 0) {
                    const names = props.nom.split('.');
                    const entityName = names[names.length - 2];
                    const fieldName = names[names.length - 1];
                    c_attributs.dataIndex = [entityName, fieldName];
                    c_attributs.title = fieldName === 'code' || fieldName === 'libelle' ? i18n(entityName) : i18n(fieldName);
                } else {
                    c_attributs.dataIndex = props.nom;
                    c_attributs.title = i18n(props.nom);
                }
                c_attributs.title = props.libelle ? props.libelle : c_attributs.title;
                c_attributs.onCell = clicLigne;
                c_attributs.width = props.largeur;
                c_attributs.className = props.className;
            }
            if (props.width) {
                c_attributs.width = props.width;
            }
            if (props.fixed) {
                c_attributs.fixed = props.fixed;
            }
            if (props.tc === 'date') {
                c_attributs.render = (text) => {
                    return formaterDate(text);
                };
            } else if (props.tc === 'dateTime') {
                c_attributs.render = (text) => {
                    return formaterDateTime(text);
                };
            } else if (props.tc === 'reference') {
                c_attributs.render = (text) => {
                    return text?.libelle ? text.libelle : text?.code ? '[' + text.code + ']' : '';
                };
            } else if (props.tc === 'numerique') {
                c_attributs.align = 'right';
                c_attributs.render = (text) => {
                    return formaterNombre(text);
                };
            } else if (props.tc === 'duree') {
                c_attributs.render = (text) => {
                    return formaterDuree(text);
                };
            } else if (props.tc === 'ouiNon') {
                c_attributs.render = (text) => {
                    return util.nonNul(text) && text ? <OptionOui /> : <OptionNon />;
                };
            } else if (props.tc === 'code') {
                c_attributs.render = (text) => {
                    return i18n(text);
                };
            } else if (props.tc === 'tag') {
                c_attributs.render = (text) => <Tag color="#3F72AF">{text}</Tag>;
            } else if (props.tc === 'textArray') {
                c_attributs.render = (text) => {
                    return text?.map((t, i) => {
                        return (
                            <div style={{ whiteSpace: 'nowrap', marginBottom: '4px' }} key={i}>
                                <STag>{t}</STag>
                            </div>
                        );
                    });
                };
            } else if (props.tc === 'rendu') {
                c_attributs.render = props.content;
            } else if (props.tc === 'custom') {
                c_attributs.onCell = (value, idx) => {
                    const a = (evt) => {
                        evt.preventDefault();
                        evt.stopPropagation();
                        props.siClic?.(value);
                    };
                    return {
                        onClick: props.siClic ? a : null,
                        colSpan: props.colSpan ? props.colSpan(idx) : 1,
                        rowSpan: props.rowSpan ? props.rowSpan(idx) : 1,
                    };
                };

                c_attributs.render = props.content;
            } else if (props.tc === 'actionModifier') {
                c_attributs.onCell = (value, idx) => {
                    return {
                        onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (props.action && idx !== indexElementSelectionne) {
                                props.action(value, idx);
                            }
                        },
                    };
                };
                c_attributs.render = () => {
                    return <ActionTableauModifier typeEntite={props.typeEntite} />;
                };
                c_attributs.title = '';
                c_attributs.width = 42;
                c_attributs.className = 'colonneAction';
            } else if (props.tc === 'actionConsulter') {
                c_attributs.onCell = (value, idx) => {
                    return {
                        onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (props.action && idx !== indexElementSelectionne) {
                                props.action(value, idx);
                            }
                        },
                    };
                };
                c_attributs.render = () => {
                    return <ActionTableauConsulter typeEntite={props.typeEntite} />;
                };
                c_attributs.title = '';
                c_attributs.width = 42;
                c_attributs.className = 'colonneAction';
            } else if (props.tc === 'actionSupprimer') {
                c_attributs.onCell = (value, idx) => {
                    return {
                        onClick: (evt) => {
                            evt.preventDefault();
                            evt.stopPropagation();
                            if (props.action) {
                                props.action(value, idx);
                            }
                        },
                    };
                };
                c_attributs.render = () => {
                    return <ActionTableauSupprimer typeEntite={props.typeEntite} />;
                };
                c_attributs.title = '';
                c_attributs.width = 42;
                c_attributs.className = 'colonneAction';
            } else {
                c_attributs.render = (text) => {
                    return util.nonNul(text) ? text : '';
                };
            }
            if (props.trier) {
                c_attributs.sorter = props.trier;
            }
            colonnes.push(c_attributs);
        });
        return colonnes;
    }, [children]);

    const handleTableChange = (pagination: TablePaginationConfig) => {
        if (siChangementPage) {
            siChangementPage(pagination.current ?? 1);
        }
    };

    useEffect(() => {
        setClesSelectionnees([]);
    }, [listeDonnee]);

    useEffect(() => {
        if (pagination) {
            setTablePagination({
                current: pagination.pageCourante ?? 1,
                pageSize: pagination.nombreLigneParPage ?? 10,
                total: pagination.nombreTotalDeLigne ?? 0,
                showSizeChanger: false,
            });
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
        return indexElementSelectionne === index ? 'selectionne' : '';
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
                onChange: (selectedRowKeys: React.Key[], selectedRows: any[]) => {
                    siSelectionChange(selectedRows);
                    setClesSelectionnees(selectedRowKeys);
                },
            } as any;
            return a;
        }
        return undefined;
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
        <STable
            id={id ?? undefined} //
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
            scroll={scroll ?? undefined}
            expandable={expandable ?? undefined}
            $type={type ?? 'normal'}
            bordered
        ></STable>
    );
};

export default Tableau;

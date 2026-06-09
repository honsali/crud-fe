import { PlusCircleFilled } from '@ant-design/icons';
import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';
import { ActionUcNormale, BlocAction, Colonne, Tableau } from 'waxant';
import { ActionModule } from '../../ActionModule';
import useListerModule from '../useListerModule';
import FormulaireField from './FormulaireField';

const TableauField = ({ entity }) => {
    const { creerField, etatCreerField, listeField, listerFieldParIdEntity, etatMajField, etatSupprimerField, resetEtatMajField, resetEtatSupprimerField } = useListerModule()
    const [field, setField] = useState();
    const [selected, setSelected] = useState(null);
    const [inEdition, setInEdition] = useState(false);

    const creer = () => {
        creerField({ idEntity: entity?.id, field: { name: 'Nouveau Champ', entity: { id: entity?.id } } });
    };
    const siClicLigne = (element, index) => {
        setField(element);
        setSelected(index);
        setInEdition(true);
    }
    useEffect(() => {
        if (entity?.id) {
            listerFieldParIdEntity({ idEntity: entity.id });
        }
    }, [entity]);

    const stopEdition = () => {
        setField(null);
        setSelected(null);
        setInEdition(false);
    };
    useEffect(() => {
        if (etatSupprimerField.succes) {
            stopEdition();
            resetEtatSupprimerField();
        }
    }, [etatSupprimerField.succes]);

    useEffect(() => {
        if (etatMajField.succes) {
            stopEdition();
            resetEtatMajField();
        }
    }, [etatMajField.succes]);
    //
    return (
        <Row gutter={20} wrap={false}>
            <Col flex={inEdition ? '320px' : 'auto'} style={{ minWidth: 320 }}>
                <Tableau listeDonnee={listeField} texteAucunResultat="aucun.field" siClicLigne={siClicLigne} indexElementSelectionne={selected}>
                    <Colonne nom="name" />
                    {!inEdition && <Colonne tc="ouiNon" nom="required" />}
                    {!inEdition && <Colonne tc="ouiNon" nom="uniq" />}
                    {!inEdition && <Colonne tc="reference" nom="fieldType" />}
                    {!inEdition && <Colonne tc="reference" nom="refEntity" />}
                </Tableau>
                {!inEdition && (
                    <BlocAction>
                        <ActionUcNormale icone={<PlusCircleFilled />} nom={ActionModule.UcListerModule.CREER_FIELD} action={creer} rid={etatCreerField.rid} />
                    </BlocAction>
                )}
            </Col>
            {inEdition && (
                <Col flex="auto">
                    <FormulaireField field={field} stopEdition={stopEdition} />
                </Col>
            )}
        </Row>
    );
};

export default TableauField;

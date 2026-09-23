import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlCreerConge from './CtrlCreerConge';
import { MdlCreerConge, ReqCreerConge, selectEtatCreerConge, selectIdConge } from './MdlCreerConge';

export const useCreerConge = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const etatCreerConge = useSelector(selectEtatCreerConge);
    const idConge = useSelector(selectIdConge);

    const creerConge = useCallback(async (form: FormInstance<IConge>) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IConge;
        return dispatch(CtrlCreerConge.creerConge({ request, idEmploye } as ReqCreerConge));
    }, [dispatch, idEmploye]);

    const resetEtatCreerConge = useCallback(
        () => dispatch(MdlCreerConge.resetEtatCreerConge()),
        [dispatch],
    );

    return {
        creerConge,
        resetEtatCreerConge,
        etatCreerConge,
        idConge,
    };
};

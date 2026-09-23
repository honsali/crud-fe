import { FormInstance } from 'antd';
import { IConge } from 'modele/rh/conge/DomaineConge';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierConge from './CtrlModifierConge';
import { MdlModifierConge, ReqModifierConge, selectConge, selectEtatInitModificationConge, selectEtatMajConge } from './MdlModifierConge';

export const useInitModificationConge = () => {
    const dispatch = useAppDispatch();
    const { idConge } = useParams();
    const conge = useSelector(selectConge);
    const etatInitModificationConge = useSelector(selectEtatInitModificationConge);

    useEffect(() => {
        dispatch(CtrlModifierConge.initModificationConge({ idConge } as ReqModifierConge));
    }, [dispatch, idConge]);

    return {
        conge,
        etatInitModificationConge,
    };
};

export const useMajConge = () => {
    const dispatch = useAppDispatch();
    const { idConge } = useParams();
    const etatMajConge = useSelector(selectEtatMajConge);

    const majConge = useCallback(async ({ form, ...req }: Partial<ReqModifierConge> & { form: FormInstance<IConge> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IConge;
        return dispatch(CtrlModifierConge.majConge({ ...req, request, idConge } as ReqModifierConge));
    }, [dispatch, idConge]);

    const resetEtatMajConge = useCallback(
        () => dispatch(MdlModifierConge.resetEtatMajConge()),
        [dispatch],
    );

    return {
        majConge,
        resetEtatMajConge,
        etatMajConge,
    };
};

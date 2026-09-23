import { FormInstance } from 'antd';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierEmploye from './CtrlModifierEmploye';
import { MdlModifierEmploye, ReqModifierEmploye, selectEmploye, selectEtatInitModificationEmploye, selectEtatMajEmploye } from './MdlModifierEmploye';

export const useInitModificationEmploye = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const employe = useSelector(selectEmploye);
    const etatInitModificationEmploye = useSelector(selectEtatInitModificationEmploye);

    useEffect(() => {
        dispatch(CtrlModifierEmploye.initModificationEmploye({ idEmploye } as ReqModifierEmploye));
    }, [dispatch, idEmploye]);

    return {
        employe,
        etatInitModificationEmploye,
    };
};

export const useMajEmploye = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const etatMajEmploye = useSelector(selectEtatMajEmploye);

    const majEmploye = useCallback(async ({ form, ...req }: Partial<ReqModifierEmploye> & { form: FormInstance<IEmploye> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IEmploye;
        return dispatch(CtrlModifierEmploye.majEmploye({ ...req, request, idEmploye } as ReqModifierEmploye));
    }, [dispatch, idEmploye]);

    const resetEtatMajEmploye = useCallback(
        () => dispatch(MdlModifierEmploye.resetEtatMajEmploye()),
        [dispatch],
    );

    return {
        majEmploye,
        resetEtatMajEmploye,
        etatMajEmploye,
    };
};

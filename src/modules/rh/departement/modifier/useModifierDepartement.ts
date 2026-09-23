import { FormInstance } from 'antd';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch, util } from 'waxant';
import CtrlModifierDepartement from './CtrlModifierDepartement';
import { MdlModifierDepartement, ReqModifierDepartement, selectDepartement, selectEtatInitModificationDepartement, selectEtatMajDepartement } from './MdlModifierDepartement';

export const useInitModificationDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams();
    const departement = useSelector(selectDepartement);
    const etatInitModificationDepartement = useSelector(selectEtatInitModificationDepartement);

    useEffect(() => {
        dispatch(CtrlModifierDepartement.initModificationDepartement({ idDepartement } as ReqModifierDepartement));
    }, [dispatch, idDepartement]);

    return {
        departement,
        etatInitModificationDepartement,
    };
};

export const useMajDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams();
    const etatMajDepartement = useSelector(selectEtatMajDepartement);

    const majDepartement = useCallback(async ({ form, ...req }: Partial<ReqModifierDepartement> & { form: FormInstance<IDepartement> }) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IDepartement;
        return dispatch(CtrlModifierDepartement.majDepartement({ ...req, request, idDepartement } as ReqModifierDepartement));
    }, [dispatch, idDepartement]);

    const resetEtatMajDepartement = useCallback(
        () => dispatch(MdlModifierDepartement.resetEtatMajDepartement()),
        [dispatch],
    );

    return {
        majDepartement,
        resetEtatMajDepartement,
        etatMajDepartement,
    };
};

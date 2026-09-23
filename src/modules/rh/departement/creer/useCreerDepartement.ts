import { FormInstance } from 'antd';
import { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, util } from 'waxant';
import CtrlCreerDepartement from './CtrlCreerDepartement';
import { MdlCreerDepartement, ReqCreerDepartement, selectEtatCreerDepartement, selectIdDepartement } from './MdlCreerDepartement';

export const useCreerDepartement = () => {
    const dispatch = useAppDispatch();
    const etatCreerDepartement = useSelector(selectEtatCreerDepartement);
    const idDepartement = useSelector(selectIdDepartement);

    const creerDepartement = useCallback(async (form: FormInstance<IDepartement>) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IDepartement;
        return dispatch(CtrlCreerDepartement.creerDepartement({ request } as ReqCreerDepartement));
    }, [dispatch]);

    const resetEtatCreerDepartement = useCallback(
        () => dispatch(MdlCreerDepartement.resetEtatCreerDepartement()),
        [dispatch],
    );

    return {
        creerDepartement,
        resetEtatCreerDepartement,
        etatCreerDepartement,
        idDepartement,
    };
};

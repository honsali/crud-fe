import { FormInstance } from 'antd';
import { IEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, util } from 'waxant';
import CtrlCreerEmploye from './CtrlCreerEmploye';
import { MdlCreerEmploye, ReqCreerEmploye, selectEtatCreerEmploye, selectIdEmploye } from './MdlCreerEmploye';

export const useCreerEmploye = () => {
    const dispatch = useAppDispatch();
    const etatCreerEmploye = useSelector(selectEtatCreerEmploye);
    const idEmploye = useSelector(selectIdEmploye);

    const creerEmploye = useCallback(async (form: FormInstance<IEmploye>) => {
        const request = util.removeNonSerialisable(await form.validateFields()) as IEmploye;
        return dispatch(CtrlCreerEmploye.creerEmploye({ request } as ReqCreerEmploye));
    }, [dispatch]);

    const resetEtatCreerEmploye = useCallback(
        () => dispatch(MdlCreerEmploye.resetEtatCreerEmploye()),
        [dispatch],
    );

    return {
        creerEmploye,
        resetEtatCreerEmploye,
        etatCreerEmploye,
        idEmploye,
    };
};

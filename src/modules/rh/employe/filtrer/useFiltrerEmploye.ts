import { FormInstance } from 'antd';
import { IRequeteEmploye } from 'modele/rh/employe/DomaineEmploye';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch, util } from 'waxant';
import CtrlFiltrerEmploye from './CtrlFiltrerEmploye';
import { ReqFiltrerEmploye, selectListePagineeEmploye } from './MdlFiltrerEmploye';

export const useChangerPageFiltrerEmploye = () => {
    const dispatch = useAppDispatch();
    const listePagineeEmploye = useSelector(selectListePagineeEmploye);

    const changerPageFiltrerEmploye = useCallback(
        (req?: Partial<ReqFiltrerEmploye>) => dispatch(CtrlFiltrerEmploye.changerPageFiltrerEmploye({ ...req } as ReqFiltrerEmploye)),
        [dispatch],
    );

    return {
        changerPageFiltrerEmploye,
        listePagineeEmploye,
    };
};

export const useFiltrerEmploye = () => {
    const dispatch = useAppDispatch();

    const filtrerEmploye = useCallback(async ({ form, ...req }: Partial<ReqFiltrerEmploye> & { form: FormInstance<IRequeteEmploye> }) => {
        const filtre = util.removeNonSerialisable(form.getFieldsValue()) as IRequeteEmploye;
        return dispatch(CtrlFiltrerEmploye.filtrerEmploye({ ...req, filtre } as ReqFiltrerEmploye));
    }, [dispatch]);

    return {
        filtrerEmploye,
    };
};

export const useInitialiserFiltrerEmploye = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(CtrlFiltrerEmploye.initialiserFiltrerEmploye({} as ReqFiltrerEmploye));
    }, [dispatch]);

    const initialiserFiltrerEmploye = useCallback(
        (req?: Partial<ReqFiltrerEmploye>) => dispatch(CtrlFiltrerEmploye.initialiserFiltrerEmploye({ ...req } as ReqFiltrerEmploye)),
        [dispatch],
    );

    return {
        initialiserFiltrerEmploye,
    };
};

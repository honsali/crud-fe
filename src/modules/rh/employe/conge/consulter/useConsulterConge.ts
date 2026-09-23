import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterConge from './CtrlConsulterConge';
import { MdlConsulterConge, ReqConsulterConge, selectConge, selectEtatSupprimerConge } from './MdlConsulterConge';

export const useRecupererCongeParId = () => {
    const dispatch = useAppDispatch();
    const { idConge } = useParams();
    const conge = useSelector(selectConge);

    useEffect(() => {
        dispatch(CtrlConsulterConge.recupererCongeParId({ idConge } as ReqConsulterConge));
    }, [dispatch, idConge]);

    return {
        conge,
    };
};

export const useSupprimerConge = () => {
    const dispatch = useAppDispatch();
    const { idConge } = useParams();
    const etatSupprimerConge = useSelector(selectEtatSupprimerConge);

    const supprimerConge = useCallback(
        (req?: Partial<ReqConsulterConge>) => dispatch(CtrlConsulterConge.supprimerConge({ ...req, idConge } as ReqConsulterConge)),
        [dispatch, idConge],
    );

    const resetEtatSupprimerConge = useCallback(
        () => dispatch(MdlConsulterConge.resetEtatSupprimerConge()),
        [dispatch],
    );

    return {
        supprimerConge,
        resetEtatSupprimerConge,
        etatSupprimerConge,
    };
};

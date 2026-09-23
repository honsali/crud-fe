import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterEmploye from './CtrlConsulterEmploye';
import { MdlConsulterEmploye, ReqConsulterEmploye, selectEmploye, selectEtatSupprimerEmploye, selectListeConge } from './MdlConsulterEmploye';

export const useListerCongeParIdEmploye = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const listeConge = useSelector(selectListeConge);

    useEffect(() => {
        dispatch(CtrlConsulterEmploye.listerCongeParIdEmploye({ idEmploye } as ReqConsulterEmploye));
    }, [dispatch, idEmploye]);

    return {
        listeConge,
    };
};

export const useRecupererEmployeParId = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const employe = useSelector(selectEmploye);

    useEffect(() => {
        dispatch(CtrlConsulterEmploye.recupererEmployeParId({ idEmploye } as ReqConsulterEmploye));
    }, [dispatch, idEmploye]);

    return {
        employe,
    };
};

export const useSupprimerEmploye = () => {
    const dispatch = useAppDispatch();
    const { idEmploye } = useParams();
    const etatSupprimerEmploye = useSelector(selectEtatSupprimerEmploye);

    const supprimerEmploye = useCallback(
        (req?: Partial<ReqConsulterEmploye>) => dispatch(CtrlConsulterEmploye.supprimerEmploye({ ...req, idEmploye } as ReqConsulterEmploye)),
        [dispatch, idEmploye],
    );

    const resetEtatSupprimerEmploye = useCallback(
        () => dispatch(MdlConsulterEmploye.resetEtatSupprimerEmploye()),
        [dispatch],
    );

    return {
        supprimerEmploye,
        resetEtatSupprimerEmploye,
        etatSupprimerEmploye,
    };
};

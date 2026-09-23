import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { MdlConsulterDepartement, ReqConsulterDepartement, selectDepartement, selectEtatRecupererDepartementParId, selectEtatSupprimerDepartement } from './MdlConsulterDepartement';

export const useRecupererDepartementParId = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams();

    const departement = useSelector(selectDepartement);
    const etatRecupererDepartementParId = useSelector(selectEtatRecupererDepartementParId);

    const recupererDepartementParId = useCallback(
        (req?: Partial<ReqConsulterDepartement>) => dispatch(CtrlConsulterDepartement.recupererDepartementParId({ ...req, idDepartement } as ReqConsulterDepartement)),
        [dispatch, idDepartement],
    );
    const resetEtatRecupererDepartementParId = useCallback(
        () => dispatch(MdlConsulterDepartement.resetEtatRecupererDepartementParId()),
        [dispatch],
    );

    return {
        recupererDepartementParId,
        resetEtatRecupererDepartementParId,
        departement,
        etatRecupererDepartementParId,
    };
};

export const useSupprimerDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams();

    const etatSupprimerDepartement = useSelector(selectEtatSupprimerDepartement);

    const supprimerDepartement = useCallback(
        (req?: Partial<ReqConsulterDepartement>) => dispatch(CtrlConsulterDepartement.supprimerDepartement({ ...req, idDepartement } as ReqConsulterDepartement)),
        [dispatch, idDepartement],
    );
    const resetEtatSupprimerDepartement = useCallback(
        () => dispatch(MdlConsulterDepartement.resetEtatSupprimerDepartement()),
        [dispatch],
    );

    return {
        supprimerDepartement,
        resetEtatSupprimerDepartement,
        etatSupprimerDepartement,
    };
};

import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useAppDispatch } from 'waxant';
import CtrlConsulterDepartement from './CtrlConsulterDepartement';
import { MdlConsulterDepartement, selectEtatSupprimerDepartement } from './MdlConsulterDepartement';

const useSupprimerDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const etatSupprimerDepartement = useSelector(selectEtatSupprimerDepartement);

    const supprimerDepartement = useCallback(() => {
        if (idDepartement) {
            return dispatch(CtrlConsulterDepartement.supprimerDepartement({ idDepartement }));
        }
    }, [dispatch, idDepartement]);

    const resetEtatSupprimerDepartement = useCallback(() => {
        dispatch(MdlConsulterDepartement.resetEtatSupprimerDepartement());
    }, [dispatch]);

    return { supprimerDepartement, resetEtatSupprimerDepartement, etatSupprimerDepartement };
};

export default useSupprimerDepartement;

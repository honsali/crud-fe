import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { action, useAppDispatch } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import type { ConsulterDepartementType, ReqConsulterDepartement, ResConsulterDepartement } from './MdlConsulterDepartement';

// Définie une seule fois ; le Mdl écoute le cycle de cette action.
export const recupererDepartementParId = action<ReqConsulterDepartement, ResConsulterDepartement>(
    async (requete, resultat) => {
        resultat.departement = await ServiceDepartement.recupererParId(requete.idDepartement);
    },
    ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID,
);

const selectDepartement = (state: { mdlConsulterDepartement: ConsulterDepartementType }) => state.mdlConsulterDepartement.departement;

const useCtrlConsulterDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const departement = useSelector(selectDepartement);

    useEffect(() => {
        if (idDepartement) {
            dispatch(recupererDepartementParId({ idDepartement }));
        }
    }, [dispatch, idDepartement]);

    return { departement };
};

export default useCtrlConsulterDepartement;

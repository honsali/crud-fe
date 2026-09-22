import _ from 'lodash';
import type { IDepartement } from 'modele/rh/departement/DomaineDepartement';
import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MdlMessage, serializeError, useAppDispatch } from 'waxant';
import { getErrorMessage } from 'waxant/noyau/redux/ErrorSerializationMiddleware';
import { ActionDepartement } from '../ActionDepartement';

const actionName = ActionDepartement.UcConsulterDepartement.RECUPERER_DEPARTEMENT_PAR_ID;

const useCtrlConsulterDepartement = () => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const [departement, setDepartement] = useState<IDepartement>();

    useEffect(() => {
        setDepartement(undefined);
        if (!idDepartement) {
            return;
        }

        let actif = true;
        const rid = _.uniqueId('consulterDepartement-');
        dispatch(MdlMessage.initialiser());
        dispatch(MdlMessage.setActionEnCours({ rid, actionName }));

        const recupererDepartement = async () => {
            try {
                const resultat = await ServiceDepartement.recupererParId(idDepartement);
                if (actif) {
                    setDepartement(resultat);
                    dispatch(MdlMessage.setInfoActionReussie({ type: actionName, key: 'fulfilled', data: { rid, departement: resultat } }));
                }
            } catch (erreur) {
                if (actif) {
                    dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(serializeError(erreur))));
                }
            } finally {
                if (actif) {
                    dispatch(MdlMessage.finAction(rid));
                }
            }
        };

        void recupererDepartement();

        return () => {
            // Ignorer les réponses de l'ancien département ou d'un écran démonté.
            actif = false;
            dispatch(MdlMessage.finAction(rid));
        };
    }, [dispatch, idDepartement]);

    return { departement };
};

export default useCtrlConsulterDepartement;

import _ from 'lodash';
import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { useEffect, useRef, useTransition } from 'react';
import { useParams } from 'react-router';
import { MdlMessage, serializeError, useAppDispatch } from 'waxant';
import { getErrorMessage } from 'waxant/noyau/redux/ErrorSerializationMiddleware';
import { ActionDepartement } from '../ActionDepartement';

const actionName = ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT;

const useCtrlSupprimerDepartement = (apresSuppression: () => void) => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const [enCours, startTransition] = useTransition();
    const versionPage = useRef(0);

    useEffect(() => {
        return () => {
            versionPage.current += 1;
        };
    }, [idDepartement]);

    const supprimerDepartement = () => {
        if (!idDepartement || enCours) {
            return;
        }
        const versionAuDepart = versionPage.current;
        const urlAuDepart = window.location.href;
        const rid = _.uniqueId('supprimerDepartement-');
        dispatch(MdlMessage.initialiser());
        dispatch(MdlMessage.setActionEnCours({ rid, actionName }));

        startTransition(async () => {
            try {
                await ServiceDepartement.supprimer(idDepartement);
                dispatch(MdlMessage.setInfoActionReussie({ type: actionName, key: 'fulfilled', data: { rid } }));

                // L'URL change avant le rendu de la route si React diffère la navigation.
                const pageToujoursActive = versionAuDepart === versionPage.current && urlAuDepart === window.location.href;
                if (pageToujoursActive) {
                    startTransition(apresSuppression);
                }
            } catch (erreur) {
                dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(serializeError(erreur))));
            } finally {
                dispatch(MdlMessage.finAction(rid));
            }
        });
    };

    return { supprimerDepartement, enCours };
};

export default useCtrlSupprimerDepartement;

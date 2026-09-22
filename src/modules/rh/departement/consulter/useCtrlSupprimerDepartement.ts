import ServiceDepartement from 'modele/rh/departement/ServiceDepartement';
import { useEffect, useRef, useTransition } from 'react';
import { useParams } from 'react-router';
import { action, useAppDispatch } from 'waxant';
import type { IResultat } from 'waxant';
import { ActionDepartement } from '../ActionDepartement';
import type { ReqConsulterDepartement } from './MdlConsulterDepartement';

const supprimerDepartement = action<ReqConsulterDepartement, IResultat>(
    async (requete) => {
        await ServiceDepartement.supprimer(requete.idDepartement);
    },
    ActionDepartement.UcConsulterDepartement.SUPPRIMER_DEPARTEMENT,
);

const useCtrlSupprimerDepartement = (apresSuppression: () => void) => {
    const dispatch = useAppDispatch();
    const { idDepartement } = useParams<{ idDepartement: string }>();
    const [enCours, startTransition] = useTransition();
    const versionPage = useRef(0);

    useEffect(() => () => {
        versionPage.current += 1;
    }, [idDepartement]);

    const supprimer = () => {
        if (!idDepartement || enCours) {
            return;
        }
        const versionAuDepart = versionPage.current;
        const urlAuDepart = window.location.href;

        startTransition(async () => {
            const resultat = await dispatch(supprimerDepartement({ idDepartement }));

            // L'URL change avant le rendu de la route si React diffère la navigation.
            const pageToujoursActive = versionAuDepart === versionPage.current && urlAuDepart === window.location.href;
            if (supprimerDepartement.fulfilled.match(resultat) && pageToujoursActive) {
                startTransition(apresSuppression);
            }
        });
    };

    return { supprimerDepartement: supprimer, enCours };
};

export default useCtrlSupprimerDepartement;

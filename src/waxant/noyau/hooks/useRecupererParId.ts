import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { MdlMessage } from '../message/MdlMessage';
import { serializeError } from '../redux/action';
import { getErrorMessage } from '../redux/ErrorSerializationMiddleware';
import useAppDispatch from '../redux/useAppDispatch';

const useRecupererParId = <T>(nomParam: string, recupererParId: (id: string) => Promise<T>, actionName: string) => {
    const dispatch = useAppDispatch();
    const id = useParams()[nomParam];
    const [donnee, setDonnee] = useState<T>();

    useEffect(() => {
        setDonnee(undefined);
        if (!id) {
            return;
        }

        const rid = _.uniqueId('recupererParId-');
        dispatch(MdlMessage.initialiser());
        dispatch(MdlMessage.setActionEnCours({ rid, actionName }));

        const charger = async () => {
            try {
                const resultat = await recupererParId(id);
                setDonnee(resultat);
            } catch (erreur) {
                dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(serializeError(erreur))));
            } finally {
                dispatch(MdlMessage.finAction(rid));
            }
        };

        void charger();
    }, [dispatch, id, recupererParId, actionName]);

    return donnee;
};

export default useRecupererParId;

import _ from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router';
import useContexteAuth from '../auth/ContexteAuth';
import { MdlMessage } from '../message/MdlMessage';
import util from '../util/util';
import { IResultat, serializeError } from './action';
import useAppDispatch from './useAppDispatch';

const estActionReussie = (actionToBeExecuted, actionResult): boolean => {
    return actionToBeExecuted?.fulfilled?.match?.(actionResult) || actionResult?.type?.endsWith('/fulfilled');
};

const estActionEchouee = (actionToBeExecuted, actionResult): boolean => {
    return actionToBeExecuted?.rejected?.match?.(actionResult) || actionResult?.type?.endsWith('/rejected');
};

const useExecute = (resultat?: IResultat) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user, role } = useContexteAuth();
    const [rid, setRid] = useState(null);
    const [success, setSuccess] = useState(false);
    const [erreur, setErreur] = useState(false);
    const ridRef = useRef<string | null>(null);
    const mountedRef = useRef(false);

    useEffect(() => {
        mountedRef.current = true;
        return () => {
            mountedRef.current = false;
        };
    }, []);

    const finaliserExecution = useCallback((ridExecution: string, estReussie: boolean) => {
        if (!mountedRef.current || ridRef.current !== ridExecution) {
            return;
        }

        ridRef.current = null;
        setRid(null);
        setSuccess(estReussie);
        setErreur(!estReussie);
    }, []);

    useEffect(() => {
        if (rid && rid === resultat?.rid) {
            finaliserExecution(rid, true);
        }
    }, [finaliserExecution, resultat?.rid, rid]);

    const execute = (actionToBeExecuted, args?: any) => {
        const uniqueRid = _.uniqueId();
        ridRef.current = uniqueRid;
        setRid(uniqueRid);
        setSuccess(false);
        setErreur(false);

        const dispatchResult = dispatch(actionToBeExecuted({ rid: uniqueRid, ...args, ...params, user, role }));
        Promise.resolve(dispatchResult)
            .then((actionResult) => {
                if (estActionReussie(actionToBeExecuted, actionResult)) {
                    finaliserExecution(uniqueRid, true);
                } else if (estActionEchouee(actionToBeExecuted, actionResult)) {
                    finaliserExecution(uniqueRid, false);
                }
            })
            .catch(() => {
                finaliserExecution(uniqueRid, false);
            });

        return Promise.resolve(dispatchResult);
    };

    const executeByForm = async (actionToBeExecuted, form, args?: any, validation?: (form) => void | Promise<void>) => {
        try {
            await form.validateFields();
            if (validation) {
                await validation(form);
            }
            const dataForm = util.removeNonSerialisable(form.getFieldsValue());
            return execute(actionToBeExecuted, { ...args, dataForm });
        } catch (err) {
            const erreurSerialisee = serializeError(err);
            ridRef.current = null;
            setRid(null);
            setSuccess(false);
            setErreur(true);
            if (erreurSerialisee.status === -1) {
                dispatch(MdlMessage.setInfoActionEchouee({
                    code: 'error.validation.form',
                    listeErreurServeur: erreurSerialisee.data?.errors,
                }));
            }
            return erreurSerialisee;
        }
    };

    return { execute, executeByForm, rid, success, erreur };
};

export default useExecute;

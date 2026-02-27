import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useContexteAuth from '../auth/ContexteAuth';
import { type IResultat } from './action';
import useAppDispatch from './useAppDispatch';

export interface ExecuteResponse {
    execute?: (actionToBeExecuted: any, args?: any) => Promise<unknown>;
    succes?: boolean;
    erreur?: boolean;
    rid?: string | null;
};

const useExecute = (resultat?: IResultat): ExecuteResponse => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user, role } = useContexteAuth();
    const [rid, setRid] = useState<string | null>(null);
    const [succes, setSucces] = useState(false);
    const [erreur, setErreur] = useState(false);

    useEffect(() => {
        if (rid && rid === resultat?.rid) {
            setRid(null);
            setSucces(true);
            setErreur(false);
        } else if (resultat?.rid === 'erreur') {
            setRid(null);
            setSucces(false);
            setErreur(true);
        }
    }, [resultat, rid]);

    const execute = (actionToBeExecuted, args?: any) => {
        return new Promise((resolve) => {
            const uniqueRid = _.uniqueId();
            setRid(uniqueRid);
            setSucces(false);
            dispatch(actionToBeExecuted({ rid: uniqueRid, ...args, ...params, user, role }));
        });
    };

    return { execute, rid, succes, erreur };
};

export default useExecute;

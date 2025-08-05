import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import useContexteAuth from '../auth/ContexteAuth';
import { IResultat } from './action';
import useAppDispatch from './useAppDispatch';

const useExecute = (resultat?: IResultat) => {
    const dispatch = useAppDispatch();
    const params = useParams();
    const { user, role } = useContexteAuth();
    const [rid, setRid] = useState(null);
    const [success, setSuccess] = useState(false);
    const [erreur, setErreur] = useState(false);

    useEffect(() => {
        if (rid && rid === resultat?.rid) {
            setRid(null);
            setSuccess(true);
            setErreur(false);
        } else if (resultat?.rid === 'erreur') {
            setRid(null);
            setSuccess(false);
            setErreur(true);
        }
    }, [resultat, rid]);

    const execute = (actionToBeExecuted, args?: any) => {
        return new Promise((resolve) => {
            const uniqueRid = _.uniqueId();
            setRid(uniqueRid);
            setSuccess(false);
            dispatch(actionToBeExecuted({ rid: uniqueRid, ...args, ...params, user, role }));
        });
    };

    return { execute, rid, success, erreur };
};

export default useExecute;

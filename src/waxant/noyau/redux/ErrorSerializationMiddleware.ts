// --- ErrorSerializationMiddleware.ts ---
import _ from 'lodash';
import type { Middleware } from 'redux';
import { IInfoActionEchouee } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';
import { WaxantAction } from './StoreDynamique';


interface ErrorResponse {
    data: {
        code?: string;
        errors?: Array<{ libelle: string }>;
    };
    status: number;
}

type ErrorMessageHandler = (err: ErrorResponse) => IInfoActionEchouee;

const ERROR_MESSAGES: Record<number, ErrorMessageHandler> = {
    [-1]: (err) => ({
        code: 'error.validation.form',
        listeErreurServeur: err.data?.errors
    }),
    [0]: () => ({
        code: 'error.server.not.reachable'
    }),
    [400]: (err) => ({
        code: 'error.bad.request',
        erreur: err.data.code,
        listeErreurServeur: err.data?.errors
    }),
    [403]: () => ({
        code: 'error.url.not.authorized'
    }),
    [404]: () => ({
        code: 'error.url.not.found'
    }),
    [500]: () => ({
        code: 'error.server.error'
    })
};


const isRejectedAction = (action: WaxantAction): boolean =>
    Boolean(action?.type?.endsWith('/rejected'));

export const ErrorSerializationMiddleware: Middleware = (store) => (next) => (action: WaxantAction) => {
    const state = store.getState();

    const { error, payload } = action as any;
    const [type, key] = _.split(action.type, '/');
    if (isRejectedAction(action) && error) {
        const err = error?.message === 'Rejected' ? payload : error as ErrorResponse;
        let message: IInfoActionEchouee = { code: payload };

        if (err.status && ERROR_MESSAGES[err.status]) {
            message = ERROR_MESSAGES[err.status](err);
        }

        store.dispatch(MdlMessage.setInfoActionEchouee(message));
    }
    return next(action);
};

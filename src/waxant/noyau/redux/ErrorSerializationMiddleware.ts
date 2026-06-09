// --- ErrorSerializationMiddleware.ts ---
import { isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';
import { IErreurServeur, IInfoActionEchouee } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';
import { WaxantAction } from './StoreDynamique';

interface ErrorData {
    code?: string;
    message?: string;
    params?: any[];
    errors?: IErreurServeur[];
}

interface ErrorResponse {
    data?: ErrorData;
    status?: number;
    message?: string;
}

type ErrorMessageHandler = (err: ErrorResponse) => IInfoActionEchouee;

const getErrorData = (err: ErrorResponse): ErrorData => {
    return typeof err?.data === 'object' && err.data !== null ? err.data : {};
};

const getBadRequestMessage = (err: ErrorResponse): IInfoActionEchouee => {
    const data = getErrorData(err);
    return {
        code: 'error.bad.request',
        erreur: data.code || data.message,
        params: data.params,
        listeErreurServeur: data.errors,
    };
};

const ERROR_MESSAGES: Record<number, ErrorMessageHandler> = {
    [-1]: (err) => ({
        code: 'error.validation.form',
        listeErreurServeur: getErrorData(err).errors
    }),
    [0]: () => ({
        code: 'error.server.not.reachable'
    }),
    [400]: getBadRequestMessage,
    [401]: () => ({
        code: 'error.url.not.authorized'
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

const getDefaultErrorMessage = (err: ErrorResponse): IInfoActionEchouee => {
    if (err?.status >= 400 && err.status < 500) {
        return getBadRequestMessage(err);
    }

    if (err?.status >= 500) {
        return { code: 'error.server.error' };
    }

    if (err?.message) {
        return { code: err.message };
    }

    return { code: 'error.server.error' };
};

const getErrorMessage = (err: ErrorResponse): IInfoActionEchouee => {
    if (err?.status !== undefined && ERROR_MESSAGES[err.status]) {
        return ERROR_MESSAGES[err.status](err);
    }

    return getDefaultErrorMessage(err);
};

export const ErrorSerializationMiddleware: Middleware = (store) => (next) => (action: WaxantAction) => {
    const { error, payload } = action as any;

    if (isRejectedWithValue(action)) {
        store.dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(payload as ErrorResponse)));
    } else if (isRejected(action) && error) {
        store.dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(error as ErrorResponse)));
    }
    return next(action);
};

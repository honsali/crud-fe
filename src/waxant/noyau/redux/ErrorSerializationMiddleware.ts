import { isAction, isRejected, isRejectedWithValue } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';
import type { IErreurServeur, IInfoActionEchouee } from '../message/DomaineMessage';
import { MdlMessage } from '../message/MdlMessage';
import type { WaxantAction } from './StoreDynamique';

interface FieldViolation {
    field?: string;
    message?: string;
}

interface ErrorData {
    code?: string;
    message?: string;
    detail?: string;
    params?: any[];
    errors?: IErreurServeur[];
    fields?: FieldViolation[];
}

interface ErrorResponse {
    data?: ErrorData;
    status?: number;
    message?: string;
}

type ErrorMessageHandler = (error: ErrorResponse) => IInfoActionEchouee;

const getErrorData = (error: ErrorResponse): ErrorData => {
    return typeof error?.data === 'object' && error.data !== null ? error.data : {};
};

const getServerErrors = (data: ErrorData): IErreurServeur[] | undefined => {
    if (data.errors?.length) {
        return data.errors;
    }
    if (!data.fields?.length) {
        return undefined;
    }

    return data.fields.map((field) => ({
        code: field.message || 'validation',
        arguments: field.field ? [field.field] : [],
        libelle: [field.field, field.message].filter(Boolean).join(' : '),
    }));
};

const getProblemMessage = (error: ErrorResponse, code = 'error.bad.request'): IInfoActionEchouee => {
    const data = getErrorData(error);
    const directDetails = data.detail || data.message;
    return {
        code,
        status: error.status,
        erreur: data.code,
        params: data.params,
        listeErreurServeur: getServerErrors(data),
        listeErreurDirecte: directDetails ? [directDetails] : undefined,
    };
};

const ERROR_MESSAGES: Record<number, ErrorMessageHandler> = {
    [-1]: (error) => ({
        code: 'error.validation.form',
        listeErreurServeur: getErrorData(error).errors,
    }),
    [0]: () => ({
        code: 'error.server.not.reachable',
    }),
    [400]: (error) => getProblemMessage(error),
    [401]: () => ({
        code: 'error.url.not.authorized',
    }),
    [403]: () => ({
        code: 'error.url.not.authorized',
    }),
    [404]: (error) => getProblemMessage(error, 'error.url.not.found'),
    [409]: (error) => getProblemMessage(error),
    [500]: () => ({
        code: 'error.server.error',
    }),
};

const getDefaultErrorMessage = (error: ErrorResponse): IInfoActionEchouee => {
    if (typeof error.status === 'number' && error.status >= 400 && error.status < 500) {
        return getProblemMessage(error);
    }
    if (typeof error.status === 'number' && error.status >= 500) {
        return { code: 'error.server.error' };
    }
    if (error.message) {
        return {
            code: 'error.bad.request',
            listeErreurDirecte: [error.message],
        };
    }
    return { code: 'error.server.error' };
};

const getErrorMessage = (error: ErrorResponse): IInfoActionEchouee => {
    if (typeof error.status === 'number') {
        const handler = ERROR_MESSAGES[error.status];
        if (handler) {
            return handler(error);
        }
    }
    return getDefaultErrorMessage(error);
};

export const ErrorSerializationMiddleware: Middleware = (store) => (next) => (action) => {
    if (!isAction(action)) {
        return next(action);
    }

    const { error, payload } = action as WaxantAction;
    if (isRejectedWithValue(action)) {
        store.dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(payload as ErrorResponse)));
    } else if (isRejected(action) && error) {
        store.dispatch(MdlMessage.setInfoActionEchouee(getErrorMessage(error as ErrorResponse)));
    }
    return next(action);
};

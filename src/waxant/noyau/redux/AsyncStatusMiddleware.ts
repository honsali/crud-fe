import { isAction, isFulfilled, isPending } from '@reduxjs/toolkit';
import type { Middleware } from 'redux';
import { MdlMessage } from '../message/MdlMessage';

export const AsyncStatusMiddleware: Middleware = (store) => (next) => (action) => {
    if (!isAction(action)) {
        return next(action);
    }

    const [type = action.type, key = action.type] = action.type.split('/');
    if (isPending(action)) {
        store.dispatch(MdlMessage.initialiser());
    } else if (isFulfilled(action)) {
        store.dispatch(MdlMessage.setInfoActionReussie({
            key,
            type,
            data: action.payload,
        }));
    }

    return next(action);
};

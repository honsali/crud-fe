import { isFulfilled, isPending } from '@reduxjs/toolkit';
import _ from 'lodash';
import { Middleware } from 'redux';
import { MdlMessage } from '../message/MdlMessage';
import { WaxantAction } from './StoreDynamique';

export const AsyncStatusMiddleware: Middleware = (store) => (next) => (action: WaxantAction) => {
    const { payload } = action as any;
    const [type, key] = _.split(action.type, '/');

    if (isPending(action)) {
        store.dispatch(MdlMessage.initialiser());
    } else if (isFulfilled(action)) {
        store.dispatch(MdlMessage.setInfoActionReussie({ key, type, data: payload }));
    }

    return next(action);
};

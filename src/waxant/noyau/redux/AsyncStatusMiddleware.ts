// --- AsyncStatusMiddleware.ts ---
import _ from 'lodash';
import { type Middleware } from 'redux';
import { MdlMessage } from '../message/MdlMessage';
import { type WaxantAction } from './StoreDynamique';

const isPendingAction = (action: WaxantAction): boolean =>
    Boolean(action?.type?.endsWith('/pending'));

const isFulfilledAction = (action: WaxantAction): boolean =>
    Boolean(action?.type?.endsWith('/fulfilled'));

export const AsyncStatusMiddleware: Middleware = (store) => (next) => (action: WaxantAction) => {
    const { payload } = action as any;
    const [type = '', key = ''] = _.split(action.type ?? '', '/');

    if (isPendingAction(action)) {
        store.dispatch(MdlMessage.initialiser());
    } else if (isFulfilledAction(action)) {
        store.dispatch(MdlMessage.setInfoActionReussie({ key, type, data: payload }));
    }

    return next(action);
};

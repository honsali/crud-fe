import { Action, combineReducers, configureStore, Reducer, Store, ThunkAction, UnknownAction } from '@reduxjs/toolkit';
import MdlI18n from '../i18n/MdlI18n';
import MdlMessage from '../message/MdlMessage';
import { AsyncStatusMiddleware } from './AsyncStatusMiddleware';
import { ErrorSerializationMiddleware } from './ErrorSerializationMiddleware';

export interface WaxantAction extends UnknownAction {
    payload?: unknown;
    error?: unknown;
    meta?: unknown;
}

interface ReducerMap {
    [key: string]: Reducer;
}

let staticReducers: ReducerMap = {
    mdlMessage: MdlMessage,
    mdlI18n: MdlI18n,
};

const store = configureStore({
    reducer: combineReducers(staticReducers),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([AsyncStatusMiddleware, ErrorSerializationMiddleware]),
});

const getStore = () => {
    return store;
};

export const registerReducer = (newReducers: ReducerMap): Store<any> => {
    staticReducers = { ...staticReducers, ...newReducers };
    store.replaceReducer(combineReducers(staticReducers));
    return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action>;

export default getStore;

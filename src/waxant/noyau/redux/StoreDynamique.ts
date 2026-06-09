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

const coreReducers: ReducerMap = {
    mdlMessage: MdlMessage,
    mdlI18n: MdlI18n,
};

let staticReducers: ReducerMap = { ...coreReducers };

const RESET_STORE_ACTION = 'waxant/store/reset';

const createRootReducer = () => {
    const appReducer = combineReducers(staticReducers);
    return (state, action) => {
        if (action.type === RESET_STORE_ACTION) {
            return appReducer(undefined, action);
        }
        return appReducer(state, action);
    };
};

const store = configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend([AsyncStatusMiddleware, ErrorSerializationMiddleware]),
});

const getStore = () => {
    return store;
};

export const registerReducer = (newReducers: ReducerMap): Store<any> => {
    staticReducers = { ...staticReducers, ...newReducers };
    store.replaceReducer(createRootReducer());
    return store;
};

export const resetStore = (newReducers: ReducerMap = {}): Store<any> => {
    staticReducers = { ...coreReducers, ...newReducers };
    store.replaceReducer(createRootReducer());
    store.dispatch({ type: RESET_STORE_ACTION });
    return store;
};

export type IRootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, IRootState, unknown, Action>;

export default getStore;

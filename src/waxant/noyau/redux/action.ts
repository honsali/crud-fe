import { createAsyncThunk } from '@reduxjs/toolkit';
import _ from 'lodash';
import { MdlMessage } from '../message/MdlMessage';
import util from '../util/util';

export interface IRequete {
    uid?: string;
    rid?: string;
    user?: string;
    role?: string;
}

export interface IResultat {
    rid?: string;
}

interface SerializedError {
    data?: any;
    status?: number;
    message?: string;
}


export const serializeError = (value: any): SerializedError => {
    if (util.nonNul(value) && value.isAxiosError) {
        if (value.response) {
            return {
                data: value.response.data,
                status: value.response.status
            };
        }

        if (value.code === 'ECONNABORTED') {
            return { message: 'error.request.timeout' };
        }

        return { message: 'error.server.not.reachable', status: 0 };
    }

    if (util.nonNul(value) && value.errorFields) {
        return {
            status: -1,
            data: {
                errors: value.errorFields.map((err: any) => ({
                    libelle: err.errors[0]
                })),
            },
        };
    }

    if (value instanceof Error) {
        return { message: value.message };
    }

    if (typeof value === 'string') {
        return { message: value };
    }

    if (util.nonNul(value) && value.message) {
        return { message: value.message };
    }

    return { message: String(value) };
};

const action = <Req extends IRequete, Res extends IResultat>(operation, actionName) => {
    return createAsyncThunk(actionName, async (requete: Req, thunkAPI) => {
        const rid = requete.rid ? requete.rid : _.uniqueId();

        const x = { rid, actionName };
        await thunkAPI.dispatch(MdlMessage.setActionEnCours(x));
        const resultat = { rid } as Res;
        try {
            await operation({ rid, ...requete }, resultat, thunkAPI);
        } catch (err) {
            await thunkAPI.dispatch(MdlMessage.finAction(rid));
            return thunkAPI.rejectWithValue(serializeError(err));
        }
        await thunkAPI.dispatch(MdlMessage.finAction(rid));
        return resultat;
    });
};


export default action;

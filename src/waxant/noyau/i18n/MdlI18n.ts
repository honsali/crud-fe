import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IRootState } from '../redux/StoreDynamique';

const initialState = {
    mapLibelleI18n: {} as Record<string, string>,
    mapErreurI18n: {} as Record<string, string>,
    mapInfoActionI18n: {} as Record<string, string>,
};
type I18nStateType = typeof initialState;

export const I18nSlice = createSlice({
    name: 'i18n',
    initialState,
    reducers: {
        etendreLibelle: (state, action: PayloadAction<Record<string, string>>) => {
            const mapCourante = { ...state.mapLibelleI18n, ...action.payload };
            state.mapLibelleI18n = mapCourante;
        },
        etendreErreur: (state, action: PayloadAction<Record<string, string>>) => {
            const mapCourante = { ...state.mapErreurI18n, ...action.payload };
            state.mapErreurI18n = mapCourante;
        },
        etendreInfoAction: (state, action: PayloadAction<Record<string, string>>) => {
            const mapCourante = { ...state.mapInfoActionI18n, ...action.payload };
            state.mapInfoActionI18n = mapCourante;
        },
    },
});

const selectMdlI18nState = (state: IRootState) => state.mdlI18n;

export const libelleI18nSelecteur = createSelector([selectMdlI18nState], (state: I18nStateType) => state.mapLibelleI18n);
export const erreurI18nSelecteur = createSelector([selectMdlI18nState], (state: I18nStateType) => state.mapErreurI18n);
export const infoActionI18nSelecteur = createSelector([selectMdlI18nState], (state: I18nStateType) => state.mapInfoActionI18n);

export const MdlI18n = I18nSlice.actions;

export default I18nSlice.reducer;

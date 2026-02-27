import { createSelector, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import _ from 'lodash';
import { type IRootState } from '../redux/StoreDynamique';
import type { IInfoActionEchouee, IInfoActionReussie } from './DomaineMessage';

type MessageStateType = {
    infoActionEchouee: IInfoActionEchouee | null;
    infoActionEchoueeDansDialogue: IInfoActionEchouee | null;
    actionEnCours: Record<string, string[]>;
    infoActionReussie: IInfoActionReussie | null;
};

const initialState: MessageStateType = {
    infoActionEchouee: null,
    infoActionEchoueeDansDialogue: null,
    actionEnCours: {},
    infoActionReussie: null,
};

export const MessageSlice = createSlice({
    name: 'message',
    initialState,
    reducers: {
        initialiser: (state) => {
            return { ...initialState, actionEnCours: state.actionEnCours };
        },
        setActionEnCours: (state, action: PayloadAction<any>) => {
            let m = state.actionEnCours[action.payload.rid];
            if (!m) {
                m = [];
            }
            m.push(action.payload.actionName);
            state.actionEnCours[action.payload.rid] = m;
        },
        finAction: (state, action: PayloadAction<string>) => {
            state.actionEnCours = _.omit(state.actionEnCours, [action.payload]);
        },
        setInfoActionReussie: (state, action: PayloadAction<IInfoActionReussie>) => {
            state.infoActionReussie = action.payload;
        },
        setInfoActionEchouee: (state, action: PayloadAction<IInfoActionEchouee>) => {
            state.infoActionEchouee = action.payload;
        },
        setInfoActionEchoueeDansDialogue: (state, action: PayloadAction<IInfoActionEchouee>) => {
            state.infoActionEchoueeDansDialogue = action.payload;
        },
    },
});

const selectMdlMessageState = (state: IRootState) => state.mdlMessage;

export const selectInfoActionEchouee = createSelector([selectMdlMessageState], (state: MessageStateType) => state.infoActionEchouee);
export const selectInfoActionEchoueeDansDialogue = createSelector([selectMdlMessageState], (state: MessageStateType) => state.infoActionEchoueeDansDialogue);
export const selectInfoActionReussie = createSelector([selectMdlMessageState], (state: MessageStateType) => state.infoActionReussie);
export const selectActionEnCours = createSelector([selectMdlMessageState], (state: MessageStateType) => state.actionEnCours);

export const MdlMessage = MessageSlice.actions;

export default MessageSlice.reducer;

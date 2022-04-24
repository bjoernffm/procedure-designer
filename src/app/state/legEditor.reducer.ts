import { createReducer, on } from '@ngrx/store';
import { setSelectedLeg } from './legEditor.actions';
import { Leg } from './procedures.model';

export interface LegEditorState {
    selectedLeg: Leg|null
}

export const initialState : LegEditorState = {
    selectedLeg: null
};
 
export const legEditorReducer = createReducer(
    initialState,
    on(setSelectedLeg, (state, { leg }) => ({...state, selectedLeg: leg}))
);

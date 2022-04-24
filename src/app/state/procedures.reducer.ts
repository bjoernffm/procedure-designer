import { createReducer, on } from '@ngrx/store';
import { Serializer } from 'src/serializer';
import { setData } from './procedures.actions';
import { Procedure } from './procedures.model';
 
export const initialState : Procedure[] = [];
 
export const proceduresReducer = createReducer(
    initialState,
    on(setData, (state, { data }) => Serializer.deserialize(data))
);

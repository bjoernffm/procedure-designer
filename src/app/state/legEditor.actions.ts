import { createAction, props } from '@ngrx/store';
import { Leg } from './procedures.model';

export const setSelectedLeg = createAction(
    '[Main Page] SetSelectedId',
    props<{ leg: Leg }>()
);
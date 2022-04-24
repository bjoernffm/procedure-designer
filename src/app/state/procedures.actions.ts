import { createAction, props } from '@ngrx/store';

export const setData = createAction(
    '[Main Page] SetData',
    props<{ data: string }>()
);
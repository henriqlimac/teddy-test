import { createAction, props } from '@ngrx/store';

export const createUser = createAction(
  '[CREATE] User created',
  props<{ name: string; selected?: number[] }>()
);

export const addToUser = createAction(
  '[ADD] Add To User',
  props<{ payload: number }>()
);

export const removeFromUser = createAction(
  '[REMOVE] Remove From User',
  props<{ payload: number }>()
);

export const removeUser = createAction('[REMOVE] Users removed');

export const removeAll = createAction('[REMOVE] Remove All From User');

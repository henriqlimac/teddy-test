import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IUserState } from './user.state';

export const selectUserState =
  createFeatureSelector<IUserState>('selectedCount');

export const selectUserName = createSelector(
  selectUserState,
  (state) => state.name
);

export const selectUserSelected = createSelector(
  selectUserState,
  (state) => state.selected
);

export const selectFullUser = createSelector(selectUserState, (state) => state);

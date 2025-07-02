import { createReducer, on } from '@ngrx/store';
import {
  addToUser,
  createUser,
  removeAll,
  removeFromUser,
  removeUser,
} from './user.actions';
import { IUserState } from './user.state';

export const initialState: IUserState = {
  name: '',
  selected: [],
};

export const userReducer = createReducer(
  initialState,

  on(createUser, (_, { name, selected }) => ({
    name,
    selected: selected ?? [],
  })),

  on(addToUser, (state, { payload }) => ({
    ...state,
    selected: state.selected.includes(payload)
      ? state.selected
      : [...state.selected, payload],
  })),

  on(removeFromUser, (state, { payload }) => ({
    ...state,
    selected: state.selected.filter((id) => id !== payload),
  })),

  on(removeAll, (state) => ({
    ...state,
    selected: [],
  })),

  on(removeUser, () => initialState)
);

import { Customer } from '../../core/models';

export interface IUserState {
  name: string;
  selected: Customer['id'][];
}

export const initialState: IUserState = {
  name: '',
  selected: [],
};

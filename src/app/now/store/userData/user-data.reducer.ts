import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { UserData } from '../../../class/user-data';
import { UserDataActions, UserDataActionTypes } from './user-data.actions';

export const userDatasFeatureKey = 'userDatas';

export interface State extends EntityState<UserData> {
  // additional entities state properties
}

export const adapter: EntityAdapter<UserData> = createEntityAdapter<UserData>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: UserDataActions
): State {
  switch (action.type) {

    case UserDataActionTypes.LoadUserDatas: {
      return { ...state };
    }

    case UserDataActionTypes.LoadUserDatasSuccess: {
      return adapter.addAll(action.payload.userDatas, state);
    }

    case UserDataActionTypes.LoadUserDatasFail: {
      return { ...state };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectUserData = createFeatureSelector<State>('userDatas');
export const getUserDataEntities = createSelector(selectUserData, selectEntities);

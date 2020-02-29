import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';
import { createFeatureSelector, createSelector } from '@ngrx/store';

import { Now } from '../../class/now';
import { NowActions, NowActionTypes } from './now.actions';

export const nowsFeatureKey = 'nows';

export interface State extends EntityState<Now> {
  // additional entities state properties
}

export const adapter: EntityAdapter<Now> = createEntityAdapter<Now>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
});

export function reducer(
  state = initialState,
  action: NowActions
): State {
  switch (action.type) {

    // Nows読み込み時
    case NowActionTypes.LoadNows: {
      console.debug('Nows読み込み時');
      return { ...state };
    }

    // Nows読み込み成功時
    case NowActionTypes.LoadNowsSuccess: {
      console.debug('Nows読み込み成功時');
      return { ...adapter.addAll(action.payload.nows, state) };
    }

    // Nows読み込み失敗時
    case NowActionTypes.LoadNowsFail: {
      console.debug('Nows読み込み失敗時');
      return { ...state };
    }

    default: {
      return state;
    }
  }
}

const { selectIds, selectEntities, selectAll, selectTotal } = adapter.getSelectors();
export const selectNow = createFeatureSelector<State>('nows');
export const selectAllNows = createSelector(selectNow, selectAll);

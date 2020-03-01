import { Action } from '@ngrx/store';
import { Now } from '../../class/now';

export enum NowActionTypes {
  LoadNows = '[Now] Load Nows',
  LoadNowsSuccess = '[Now] Load Nows Success',
  LoadNowsFail = '[Now] Load Nows Fail',
}

// Nows読み込み時
export class LoadNows implements Action {
  readonly type = NowActionTypes.LoadNows;

  constructor(public payload: { nows: Now[] }) {}
}

// Nows読み込み成功時
export class LoadNowsSuccess implements Action {
  readonly type = NowActionTypes.LoadNowsSuccess;

  constructor(public payload: { nows: Now[] }) {}
}

// Nows読み込み失敗時
export class LoadNowsFail implements Action {
  readonly type = NowActionTypes.LoadNowsFail;

  constructor(public payload?: { error: any }) {}
}

export type NowActions =
 LoadNows
 | LoadNowsSuccess
 | LoadNowsFail;

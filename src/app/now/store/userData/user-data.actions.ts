import { Action } from '@ngrx/store';
import { UserData } from '../../../class/user-data';

export enum UserDataActionTypes {
  LoadUserDatas = '[UserData] Load UserDatas',
  LoadUserDatasSuccess = '[UserData] Load UserDatas Success',
  LoadUserDatasFail = '[UserData] LOad UserDatas Fail',
}

export class LoadUserDatas implements Action {
  readonly type = UserDataActionTypes.LoadUserDatas;

  constructor(public payload: { userDatas: UserData[] }) {}
}

export class LoadUserDatasSuccess implements Action {
  readonly type = UserDataActionTypes.LoadUserDatasSuccess;

  constructor(public payload: { userDatas: UserData[] }) {}
}

export class LoadUserDatasFail implements Action {
  readonly type = UserDataActionTypes.LoadUserDatasFail;

  constructor(public payload?: { error: any }) {}
}

export type UserDataActions =
 LoadUserDatas
 | LoadUserDatasSuccess
 | LoadUserDatasFail;

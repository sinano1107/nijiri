import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';

import { UserData } from '../../../class/user-data';
import {
  UserDataActionTypes,
  LoadUserDatas,
  LoadUserDatasSuccess,
  LoadUserDatasFail,
} from './user-data.actions';


@Injectable()
export class UserDataEffects {

  constructor(
    private actions$: Actions,
    private db: AngularFirestore,
  ) {}

  // Nows読み込み時
  @Effect()
  LoadUserData$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadUserDatas>(UserDataActionTypes.LoadUserDatas),
      map(action => action.payload.userDatas),
      switchMap(() => {
        return this.db.collection/*<{
          [key: string]: string,
        }>*/('users')
          .snapshotChanges().pipe(
            map(userDatas => userDatas.map(userData => {
              const data = userData.payload.doc.data();
              const id = userData.payload.doc.id;
              return new UserData(id, data['icon'], data['realName']);
            })),
            map((res: UserData[]) => {
              return new LoadUserDatasSuccess({
                userDatas: res
              })
            }),
            catchError(this.handleUserDatasError(
              'fetchUserDatas', new LoadUserDatasFail
            ))
          )
      })
    )

  // エラー発生時
  private handleUserDatasError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した処理の名前、エラーログをコンソールに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);

    }
  }

}

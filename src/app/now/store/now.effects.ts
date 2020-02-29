import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Now } from '../../class/now';
import {
  NowActionTypes,
  LoadNows,
  LoadNowsSuccess,
  LoadNowsFail,
} from './now.actions';


@Injectable()
export class NowEffects {

  constructor(
    private actions$: Actions,
    private db: AngularFirestore
  ) {}

  // Nows読み込み時
  @Effect()
  LoadNow$: Observable<Action> =
    this.actions$.pipe(
      ofType<LoadNows>(NowActionTypes.LoadNows),
      map(action => action.payload.nows),
      switchMap(() => {
        return this.db.collection('communities')
          .doc('g3Xnp6T1S9xwsDhZLyYZ')
          .collection('nows')
          .snapshotChanges().pipe(
            map(nows => nows.map(now => {
              const data = now.payload.doc.data();
              const id = now.payload.doc.id;
              return new Now(id, data.uid, data.campusId);
            })),
            map((res: Now[]) => {
              return new LoadNowsSuccess({
                nows: res
              })
            }),
            catchError(this.handleNowsError(
              'fetchNows', new LoadNowsFail
            ))
          )
      })
    )

  // エラー発生時の処理
  private handleNowsError<T>(operation = 'operation', result: T) {
    return (error: any): Observable<T> => {

      // 失敗した処理の名前、エラーログをコンソールに出力
      console.error(`${operation} failed: ${error.message}`);

      // 結果を返して、アプリを持続可能にする
      return of(result as T);

    }
  }
}

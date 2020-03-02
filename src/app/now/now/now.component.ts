import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

import { Now } from '../../class/now';
import { UserData } from '../../class/user-data';
import * as fromNow from '../store/now/now.reducer';
import * as fromUserData from '../store/userData/user-data.reducer';
import { LoadNows } from '../store/now/now.actions';
import { LoadUserDatas } from '../store/userData/user-data.actions';
import { QRDialogComponent } from './qrdialog/qrdialog.component';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.css']
})
export class NowComponent implements OnInit, OnDestroy {

  nows: Now[];
  userDataList: {[key: string]: UserData};
  dialog = this.matDialog.open(QRDialogComponent, {});

  constructor(
    private now: Store<fromNow.State>,
    private userData: Store<fromUserData.State>,
    private snackBar: MatSnackBar,
    private matDialog: MatDialog,
    private db: AngularFirestore,
  ) {
    this.now.dispatch(new LoadNows({ nows: [] }));
    this.userData.dispatch(new LoadUserDatas({ userDatas: [] }));

    this.now.select(fromNow.selectAllNows)
      .subscribe(res => {
        this.nows = res;
        this.openSnackBar(res[0]);
        this.dialog.close();
        this.resetAt_Code();
      });
    this.userData.select(fromUserData.getUserDataEntities)
      .subscribe(res => this.userDataList = res);
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.resetAt_Code();
  }

  openSnackBar(data: Now): void {
    if (data && this.userDataList[data.uid]) {
      const userData = this.userDataList[data.uid];
      this.snackBar.open(
        `${userData['realName']}さんがグループ${data.campusId+1}に登校しました！`,
        'ようこそ！',
        {
          verticalPosition: 'top',
          duration: 5000,
        }
      )
    }
  }

  showQR(): void {
    this.dialog = this.matDialog.open(QRDialogComponent, {
      'height': '450px',
      'width': '500px',
    });
  }

  resetAt_Code(): void {
    const LENGTH = 10 //生成したい文字列の長さ
    const SOURCE = "abcdefghijklmnopqrstuvwxyz0123456789" //元になる文字
    let result = ''

    for(let i=0; i<LENGTH; i++){
      result += SOURCE[Math.floor(Math.random() * SOURCE.length)];
    }

    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .update({
        at_Code: result
      });
  }

}

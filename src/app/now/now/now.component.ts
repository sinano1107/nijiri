import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Now } from '../../class/now';
import { UserData } from '../../class/user-data';
import * as fromNow from '../store/now/now.reducer';
import * as fromUserData from '../store/userData/user-data.reducer';
import { LoadNows } from '../store/now/now.actions';
import { LoadUserDatas } from '../store/userData/user-data.actions';

@Component({
  selector: 'app-now',
  templateUrl: './now.component.html',
  styleUrls: ['./now.component.css']
})
export class NowComponent implements OnInit {

  nows: Now[];
  userDataList: {[key: string]: UserData};

  constructor(
    private now: Store<fromNow.State>,
    private userData: Store<fromUserData.State>,
    private snackBar: MatSnackBar,
  ) {
    this.now.dispatch(new LoadNows({ nows: [] }));
    this.userData.dispatch(new LoadUserDatas({ userDatas: [] }));

    this.now.select(fromNow.selectAllNows)
      .subscribe(res => {
        this.nows = res;
        this.openSnackBar(res[0]);
      });
    this.userData.select(fromUserData.getUserDataEntities)
      .subscribe(res => this.userDataList = res);
  }

  ngOnInit(): void {
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

}

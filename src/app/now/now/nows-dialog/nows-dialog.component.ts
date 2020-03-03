import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

import { UserData } from '../../../class/user-data';
import * as fromUserData from '../../store/userData/user-data.reducer';
import * as fromNow from '../../store/now/now.reducer';

@Component({
  selector: 'app-nows-dialog',
  templateUrl: './nows-dialog.component.html',
  styleUrls: ['./nows-dialog.component.css']
})
export class NowsDialogComponent implements OnInit, OnDestroy {

  x = [...Array(9).keys()];
  y = this.x.map(i => i+9);
  userDataList: {[key: string]: UserData};
  nowsList = Array.from(new Array(18), () => new Array);

  userDataSubscribe: Subscription;
  nowSubscribe: Subscription;

  constructor(
    private userData: Store<fromUserData.State>,
    private now: Store<fromNow.State>,
  ) { }

  ngOnInit(): void {
    this.userDataSubscribe = this.userData
      .select(fromUserData.getUserDataEntities)
      .subscribe(res => this.userDataList = res);
    this.nowSubscribe = this.now
      .select(fromNow.selectAllNows)
      .subscribe(nows => {
        nows.forEach(now => {
          this.nowsList[now.campusId].push(now.uid);
        })
      });
  }

  ngOnDestroy(): void {
    this.userDataSubscribe.unsubscribe();
    this.nowSubscribe.unsubscribe();
  }

}

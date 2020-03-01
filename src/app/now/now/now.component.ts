import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

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
  ) {
    this.now.dispatch(new LoadNows({ nows: [] }));
    this.userData.dispatch(new LoadUserDatas({ userDatas: [] }));

    this.now.select(fromNow.selectAllNows)
      .subscribe(res => this.nows = res);
    this.userData.select(fromUserData.getUserDataEntities)
      .subscribe(res => this.userDataList = res);
  }

  ngOnInit(): void {
  }

}

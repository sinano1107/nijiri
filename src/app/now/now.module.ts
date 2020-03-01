import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNow from './store/now/now.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NowEffects } from './store/now/now.effects';
import * as fromUserData from './store/userData/user-data.reducer';
import { UserDataEffects } from './store/userData/user-data.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNow.nowsFeatureKey, fromNow.reducer),
    EffectsModule.forFeature([NowEffects, UserDataEffects]),
    StoreModule.forFeature(fromUserData.userDatasFeatureKey, fromUserData.reducer)
  ]
})
export class NowModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNow from './store/now/now.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NowEffects } from './store/now/now.effects';
import * as fromUserData from './store/userData/user-data.reducer';
import { UserDataEffects } from './store/userData/user-data.effects';
import { NowComponent } from './now/now.component';

import { CoreModule } from '../core/core.module';
import { ImageModule } from '../image/image.module';


@NgModule({
  declarations: [NowComponent],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNow.nowsFeatureKey, fromNow.reducer),
    EffectsModule.forFeature([NowEffects, UserDataEffects]),
    StoreModule.forFeature(fromUserData.userDatasFeatureKey, fromUserData.reducer),
    CoreModule,
    ImageModule,
  ],
  exports: [NowComponent],
})
export class NowModule { }

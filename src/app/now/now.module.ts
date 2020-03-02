import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import * as fromNow from './store/now/now.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NowEffects } from './store/now/now.effects';
import * as fromUserData from './store/userData/user-data.reducer';
import { UserDataEffects } from './store/userData/user-data.effects';
import { QRCodeModule } from 'angular2-qrcode';

import { CoreModule } from '../core/core.module';
import { ImageModule } from '../image/image.module';
import { NowComponent } from './now/now.component';
import { QRDialogComponent } from './now/qrdialog/qrdialog.component';


@NgModule({
  declarations: [NowComponent, QRDialogComponent],
  imports: [
    CommonModule,
    MatRippleModule,
    MatDialogModule,
    StoreModule.forFeature(fromNow.nowsFeatureKey, fromNow.reducer),
    EffectsModule.forFeature([NowEffects, UserDataEffects]),
    StoreModule.forFeature(fromUserData.userDatasFeatureKey, fromUserData.reducer),
    QRCodeModule,
    CoreModule,
    ImageModule,
  ],
  exports: [NowComponent],
})
export class NowModule { }

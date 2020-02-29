import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromNow from './store/now.reducer';
import { EffectsModule } from '@ngrx/effects';
import { NowEffects } from './store/now.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromNow.nowsFeatureKey, fromNow.reducer),
    EffectsModule.forFeature([NowEffects])
  ]
})
export class NowModule { }

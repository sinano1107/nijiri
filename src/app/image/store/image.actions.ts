import { Action } from '@ngrx/store';
import { Image } from '../../class/image';

export enum ImageActionTypes {
  AddImage = '[Image] Add Image',
}

// 画像データ保存時
export class AddImage implements Action {
  readonly type = ImageActionTypes.AddImage;

  constructor(public payload: { image: Image }) {}
}



export type ImageActions = AddImage;

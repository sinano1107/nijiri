import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

import { Image } from '../../class/image';
import { Store } from '@ngrx/store';
import * as fromImage from '../store/image.reducer';
import { ImageService } from '../service/image.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {

  @Input() imageId: string;
  @Input() classItem: string;

  images: Observable<{}>;
  url: string;
  isLoading = true;

  constructor(
    private image: ImageService,
    private imageStore: Store<fromImage.State>,
    private storage: AngularFireStorage
  ) {
    this.images = this.imageStore.select(fromImage.selectImageEntities);
  }

  ngOnInit(): void {
    this.image.searchImage(this.imageId).subscribe(res => {
      if (res) {
        this.images.subscribe(images => {
          this.url = images[this.imageId]['url'];
          this.isLoading = false;
        })
      } else {
        // addする
        this.storage.ref(this.imageId).getDownloadURL().subscribe(
          url => {
            this.image.addImage(new Image(this.imageId, url));
            this.isLoading = false;
          }
        )
      }
    })
  }
}

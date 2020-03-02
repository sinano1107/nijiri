import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';

@Component({
  selector: 'app-qrdialog',
  templateUrl: './qrdialog.component.html',
  styleUrls: ['./qrdialog.component.css']
})
export class QRDialogComponent implements OnInit {

  at_Code: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data : any,
    public matDialogRef : MatDialogRef<QRDialogComponent>,
    private db: AngularFirestore,
  ) { }

  ngOnInit(): void {
    this.db.collection('communities')
      .doc('g3Xnp6T1S9xwsDhZLyYZ')
      .valueChanges().subscribe(res => {
        this.at_Code = res['at_Code'];

      })
  }

}

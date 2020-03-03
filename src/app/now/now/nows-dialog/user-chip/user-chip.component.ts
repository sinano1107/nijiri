import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-chip',
  templateUrl: './user-chip.component.html',
  styleUrls: ['./user-chip.component.css']
})
export class UserChipComponent implements OnInit {

  @Input() realName: string;
  @Input() icon: string;

  constructor() { }

  ngOnInit(): void {
  }

}

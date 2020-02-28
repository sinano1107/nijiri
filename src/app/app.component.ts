import { Component, OnInit } from '@angular/core';
import { Animate } from './class/animate';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'nijiri';

  animate = new Animate;
  animation = '';

  ngOnInit(): void {
    this.randomAnimation()
  }

  randomAnimation(): void {
    setInterval(() => {
      const random = this.animate.random();

      this.animation = random.in;
      setTimeout(() => {
        this.animation = random.middle;
        setTimeout(() => {
          this.animation = random.out;
        }, 2000);
      }, 2000);
    }, 6000);
  }
}

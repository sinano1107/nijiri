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
  languageType = true;
  isPasswordPage = true;
  password = '';

  ngOnInit(): void {
    this.randomAnimation()
  }

  randomAnimation(): void {
    setInterval(() => {
      this.languageType = !this.languageType;
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

  pass() {
    const now = new Date()
    const TRUE_PASS = `${now.getMonth()+1}${now.getDate()}${now.getHours()}${now.getMinutes()}`;
    if (TRUE_PASS === this.password) {
      this.isPasswordPage = false;
    } else {
      alert('パスワードが違います');
    }
  }
}

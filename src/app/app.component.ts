import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      this.navCtrl.navigateRoot('/qr');
    } else {
      this.navCtrl.navigateRoot('/login');
    }

  }
}

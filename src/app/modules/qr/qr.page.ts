import { Component, OnInit } from '@angular/core';
import { AndroidPermissionResponse, AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { BarcodeScanner }from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { AlertController, NavController } from '@ionic/angular';
import { RequestService } from 'src/app/service/api/request.service';
import { AuthenticationService } from 'src/app/service/util/authentication-service.service';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {
  scannedCode: any = null;
  overlayDisplay: any = "none";
  private isOpened: boolean = false;
  name: any
  philippinesDateTime: any
  options: any = {}
  constructor(private permissions: AndroidPermissions, 
    private barcodeScanner: BarcodeScanner,
    private navCtrl: NavController,
    private requestService: RequestService,
    public alertController: AlertController,
    public authService: AuthenticationService
    ) { }

  ngOnInit() {
  }

  scan(){
    this.permissions.checkPermission(this.permissions.PERMISSION.CAMERA)
    .then((result)=>{
      const name = localStorage.getItem('name')?.toString();
      const id = localStorage.getItem('id')?.toString();
      const profile_img = localStorage.getItem('profile_img')?.toString();
      if (!!result.hasPermission) {
        this.barcodeScanner.scan().then(barcodeData => {
          // this.requestService.getRequest(barcodeData.text, name, id)
          // .subscribe((res: any)=>{
          //   this.presentAlert("Request ID: "+ barcodeData.text + " has been delivered")
          // })
          this.dataNotif(barcodeData.text, id, name, profile_img)
          }).catch(err => {
          console.log('Error', err);
          });
       
      }else{
        this.permissions.requestPermission(this.permissions.PERMISSION.CAMERA)
        .then((result)=>{
          if (!!result.hasPermission) {
            const name = localStorage.getItem('name')?.toString();
            const id = localStorage.getItem('id')?.toString();
            const profile_img = localStorage.getItem('profile_img')?.toString();
            this.barcodeScanner.scan().then(barcodeData => {
              // this.requestService.getRequest(barcodeData.text, name, id)
              // .subscribe((res: any)=>{
              //   this.presentAlert("Request ID: "+ barcodeData.text + " has been delivered")
              // })
              this.dataNotif(barcodeData.text, id, name, profile_img)
              }).catch(err => {
              console.log('Error', err);
              });
          }
        })
      }
    })
  }

  dataNotif(barcode: any, id: any, name: any, profile_img: any){
    const message = "Request id " + barcode + " has been delivery now to " + name ;
    const title = "Delivery to " + name
    const philippinesTimezone = 'Asia/Manila';
    const now = new Date();
    this.options = { timeZone: philippinesTimezone, hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric', year: 'numeric', month: 'long', day: 'numeric' };
    this.philippinesDateTime = new Intl.DateTimeFormat('en-US', this.options).format(now);
    const data1 = {request_id: barcode, message: message, title: title, department_id: id, profile_img: profile_img, timestamp: this.philippinesDateTime};
      const data2 = {request_id: barcode, message: message, title: title, department_id: id, timestamp: this.philippinesDateTime};
      this.authService.insertDataNotifQR(data1, data2)
      .then(() => {
        this.presentAlert("Request ID: "+ barcode + " has been delivered")
        console.log('Data inserted successfully');
      })
      .catch((error) => {
        console.error('Error inserting data:', error);
      });
  }

  
  fabToggle() {
    this.isOpened = !this.isOpened;
    this.isOpened ? this.overlayDisplay = "block" : this.overlayDisplay = "none"
  }

  goTo(){
    localStorage.removeItem('user');
    // Redirect to the login page
    this.navCtrl.navigateRoot('/login');
  }

  async presentAlert(message: any) {
    const alert = await this.alertController.create({
      header: 'Alert Header',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

}

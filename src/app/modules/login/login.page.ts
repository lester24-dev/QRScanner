import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoginService } from 'src/app/service/api/login.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/service/util/authentication-service.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: any = FormGroup;
  login = FormGroup;
  items: any
  isLoading = false;

  constructor(
    public fb: FormBuilder,
    private http: LoginService,
    public navCtrl: NavController,
    public alertController: AlertController,
    public authService: AuthenticationService,
    public ngFireAuth: AngularFireAuth,
    public loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  async logins(credential: any)
  {
    // this.http.create(credential)
    // .subscribe((res: any)=>{
    //   if (res.status == "failed") {
    //     this.presentAlert(res.message)
    //   }else{
    //     localStorage.setItem('user', res.username);
    //     localStorage.setItem('id', res.id);
    //     localStorage.setItem('department', res.department);
    //     localStorage.setItem('name', res.name);
    //     this.navCtrl.navigateRoot("qr")
    //     debugger
    //   }
    // })
    this.present()
    try {
      const userCredential = await this.ngFireAuth.signInWithEmailAndPassword(
       credential.email,
       credential.password
      );
      if (userCredential.user) {
        // User is signed in.
        this.authService.getItemByKey(userCredential.user.uid, "users")
        .subscribe((item) => {
          if (item) {
            this.items = item; // Assign the fetched item to the property
            localStorage.setItem('user', this.items.username);
            localStorage.setItem('id', this.items.id);
            localStorage.setItem('name', this.items.name);
            localStorage.setItem('email', this.items.email);
            localStorage.setItem('profile_img', this.items.profile_img);
            console.log('Item data:', this.items);
            this.navCtrl.navigateRoot("qr")
            this.dismiss();
          } else {
            console.log('Item does not exist');
          }
        }, (error) => {
          console.error('Error fetching item:', error);
        });
    
      } else {
        //console.log('User is signed out');
        this.presentAlert("Invalid password or email")
      }
    } catch (error) {
      // console.error('Login error:', error);
      this.presentAlert("Your account is not registered")
    }
    
  }

  async presentAlert(message: any) {
    const alert = await this.alertController.create({
      header: 'Alert Header',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async present() {
    this.isLoading = true;
    return await this.loadingCtrl.create({
      duration: 5000,
    }).then(a => {
      a.present().then(() => {
        console.log('presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort presenting'));
        }
      });
    });
  }

  async dismiss() {
    this.isLoading = false;
    return await this.loadingCtrl.dismiss().then(() => console.log('dismissed'));
  }
}

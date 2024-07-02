import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from './service/api/login.service';
import { HttpService } from './service/util/http.service';
import { CommonService } from './service/util/common.service';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';
import { BarcodeScanner }from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { RequestService } from './service/api/request.service';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { environment } from '../environments/environment';
import { AuthenticationService } from './service/util/authentication-service.service';
const APP_PROVIDERS = [
  LoginService,
  HttpService,
  CommonService,
  RequestService,
  AuthenticationService
]
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), 
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatInputModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    AppRoutingModule],
  providers: [APP_PROVIDERS,{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },AndroidPermissions, BarcodeScanner],
  bootstrap: [AppComponent],
})
export class AppModule {}

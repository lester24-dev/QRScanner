import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QrPageRoutingModule } from './qr-routing.module';

import { QrPage } from './qr.page';
import { MatButtonModule } from '@angular/material/button';
import { BarcodeScanner } from '@awesome-cordova-plugins/barcode-scanner/ngx';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MatButtonModule,
    HttpClientModule,
    QrPageRoutingModule
  ],
  providers:[BarcodeScanner],
  declarations: [QrPage]
})
export class QrPageModule {}

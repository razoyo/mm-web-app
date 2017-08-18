import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { PhotoShareComponent } from './photo-share/photo-share.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SyncComponent } from './sync/sync.component';

import { SocketService } from './socket.service';

const config: SocketIoConfig = {
    url: 'ec2-54-221-218-6.compute-1.amazonaws.com:4000',
    options: {}
};

@NgModule({
  declarations: [
    AppComponent,
    PhotoShareComponent,
    PurchaseComponent,
    SyncComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SocketIoModule.forRoot(config),
  ],
  providers: [
    SocketService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }

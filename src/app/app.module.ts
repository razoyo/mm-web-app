import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NgModule } from '@angular/core';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { AppComponent } from './app.component';
import { PhotoShareComponent } from './photo-share/photo-share.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { SyncComponent } from './sync/sync.component';

import { SocketService } from './shared/socket.service';
import { stateInit } from './shared/stateInit';


const config: SocketIoConfig = {
    url: stateInit.socket_url,
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

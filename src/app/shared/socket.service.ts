import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  sendPhoneCode(code) {
		this.socket.emit('phone', code);
	}

  getProblems() {
    let observable = new Observable(observer => {
      this.socket.on('problem', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })

    return observable;
  }

  getConnect() {
    let observable = new Observable(observer => {
      this.socket.on('mirrorConnected', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })

    return observable;
  }

  getNewPictures() {
    let observable = new Observable(observer => {
      this.socket.on('newPictures', (data) => {
        console.log('data = ' + JSON.stringify(data, null, 2));
        let obj = {};
        obj['pictures'] = data;
        observer.next(obj);
      });

      return () => {
        this.socket.disconnect();
      };
    })

    return observable;
  }

  getPurchase() {
    let observable = new Observable(observer => {
      this.socket.on('purchase', (data) => {
        console.log('data = ' + JSON.stringify(data, null, 2));
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      };
    })

    return observable;
  }

}

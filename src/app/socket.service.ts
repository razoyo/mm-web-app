import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Socket } from 'ngx-socket-io';

@Injectable()
export class SocketService {

  constructor(private socket: Socket) { }

  sendPhoneCode(code) {
console.log('code = ' + code);
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

}

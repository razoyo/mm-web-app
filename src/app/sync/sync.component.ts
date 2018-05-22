import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/socket.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit, OnDestroy {

  code = '';
  problem = '';
	problemObserver;
	connectObserver;
  mirrorSocketId;
  feedback = '';

  reconnect() {
    this.socketService.disconnect();
    this.mirrorSocketId = null;
    this.code = null;
    }

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.problemObserver = this.socketService
      .getProblems()
      .subscribe((data) => {
        this.problem = String(data);
        this.mirrorSocketId = null;
        this.code = null;
        this.feedback = 'unable to connect to socket server';
      });
    this.connectObserver = this.socketService
      .getConnect()
      .subscribe((data) => {
        this.mirrorSocketId = data;
        this.feedback = 'You are connected to the Hat Mirror';
        this.problem = '';
      });
  }

  onSubmit() {
    console.log('sending code | ',this.code);
    this.socketService.sendPhoneCode(this.code);
  }

  ngOnDestroy() {
    this.connectObserver.unsubscribe();
    this.problemObserver.unsubscribe();
  }

}

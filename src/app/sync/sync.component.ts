import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../socket.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.css']
})
export class SyncComponent implements OnInit, OnDestroy {

  code = '';
  problem = '';
  connect = '';
	problemObserver;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.problemObserver = this.socketService
      .getProblems()
      .subscribe((data) => {
console.log('got a problem');
        this.problem = String(data);
      });
  }

  onSubmit() {
    this.socketService.sendPhoneCode(this.code);
  }

  ngOnDestroy() {
    this.problemObserver.unsubscribe();
  }

}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/socket.service';

interface PurchaseType {
  url: string;
  name: string;
}

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit, OnDestroy {

  url: string = '';
  name: string = '';
  purchaseObserver;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.purchaseObserver = this.socketService
      .getPurchase()
      .subscribe((data:PurchaseType) => {
        console.log('getPurchase');
        this.url = data.url;
        this.name = data.name;
        window.open(this.url);
      });
  }

  ngOnDestroy() {
    this.purchaseObserver.unsubscribe();
  }

}

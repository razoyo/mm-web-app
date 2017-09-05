import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/socket.service';

interface PicturesListType {
  pictures: string[];
}

@Component({
  selector: 'app-photo-share',
  templateUrl: './photo-share.component.html',
  styleUrls: ['./photo-share.component.css']
})
export class PhotoShareComponent implements OnInit, OnDestroy {

  pictures: string [];
  newPicturesObserver;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.newPicturesObserver = this.socketService
      .getNewPictures()
      .subscribe((data:PicturesListType) => {
        this.pictures = data['pictures'];
      });
  }

  ngOnDestroy() {
    this.newPicturesObserver.unsubscribe();
  }

}

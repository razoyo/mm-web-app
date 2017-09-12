import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/socket.service';
import { stateInit } from '../shared/stateInit';

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
	stateinit;
  fPictures: boolean = false;

  constructor(
    private socketService: SocketService
  ) { }

  ngOnInit() {
    this.newPicturesObserver = this.socketService
      .getNewPictures()
      .subscribe((data:PicturesListType) => {
        this.pictures = data['pictures'];
        if (this.pictures.length > 0) {
          this.fPictures = true;
        }
      });
		this.stateinit = stateInit;
  }

  ngOnDestroy() {
    this.newPicturesObserver.unsubscribe();
  }

}

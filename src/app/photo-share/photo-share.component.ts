import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { SocketService } from '../shared/socket.service';
import { stateInit } from '../shared/stateInit';

interface PicturesListType {
  pictures: string[];
}

interface PictureInfoType {
  href: string;
  sbUrl: string; 
}

@Component({
  selector: 'app-photo-share',
  templateUrl: './photo-share.component.html',
  styleUrls: ['./photo-share.component.css']
})
export class PhotoShareComponent implements OnInit, OnDestroy {

  pictureInfos: PictureInfoType [];

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
        this.fPictures = false;
        this.pictureInfos.splice(0, this.pictureInfos.length);
        for (let i = 0; i < data['pictures'].length; i++) {
          this.fPictures = true;
          let info: PictureInfoType = {
            href = 'assets/customer-photos/' + data['pictures'][i];
            sbUrl = stateinit.base_url + '/assets/customer-photos/' + data['pictures'][i];
          };
          this.pictureInfos.push(info);
        }
      });
      this.stateinit = stateInit;
  }

  ngOnDestroy() {
    this.newPicturesObserver.unsubscribe();
  }

}

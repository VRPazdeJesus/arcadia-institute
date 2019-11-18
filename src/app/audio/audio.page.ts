// import { Component, OnInit } from '@angular/core';
// import * as firebase from 'firebase';
// import { environment } from '../../environments/environment';
// import { AuthenticationService } from '../services/authentication.service';
// import { Media, MediaObject } from '@ionic-native/media/ngx';
// import { Platform, LoadingController } from '@ionic/angular';
// // Novo
// import { NativeAudio } from '@ionic-native/native-audio/ngx';

import { Howl } from 'howler';
import { Component, ViewChild } from '@angular/core';
import { IonRange } from '@ionic/angular';

export interface Track {
  name: string;
  path: string;
}


@Component({
  selector: 'app-audio',
  templateUrl: './audio.page.html',
  styleUrls: ['./audio.page.scss'],
})
export class AudioPage {
  playlist: Track[] = [
    {
      name: 'Say my Name',
      path: './assets/audio/bebe.mp3'
    },
    {
      name: 'Break up with your girlfriend',
      path: './assets/audio/ari.m4a'
    }
  ];

  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', {static: false}) range: IonRange;

  constructor() {}

  start(track: Track) {
    if(this.player) {
      this.player.stop();
    }

    this.player = new Howl({
      src: [track.path],
      html5: true,
      onplay: () => {
        console.log('onplay');
        this.isPlaying = true;
        this.activeTrack = track;
        this.updateProgress();
      },
      onend: () => {
        console.log('onend');
      }
    });
    this.player.play();
  }

  togglePlayer(pause) {
    this.isPlaying = !pause;
    if(pause) {
      this.player.pause();
    } else {
      this.player.play();
    }

  }

  next() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index != this.playlist.length - 1) {
      this.start(this.playlist[index + 1]);
    } else {
      this.start(this.playlist[0]);
    }
  }

  prev() {
    let index = this.playlist.indexOf(this.activeTrack);
    if (index > 0) {
      this.start(this.playlist[index - 1]);
    } else {
      this.start(this.playlist[this.playlist.length - 1]);
    }
  }

  seek() {
    let newValue = +this.range.value;
    let duration = this.player.duration();
    this.player.seek(duration * (newValue / 100))
  }

  updateProgress() {
    let seek = this.player.seek();
    this.progress = (seek / this.player.duration()) * 100 || 0;
    setTimeout(() => {
      this.updateProgress();
    }, 1000)
  }
  
  // public links = new Map();
  // public file: MediaObject;
  // public value: string = '../../assets/bebe.mp3';

  // constructor(private authService: AuthenticationService, private media: Media,private nativeAudio: NativeAudio) { 
  //   this.nativeAudio.preloadSimple('uniqueId1', 'src/assets/bebe.mp3');
  //   this.nativeAudio.play('uniqueId1', () => console.log('uniqueId1 is done playing'));
  //   // this.getLinkAudio();
  //   this.executeAudio();
  // }

  

  // async getLinkAudio() {
  //   // this.authService.getAudio(this.value).then(res => {
  //   //   const link = res;
  //   //   this.links.set(this.value, link);
  //   //   console.log('contante', link);
  //   // }).catch(function(error) {
                
  //   // }).finally(() => {
  //   //   this.executeAudio();
  //   // });
  // }

  // async executeAudio() {
    
  //   // console.log(this.links.get(this.value));
  //   // let l = this.links.get(this.value);
  //   // this.file = this.media.create(l);

  //   // this.file = this.media.create(this.value);
  //   // this.file.play();
  //   // this.file.setVolume(0.8);
  // }

  // ngOnInit() {
  // }

  // // async playAudio() { 
  // //   this.file.play();
  // // }
}

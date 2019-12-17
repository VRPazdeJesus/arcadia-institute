import { Howl } from 'howler';
import { Component, ViewChild, OnInit } from '@angular/core';
import { IonRange } from '@ionic/angular';
import * as firebase from 'firebase';

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
  // playlist: Track[] = [
  //   {
  //     name: 'Say my Name',
  //     path: './assets/audio/bebe.mp3'
  //   },
  //   {
  //     name: 'Break up with your girlfriend',
  //     path: './assets/audio/ari.m4a'
  //   }
  // ];
  playlist: Track[] = [];

  public storageRef;
  public objetosImagens;
  activeTrack: Track = null;
  player: Howl = null;
  isPlaying = false;
  progress = 0;
  @ViewChild('range', {static: false}) range: IonRange;

  constructor() {
    this.getLinkAudios();
  }

  async getLinkAudios() {
    this.getAudio().then(res => {
      const link = res.items;
      this.objetosImagens = link;      
    }).catch(function(error) {
                
    }).finally(() => {
      this.objetosImagens.forEach(element => {
        element.getDownloadURL().then(res => 
        this.passaToArray(res, element.name));
        console.log();
        
      });
    });
  }

  getAudio(){
    return new Promise<any>((resolve, reject) => {
      let arquivo = firebase.storage().ref();
      let caminho = arquivo.child('terapia').listAll();
      console.log(caminho);
      
      caminho.then(
        res => resolve(res),
        err => reject(err))
    })
  }

  async passaToArray(value:any, name:any){
    name = name.replace(".mp3", " ");
    let re = /\-/gi;
    name = name.replace(re, " ");
    let obj = {
      name: name,
      path: value
    }
    this.playlist.push(obj);
  }

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

}

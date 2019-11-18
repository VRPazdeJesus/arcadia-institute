import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
// import { log } from 'util';
// import { url } from 'inspector';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }

  registerUser(value){
    return new Promise<any>((resolve, reject) => {
      firebase.auth().createUserWithEmailAndPassword(value.email, value.password)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   loginUser(value){
     console.log("estou no serviço loginUser");
     
      return new Promise<any>((resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
      })
   }
  
   logoutUser(){
     return new Promise((resolve, reject) => {
       if(firebase.auth().currentUser){
         firebase.auth().signOut()
         .then(() => {
           console.log("LOG Out");
           resolve();
         }).catch((error) => {
           reject();
         });
       }
     })
   }

   passwordToEmail(value) {
    return new Promise<any>((resolve, reject) => {
      firebase.auth().sendPasswordResetEmail(value.email)
      .then(
        res => resolve(res),
        err => reject(err))
    })
   }
  
   userDetails(){
     return firebase.auth().currentUser;
   }

   getAudio(value){
    console.log(value);
    return new Promise<any>((resolve, reject) => {
      let arquivo = firebase.storage().ref();
      let caminho = arquivo.child('audios/'+value);
      caminho.getDownloadURL().then(
        // url => {
        //   console.log(url);
        // });
        res => resolve(res),
        err => reject(err))
    })
    // let caminho = firebase.storage().ref().child('audios/'+value);
    // caminho.getDownloadURL().then(url => {
    //   this.v = url;
    //     console.log(url);
    // });
   }
}

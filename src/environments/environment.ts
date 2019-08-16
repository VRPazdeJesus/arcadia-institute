// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import * as firebase from 'firebase';

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyArscwTSan76PTNCsTATrdwHXhfuKYhubs",
    authDomain: "app-arcadia-institute.firebaseapp.com",
    databaseURL: "https://app-arcadia-institute.firebaseio.com",
    projectId: "app-arcadia-institute",
    storageBucket: "",
    messagingSenderId: "388938488383",
    appId: "1:388938488383:web:30e9ab048a45d2c1"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

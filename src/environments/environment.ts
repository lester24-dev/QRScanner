// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API_URL: 'https://192.168.18.3',
  SOCKET_URL: 'wss://192.168.18.3',
  firebaseConfig: {
    apiKey: "AIzaSyBf0nRV-CQ39yXkbCYBj-YCs9sjuxum12A",
    authDomain: "philsca-22382.firebaseapp.com",
    databaseURL: "https://philsca-22382-default-rtdb.firebaseio.com",
    projectId: "philsca-22382",
    storageBucket: "philsca-22382.appspot.com",
    messagingSenderId: "21113451501",
    appId: "1:21113451501:web:9fa02c7d05632b9898ede4",
    measurementId: "G-2GNH93DR21"
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

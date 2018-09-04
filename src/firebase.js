import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyCiQ0UCOtGLPfSc22RPaWpnOPuG8PAAKGc",
    authDomain: "klika-tech-test.firebaseapp.com",
    databaseURL: "https://klika-tech-test.firebaseio.com",
    projectId: "klika-tech-test",
    storageBucket: "klika-tech-test.appspot.com",
    messagingSenderId: "349649719866"
};

export const firebaseApp = firebase.initializeApp(config);
export const firebaseData = firebase.database();
// firebase.js

import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD7XXwvVZ1uMhWFbaEQ3clSdBJn5sKkItU",
    authDomain: "smallbusiness-26cbb.firebaseapp.com",
    projectId: "smallbusiness-26cbb",
    storageBucket: "smallbusiness-26cbb.appspot.com",
    messagingSenderId: "144105488810",
    appId: "1:144105488810:web:be17cb9dd0acb157312bd3",
    measurementId: "G-9GQ2ZD1647"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();
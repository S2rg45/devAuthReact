import Firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDcmZJEYW1kcebw_85jNdBfEMsLzqu4pBE",
    authDomain: "authdev-f242a.firebaseapp.com",
    projectId: "authdev-f242a",
    storageBucket: "authdev-f242a.appspot.com",
    messagingSenderId: "987484057824",
    appId: "1:987484057824:web:86bebb5aeb6d437ef4e085"
  };
  // Initialize Firebase
Firebase.initializeApp(firebaseConfig);

const db = Firebase.firestore()
const auth = Firebase.auth()

export {db, auth}
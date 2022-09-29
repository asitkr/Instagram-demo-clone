import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig  = {
    apiKey: "AIzaSyBaCzx1XL7kxBLX-FC7GX8zkLldyi9TaGI",
    authDomain: "instagram-clone-react-fb07e.firebaseapp.com",
    projectId: "instagram-clone-react-fb07e",
    storageBucket: "instagram-clone-react-fb07e.appspot.com",
    messagingSenderId: "844644050923",
    appId: "1:844644050923:web:6e0ddb04e5daed17839bae",
    measurementId: "G-J870H9J4GV"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };


import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

const config = {
    apiKey: "AIzaSyCCcOUHo4jJt-PABMq3BkPKoAblSTWEF8s",
    authDomain: "fitmeup-1cd96.firebaseapp.com",
    databaseURL: "https://fitmeup-1cd96.firebaseio.com",
    projectId: "fitmeup-1cd96",
    storageBucket: "fitmeup-1cd96.appspot.com",
    messagingSenderId: "588121214757",
    appId: "1:588121214757:web:baddf8841e166f033a94cc",
    measurementId: "G-9ZHFN63HR9"
};

firebase.initializeApp(config);

export default firebase;

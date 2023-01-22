import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/storage';


const firebaseConfig = {

apiKey: "AIzaSyCz4YciHDhM5NQ6T7LnqNIIjvQOCZJySbI",
authDomain: "bloggerashu.firebaseapp.com",
projectId: "bloggerashu",
storageBucket: "bloggerashu.appspot.com",
messagingSenderId: "14558960701",
appId: "1:14558960701:web:200918e8e543523c961e54",
measurementId: "G-640RJJZG4Q"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage=firebase.storage();
const auth=firebase.auth();


export{projectStorage,auth};

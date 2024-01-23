import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyD_MCO7inQU921ritFsBUleZTQ5MLRjOtA",
    authDomain: "fooddata-70350.firebaseapp.com",
    projectId: "fooddata-70350",
    storageBucket: "fooddata-70350.appspot.com",
    messagingSenderId: "833060443084",
    appId: "1:833060443084:web:1eb65647d0f7e5eab40369",
    measurementId: "G-5VJEJQ8X0W"
  };
  
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase }
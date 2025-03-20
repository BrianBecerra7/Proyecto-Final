import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


let app;
let db;


if (getApps().length === 0) {

    const firebaseConfig = {
        apiKey: "AIzaSyDJWPeRAqgHqFWKSDxymvQClzMdQ5kGhhU",
        authDomain: "rawconnect-53d6d.firebaseapp.com",
        projectId: "rawconnect-53d6d",
        storageBucket: "rawconnect-53d6d.firebasestorage.app",
        messagingSenderId: "318383808919",
        appId: "1:456269115125:web:7c34aebcf76dad6f4c1fbc"
    };


    app = initializeApp(firebaseConfig);
} else {

    app = getApps()[0];
}


db = getFirestore(app);

export { db };

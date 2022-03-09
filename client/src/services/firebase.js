import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import FirebaseConfig from "../configs/FirebaseConfig";

const firebaseApp = initializeApp(FirebaseConfig);

const auth = getAuth(firebaseApp);

const db = getFirestore(firebaseApp);

export { auth, db };

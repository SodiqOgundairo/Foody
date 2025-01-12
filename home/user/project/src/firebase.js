
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";//+
import { initializeApp } from "firebase/app";//+
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";//+
//+
const firebaseConfig = {//+
  // your firebase config//+
};//+
//+
const app = initializeApp(firebaseConfig);//+
const auth = getAuth(app);//+
const db = getFirestore(app);//+
//+
export { auth, db };//+

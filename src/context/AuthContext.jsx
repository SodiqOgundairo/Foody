import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "../firebase.js";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from "firebase/auth";
import { setDoc, doc } from 'firebase/firestore'

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  //   SIGNUP FUNCTION
  function signUp(email, password) {
    createUserWithEmailAndPassword(auth, email, password);
    setDoc(doc(db, 'users', email), {
      savedShows: []
    })
  }

  //   LOGIN FUNCTION
  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  
    //    GOOGLE SIGNUP 
    async function signInWithGoogle() {
      await signInWithPopup(auth, googleProvider);
    }

  //   LOGOUT FUNCTION
  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser)=> {
        setUser(currentUser)
    })
    return () => {
        unsubscribe()
    }
  })

  return (
    <AuthContext.Provider value={{ signUp, logIn, signInWithGoogle, logOut, user }}>
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
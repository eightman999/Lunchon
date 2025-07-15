// src/boot/firebase.ts
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'

// 🔽 コピーしたconfig貼る
const firebaseConfig = {
  apiKey: "AIzaSyC5W3rBeNwETPafr5H5vYjAc8RDHvtTbt0",
  authDomain: "lunchon-5c389.firebaseapp.com",
  projectId: "lunchon-5c389",
  storageBucket: "lunchon-5c389.firebasestorage.app",
  messagingSenderId: "244547921451",
  appId: "1:244547921451:web:b0c1196bb077ebcb2c6c6e",
  measurementId: "G-L0T2R8JJPH"
}

const app = initializeApp(firebaseConfig)

const db = getFirestore(app)
const storage = getStorage(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {
  db,
  storage,
  auth,
  provider,
  signInWithPopup,
  signOut
}

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const JewelleryApp = initializeApp(
  {
    apiKey: "AIzaSyBfGFJC9CJLtwOHvR24FWy7ZbpG9uWky1M",
    authDomain: "jewelleryapp-9f048.firebaseapp.com",
    projectId: "jewelleryapp-9f048",
    storageBucket: "jewelleryapp-9f048.appspot.com",
    messagingSenderId: "1077692801003",
    appId: "1:1077692801003:web:8b98ac4a5afe7c045203ae",
  },
  "main-app"
);
export const db = getFirestore(JewelleryApp);
export const auth = getAuth(JewelleryApp);

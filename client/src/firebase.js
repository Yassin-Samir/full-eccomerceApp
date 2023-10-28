import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const JewelleryApp = initializeApp({
  apiKey: "AIzaSyAAn75zHrG4LLGfuw37VZF_Uf_fiarbAiU",
  authDomain: "jewelery-store-5aceb.firebaseapp.com",
  projectId: "jewelery-store-5aceb",
  storageBucket: "jewelery-store-5aceb.appspot.com",
  messagingSenderId: "735259458263",
  appId: "1:735259458263:web:bf55347259e1354cc40e92",
});
export const auth = getAuth(JewelleryApp);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyA9wlH7QeSKyCn3nwsiBxOtFOk1qCkFPbg",
  authDomain: "cccc-ded8a.firebaseapp.com",
  projectId: "cccc-ded8a",
  storageBucket: "cccc-ded8a.appspot.com",
  messagingSenderId: "867179852564",
  appId: "1:867179852564:web:a1e57a5c6c94c549f78801",
  measurementId: "G-N5FWVHLXSP"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };

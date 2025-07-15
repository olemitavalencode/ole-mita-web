import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDk2mnqyq1G4k1WF9Tdqkn09aG-tL6zSwM",
  authDomain: "ole-mita.firebaseapp.com",
  projectId: "ole-mita",
  storageBucket: "ole-mita.appspot.com",
  messagingSenderId: "980882780412",
  appId: "1:980882780412:web:309d756429486907ca779"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

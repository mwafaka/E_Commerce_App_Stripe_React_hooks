
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import 'firebase/functions';



const firebaseConfig = {
  apiKey: "AIzaSyCZMzpm2o336uwxiAEwR_6_0Dop6HicYY4",
  authDomain: "e12-mui-blog-cffe5.firebaseapp.com",
  projectId: "e12-mui-blog-cffe5",
  storageBucket: "e12-mui-blog-cffe5.appspot.com",
  messagingSenderId: "515057022618",
  appId: "1:515057022618:web:e7cf93fe5a6a8095345123"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);



export const auth = getAuth(app);
export const db = getFirestore(app);
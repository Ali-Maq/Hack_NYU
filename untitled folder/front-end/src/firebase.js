import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCe5a6dRXP_7SZgRITWn1XitAmhftkEtsc",
  authDomain: "project-saaa.firebaseapp.com",
  projectId: "project-saaa",
  storageBucket: "project-saaa.appspot.com",
  messagingSenderId: "997165031050",
  appId: "1:997165031050:web:f62783720c77cb27ecd773"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const provider = new GoogleAuthProvider()



export const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const name = result.user.displayName;
        const email = result.user.email;
  
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
      })
      .catch((error) => {
        console.log(error);
      });
  };
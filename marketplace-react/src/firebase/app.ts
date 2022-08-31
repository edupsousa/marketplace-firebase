import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCAejugQoGO5Ne4tYD5as9nf-m3_4zAIRk",
  authDomain: "edupsousa-marketplace.firebaseapp.com",
  databaseURL: "https://edupsousa-marketplace-default-rtdb.firebaseio.com",
  projectId: "edupsousa-marketplace",
  storageBucket: "edupsousa-marketplace.appspot.com",
  messagingSenderId: "264435943645",
  appId: "1:264435943645:web:00d42755bebd8c67933334",
};

const app = initializeApp(firebaseConfig);

export default app;

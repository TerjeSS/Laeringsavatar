import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css";
import {
  signInWithEmailAndPassword,
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";
import LogInForm from "../../components/Login/LogInForm";
import Register from "../../components/Register/RegisterForm";
import { auth, firestore } from "../../resources/firebase.js";
import { addDoc, collection } from "firebase/firestore";

// connectAuthEmulator(auth, "http://localhost:9099");

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showCreateUser, setShowCreateUser] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const loginWithEmail = async () => {
    try {
      const res = await signInWithEmailAndPassword(auth, username, password);
      setError("");
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/invalid-email") {
        setError("Vennligst bruk en gyldig epost");
      }
      if (error.code === "auth/internal-error") {
        setError("Vennligst fyll ut epost og passord");
      }
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        setError("Brukernavn eller passord er feil");
      }
    }
  };

  const checkInput = () => {
    if (!firstName || !lastName || !email || !password) {
      setError("Fyll inn alle feltene");
      return false;
    }
    return true;
  };
  const createUserWithEmail = async () => {
    setError("");
    if (!checkInput()) {
      return;
    }

    try {
      const user = await createUserWithEmailAndPassword(auth, email, password);
      console.log(user.user.uid);
      setError("");
      createFirebaseUserDocument(user.user.uid);
      navigate("/home");
    } catch (error) {
      if (error.code === "auth/weak-password") {
        setError("Passord må være minst 6 karakterer langt");
      }
      if (
        error.code === "auth/missing-email" ||
        error.code === "auth/invalid-email"
      ) {
        setError("Vennligst bruk en gyldig epost");
      }
      if (error.code === "auth/internal-error") {
        setError("Vennligst fyll ut epost og passord");
      }
      if (error.code === "auth/email-already-in-use") {
        setError("E-post adressen er allerede i bruk");
      }
      console.log({ error });
    }
  };

  const handleForgotPassword = async () => {
    try {
      const res = await sendPasswordResetEmail(auth, username);
      alert(
        "En epost er sendt til deg med instruksjoner. NB: Kan havne i spam-mappen"
      );
    } catch (error) {
      if (error.code === "auth/missing-email") {
        setError("Vennligst fyll inn epostadresse");
      }
    }
  };

  const createFirebaseUserDocument = async (userUID) => {
    const newUser = await addDoc(collection(firestore, "users"), {
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: "student",
      uid: userUID,
    });
    if (!newUser) {
      alert("Something went wrong when creating user");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left-container">
        <div className="left-text-container">
          <h2>Velkommen til VisBev3D</h2>
          <h3>
            En prototype for en visualiseringsapp som utvikles i forbindelse med
            prosjektet "Læringsavatar", (2022-24)
          </h3>
          <div>
            <p className="login-text-paragraph">
              Prosjekteier er Kunsthøgskolen i Oslo, avdeling PPU.
            </p>
            <p className="login-text-paragraph">
              Samarbeidspartnere er Norges idrettshøgskole, Kristiania og HLM
              Produksjoner.
            </p>
            <p className="login-text-paragraph">
              Prototypen utvikles av HLM Produksjoner i samarbeid med studenter
              på Høyskolen Kristiania, IT og 3D-design, under veiledning av
              Henrik Lieng.
            </p>
            <p className="login-text-paragraph">
              Prosjektet er støttet av Direktoratet for høyere utdanning og
              kompetanse.
            </p>
          </div>
        </div>
        <div className="left-image-container">
          <img src="/img/mesh_models.png" alt="dancing" />
        </div>
      </div>
      <div className="login-right-container">
        {!showCreateUser ? (
          <LogInForm
            userName={username}
            setUsername={setUsername}
            password={password}
            setPassword={setPassword}
            loginWithEmail={loginWithEmail}
            setShowCreateUser={setShowCreateUser}
            error={error}
            setError={setError}
            handleForgotPassword={handleForgotPassword}
          ></LogInForm>
        ) : (
          <>
            <Register
              setFirstName={setFirstName}
              setLastName={setLastName}
              setPassword={setPassword}
              setEmail={setEmail}
              createUserWithEmail={createUserWithEmail}
              setShowCreateUser={setShowCreateUser}
              error={error}
              setError={setError}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Login;

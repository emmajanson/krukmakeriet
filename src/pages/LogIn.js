import React from "react";
import styles from "./LogIn.module.css";
import { useNavigate } from "react-router-dom";

//Det här ska finnas
// - formulär för registrering
// - som ska skickas till db användare

function SignUp() {
  const navigate = useNavigate();

  function navToSignUp() {
    navigate("/signup");
  }

  function navToProfile() {
    navigate("/profile");
  }

  return (
    <main className={styles.wrapper}>
      <form>
        <label name="email">E-mail</label>
        <input type="text" name="email" placeholder="Enter E-mail..." />
        <label name="password">Password</label>
        <input type="password" name="password" placeholder="Enter Password" />
        <button onClick={navToProfile}>Log In</button>
        <p>Don't have an account?</p>
      </form>
      <button onClick={navToSignUp}>Sign up</button>
    </main>
  );
}

export default SignUp;

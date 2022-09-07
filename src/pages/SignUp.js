import React from "react";
import styles from "./SignUp.module.css";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  function navToProfile() {
    navigate("/profile");
  }

  return (
    <main className={styles.wrapper}>
      <section>
        <label name="name">Name</label>
        <input type="text" name="name" placeholder="Enter your name..." />
        <label name="email">E-mail</label>
        <input type="text" name="email" placeholder="Enter your email..." />
        <label name="password">Password</label>
        <input
          type="password"
          name="password"
          placeholder="Enter your password..."
        />
        <label name="confirm-password">Confirm Password</label>
        <input
          type="password"
          name="confirm-password"
          placeholder="Confirm password..."
        />
        <button onClick={navToProfile}>Register Account</button>
      </section>
    </main>
  );
}

export default SignUp;

import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Profile.module.css";

function Profile() {
  const navigate = useNavigate();

  function navToLogIn() {
    navigate("/login");
  }

  return (
    <main className={styles.wrapper}>
      <h1>Welcome to your profile!</h1>
      <button onClick={navToLogIn}>Log Out</button>
    </main>
  );
}

export default Profile;

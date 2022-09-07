import React from "react";
import Events from "../Components/Events";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  return (
  <main className={styles.wrapper}>
    <section className={styles.heroWrapper}>
    </section>

    <section className={styles.infoWrapper}>
      <div className={styles.textWrapper}>
        <p>Information om företaget</p>
      </div> 
      <div className={styles.imgWrapper}> 
        <img className={styles.infoImage} scr="" alt=""/>
      </div>
    </section>

    <section className={styles.linkWrapper}>
      {/* byt till klickbara bilder */}
      <div className={styles.linkImage} onClick={() => {navigate("/courses");}}>LÄNK KURSER</div>
      <div className={styles.linkImage} onClick={() => {navigate("/shop");}}>LÄNK SHOP</div>
    </section>
    
    <Events />
  </main>

    )
}

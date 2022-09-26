import React from "react";
import Events from "../Components/Events";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";

export default function Home() {
  let navigate = useNavigate();

  return (
    <main data-testid="home" className={styles.wrapper}>
      <section className={styles.heroWrapper}>
        <div className={styles.heroTextContainer}>
          <p>BILD KRUKA</p>
          <p>KRUKMAKERIET</p>
          <p>EN LINJE</p>
          <p>SKAPANDE TILLSAMMANS</p>
        </div>
      </section>

      <section className={styles.infoWrapper}>
        <div className={styles.textWrapper}>
          <p>Krukmakeriet på Pusterviksgatan är en studio och butik för keramik. Vi öppnade våra dörrar år 2022 med visionen att skapa och sprida keramikkonsten till världen. Genom kurser och event lär vi ut denna ädla konst och för människor närmare varandra.

</p>
        </div>
        <div className={styles.imgWrapper}>
          <img className={styles.infoImage} scr="" alt="" />
        </div>
      </section>

      <section className={styles.linkWrapper}>
        {/* byt till klickbara bilder */}
        <div
          className={styles.linkImage}
          onClick={() => {
            navigate("/courses");
          }}
        >
          LÄNK KURSER
        </div>
        <div
          className={styles.linkImage}
          onClick={() => {
            navigate("/shop");
          }}
        >
          LÄNK SHOP
        </div>
      </section>

      <Events />
    </main>
  );
}

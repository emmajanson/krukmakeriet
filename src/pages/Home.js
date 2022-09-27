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
          <img
            src={process.env.PUBLIC_URL + "/images/headerLogoDesktop.png"}
            alt="En fin bild"
          />
        </div>
      </section>
      <section className={styles.infoWrapper}>
        <div className={styles.imgWrapper}>
          <img
            className={styles.infoImage}
            src={process.env.PUBLIC_URL + "/images/homeIntroEtt.jpg"}
            alt="En fin bild"
          />
        </div>

        <div className={styles.textWrapper}>
          <div className={styles.test}>
            <h3 className={styles.heading}>Det här är vi</h3>
            <p className={styles.text}>
              Krukmakeriet på Pusterviksgatan är en studio och butik för
              keramik. Vi öppnade våra dörrar år 2022 med visionen att skapa och
              sprida keramikkonsten till världen. Genom kurser och event lär vi
              ut denna ädla konst och för människor närmare varandra.
            </p>
          </div>
          <div className={styles.imgTextWrapper}>
            <img
              className={styles.imgText}
              src={process.env.PUBLIC_URL + "/images/homeIntroTvå.jpg"}
              alt="bild på två personer"
            />
          </div>
        </div>
      </section>

      <section className={styles.linkWrapper}>
        {/* byt till klickbara bilder */}
        <div
          className={styles.linkImageWrapper}
          onClick={() => {
            navigate("/shop");
          }}
        >
          <img
            className={styles.linkImageShop}
            src={process.env.PUBLIC_URL + "/images/homeLinkShop.jpg"}
            alt="En fin bild"
          />
          <p className={styles.linkImageText}>SHOP</p>
        </div>

        <div
          className={styles.linkImageWrapper}
          onClick={() => {
            navigate("/courses");
          }}
        >
          <img
            className={styles.linkImageCourses}
            src={process.env.PUBLIC_URL + "/images/homeLinkCourses.jpg"}
            alt="En fin bild"
          />
          <p className={styles.linkImageText}>KURSER</p>
        </div>
      </section>
      <Events />
    </main>
  );
}

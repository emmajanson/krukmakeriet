/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import styles from "./Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaClock,
  FaMapMarkerAlt,
  FaMailBulk,
} from "react-icons/fa";

function Footer() {
  return (
    <section className={styles.wrapper} data-testid="footer">
      <section className={styles.infoWrapper}>
        <div className={styles.topContWrapper}>
          <article className={styles.textWrapper}>
            <FaMapMarkerAlt className={styles.icon} />
            <h5 className={styles.subheader}>Adress</h5>
            <p className={styles.text}>Pusterviksgatan 3</p>
            <p className={styles.text}>413 01 Göteborg</p>
          </article>

          <article className={styles.textWrapper}>
            <FaMailBulk className={styles.icon} />
            <h5 className={styles.subheader}>Kontakt</h5>
            <p className={styles.text}>info@krukmakeriet.se</p>
            <p className={styles.text}>031 - 00 00 00</p>
          </article>

          <article className={styles.textWrapper}>
            <FaClock className={styles.icon} />
            <h5 className={styles.subheader}>Öppettider</h5>
            <p className={styles.text}>Vardagar 09.00-18.00</p>
          </article>
        </div>

        <div className={styles.bottomContWrapper}>
          <article className={styles.socialMediaWrapper}>
            <a className={styles.iconLink} href="https://www.facebook.com/" target="_blank">
              <FaFacebook className={styles.socialIcon} />
            </a>
            <a className={styles.iconLink} href="https://www.instagram.com/" target="_blank">
              <FaInstagram className={styles.socialIcon} />
            </a>
            <a className={styles.iconLink} href="https://twitter.com/" target="_blank">
              <FaTwitter className={styles.socialIcon} />
            </a>
          </article>

          <p className={styles.copyright}>Copyright © 2022 Krukmakeriet</p>
        </div>
      </section>
    </section>
  );
}

export default Footer;

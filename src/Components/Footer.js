import React from "react";
import styles from "./Footer.module.css";
import {
  FiInstagram,
  FiFacebook,
  FiTwitter,
} from "react-icons/fi";

const Footer = () => {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_box}>
        <div className={styles.footer_box_info}>
          <h1>Kontakt</h1>
          <p>Krukmakeriet AB</p>
          <p>Adress</p>
          <p>Postnummer och stad</p>
          <p>Emailadress</p>
          <p>Telefonnummer</p>
        </div>
        <div className={styles.footer_box_social}>
          <a href="#">
            <FiInstagram/>
          </a>
          <a href="#">
            <FiFacebook/>
          </a>
          <a href="#">
            <FiTwitter/>
          </a>
        </div>
      </div>
  </div>
  )
}

export default Footer;

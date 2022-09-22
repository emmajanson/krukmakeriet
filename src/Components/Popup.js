import React from 'react';
import styles from "./Popup.module.css";
import { useNavigate } from 'react-router-dom';

function Popup(props) {
  const navigate = useNavigate();
  
  return (props.trigger) ? (
    <div className={styles.popupWrapper}>
        <div className={styles.popupContent}>
          <button className={styles.btnGoOn} onClick={() => props.setTrigger(false)}>Fortsätt handla</button>
          <button className={styles.btnPay} onClick={() => navigate("/checkout")}>Gå till kassan</button>
          { props.children }
        </div>
    </div>
  ) : "";
}

export default Popup
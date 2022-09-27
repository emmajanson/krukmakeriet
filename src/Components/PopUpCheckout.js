import React from "react";
import styles from "./Popup.module.css";
import { useNavigate } from "react-router-dom";
import Checkout from "../pages/Checkout";

function Popup(props) {
  const navigate = useNavigate();

  return props.trigger ? (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <button
          className={styles.btnGoOn}
          onClick={() => {
            props.setTrigger(false);
            navigate(props.navigation);
          }}
        >
          Stäng
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

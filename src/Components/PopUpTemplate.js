import React from "react";
import styles from "./PopupTemplate.module.css";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  // FiUser,
} from "react-icons/fi";

function Popup(props) {
  const navigate = useNavigate();

  return props.trigger ? (
    <div className={styles.popupWrapper}>
      <div className={styles.popupContent}>
        <div
          className={styles.closeButton}
          onClick={() => {
            props.setTrigger(false);
            navigate(props.navigation);
          }}
        >
          <FiX color="black" size={39} />
        </div>
        <div className={styles.contentWrapper}>
          <img id={styles.checkMark} src="../images/Icons/checkMark.svg"></img>
          <div className={styles.textWrapper}>{props.children}</div>
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;

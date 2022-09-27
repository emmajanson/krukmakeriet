import React from 'react';
import styles from "./Popup.module.css";
import { useNavigate } from 'react-router-dom';
import { FiX } from "react-icons/fi";

function Popup(props) {
  const navigate = useNavigate();

  return (props.trigger) ? (
    <div className={styles.popupContent}>
      <p className={styles.text}>{ props.children }</p>
      <button
        className={styles.closingBtn}
        onClick={() => {
          props.setTrigger(false);
        navigate(props.navigation);
        }}
        >
        <FiX className={styles.cross} />
      </button>
    </div>
  ) : "";
}

export default Popup
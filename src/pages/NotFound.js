import React from "react";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.NoPageFoundWrapper} data-testid="notFound">
      <div className={styles.messageWrapper}>
        <h1>No page found!</h1>
        <p>Inget att se här tyvärr...</p>
      </div>
    </div>
  );
}

export default NotFound;

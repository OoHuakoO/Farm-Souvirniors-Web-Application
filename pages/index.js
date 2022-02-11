import React from "react";
import styles from "../styles/Index.module.css";

const index = () => {
  
  return (
    <div className={styles.homemain}>
      <div className={styles.homeWelcome} >
        <h2>Welcome</h2>
        <h2>FARM SOUVIRNIORS</h2>
      </div>
      <div className={styles.buttonLogin}>
        Login
      </div>
    </div>
  );
};

export default index;

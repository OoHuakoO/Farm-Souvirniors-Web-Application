import React, { useEffect } from "react";
import styles from "../styles/Index.module.css";
import { useMoralis } from "react-moralis";
import { useRouter } from "next/router";

const index = () => {
  const router = useRouter();
  const { authenticate, isAuthenticated, logout } = useMoralis();

  return (
    <div className={styles.homemain}>
      {isAuthenticated ? null : (
        <>
          <div className={styles.homeWelcome}>
            <h2>Welcome</h2>
            <h2>FARM SOUVIRNIORS</h2>
          </div>
          <div className={styles.buttonLogin}>Login</div>
        </>
      )}
    </div>
  );
};

export default index;

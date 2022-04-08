import React, { useState, useEffect } from "react";
import styles from "../styles/Playgame.module.css";
import { useMoralis } from "react-moralis";
import { useUserState } from "../context/user";
export default function PlayGame() {
  const { isAuthenticated } = useMoralis();
  const { share_address_wallet } = useUserState();
  return (
    <div style={{ marginLeft: "15%" }}>
      <h1 className={styles.title}>PlayGame</h1>
    </div>
  );
}

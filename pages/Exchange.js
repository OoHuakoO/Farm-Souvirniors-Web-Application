import React, { useState, useEffect } from "react";
import { Deposit } from "../components/Deposit";
import { Withdraw } from "../components/Withdraw";
import styles from "../styles/Exchange.module.css";
import { useUserState } from "../context/user";
import CardInventories from "../components/CardInventories";

export default function Exchange() {
  const { share_address_wallet } = useUserState();
  const [CurrentTab, setCurrentTab] = useState(1);
  const changeTab = (index) => {
    setCurrentTab(index);
  };
  const SwapTab = () => {
    if (CurrentTab == 0) {
      return <Deposit share_address_wallet={share_address_wallet} />;
    } else if (CurrentTab == 1) {
      return <Withdraw share_address_wallet={share_address_wallet} />;
    }
  };
  return (
    <div>
      <div className={styles.topicSelecyExchage}>
        <button
          className={
            CurrentTab === 0
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(0)}
        >
          Deposit
        </button>
        <button
          className={
            CurrentTab === 1
              ? styles.buttonCategoryActive
              : styles.buttonCategory
          }
          onClick={() => changeTab(1)}
        >
          withdraw
        </button>
        
      </div>
      
      <CardInventories/>
     
      <SwapTab />
    </div>
  );
}

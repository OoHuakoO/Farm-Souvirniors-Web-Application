import React, { useState } from "react";

import { Deposit } from "../components/Deposit";
import { Withdraw } from "../components/Withdraw";
import styles from "../styles/Exchange.module.css";




export default function Exchange() {
  const cardExchange = [
    {
      name: "Corn",
      UID: 10024510303,
      image: "Corn.png",
      category: "Deposit",
    },
    
  ];
  const [CurrentTab, setCurrentTab] = useState(1);
  const changeTab = (index) => {
    setCurrentTab(index)
  }

  const SwapTab = () => {
    if(CurrentTab==0) {
      return <Deposit/>
    }
    else if (CurrentTab==1) {
      return <Withdraw/>
    }
  } 
  return (
    <div>
      <button className={CurrentTab === 0 ? styles.buttonCategoryActive : styles.buttonCategory} onClick={()=>changeTab(0)} >Deposit</button>
      <button className={CurrentTab === 1 ? styles.buttonCategoryActive : styles.buttonCategory} onClick={()=>changeTab(1)} >withdraw</button>
     <SwapTab/> 
      
    </div>
  );
}

import React from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import Box1 from "../public/Box1.png";
import Ethereum from "../public/Ethereum-icon-purple.png";

const CardBuychests = (props) => {
  return (
    <div className={styles.CardBuyChests1}>
      <div className={styles.CardBuyChests2}>
        <div>
          <Image src={props.picture} alt="Box1" width={200} height={200} />
        </div>
        <div className={styles.typeBox}>
          <span>{props.count}/100 </span>
          <span> {props.name}</span>
        </div>
        <div className={styles.bnb}>
          <div>{props.price} ETH</div>
          <div>
            <Image src={Ethereum} alt="Ethereum" width={25} height={25} />
          </div>
        </div>
        <div className={styles.buttonBuy}>buy</div>
      </div>
    </div>
  );
};

export default CardBuychests;

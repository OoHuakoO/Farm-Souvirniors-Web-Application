import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
const CardSell = (props) => {
  return (
    <div className={styles.cardMyItem1}>
      <div className={styles.cardMyItem2}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.nft_id}</span>
        </div>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.buttonCancleSell}>
        <span>Cancle Sell</span>
      </div>
    </div>
  );
};

export default CardSell;

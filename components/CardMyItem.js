import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";

const CardMyItem = (props) => {
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
      {props.status === "not_plant" ? (
        <div className={styles.buttonSell}>
          <span> Sell</span>
        </div>
      ) : (
        <>
          <div className={styles.buttonSell}>
            <span>Not Sell</span>
          </div>
          <div>
            <span>this nft in game</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CardMyItem;

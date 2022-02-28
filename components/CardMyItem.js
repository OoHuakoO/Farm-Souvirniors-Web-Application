import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";

const CardMyItem = (props) => {
  return (
    <div className={styles.cardMyItem1}>
      <div className={styles.cardMyItem2}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.UID}</span>
        </div>
        <div className={styles.imageMyItem}>
          <Image
            src={"/../public/" + props.image}
            alt="Corn"
            width={200}
            height={200}
          />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.buttonSell}>
        <span>Sell</span>
      </div>
    </div>
  );
};

export default CardMyItem;

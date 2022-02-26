import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Corn from "../public/corn.png";

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
            automatically
            provided
            height={200}
            blurDataURL="data:..."
            placeholder="blur" // Optional blur-up while loading
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

import React from 'react';
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Corn from "../public/corn.png";
import coinApple from "../public/coinApple.png";
import coinWood from "../public/coinWood.svg";

const CardCraft = (props) => {
  return (
    <div className={styles.cardMyItem5}>
      <div className={styles.cardMyItem6}>
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
        <div >
        <span className={styles.popupCraft}>ดูเพิ่มเติม</span>
      </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.coinCraft}>
        <span>{props.coin1}</span>
      </div>
      <div className={styles.buttonSell}>
        <span>Craft</span>
      </div>
    </div>
  )
}

export default CardCraft

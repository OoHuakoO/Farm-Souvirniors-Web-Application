import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Corn from "../public/corn.png";
import Ethereum from "../public/Ethereum-icon-purple.png";

const CardMarketplace = (props) => {
  return (
    <div className={styles.cardMyItem3}>
      <div className={styles.cardMyItem4}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.UID}</span>
        </div>
        <div className={styles.uidCard}>
          <span>Seller : </span>
          <span>{props.seller}</span>
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
        <span>{props.price} ETH</span>
        <span>
          <Image src={Ethereum} alt="Ethereum" width={25} height={25} />
        </span>
      </div>
      <div className={styles.buttonSell}>
        <span>Sell</span>
      </div>
    </div>
  );
};

export default CardMarketplace;

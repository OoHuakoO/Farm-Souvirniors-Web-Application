import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Corn from "../public/corn.png";
import coinApple from "../public/coinApple.png";
import coinWood from "../public/coinWood.svg";

const CardCraft = (props) => {
  return (
    <div className={styles.cardMyItem5}>
      <div className={styles.cardMyItem6}>
        
        <div className={styles.imageMyItem}>
          <Image
            src={"/../public/" + props.image}
            alt="Corn"
            width={200}
            
            height={200}
            blurDataURL="data:..."
            placeholder="blur" // Optional blur-up while loading
          />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.costCraft}>
        <span>Cost</span>
      </div>
      <div className={styles.coinCraft}>
        
        <div className={styles.coinCraft1}>
          <div className={styles.coinCraft1Icon}>
            <Image
              src={"/../public/" + props.iconcoin1}
              alt="Corn"
              width={35}
              
              height={35}
              blurDataURL="data:..."
              placeholder="blur" // Optional blur-up while loading
            />
          </div>
          <div className={styles.coinCraft1Coin}>{props.coin1}</div>
        </div>
        <div className={styles.coinCraft2}>
          <div className={styles.coinCraft2Icon}>
            {" "}
            <Image
              src={"/../public/" + props.iconcoin2}
              alt="Corn"
              width={30}
             
              height={30}
              blurDataURL="data:..."
              placeholder="blur" // Optional blur-up while loading
            />
          </div>
          <div className={styles.coinCraft2Coin}>{props.coin2}</div>
        </div>
      </div>
      <div className={styles.buttonSell}>
        <span>Craft</span>
      </div>
    </div>
  );
};

export default CardCraft;

import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
const CardCraft = (props) => {
  console.log(props.address_wallet);
  return (
    <div className={styles.cardMyItem5}>
      <div className={styles.cardMyItem6}>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
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
              src={"/../public/coinWood.svg"}
              alt="Corn"
              width={35}
              height={35}
            />
          </div>
          <div className={styles.coinCraft1Coin}>{props.cost.wood}</div>
        </div>
        <div className={styles.coinCraft2}>
          <div className={styles.coinCraft2Icon}>
            {" "}
            <Image
              src={"/../public/coinApple.png"}
              alt="Corn"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.coinCraft2Coin}>{props.cost.fruit}</div>
        </div>
      </div>
      <div className={styles.buttonSell}>
        <span>Craft</span>
      </div>
    </div>
  );
};

export default CardCraft;

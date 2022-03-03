import React from "react";
import Image from "next/image";
import styles from "../styles/Exchange.module.css";

const CardExchange = () => {
  return (
    <div className={styles.BgExchange}>
      <div className={styles.Exchange}>
        <div className={styles.topicExchange}>Balances</div>
        <div className={styles.topicExchangeFruit}>
          <div className={styles.coinCraft2Coin}>50</div>
          <div className={styles.coinCraft2Icon}>
            {" "}
            <Image
              src={"/../public/coinApple.png"}
              alt="Corn"
              width={30}
              height={30}
            />
          </div>
        </div>
        <div className={styles.topicExchangeWood}>
          <div className={styles.coinCraft1Coin}>150</div>
          <div className={styles.coinCraft1Icon}>
            <Image
              src={"/../public/coinWood.svg"}
              alt="Corn"
              width={35}
              height={35}
            />
          </div>
        </div>
        <div className={styles.topicExchangeMeat}>
          <div>200</div>
          <div>2</div>
        </div>
      </div>
    </div>
  );
};

export default CardExchange;

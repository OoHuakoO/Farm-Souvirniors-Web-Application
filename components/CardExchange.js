import React from "react";
import Image from "next/image";
import styles from "../styles/Exchange.module.css";

const CardExchange = () => {
  return (
    <div className={styles.BgExchange}>
      <div className={styles.TopicExchange}>Swap</div>
      <div className={styles.exchangeCoin}>
        <div className={styles.exchangeCoin1}>
          <div className={styles.Coin1}>555</div>
          <div>
            <select
              className={[styles.formSelect, "form-select"].join(" ")}
              aria-label="Default select example"
            >
              <option value="1">Fruit</option>
              <option value="2">wood</option>
              <option value="3">Meat</option>
            </select>
          </div>
        </div>
        <div className={styles.menuSwap}>
          <span className="material-icons">south</span>
        </div>
        <div className={styles.exchangeCoin2}>
          <div className={styles.Coin1}>2.2563</div>
          <div className={styles.coin2}>
            CoinFruit
          </div>
        </div>
      </div>
      <div className={styles.buttonExchange}>Withdraw</div>
    </div>
  );
};

export default CardExchange;

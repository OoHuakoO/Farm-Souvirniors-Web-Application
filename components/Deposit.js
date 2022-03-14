import React from "react";
import styles from "../styles/Exchange.module.css";

export const Deposit = () => {
    
  return (
    <div>
      <div className={styles.BgExchange}>
        <div className={styles.TopicExchange}>Swap</div>
        <div className={styles.exchangeCoin}>
          <div className={styles.exchangeCoin1}>
            <div className={styles.Coin1}>
            <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                />
              </div></div>
            <div>
              <select
                className={[styles.formSelect, "form-select"].join(" ")}
                
              >
                <option value="1">CointFruit</option>
                <option value="2">Cointwood</option>
                <option value="3">CointMeat</option>
              </select>
            </div>
          </div>
          <div className={styles.menuSwap}>
            <span className="material-icons">south</span>
          </div>
          <div className={styles.exchangeCoin2}>
            <div className={styles.Coin1}>2.2563</div>
            <div className={styles.coin2}>Fruit</div>
          </div>
        </div>
        <div className={styles.buttonExchange}>Withdraw</div>
      </div>
    </div>
  );
};

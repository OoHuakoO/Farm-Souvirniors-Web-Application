import React from "react";
import Image from "next/image";
import styles from "../styles/Exchange.module.css";

const CardExchange = () => {
  return (
    <div className={styles.BgExchange}>
      <div>Swap</div>
      <div className={styles.exchangeCoin1}>
      <div>Swap</div>
      <div>
      <select class="form-select" aria-label="Default select example">
  <option selected>Open this select menu</option>
  <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option>
</select></div></div>
    </div>
  );
};

export default CardExchange;

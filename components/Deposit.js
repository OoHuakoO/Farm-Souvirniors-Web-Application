import React, { useState } from "react";
import styles from "../styles/Exchange.module.css";

export const Deposit = () => {
  const CoinsExchange = [
    {
      nameCoin2: "Fruit",
      nameCoin1: "CoinFruit",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin2: "Wood",
      nameCoin1: "CoinWood",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin2: "Meat",
      nameCoin1: "CoinMeat",
      priceCoin1: 5,
      priceCoin2: 1,
    },
  ];

  const [SelectedCoinIndex, setSelectedCoinIndex] = useState(0);
  // const [InputPrice , setInputPrice] = useState("");
  const [ExchangePrice, setExchangePrice] = useState(0);
  const changeSelectcoin = (index) => {
    const _index = Number(index);
    //   console.log("555",_index)
    setSelectedCoinIndex(_index);
  };
  //คิดภาษีกับจำนวน coin
  const calculateCoin = (event) => {
    // console.log("5555", event);
    const InputSaveCoin = Number(event.target.value);

    const TotalCoin = InputSaveCoin;
    // console.log("คิดเลข", TotalCoin);
    setExchangePrice(TotalCoin);
  };
  const DepositCoin = () => {
    console.log("ExchangePrice", ExchangePrice);
    const dataForm = {
      ExchangePrice: ExchangePrice,
      CoinsExchange: CoinsExchange[SelectedCoinIndex],
    };
    console.log("dataform", dataForm);
  };
  return (
    <div>
      <div className={styles.BgExchange}>
        <div className={styles.TopicExchange}>Swap</div>
        <div className={styles.exchangeCoin}>
          <div className={styles.exchangeCoin1}>
            <div className={styles.Coin1}>
              <div className="input-group mb-3">
                <input
                  type="number"
                  className="form-control"
                  aria-label="Default"
                  aria-describedby="inputGroup-sizing-default"
                  // onChange={(event)=>{
                  //   setInputPrice(event.target.value)
                  // }}
                  onChange={calculateCoin}
                />
              </div>
            </div>
            <div>
              <select
                className={[styles.formSelect, "form-select"].join(" ")}
                onChange={(event) => {
                  changeSelectcoin(event.target.value);
                }}
              >
                {CoinsExchange.map((item, index) => {
                  return (
                    <option value={index} key={index}>
                      {item.nameCoin1}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className={styles.menuSwap}>
            <span className="material-icons">south</span>
          </div>
          <div className={styles.exchangeCoin2}>
            <div className={styles.Coin1}>{ExchangePrice}</div>
            <div className={styles.coin2}>
              {CoinsExchange[SelectedCoinIndex].nameCoin2}
            </div>
          </div>
        </div>
        <div className={styles.buttonExchange} onClick={DepositCoin}>
          Deposit
        </div>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import styles from "../styles/Exchange.module.css";
import { withdrawSteakToken } from "../web3/steakToken";
import { withdrawFurnitureToken } from "../web3/furnitureToken";
import { withdrawWineToken } from "../web3/wineToken";
import { checkResource, withdrawTokenAPI } from "../api/token";
export const Withdraw = (props) => {
  const CoinsExchange = [
    {
      nameCoin1: "Fruit",
      nameCoin2: "CoinFruit",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin1: "Wood",
      nameCoin2: "CoinWood",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin1: "Meat",
      nameCoin2: "CoinMeat",
      priceCoin1: 5,
      priceCoin2: 1,
    },
  ];

  const [SelectedCoinIndex, setSelectedCoinIndex] = useState(0);
  const [ExchangePrice, setExchangePrice] = useState(0);
  const [inputSaveCoin, setInputSaveCoin] = useState(0);
  const changeSelectcoin = (index) => {
    const _index = Number(index);
    setSelectedCoinIndex(_index);
  };
  //คิดภาษีกับจำนวน coin
  const calculateCoin = (event) => {
    const InputSaveCoin = Number(event.target.value);
    setInputSaveCoin(InputSaveCoin);
    const TotalCoin = InputSaveCoin - InputSaveCoin * 0.1;
    setExchangePrice(TotalCoin);
  };
  const withdrawCoin = async () => {
    if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood") {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        let responseWeb3 = await withdrawFurnitureToken(
          props.share_address_wallet,
          ExchangePrice
        );
        if (responseWeb3) {
          let responseAPI = await withdrawTokenAPI(
            props.share_address_wallet,
            inputSaveCoin,
            CoinsExchange[SelectedCoinIndex].nameCoin1
          );
          console.log("responseAPI", responseAPI);
        }
        console.log("responseWeb3", responseWeb3);
      } else {
        console.log(responseAPI.data);
      }
    } else if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Meat") {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        let responseWeb3 = await withdrawSteakToken(
          props.share_address_wallet,
          ExchangePrice
        );
        if (responseWeb3) {
          let responseAPI = await withdrawTokenAPI(
            props.share_address_wallet,
            inputSaveCoin,
            CoinsExchange[SelectedCoinIndex].nameCoin1
          );
          console.log("responseAPI", responseAPI);
        }
        console.log("responseWeb3", responseWeb3);
      } else {
        console.log(responseAPI.data);
      }
    } else {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        let responseWeb3 = await withdrawWineToken(
          props.share_address_wallet,
          ExchangePrice
        );
        if (responseWeb3) {
          let responseAPI = await withdrawTokenAPI(
            props.share_address_wallet,
            inputSaveCoin,
            CoinsExchange[SelectedCoinIndex].nameCoin1
          );
          console.log("responseAPI", responseAPI);
        }
        console.log("responseWeb3", responseWeb3);
      } else {
        console.log(responseAPI.data);
      }
    }
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
        <div className={styles.buttonExchange} onClick={withdrawCoin}>
          Withdraw
        </div>
      </div>
    </div>
  );
};

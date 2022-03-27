import React, { useState, useEffect } from "react";
import styles from "../styles/Exchange.module.css";
import {
  getContractAddressSteakToken,
  depositSteakToken,
} from "../web3/steakToken";
import {
  getContractAddressFurnitureToken,
  depositFurnitureToken,
} from "../web3/furnitureToken";
import {
  getContractAddressWineToken,
  depositWineToken,
} from "../web3/wineToken";
import { depositTokenAPI } from "../api/token";
export const Deposit = (props) => {
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
  const [ExchangePrice, setExchangePrice] = useState(0);
  const changeSelectcoin = (index) => {
    const _index = Number(index);
    setSelectedCoinIndex(_index);
  };
  //คิดภาษีกับจำนวน coin
  const calculateCoin = (event) => {
    const InputSaveCoin = Number(event.target.value);
    const TotalCoin = InputSaveCoin;
    setExchangePrice(TotalCoin);
  };
  const DepositCoin = async () => {
    if (CoinsExchange[SelectedCoinIndex].nameCoin2 === "Wood") {
      console.log(CoinsExchange[SelectedCoinIndex].nameCoin2);
      let responseWeb3 = await depositFurnitureToken(
        props.share_address_wallet,
        parseInt(ExchangePrice)
      );
      console.log("responseWeb3", responseWeb3);
      if (responseWeb3) {
        let responseAPI = await depositTokenAPI(
          props.share_address_wallet,
          ExchangePrice,
          CoinsExchange[SelectedCoinIndex].nameCoin2
        );
        props.setRefrestFetchAPI(!props.refrestFetchAPI);
        console.log("responseAPI", responseAPI);
      }
    } else if (CoinsExchange[SelectedCoinIndex].nameCoin2 === "Meat") {
      let responseWeb3 = await depositSteakToken(
        props.share_address_wallet,
        ExchangePrice
      );
      console.log("responseWeb3", responseWeb3);
      if (responseWeb3) {
        let responseAPI = await depositTokenAPI(
          props.share_address_wallet,
          ExchangePrice,
          CoinsExchange[SelectedCoinIndex].nameCoin2
        );
        props.setRefrestFetchAPI(!props.refrestFetchAPI);
        console.log("responseAPI", responseAPI);
      }
    } else {
      let responseWeb3 = await depositWineToken(
        props.share_address_wallet,
        ExchangePrice
      );
      if (responseWeb3) {
        let responseAPI = await depositTokenAPI(
          props.share_address_wallet,
          ExchangePrice,
          CoinsExchange[SelectedCoinIndex].nameCoin2
        );
        props.setRefrestFetchAPI(!props.refrestFetchAPI);
        console.log("responseAPI", responseAPI);
      }
      console.log("responseWeb3", responseWeb3);
    }
  };
  useEffect(() => {
    const getContractToken = async () => {
      console.log("steakToken", await getContractAddressSteakToken());
      console.log("furnitureToken", await getContractAddressFurnitureToken());
      console.log("wineToken", await getContractAddressWineToken());
    };
    getContractToken();
  }, []);
  return (
    <div>
      <div className={styles.BgExchange}>
        <div className={styles.TopicExchange}>
          <div>Swap</div>
          {CoinsExchange[SelectedCoinIndex].nameCoin2 === "Wood" ? (
            <div>Balance : {props.dataResource && props.dataResource.wood}</div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin2 === "Fruit" ? (
            <div>
              Balance : {props.dataResource && props.dataResource.fruit}
            </div>
          ) : (
            <div>Balance : {props.dataResource && props.dataResource.meat}</div>
          )}
        </div>
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
            <div className="material-icons">south</div>
          </div>
          <div className={styles.balance}>Balance : 0</div>
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

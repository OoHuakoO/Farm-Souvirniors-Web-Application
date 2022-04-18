import React, { useState } from "react";
import styles from "../styles/Exchange.module.css";
import { withdrawSteakToken, balanceOf } from "../web3/steakToken";
import { withdrawFurnitureToken } from "../web3/furnitureToken";
import { withdrawWineToken } from "../web3/wineToken";
import { checkResource, withdrawTokenAPI } from "../api/token";
import ModalNotEnoughCoinsNFT from "./ModalNotEnoughCoinsNFT";
import ClipLoaderButton from "../components/ClipLoaderButton";
export const Withdraw = (props) => {
  const CoinsExchange = [
    {
      nameCoin1: "Fruit",
      nameCoin2: "WineToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin1: "Wood",
      nameCoin2: "FurnitureToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin1: "Meat",
      nameCoin2: "SteakToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
  ];

  const [SelectedCoinIndex, setSelectedCoinIndex] = useState(0);
  const [ExchangePrice, setExchangePrice] = useState(0);
  const [taxPrice, setTaxPrice] = useState(0);
  const [inputSaveCoin, setInputSaveCoin] = useState(0);
  const [showPopupNotEnoughCoinsNFT, setShowPopupNotEnoughCoinsNFT] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowPopupNotEnoughCoinsNFT = () =>
    setShowPopupNotEnoughCoinsNFT(true);
  const changeSelectcoin = (index) => {
    const _index = Number(index);
    setSelectedCoinIndex(_index);
  };
  //คิดภาษีกับจำนวน coin
  const calculateCoin = (event) => {
    const InputSaveCoin = Number(event.target.value);
    setInputSaveCoin(InputSaveCoin);
    const TotalCoin = InputSaveCoin - InputSaveCoin * 0.1;
    const taxCoin = InputSaveCoin - TotalCoin;
    setTaxPrice(taxCoin);
    setExchangePrice(TotalCoin);
  };
  const withdrawCoin = async () => {
    setLoading(true);
    if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood") {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        try {
          let responseWeb3 = await withdrawFurnitureToken(
            props.share_address_wallet,
            ExchangePrice,
            taxPrice
          );
          if (responseWeb3) {
            let responseAPI = await withdrawTokenAPI(
              props.share_address_wallet,
              inputSaveCoin,
              CoinsExchange[SelectedCoinIndex].nameCoin1
            );
            props.setRefrestFetchAPI(!props.refrestFetchAPI);
            console.log("responseAPI", responseAPI);
            setLoading(false);
          }
          console.log("responseWeb3", responseWeb3);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
        handleShowPopupNotEnoughCoinsNFT();
      }
    } else if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Meat") {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        try {
          let responseWeb3 = await withdrawSteakToken(
            props.share_address_wallet,
            ExchangePrice,
            taxPrice
          );
          if (responseWeb3) {
            let responseAPI = await withdrawTokenAPI(
              props.share_address_wallet,
              inputSaveCoin,
              CoinsExchange[SelectedCoinIndex].nameCoin1
            );
            props.setRefrestFetchAPI(!props.refrestFetchAPI);
            console.log("responseAPI", responseAPI);
            setLoading(false);
          }
          console.log("responseWeb3", responseWeb3);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
        handleShowPopupNotEnoughCoinsNFT();
      }
    } else {
      let responseAPI = await checkResource(
        props.share_address_wallet,
        inputSaveCoin,
        CoinsExchange[SelectedCoinIndex].nameCoin1
      );
      if (responseAPI.data === "can withdraw token") {
        try {
          let responseWeb3 = await withdrawWineToken(
            props.share_address_wallet,
            ExchangePrice,
            taxPrice
          );
          if (responseWeb3) {
            let responseAPI = await withdrawTokenAPI(
              props.share_address_wallet,
              inputSaveCoin,
              CoinsExchange[SelectedCoinIndex].nameCoin1
            );
            props.setRefrestFetchAPI(!props.refrestFetchAPI);
            console.log("responseAPI", responseAPI);
            setLoading(false);
          }
          console.log("responseWeb3", responseWeb3);
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
        handleShowPopupNotEnoughCoinsNFT();
      }
    }
  };

  return (
    <div>
      <div className={styles.BgExchange}>
        <div className={styles.TopicExchange}>
          <div>Swap</div>
          {CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood" ? (
            <div>Balance : {props.dataResource && props.dataResource.wood}</div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin1 === "Fruit" ? (
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
            <span className="material-icons">south</span>
          </div>

          {CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood" ? (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance && props.dataBalance.balanceOfFurnitureToken}
            </div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin1 === "Fruit" ? (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance && props.dataBalance.balanceOfWineToken}
            </div>
          ) : (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance && props.dataBalance.balanceOfSteakToken}
            </div>
          )}
          <div className={styles.exchangeCoin2}>
            <div className={styles.Coin1}>{ExchangePrice}</div>
            <div className={styles.coin2}>
              {CoinsExchange[SelectedCoinIndex].nameCoin2}
            </div>
          </div>
        </div>
        {loading ? (
          <div className={styles.buttonExchange} onClick={withdrawCoin}>
            <ClipLoaderButton loading={loading} color="white" />
          </div>
        ) : (
          <div className={styles.buttonExchange} onClick={withdrawCoin}>
            Withdraw
          </div>
        )}

        <div className={styles.tax10}>Tax : 10%</div>
      </div>
      <ModalNotEnoughCoinsNFT
        item={props}
        setShowPopupNotEnoughCoinsNFT={setShowPopupNotEnoughCoinsNFT}
        showPopupNotEnoughCoinsNFT={showPopupNotEnoughCoinsNFT}
        bodyText={"Not enough resource for withdraw"}
        headerText={"Withdraw"}
      />
    </div>
  );
};

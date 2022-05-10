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
  const [inputSaveCoin, setInputSaveCoin] = useState("");
  const [showPopupNotEnoughCoinsNFT, setShowPopupNotEnoughCoinsNFT] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowPopupNotEnoughCoinsNFT = () =>
    setShowPopupNotEnoughCoinsNFT(true);
  const changeSelectcoin = (index) => {
    const _index = Number(index);
    setSelectedCoinIndex(_index);
    setInputSaveCoin("");
    setTaxPrice(0);
    setExchangePrice(0);
  };

  const handleMax = () => {
    if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood") {
      const TotalCoin =
        Number(props.dataResource.wood) - Number(props.dataResource.wood) * 0.1;
      const taxCoin = Number(props.dataResource.wood) - TotalCoin;
      setInputSaveCoin(props.dataResource.wood);
      setTaxPrice(taxCoin);
      setExchangePrice(TotalCoin);
    } else if (CoinsExchange[SelectedCoinIndex].nameCoin1 === "Meat") {
      const TotalCoin =
        Number(props.dataResource.meat) - Number(props.dataResource.meat) * 0.1;
      const taxCoin = Number(props.dataResource.meat) - TotalCoin;
      setInputSaveCoin(props.dataResource.meat);
      setTaxPrice(taxCoin);
      setExchangePrice(TotalCoin);
    } else {
      const TotalCoin =
        Number(props.dataResource.fruit) -
        Number(props.dataResource.fruit) * 0.1;
      const taxCoin = Number(props.dataResource.fruit) - TotalCoin;
      setInputSaveCoin(props.dataResource.fruit);
      setTaxPrice(taxCoin);
      setExchangePrice(TotalCoin);
    }
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
        <div className={styles.TopicExchange1}>Swap</div>
        <div className={styles.TopicExchange}>
          {CoinsExchange[SelectedCoinIndex].nameCoin1 === "Wood" ? (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance ? (
                props.dataResource &&
                Math.floor(parseFloat(props.dataResource.wood) * 100) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin1 === "Fruit" ? (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance ? (
                props.dataResource &&
                Math.floor(parseFloat(props.dataResource.fruit) * 100) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance ? (
                props.dataResource &&
                Math.floor(parseFloat(props.dataResource.meat) * 100) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
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
                  placeholder="0"
                  value={inputSaveCoin}
                />
              </div>

              <div onClick={handleMax} className={styles.maxCoin}>
                max
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
              {props.dataBalance ? (
                props.dataBalance &&
                Math.floor(
                  parseFloat(props.dataBalance.balanceOfFurnitureToken) * 100
                ) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin1 === "Fruit" ? (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance ? (
                props.dataBalance &&
                Math.floor(
                  parseFloat(props.dataBalance.balanceOfWineToken) * 100
                ) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          ) : (
            <div className={styles.balance}>
              Balance :{" "}
              {props.dataBalance ? (
                props.dataBalance &&
                Math.floor(
                  parseFloat(props.dataBalance.balanceOfSteakToken) * 100
                ) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          )}
          <div className={styles.exchangeCoin2}>
            <div className={styles.Coin3}>{ExchangePrice}</div>
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
            WITHDRAW
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

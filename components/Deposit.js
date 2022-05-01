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
import ModalNotEnoughCoinsNFT from "./ModalNotEnoughCoinsNFT";
import ClipLoaderButton from "../components/ClipLoaderButton";
export const Deposit = (props) => {
  console.log(props);
  const CoinsExchange = [
    {
      nameCoin2: "Fruit",
      nameCoin1: "WineToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin2: "Wood",
      nameCoin1: "FurnitureToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
    {
      nameCoin2: "Meat",
      nameCoin1: "SteakToken",
      priceCoin1: 5,
      priceCoin2: 1,
    },
  ];
  const [SelectedCoinIndex, setSelectedCoinIndex] = useState(0);
  const [ExchangePrice, setExchangePrice] = useState(0);
  const [showPopupNotEnoughCoinsNFT, setShowPopupNotEnoughCoinsNFT] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowPopupNotEnoughCoinsNFT = () =>
    setShowPopupNotEnoughCoinsNFT(true);

  const changeSelectcoin = (index) => {
    const _index = Number(index);
    setSelectedCoinIndex(_index);
  };
  const calculateCoin = (event) => {
    const InputSaveCoin = Number(event.target.value);
    const TotalCoin = InputSaveCoin;
    setExchangePrice(TotalCoin);
  };
  const DepositCoin = async () => {
    setLoading(true);
    if (CoinsExchange[SelectedCoinIndex].nameCoin2 === "Wood") {
      if (Number(props.dataBalance.balanceOfFurnitureToken) >= ExchangePrice) {
        try {
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
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
        handleShowPopupNotEnoughCoinsNFT();
        console.log("cannot deposit FurnitureToken");
      }
    } else if (CoinsExchange[SelectedCoinIndex].nameCoin2 === "Meat") {
      if (Number(props.dataBalance.balanceOfSteakToken) >= ExchangePrice) {
        try {
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
            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      } else {
        setLoading(false);
        handleShowPopupNotEnoughCoinsNFT();
        console.log("cannot deposit SteakToken");
      }
    } else {
      if (Number(props.dataBalance.balanceOfWineToken) >= ExchangePrice) {
        try {
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
        console.log("cannot deposit WineToken");
      }
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
      <div className={styles.TopicExchange1}>Swap</div>
        <div className={styles.TopicExchange}>
          
          {CoinsExchange[SelectedCoinIndex].nameCoin2 === "Wood" ? (
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
          ) : CoinsExchange[SelectedCoinIndex].nameCoin2 === "Fruit" ? (
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
                />
              </div>
              <div className={styles.maxCoin}>max</div>
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
          {CoinsExchange[SelectedCoinIndex].nameCoin2 === "Wood" ? (
            <div className={styles.balance}>
              Balance :
              {props.dataBalance ? (
                props.dataResource &&
                Math.floor(parseFloat(props.dataResource.wood) * 100) / 100
              ) : (
                <div className={styles.boxLoading}>
                  <ClipLoaderButton loading={props.loading} color="black" />
                </div>
              )}
            </div>
          ) : CoinsExchange[SelectedCoinIndex].nameCoin2 === "Fruit" ? (
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
          <div className={styles.exchangeCoin2}>
            <div className={styles.Coin1}>{ExchangePrice}</div>
            <div className={styles.coin2}>
              {CoinsExchange[SelectedCoinIndex].nameCoin2}
            </div>
          </div>
        </div>
        {loading ? (
          <div className={styles.buttonExchange} onClick={DepositCoin}>
            <ClipLoaderButton loading={loading} color="white" />
          </div>
        ) : (
          <div className={styles.buttonExchange} onClick={DepositCoin}>
            Deposit
          </div>
        )}
      </div>
      <ModalNotEnoughCoinsNFT
        item={props}
        setShowPopupNotEnoughCoinsNFT={setShowPopupNotEnoughCoinsNFT}
        showPopupNotEnoughCoinsNFT={showPopupNotEnoughCoinsNFT}
        bodyText={"Not enough token for deposit"}
        headerText={"Deposit"}
      />
    </div>
  );
};

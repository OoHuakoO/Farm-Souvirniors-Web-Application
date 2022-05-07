import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { cancleNFTAPI } from "../api/marketplace";
import { cancleNFTWeb3 } from "../web3/nft";
import { cancleNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useRouter } from "next/router";
import ModalDetailNFT from "./ModalDetailNFT";
import binance from "../public/binance.png";
import ClipLoaderButton from "../components/ClipLoaderButton";
const CardSell = (props) => {
  const router = useRouter();
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const [loading, setLoading] = useState(false);
  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  const cancleSell = async (item) => {
    setLoading(true);
    if (item.from === "nft") {
      try {
        const responseWeb3 = await cancleNFTWeb3(
          props.share_address_wallet,
          item.indexNFT
        );
        if (responseWeb3) {
          const responseAPI = await cancleNFTAPI(item.nft_id);
          console.log(responseAPI);
          setLoading(false);
          router.push({
            pathname: "/MyItem",
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else if (item.from === "randombox") {
      try {
        const responseWeb3InstanceRandombox =
          await cancleNFTWeb3InstanceRandombox(
            props.share_address_wallet,
            item.indexNFT
          );
        if (responseWeb3InstanceRandombox) {
          const responseAPI = await cancleNFTAPI(item.nft_id);
          console.log(responseAPI);
          setLoading(false);
          router.push({
            pathname: "/MyItem",
          });
        }
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  const handleCancleRandomBox = async (item) => {
    setLoading(true);
    try {
      const response = await cancleNFTWeb3InstanceRandombox(
        props.share_address_wallet,
        item.indexNFT
      );
      console.log(response);
      setLoading(false);
      router.push({
        pathname: "/MyItem",
      });
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };
  return (
    <div className={styles.bgCardSell1}>
      <div className={styles.bgCardSell2} onClick={handleShowPopupDetailNFT}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.nft_id}</span>
        </div>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard1}>
        <span>{props.name}</span>
      </div>
      <div className={styles.priceCard}>
        <span>{props.price} BNB</span>
        <span>
          &nbsp;
          <Image src={binance} alt="binance" width={20} height={20} />
        </span>
      </div>

      {props.type_nft === "chest" ? (
        loading ? (
          <div className={styles.buttonCancleSell}>
            <ClipLoaderButton loading={loading} color="red" />
          </div>
        ) : (
          <div
            onClick={() => handleCancleRandomBox(props)}
            className={styles.buttonCancleSell}
          >
            <span>CANCLE SELL</span>
          </div>
        )
      ) : loading ? (
        <div className={styles.buttonCancleSell}>
          <ClipLoaderButton loading={loading} color="red" />
        </div>
      ) : (
        <div
          onClick={() => cancleSell(props)}
          className={styles.buttonCancleSell}
        >
          <span>Cancle Sell</span>
        </div>
      )}
      <ModalDetailNFT
        item={props}
        setShowPopupDetailNFT={setShowPopupDetailNFT}
        showPopupDetailNFT={showPopupDetailNFT}
      />
    </div>
  );
};

export default CardSell;

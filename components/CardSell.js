import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { cancleNFTAPI } from "../api/marketplace";
import { cancleNFTWeb3 } from "../web3/nft";
import { cancleNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useRouter } from "next/router";
import ModalDetailNFT from "./ModalDetailNFT";
import binance from "../public/binance.png";
const CardSell = (props) => {
  const router = useRouter();
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  const cancleSell = async (item) => {
    if (item.from === "nft") {
      const responseWeb3 = await cancleNFTWeb3(
        props.share_address_wallet,
        item.indexNFT
      );
      if (responseWeb3) {
        const responseAPI = await cancleNFTAPI(item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
    } else if (item.from === "randombox") {
      const responseWeb3InstanceRandombox =
        await cancleNFTWeb3InstanceRandombox(
          props.share_address_wallet,
          item.indexNFT
        );
      if (responseWeb3InstanceRandombox) {
        const responseAPI = await cancleNFTAPI(item.nft_id);
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
    }
  };
  const handleCancleRandomBox = async (item) => {
    const response = await cancleNFTWeb3InstanceRandombox(
      props.share_address_wallet,
      item.indexNFT
    );
    console.log(response);
    router.push({
      pathname: "/MyItem",
    });
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
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.priceCard}>
          <span>{props.price} BNB</span>
        <span>&nbsp;
          <Image src={binance} alt="binance" width={20} height={20} />
        </span>
        </div>
      
      {props.type_nft === "chest" ? (
        <div
          onClick={() => handleCancleRandomBox(props)}
          className={styles.buttonCancleSell}
        >
          <span>Cancle Sell</span>
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

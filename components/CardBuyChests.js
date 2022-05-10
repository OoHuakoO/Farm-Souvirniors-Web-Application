import React, { useState, useEffect } from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import binance from "../public/binance.png";
import { buyRandomBox } from "../web3/randomBox";
import { useRouter } from "next/router";
import ModalDetailNFT from "./ModalDetailNFT";
import ClipLoaderButton from "../components/ClipLoaderButton";
const CardBuychests = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleBuyRandomBox = async (item) => {
    setLoading(true);
    const pid = Date.now();
    try {
      const response = await buyRandomBox(
        pid,
        item.price,
        parseInt(item.indexNFT),
        item.name,
        item.picture,
        props.share_address_wallet
      );
      if (response) {
        router.push({
          pathname: "/MyItem",
        });
      }
    } catch(err) {
      console.log(err)
      setLoading(false);
    }
  };
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  return (
    <div className={styles.CardBuyChests1}>
      <div className={styles.CardBuyChests2} onClick={handleShowPopupDetailNFT}>
        <div className={styles.CardBuyChestsImage}>
          <Image src={props.picture} alt="Box1" width={200} height={200} />
        </div>
        <div className={styles.typeBox}>
          <span>{100-props.count}/100 </span>
          <span> {props.name}</span>
        </div>
      </div>
      <div className={styles.bnb}>
        <div>{props.price} BNB</div>
        <div className={styles.bnb1}>
          {" "}
          &nbsp;
          <Image src={binance} alt="binance" width={20} height={20} />
        </div>
      </div>
      <div className={styles.CardBuyChestsImage}>
        {loading ? (
          <div className={styles.buttonBuy}>
            <ClipLoaderButton loading={loading} color="white" />
          </div>
        ) : (
          <div
            onClick={() => handleBuyRandomBox(props)}
            className={styles.buttonBuy}
          >
            BUY
          </div>
        )}
      </div>
      <ModalDetailNFT
        item={props}
        setShowPopupDetailNFT={setShowPopupDetailNFT}
        showPopupDetailNFT={showPopupDetailNFT}
      />
    </div>
  );
};

export default CardBuychests;

import React from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import binance from "../public/binance.png";
import { buyRandomBox } from "../web3/randomBox";
import { useRouter } from "next/router";
const CardBuychests = (props) => {
  const router = useRouter();
  const handleBuyRandomBox = async (item) => {
    const pid = Date.now();
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
  };
  return (
    <div className={styles.CardBuyChests1}>
      <div className={styles.CardBuyChests2}>
        <div className={styles.CardBuyChestsImage}>
          <Image src={props.picture} alt="Box1" width={200} height={200} />
        </div>
        <div className={styles.typeBox}>
          <span>{props.count}/100 </span>
          <span> {props.name}</span>
        </div>
        <div className={styles.bnb}>
          <div>{props.price} BNB</div>
          <div>
            {" "}
            &nbsp;
            <Image src={binance} alt="binance" width={20} height={20} />
          </div>
        </div>
        <div className={styles.CardBuyChestsImage}>
          <div
            onClick={() => handleBuyRandomBox(props)}
            className={styles.buttonBuy}
          >
            buy
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardBuychests;

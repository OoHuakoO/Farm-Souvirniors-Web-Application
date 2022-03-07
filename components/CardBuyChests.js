import React from "react";
import styles from "../styles/BuyChests.module.css";
import Image from "next/image";
import Ethereum from "../public/Ethereum-icon-purple.png";
import { buyRandomBox } from "../web3/index";
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
        <div>
          <Image src={props.picture} alt="Box1" width={200} height={200} />
        </div>
        <div className={styles.typeBox}>
          <span>{props.count}/100 </span>
          <span> {props.name}</span>
        </div>
        <div className={styles.bnb}>
          <div>{props.price} ETH</div>
          <div>
            <Image src={Ethereum} alt="Ethereum" width={25} height={25} />
          </div>
        </div>
        <div
          onClick={() => handleBuyRandomBox(props)}
          className={styles.buttonBuy}
        >
          buy
        </div>
      </div>
    </div>
  );
};

export default CardBuychests;

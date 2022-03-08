import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { cancleNFTAPI } from "../api/marketplace";
import { cancleNFTWeb3 } from "../web3/nft";
import { useRouter } from "next/router";
const CardSell = (props) => {
  const router = useRouter();
  const cancleSell = async (item) => {
    const responseAPI = await cancleNFTAPI(item.nft_id);
    if (responseAPI.data === "cancle nft successfully") {
      const responseWeb3 = await cancleNFTWeb3(
        props.share_address_wallet,
        item.indexNFT
      );
      console.log(responseWeb3);
    }
    console.log(responseAPI);
    router.push({
      pathname: "/MyItem",
    });
  };
  return (
    <div className={styles.cardMyItem1}>
      <div className={styles.cardMyItem2}>
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
      <div
        onClick={() => cancleSell(props)}
        className={styles.buttonCancleSell}
      >
        <span>Cancle Sell</span>
      </div>
    </div>
  );
};

export default CardSell;

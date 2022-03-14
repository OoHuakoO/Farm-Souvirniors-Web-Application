import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { sellNFTAPI } from "../api/marketplace";
import { sellNFTWeb3 } from "../web3/nft";
import { sellRandomBox } from "../web3/randomBox";
import { useRouter } from "next/router";
const CardMyItem = (props) => {
  const router = useRouter();
  const sellNFT = async (item) => {
    const responseAPI = await sellNFTAPI("0.01", item.nft_id);
    if (responseAPI.data === "sell nft successfully") {
      const responseWeb3 = await sellNFTWeb3(
        props.share_address_wallet,
        item.indexNFT,
        "0.01"
      );
      console.log(responseWeb3);
    }
    console.log(responseAPI);
    router.push({
      pathname: "/Sell",
    });
  };
  const sellRandombox = async (item) => {
    const response = await sellRandomBox(
      props.share_address_wallet,
      item.indexNFT,
      "0.01"
    );
    router.push({
      pathname: "/Sell",
    });
    console.log(response);
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
      {props.type_nft === "chest" ? (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className={styles.buttonSell}>
            <span>Open</span>
          </div>
          <div
            onClick={() => sellRandombox(props)}
            className={styles.buttonSell}
          >
            <span>Sell</span>
          </div>
        </div>
      ) : props.status === "not_plant" ? (
        <div onClick={() => sellNFT(props)} className={styles.buttonSell}>
          <span> Sell</span>
        </div>
      ) : (
        <>
          <div className={styles.buttonSell}>
            <span>Not Sell</span>
          </div>
          <div>
            <span>this nft in game</span>
          </div>
        </>
      )}
    </div>
  );
};

export default CardMyItem;

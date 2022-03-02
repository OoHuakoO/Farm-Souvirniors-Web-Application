import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Corn from "../public/corn.png";
import Ethereum from "../public/Ethereum-icon-purple.png";
import { buyNFTAPI } from "../api/marketplace";
import { buyNFTWeb3 } from "../web3/index";
import { useRouter } from "next/router";
const CardMarketplace = (props) => {
  const router = useRouter();
  const buyNFT = async (item) => {
    const responseAPI = await buyNFTAPI(
      props.share_address_wallet,
      item.seller,
      item.nft_id
    );
    if (responseAPI.data === "buy nft successfully") {
      const responseWeb3 = await buyNFTWeb3(
        props.share_address_wallet,
        item.seller,
        item.indexNFT,
        item.price
      );
      console.log(responseWeb3);
    }
    console.log(responseAPI);
    router.push({
      pathname: "/MyItem",
    });
  };
  return (
    <div className={styles.cardMyItem3}>
      <div className={styles.cardMyItem4}>
        <div className={styles.uidCard}>
          <span>UID : </span>
          <span>{props.nft_id}</span>
        </div>
        <div className={styles.uidCard}>
          <span>Seller : </span>
          <span>{props.seller}</span>
        </div>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
        <span>{props.price} ETH</span>
        <span>
          <Image src={Ethereum} alt="Ethereum" width={25} height={25} />
        </span>
      </div>
      {props.seller === props.share_address_wallet ? (
        <>
          <div className={styles.buttonSell}>
            <span>Not Buy</span>
          </div>
          <div>
            <span>this Owner NFT</span>
          </div>
        </>
      ) : (
        <div onClick={() => buyNFT(props)} className={styles.buttonSell}>
          <span>Buy</span>
        </div>
      )}
    </div>
  );
};

export default CardMarketplace;

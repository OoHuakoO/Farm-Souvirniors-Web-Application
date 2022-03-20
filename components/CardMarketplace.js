import React from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import Ethereum from "../public/Ethereum-icon-purple.png";
import { buyNFTAPI } from "../api/marketplace";
import { buyNFTWeb3 } from "../web3/nft";
import { buyNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useRouter } from "next/router";

const CardMarketplace = (props) => {
  const router = useRouter();
  const buyNFT = async (item) => {
    if (item.from === "nft") {
      const responseWeb3 = await buyNFTWeb3(
        props.share_address_wallet,
        item.seller,
        item.indexNFT,
        item.price
      );
      if (responseWeb3) {
        const responseAPI = await buyNFTAPI(
          props.share_address_wallet,
          item.seller,
          item.nft_id
        );
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
      console.log(responseWeb3);
    } else if (item.from === "randombox") {
      const responseWeb3 = await buyNFTWeb3InstanceRandombox(
        props.share_address_wallet,
        item.seller,
        item.indexNFT,
        item.price
      );
      if (responseWeb3) {
        const responseAPI = await buyNFTAPI(
          props.share_address_wallet,
          item.seller,
          item.nft_id
        );
        console.log(responseAPI);
        router.push({
          pathname: "/MyItem",
        });
      }
      console.log(responseWeb3);
    }
  };
  const handleBuyOwnerRandomBox = async (item) => {
    const response = await buyOwnerRandomBox(
      props.share_address_wallet,
      item.seller,
      item.indexNFT,
      item.price
    );
    console.log(response);
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

        <div
          className={[styles.uidSeller, "d-inline-block text-truncate"].join(
            " "
          )}
        >
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
      ) : props.type_nft === "chest" ? (
        <div
          onClick={() => handleBuyOwnerRandomBox(props)}
          className={styles.buttonSell}
        >
          <span>Buy</span>
        </div>
      ) : (
        <div onClick={() => buyNFT(props)} className={styles.buttonSell}>
          <span>Buy</span>
        </div>
      )}
    </div>
  );
};

export default CardMarketplace;

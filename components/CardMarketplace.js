import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import binance from "../public/binance.png";
import { buyNFTAPI } from "../api/marketplace";
import { buyNFTWeb3 } from "../web3/nft";
import { buyNFTWeb3InstanceRandombox } from "../web3/randomBox";
import { useRouter } from "next/router";
import ModalDetailNFT from "./ModalDetailNFT";
import ClipLoaderButton from "../components/ClipLoaderButton";
const CardMarketplace = (props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const buyNFT = async (item) => {
    setLoading(true);
    if (item.from === "nft") {
      try {
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
          setLoading(false);
          router.push({
            pathname: "/MyItem",
          });
        }
        console.log(responseWeb3);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else if (item.from === "randombox") {
      try {
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
          setLoading(false);
          router.push({
            pathname: "/MyItem",
          });
        }
        console.log(responseWeb3);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    }
  };
  const handleBuyOwnerRandomBox = async (item) => {
    const response = await buyNFTWeb3InstanceRandombox(
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
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  return (
    <div className={styles.cardMyItem3}>
      <div className={styles.cardMyItem4} onClick={handleShowPopupDetailNFT}>
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

          <span>
            {props.seller.substring(0, 5) +
              "..." +
              props.seller.substring(
                props.seller.length - 4,
                props.seller.length
              )}
          </span>
        </div>

        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.bgMarketplace}>
        <div className={styles.NameCard1}>
          <div>{props.name[0].toUpperCase() + props.name.substring(1)}</div>
        </div>
        <div className={styles.priceCard}>
          <span>{props.price} BNB</span>
          <span>
            &nbsp;
            <Image src={binance} alt="binance" width={20} height={20} />
          </span>
        </div>
        {props.seller === props.share_address_wallet ? (
          <>
            <div className={styles.buttonMarketplace}>
              <span>THIS OWNER NFT</span>
            </div>
          </>
        ) : props.type_nft === "chest" ? (
          loading ? (
            <div className={styles.buttonSell}>
              <ClipLoaderButton loading={loading} color="white" />
            </div>
          ) : (
            <div
              onClick={() => handleBuyOwnerRandomBox(props)}
              className={styles.buttonSell}
            >
              <span>Buy</span>
            </div>
          )
        ) : loading ? (
          <div className={styles.buttonSell}>
            <ClipLoaderButton loading={loading} color="white" />
          </div>
        ) : (
          <div onClick={() => buyNFT(props)} className={styles.buttonSell}>
            <span>BUY</span>
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

export default CardMarketplace;

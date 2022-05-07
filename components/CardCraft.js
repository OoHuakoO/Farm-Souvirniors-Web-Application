import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { craftNFTAPI, checkResource } from "../api/info-nft";
import { craftNFTWeb3 } from "../web3/nft";
import { useRouter } from "next/router";
import ModalDetailNFT from "./ModalDetailNFT";
import ModalNotEnoughCoinsNFT from "./ModalNotEnoughCoinsNFT";
import ClipLoaderButton from "../components/ClipLoaderButton";
import Wood from "../public/coinWood.svg";
import Apple from "../public/coinApple.png";
const CardCraft = (props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const craftNFT = async (item) => {
    const pid = Date.now();
    setLoading(true);
    const resourceCheckResource = await checkResource(
      item.cost,
      props.share_address_wallet
    );
    if (resourceCheckResource.data === "have enough resource") {
      try {
        const responseWeb3 = await craftNFTWeb3(
          pid,
          item.name,
          item.picture,
          item.reward,
          item.type_nft,
          item.cost.wood,
          item.cost.fruit,
          item.energy_consumed,
          item.amount_food,
          props.share_address_wallet
        );
        if (responseWeb3) {
          const responseAPI = await craftNFTAPI(
            pid,
            item.name,
            item.picture,
            item.reward,
            item.type_nft,
            item.cost,
            item.energy_consumed,
            item.amount_food,
            props.share_address_wallet
          );
          router.push({
            pathname: "/MyItem",
          });
          console.log("responseAPI", responseAPI);
        }
        console.log("responseWeb3", responseWeb3);
      } catch (err) {
        setLoading(false);
        console.log(err);
      }
    } else {
      setLoading(false);
      handleShowPopupNotEnoughCoinsNFT();
    }
  };
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  const [showPopupNotEnoughCoinsNFT, setShowPopupNotEnoughCoinsNFT] =
    useState(false);
  const handleShowPopupNotEnoughCoinsNFT = () =>
    setShowPopupNotEnoughCoinsNFT(true);

  return (
    <div className={styles.cardMyItem5}>
      <div className={styles.cardMyItem6} onClick={handleShowPopupDetailNFT}>
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span >{props.name}</span>
      </div>
      <div className={styles.costCraft}>
        <span>Cost</span>
      </div>
      <div className={styles.coinCraft}>
        <div className={styles.coinCraft1}>
          <div className={styles.coinCraft1Icon}>
            <Image
              src={Wood}
              alt="Corn"
              width={35}
              height={35}
            />
          </div>
          <div className={styles.coinCraft1Coin}>{props.cost.wood}</div>
        </div>
        <div className={styles.coinCraft2}>
          <div className={styles.coinCraft2Icon}>
            {" "}
            <Image
              src={Apple}
              alt="Corn"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.coinCraft2Coin}>{props.cost.fruit}</div>
        </div>
      </div>
      {loading ? (
        <div className={styles.buttonSell}>
          <ClipLoaderButton loading={loading} color="white" />
        </div>
      ) : (
        <div onClick={() => craftNFT(props)} className={styles.buttonSell}>
          <span>CRAFT</span>
        </div>
      )}

      <ModalDetailNFT
        item={props}
        setShowPopupDetailNFT={setShowPopupDetailNFT}
        showPopupDetailNFT={showPopupDetailNFT}
      />
      <ModalNotEnoughCoinsNFT
        item={props}
        setShowPopupNotEnoughCoinsNFT={setShowPopupNotEnoughCoinsNFT}
        showPopupNotEnoughCoinsNFT={showPopupNotEnoughCoinsNFT}
        bodyText={"Not enough fruit or wood for craft"}
        headerText={"Craft"}
      />
    </div>
  );
};

export default CardCraft;

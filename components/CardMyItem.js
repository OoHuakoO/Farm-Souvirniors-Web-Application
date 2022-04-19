import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { openRandomBoxWeb3 } from "../web3/randomBox";
import { openRandomBoxAPI, getOneInfoNFT } from "../api/random-box";
import ModalDetailNFT from "./ModalDetailNFT";
import ModalSellNFT from "./ModalSellNFT";
import ModalOpenBuyChests from "./ModalOpenBuyChests";
import ClipLoaderButton from "../components/ClipLoaderButton";
const CardMyItem = (props) => {
  const [loading, setLoading] = useState(false);
  const [showPopupDetailNFT, setShowPopupDetailNFT] = useState(false);
  const [showPopupSellNFT, setShowPopupSellNFT] = useState(false);
  const [showPopupOpenBuyChests, setShowPopupOpenBuyChests] = useState(false);
  const [detailNFTOpenBox, setDetailNFTOpenBox] = useState({});
  const handleShowPopupOpenBuyChests = () => {
    setShowPopupOpenBuyChests(true);
  };

  const handleShowPopupDetailNFT = () => setShowPopupDetailNFT(true);
  const handleShowPopupSellNFT = () => setShowPopupSellNFT(true);

  const randomNFT = (values) => {
    let i,
      pickedValue,
      randomNr = Math.random(),
      threshold = 0;
    for (i = 0; i < values.length; i++) {
      threshold += values[i].probability;
      if (threshold > randomNr) {
        pickedValue = values[i].value;
        break;
      }
    }
    return pickedValue;
  };

  const openRandombox = async (item) => {
    const pid = Date.now();
    var NFT;
    let animal = [
      {
        value: "cow",
        probability: 0.1,
      },
      {
        value: "pig",
        probability: 0.3,
      },
      {
        value: "bird",
        probability: 0.6,
      },
    ];
    let fruit = [
      {
        value: "strawberry",
        probability: 0.1,
      },
      {
        value: "grape",
        probability: 0.3,
      },
      {
        value: "apple",
        probability: 0.6,
      },
    ];
    let vegetable = [
      {
        value: "cauliflower",
        probability: 0.1,
      },
      {
        value: "pumpkin",
        probability: 0.3,
      },
      {
        value: "corn",
        probability: 0.6,
      },
    ];
    if (item.name === "animal chests") {
      NFT = randomNFT(animal);
    } else if (item.name === "fruit chests") {
      NFT = randomNFT(fruit);
    } else if (item.name === "vegetable chests") {
      NFT = randomNFT(vegetable);
    }
    if (NFT) {
      setLoading(true);
      let responseGetInfoNFT = await getOneInfoNFT(NFT);
      if (responseGetInfoNFT.data) {
        try {
          let responseWeb3 = await openRandomBoxWeb3(
            pid,
            responseGetInfoNFT.data.name,
            responseGetInfoNFT.data.picture,
            responseGetInfoNFT.data.reward,
            responseGetInfoNFT.data.type_nft,
            responseGetInfoNFT.data.cost.wood,
            responseGetInfoNFT.data.cost.fruit,
            responseGetInfoNFT.data.energy_consumed,
            responseGetInfoNFT.data.amount_food,
            props.share_address_wallet,
            item.indexNFT
          );
          console.log(responseWeb3);
          if (responseWeb3) {
            let responseAPI = await openRandomBoxAPI(
              pid,
              props.share_address_wallet,
              responseGetInfoNFT.data.name
            );
            if (responseAPI) {
              setLoading(false);
              setDetailNFTOpenBox({ ...responseGetInfoNFT.data, pid });
              handleShowPopupOpenBuyChests();
              setTimeout(() => {
                props.setRefrestFetchAPI(!props.refrestFetchAPI);
              }, 3000);
            }
            console.log(responseAPI);
          }
        } catch (err) {
          setLoading(false);
          console.log(err);
        }
      }
    }
  };

  return (
    <div className={styles.cardMyItem1}>
      <div className={styles.cardMyItem2} onClick={handleShowPopupDetailNFT}>
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
          {loading ? (
            <div className={styles.buttonSell}>
              <ClipLoaderButton loading={loading} color="white" />
            </div>
          ) : (
            <div
              onClick={() => openRandombox(props)}
              className={styles.buttonSell}
            >
              <span>Open</span>
            </div>
          )}

          <div onClick={handleShowPopupSellNFT} className={styles.buttonSell}>
            <span>Sell</span>
          </div>
        </div>
      ) : props.status === "not_plant" ? (
        <div onClick={handleShowPopupSellNFT} className={styles.buttonSell}>
          <span> Sell</span>
        </div>
      ) : (
        <>
          <div className={styles.buttonMarketplace}>
            <span>This NFT in game</span>
          </div>
        </>
      )}
      <ModalDetailNFT
        item={props}
        setShowPopupDetailNFT={setShowPopupDetailNFT}
        showPopupDetailNFT={showPopupDetailNFT}
      />
      <ModalSellNFT
        item={props}
        showPopupSellNFT={showPopupSellNFT}
        setShowPopupSellNFT={setShowPopupSellNFT}
        share_address_wallet={props.share_address_wallet}
      />
      <ModalOpenBuyChests
        item={props}
        setShowPopupOpenBuyChests={setShowPopupOpenBuyChests}
        showPopupOpenBuyChests={showPopupOpenBuyChests}
        detailNFTOpenBox={detailNFTOpenBox}
      />
    </div>
  );
};

export default CardMyItem;

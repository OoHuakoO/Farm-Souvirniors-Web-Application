import React, { useState, useEffect } from "react";
import styles from "../styles/MyItem.module.css";
import Image from "next/image";
import { craftNFTAPI, checkResource } from "../api/info-nft";
import { craftNFTWeb3 } from "../web3/nft";
import { useRouter } from "next/router";
import { Modal, Button } from "react-bootstrap";

// import Modal from "./PopupDetail";

const CardCraft = (props) => {
  const router = useRouter();
  const craftNFT = async (item) => {
    const pid = Date.now();
    const resourceCheckResource = await checkResource(
      item.cost,
      props.share_address_wallet
    );

    if (resourceCheckResource.data === "have enough resource") {
      const responseWeb3 = await craftNFTWeb3(
        pid,
        item.name,
        item.picture,
        item.reward,
        item.type,
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
          item.type,
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
    } else {
      // popup แจ้งเตือน
    }
  };
  const [showPopup, setShowPopup] = useState(false);
  const handleClose = () => setShowPopup(false);
  const handleShow = () => setShowPopup(true);

  return (
    <div className={styles.cardMyItem5}>
      <div className={styles.cardMyItem6} onClick={handleShow}>
        {/* <div onClick={() => setshowModal(true)} className={styles.cardMyItem6} > */}
        <div className={styles.imageMyItem}>
          <Image src={props.picture} alt="Corn" width={200} height={200} />
        </div>
      </div>
      <div className={styles.NameCard}>
        <span>{props.name}</span>
      </div>
      <div className={styles.costCraft}>
        <span>Cost</span>
      </div>
      <div className={styles.coinCraft}>
        <div className={styles.coinCraft1}>
          <div className={styles.coinCraft1Icon}>
            <Image
              src={"/../public/coinWood.svg"}
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
              src={"/../public/coinApple.png"}
              alt="Corn"
              width={30}
              height={30}
            />
          </div>
          <div className={styles.coinCraft2Coin}>{props.cost.fruit}</div>
        </div>
      </div>
      <div onClick={() => craftNFT(props)} className={styles.buttonSell}>
        <span>Craft</span>
      </div>

      <Modal
        show={showPopup}
        onHide={handleClose}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        size="lg"
      >
        <Modal.Header className={styles.popupBg} closeButton></Modal.Header>
        <Modal.Body className={styles.popupBg}>
          <div className={styles.cardMyItem1Popup}>
            <div className={styles.cardMyItem2Popup}>
              {/* <div onClick={() => setshowModal(true)} className={styles.cardMyItem6} > */}
              <div className={styles.imageMyItemPopup}>
                <Image
                  src={props.picture}
                  alt="Corn"
                  width={200}
                  height={200}
                />
              </div>
            </div>
            <div className={styles.NameCardPopup}>
              <span>{props.name}</span>
            </div>
          </div>
          <div className={styles.detailPopup}>
            <div>Reward : 10 metat</div>
            <div>Chaege Time : 60 mins</div>
            <div>Energy Consumed : 3 meat</div>
            <div>Durability Consumed : 2 fruit</div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CardCraft;
